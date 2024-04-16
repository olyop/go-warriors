package nba

import (
	"time"
)

const hostname = "api-nba-v1.p.rapidapi.com"
const baseURL = "https://" + hostname

const rapidAPIKeyHeaderKey = "X-RapidAPI-Key"
const rapidAPIHostHeaderKey = "X-RapidAPI-Host"

// New constructs a new NBA RapidAPI client
func New(apiKey string) *NBA {
	nba := &NBA{}

	nba.timeout = time.Second * 10
	nba.apiKey = apiKey

	return nba
}

// NBA is a client for the NBA API via RapidAPI
type NBA struct {
	timeout time.Duration
	apiKey  string
}
