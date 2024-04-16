package nba

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// Query makes the underlying request to the NBA API
func Query[T interface{}](nba *NBA, path string, params map[string]string) (Response[T], error) {
	var result Response[T]

	url := fmt.Sprintf("%s/%s", baseURL, path)

	request, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return result, err
	}

	query := request.URL.Query()
	for key, value := range params {
		query.Add(key, value)
	}

	request.URL.RawQuery = query.Encode()
	request.Header.Set(rapidAPIKeyHeaderKey, nba.apiKey)
	request.Header.Set(rapidAPIHostHeaderKey, hostname)

	client := &http.Client{
		Timeout: nba.timeout,
	}

	response, err := client.Do(request)
	if err != nil {
		return result, err
	}

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return result, err
	}

	err = json.Unmarshal(body, &result)
	if err != nil {
		return result, err
	}

	return result, err
}
