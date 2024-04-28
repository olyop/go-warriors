package nba

import (
	"encoding/json"
	"fmt"
	"gowarriors/integrations/nba/response"
	"gowarriors/utils"
	"io"
	"net/http"
)

// Query makes the underlying request to the NBA API
func Query[T interface{}](nba *NBA, path string, params interface{}) ([]T, error) {
	var result response.NBAResponse[T]

	url := fmt.Sprintf("%s/%s", baseURL, path)

	request, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	query := request.URL.Query()

	// convert params to JSON
	paramsJSON, err := json.Marshal(params)
	if err != nil {
		return nil, err
	}

	// convert JSON to map
	var paramsMap map[string]interface{}
	err = json.Unmarshal(paramsJSON, &paramsMap)
	if err != nil {
		return nil, err
	}

	// loop over the map and append the query parameters
	for key, value := range paramsMap {
		query.Add(key, fmt.Sprintf("%v", value))
	}

	request.URL.RawQuery = query.Encode()

	request.Header.Set(rapidAPIKeyHeaderKey, nba.apiKey)
	request.Header.Set(rapidAPIHostHeaderKey, hostname)

	client := &http.Client{
		Timeout: nba.timeout,
	}

	response, err := client.Do(request)
	if err != nil {
		return nil, err
	}

	utils.Log(fmt.Sprintf("Requested %s", request.URL.String()))

	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	if result.Message != "" {
		return nil, fmt.Errorf(result.Message)
	}

	return result.Response, err
}
