package nba

import (
	"encoding/json"
	"fmt"
	"io"
	log "log/slog"
	"net/http"
)

// Query makes the underlying request to the NBA API
func Query[T any](nba *NBA, path string, params map[string]string) (T, error) {
	var result T

	url := fmt.Sprintf("%s/%s", baseURL, path)

	request, err := http.NewRequest("GET", url, nil)

	if err != nil {
		return result, err
	}

	request.Header.Set(rapidAPIKeyHeaderKey, nba.apiKey)
	request.Header.Set(rapidAPIHostHeaderKey, hostname)

	// Add query parameters
	query := request.URL.Query()

	for key, value := range params {
		query.Add(key, value)
	}

	request.URL.RawQuery = query.Encode()

	// Make the request
	response, err := nba.client.Do(request)

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
		log.Error("Error unmarshalling JSON. ", err)
	}

	return result, err
}
