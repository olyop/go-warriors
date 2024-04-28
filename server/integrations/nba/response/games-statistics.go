package response

// NBAGamesStatisticsParameters is the parameters for the games statistics from the NBA API
type NBAGamesStatisticsParameters struct {
	ID int `json:"id,omitempty"`
}

// NBAGamesStatisticsResponse is the response from the NBA API for a game statistics
type NBAGamesStatisticsResponse struct {
	Team       NBAGamesStatisticsTeamResponse         `json:"team,omitempty"`
	Statistics []NBAGamesStatisticsStatisticsResponse `json:"statistics,omitempty"`
}

// NBAGamesStatisticsTeamResponse is the team for a game statistics from the NBA API
type NBAGamesStatisticsTeamResponse struct {
	ID       int    `json:"id,omitempty"`
	Name     string `json:"name,omitempty"`
	Nickname string `json:"nickname,omitempty"`
	Code     string `json:"code,omitempty"`
	Logo     string `json:"logo,omitempty"`
}

// NBAGamesStatisticsStatisticsResponse is the statistics for a game statistics from the NBA API
type NBAGamesStatisticsStatisticsResponse struct {
	FastBreakPoints    int    `json:"fastBreakPoints,omitempty"`
	PointsInPaint      int    `json:"pointsInPaint,omitempty"`
	BiggestLead        int    `json:"biggestLead,omitempty"`
	SecondChancePoints int    `json:"secondChancePoints,omitempty"`
	PointsOffTurnovers int    `json:"pointsOffTurnovers,omitempty"`
	LongestRun         int    `json:"longestRun,omitempty"`
	Points             int    `json:"points,omitempty"`
	FGM                int    `json:"fgm,omitempty"`
	FGA                int    `json:"fga,omitempty"`
	FGP                string `json:"fgp,omitempty"`
	FTM                int    `json:"ftm,omitempty"`
	FTA                int    `json:"fta,omitempty"`
	FTP                string `json:"ftp,omitempty"`
	TPM                int    `json:"tpm,omitempty"`
	TPA                int    `json:"tpa,omitempty"`
	TPP                string `json:"tpp,omitempty"`
	OffReb             int    `json:"offReb,omitempty"`
	DefReb             int    `json:"defReb,omitempty"`
	TotReb             int    `json:"totReb,omitempty"`
	Assists            int    `json:"assists,omitempty"`
	PFouls             int    `json:"pFouls,omitempty"`
	Steals             int    `json:"steals,omitempty"`
	Turnovers          int    `json:"turnovers,omitempty"`
	Blocks             int    `json:"blocks,omitempty"`
	PlusMinus          string `json:"plusMinus,omitempty"`
	Min                string `json:"min,omitempty"`
}
