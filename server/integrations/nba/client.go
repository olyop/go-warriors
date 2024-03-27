package nba

import (
	"net/http"
)

const hostname = "api-nba-v1.p.rapidapi.com"
const baseURL = "https://" + hostname

const rapidAPIKeyHeaderKey = "X-RapidAPI-Key"
const rapidAPIHostHeaderKey = "X-RapidAPI-Host"

// New constructs a new NBA RapidAPI client
func New(apiKey string) *NBA {
	nba := &NBA{}

	nba.client = &http.Client{}
	nba.apiKey = apiKey

	return nba
}

// NBA is a client for the NBA API via RapidAPI
type NBA struct {
	client *http.Client
	apiKey string
}

// GetGames returns the games for a given date
func (nba *NBA) GetGames(params map[string]string) (NBAAPIGamesResponseJson, error) {
	data, err := Query[NBAAPIGamesResponseJson](nba, "games", params)

	if err != nil {
		return data, err
	}

	return data, nil
}
