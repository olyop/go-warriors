package response

// NBAPlayersParameters is the parameters for the players from the NBA API
type NBAPlayersParameters struct {
	ID      int    `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Team    int    `json:"team,omitempty"`
	Season  int    `json:"season,omitempty"`
	Country string `json:"country,omitempty"`
	Search  string `json:"search,omitempty"`
}

// NBAPlayerResponse is the response from the NBA API for a player
type NBAPlayerResponse struct {
	ID          int                      `json:"id,omitempty"`
	FirstName   string                   `json:"firstname,omitempty"`
	LastName    string                   `json:"lastname,omitempty"`
	Birth       NBAPlayerBirthResponse   `json:"birth,omitempty"`
	NBA         NBAPlayerNBAResponse     `json:"nba,omitempty"`
	Height      NBAPlayerHeightResponse  `json:"height,omitempty"`
	Weight      NBAPlayerWeightResponse  `json:"weight,omitempty"`
	College     string                   `json:"college,omitempty"`
	Affiliation string                   `json:"affiliation,omitempty"`
	Leagues     NBAPlayerLeaguesResponse `json:"leagues,omitempty"`
}

// NBAPlayerBirthResponse is the birth for a player from the NBA API
type NBAPlayerBirthResponse struct {
	Date    string `json:"date,omitempty"`
	Country string `json:"country,omitempty"`
}

// NBAPlayerNBAResponse is the NBA for a player from the NBA API
type NBAPlayerNBAResponse struct {
	Start int `json:"start,omitempty"`
	Pro   int `json:"pro,omitempty"`
}

// NBAPlayerHeightResponse is the height for a player from the NBA API
type NBAPlayerHeightResponse struct {
	Feets  int `json:"feets,omitempty"`
	Inches int `json:"inches,omitempty"`
}

// NBAPlayerWeightResponse is the weight for a player from the NBA API
type NBAPlayerWeightResponse struct {
	Pounds int `json:"pounds,omitempty"`
}

// NBAPlayerLeaguesResponse is the leagues for a player from the NBA API
type NBAPlayerLeaguesResponse struct {
	Standard NBAPlayerLeaguesStandardResponse `json:"standard,omitempty"`
}

// NBAPlayerLeaguesStandardResponse is the standard leagues for a player from the NBA API
type NBAPlayerLeaguesStandardResponse struct {
	Jersey int    `json:"jersey,omitempty"`
	Active bool   `json:"active,omitempty"`
	Pos    string `json:"pos,omitempty"`
}
