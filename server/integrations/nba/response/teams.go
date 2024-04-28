package response

// NBATeamsParameters is the parameters for the teams from the NBA API
type NBATeamsParameters struct {
	ID         int    `json:"id,omitempty"`
	Name       string `json:"name,omitempty"`
	Code       string `json:"code,omitempty"`
	League     string `json:"league,omitempty"`
	Conference string `json:"conference,omitempty"`
	Division   string `json:"division,omitempty"`
	Search     string `json:"search,omitempty"`
}

// NBATeamResponse is the response from the NBA API for a team
type NBATeamResponse struct {
	ID           int                    `json:"id,omitempty"`
	Name         string                 `json:"name,omitempty"`
	Nickname     string                 `json:"nickname,omitempty"`
	Code         string                 `json:"code,omitempty"`
	City         string                 `json:"city,omitempty"`
	Logo         string                 `json:"logo,omitempty"`
	AllStar      bool                   `json:"allStar,omitempty"`
	NBAFranchise bool                   `json:"nbaFranchise,omitempty"`
	Leagues      NBATeamLeaguesResponse `json:"leagues,omitempty"`
}

// NBATeamLeaguesResponse is the leagues for a team from the NBA API
type NBATeamLeaguesResponse struct {
	Standard NBATeamLeagueResponse `json:"standard,omitempty"`
}

// NBATeamLeagueResponse is the standard leagues for a team from the NBA API
type NBATeamLeagueResponse struct {
	Conference string `json:"conference,omitempty"`
	Division   string `json:"division,omitempty"`
}
