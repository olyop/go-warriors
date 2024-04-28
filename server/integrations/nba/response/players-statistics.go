package response

// NBAPlayersStatisticsParameters is the parameters for the players statistics from the NBA API
type NBAPlayersStatisticsParameters struct {
	ID     int `json:"id,omitempty"`
	Game   int `json:"game,omitempty"`
	Team   int `json:"team,omitempty"`
	Season int `json:"season,omitempty"`
}

// NBAPlayerStatisticsResponse is the response from the NBA API for a player statistics
type NBAPlayerStatisticsResponse struct {
	Player    NBAPlayerStatisticsPlayerResponse `json:"player,omitempty"`
	Team      NBAPlayerStatisticsTeamResponse   `json:"team,omitempty"`
	Game      NBAPlayerStatisticsGameResponse   `json:"game,omitempty"`
	Points    int                               `json:"points,omitempty"`
	Pos       string                            `json:"pos,omitempty"`
	Min       string                            `json:"min,omitempty"`
	FGM       int                               `json:"fgm,omitempty"`
	FGA       int                               `json:"fga,omitempty"`
	FGP       string                            `json:"fgp,omitempty"`
	FTM       int                               `json:"ftm,omitempty"`
	FTA       int                               `json:"fta,omitempty"`
	FTP       string                            `json:"ftp,omitempty"`
	TPM       int                               `json:"tpm,omitempty"`
	TPA       int                               `json:"tpa,omitempty"`
	TPP       string                            `json:"tpp,omitempty"`
	OffReb    int                               `json:"offReb,omitempty"`
	DefReb    int                               `json:"defReb,omitempty"`
	TotReb    int                               `json:"totReb,omitempty"`
	Assists   int                               `json:"assists,omitempty"`
	PFouls    int                               `json:"pFouls,omitempty"`
	Steals    int                               `json:"steals,omitempty"`
	Turnovers int                               `json:"turnovers,omitempty"`
	Blocks    int                               `json:"blocks,omitempty"`
	PlusMinus string                            `json:"plusMinus,omitempty"`
	Comment   string                            `json:"comment,omitempty"`
}

// NBAPlayerStatisticsPlayerResponse is the player for a player statistics from the NBA API
type NBAPlayerStatisticsPlayerResponse struct {
	ID        int    `json:"id,omitempty"`
	FirstName string `json:"firstname,omitempty"`
	LastName  string `json:"lastname,omitempty"`
}

// NBAPlayerStatisticsTeamResponse is the team for a player statistics from the NBA API
type NBAPlayerStatisticsTeamResponse struct {
	ID       int    `json:"id,omitempty"`
	Name     string `json:"name,omitempty"`
	Nickname string `json:"nickname,omitempty"`
	Code     string `json:"code,omitempty"`
	Logo     string `json:"logo,omitempty"`
}

// NBAPlayerStatisticsGameResponse is the game for a player statistics from the NBA API
type NBAPlayerStatisticsGameResponse struct {
	ID int `json:"id,omitempty"`
}
