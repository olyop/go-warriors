package nba

// Response is the response from the NBA API
type Response[T interface{}] struct {
	Message  string        `json:"message,omitempty"`
	Errors   []interface{} `json:"errors,omitempty"`
	Response []T           `json:"response,omitempty"`
}

// Team is a game from the NBA API
type Team struct {
	ID           float64 `json:"id,omitempty"`
	Name         string  `json:"name,omitempty"`
	Nickname     string  `json:"nickname,omitempty"`
	Code         string  `json:"code,omitempty"`
	City         string  `json:"city,omitempty"`
	Logo         string  `json:"logo,omitempty"`
	AllStar      bool    `json:"allStar,omitempty"`
	NBAFranchise bool    `json:"nbaFranchise,omitempty"`
	Leagues      Leagues `json:"leagues,omitempty"`
}

// Leagues is a league from the NBA API
type Leagues struct {
	Standard LeaguesStandard `json:"standard"`
}

// LeaguesStandard is a standard league from the NBA API
type LeaguesStandard struct {
	Conference string `json:"conference,omitempty"`
	Division   string `json:"division,omitempty"`
}

// Game is a game from the NBA API
type Game struct {
	Arena   GameArena   `json:"arena,omitempty"`
	Date    GameDate    `json:"date,omitempty"`
	ID      float64     `json:"id,omitempty"`
	League  string      `json:"league,omitempty"`
	Periods GamePeriods `json:"periods,omitempty"`
	Scores  GameScores  `json:"scores,omitempty"`
	Season  float64     `json:"season,omitempty"`
	Stage   float64     `json:"stage,omitempty"`
	Status  GameStatus  `json:"status,omitempty"`
	Teams   GameTeams   `json:"teams,omitempty"`
}

// GameArena is the arena for a game from the NBA API
type GameArena struct {
	City  string `json:"city,omitempty"`
	Name  string `json:"name,omitempty"`
	State string `json:"state,omitempty"`
}

// GameDate is the date for a game from the NBA API
type GameDate struct {
	Start string `json:"start,omitempty"`
}

// GamePeriods is the periods for a game from the NBA API
type GamePeriods struct {
	Current     float64 `json:"current,omitempty"`
	EndOfPeriod bool    `json:"endOfPeriod,omitempty"`
	Total       float64 `json:"total,omitempty"`
}

// GameScores is the scores for a game from the NBA API
type GameScores struct {
	Home     GameScore `json:"home,omitempty"`
	Visitors GameScore `json:"visitors,omitempty"`
}

// GameScore is the score for a game from the NBA API
type GameScore struct {
	Linescore []string        `json:"linescore,omitempty"`
	Loss      float64         `json:"loss,omitempty"`
	Points    float64         `json:"points,omitempty"`
	Series    GameScoreSeries `json:"series,omitempty"`
	Win       float64         `json:"win,omitempty"`
}

// GameScoreSeries is the series for a game score from the NBA API
type GameScoreSeries struct {
	Loss float64 `json:"loss,omitempty"`
	Win  float64 `json:"win,omitempty"`
}

// GameStatus is the status for a game from the NBA API
type GameStatus struct {
	Clock    string  `json:"clock,omitempty"`
	Halftime bool    `json:"halftime,omitempty"`
	Long     string  `json:"long,omitempty"`
	Short    float64 `json:"short,omitempty"`
}

// GameTeams is the teams for a game from the NBA API
type GameTeams struct {
	Home     GameTeam `json:"home,omitempty"`
	Visitors GameTeam `json:"visitors,omitempty"`
}

// GameTeam is the team for a game from the NBA API
type GameTeam struct {
	ID       float64 `json:"id,omitempty"`
	Code     string  `json:"code,omitempty"`
	Logo     string  `json:"logo,omitempty"`
	Name     string  `json:"name,omitempty"`
	Nickname string  `json:"nickname,omitempty"`
}

// GameTeamStatistics is the statistics for a team in a game from the NBA API
type GameTeamStatistics struct {
	Team       GameTeam                  `json:"team"`
	Statistics []GameTeamStatisticsValue `json:"statistics"`
}

// GameTeamStatisticsValue is the statistics value for a team in a game from the NBA API
type GameTeamStatisticsValue struct {
	FastBreakPoints    float64 `json:"fastBreakPoints,omitempty"`
	PointsInPaint      float64 `json:"pointsInPaint,omitempty"`
	BiggestLead        float64 `json:"biggestLead,omitempty"`
	SecondChancePoints float64 `json:"secondChancePoints,omitempty"`
	PointsOffTurnovers float64 `json:"pointsOffTurnovers,omitempty"`
	LongestRun         float64 `json:"longestRun,omitempty"`
	Points             float64 `json:"points,omitempty"`
	FGM                float64 `json:"fgm,omitempty"`
	FGA                float64 `json:"fga,omitempty"`
	FGP                string  `json:"fgp,omitempty"`
	FTM                float64 `json:"ftm,omitempty"`
	FTA                float64 `json:"fta,omitempty"`
	FTP                string  `json:"ftp,omitempty"`
	TPM                float64 `json:"tpm,omitempty"`
	TPA                float64 `json:"tpa,omitempty"`
	TPP                string  `json:"tpp,omitempty"`
	OffReb             float64 `json:"offReb,omitempty"`
	DefReb             float64 `json:"defReb,omitempty"`
	TotReb             float64 `json:"totReb,omitempty"`
	Assists            float64 `json:"assists,omitempty"`
	PFouls             float64 `json:"pFouls,omitempty"`
	Steals             float64 `json:"steals,omitempty"`
	Turnovers          float64 `json:"turnovers,omitempty"`
	Blocks             float64 `json:"blocks,omitempty"`
	PlusMinus          string  `json:"plusMinus,omitempty"`
	Min                string  `json:"min,omitempty"`
}

// PlayerGameStatistics is the statistics for a player in a game from the NBA API
type PlayerGameStatistics struct {
	Player     PlayerGameStatisticsPlayer  `json:"player"`
	Team       PlayerGameStatisticsTeam    `json:"team"`
	Game       PlayerGameStatisticsGame    `json:"game"`
	Statistics []PlayerGameStatisticsValue `json:"statistics"`
	Comment    string                      `json:"comment"`
}

// PlayerGameStatisticsPlayer is the player for a player in a game from the NBA API
type PlayerGameStatisticsPlayer struct {
	ID        float64 `json:"id,omitempty"`
	FirstName string  `json:"firstname,omitempty"`
	LastName  string  `json:"lastname,omitempty"`
}

// PlayerGameStatisticsTeam is the team for a player in a game from the NBA API
type PlayerGameStatisticsTeam struct {
	ID       float64 `json:"id,omitempty"`
	Name     string  `json:"name,omitempty"`
	Nickname string  `json:"nickname,omitempty"`
	Code     string  `json:"code,omitempty"`
	Logo     string  `json:"logo,omitempty"`
}

// PlayerGameStatisticsGame is the game for a player in a game from the NBA API
type PlayerGameStatisticsGame struct {
	ID float64 `json:"id,omitempty"`
}

// PlayerGameStatisticsValue is the statistics value for a player in a game from the NBA API
type PlayerGameStatisticsValue struct {
	Points    float64 `json:"points,omitempty"`
	Pos       string  `json:"pos,omitempty"`
	Min       string  `json:"min,omitempty"`
	FGM       float64 `json:"fgm,omitempty"`
	FGA       float64 `json:"fga,omitempty"`
	FGP       string  `json:"fgp,omitempty"`
	FTM       float64 `json:"ftm,omitempty"`
	FTA       float64 `json:"fta,omitempty"`
	FTP       string  `json:"ftp,omitempty"`
	TPM       float64 `json:"tpm,omitempty"`
	TPA       float64 `json:"tpa,omitempty"`
	TPP       string  `json:"tpp,omitempty"`
	OffReb    float64 `json:"offReb,omitempty"`
	DefReb    float64 `json:"defReb,omitempty"`
	TotReb    float64 `json:"totReb,omitempty"`
	Assists   float64 `json:"assists,omitempty"`
	PFouls    float64 `json:"pFouls,omitempty"`
	Steals    float64 `json:"steals,omitempty"`
	Turnovers float64 `json:"turnovers,omitempty"`
	Blocks    float64 `json:"blocks,omitempty"`
	PlusMinus string  `json:"plusMinus,omitempty"`
}

// Player is a player from the NBA API
type Player struct {
	ID          float64       `json:"id,omitempty"`
	FirstName   string        `json:"firstname,omitempty"`
	LastName    string        `json:"lastname,omitempty"`
	Birth       PlayerBirth   `json:"birth,omitempty"`
	NBA         PlayerNBA     `json:"nba,omitempty"`
	Height      PlayerHeight  `json:"height,omitempty"`
	Weight      PlayerWeight  `json:"weight,omitempty"`
	College     string        `json:"college,omitempty"`
	Affiliation string        `json:"affiliation,omitempty"`
	Leagues     PlayerLeagues `json:"leagues,omitempty"`
}

// PlayerBirth is the birth for a player from the NBA API
type PlayerBirth struct {
	Date    string `json:"date,omitempty"`
	Country string `json:"country,omitempty"`
}

// PlayerNBA is the NBA for a player from the NBA API
type PlayerNBA struct {
	Start float64 `json:"start,omitempty"`
	Pro   float64 `json:"pro,omitempty"`
}

// PlayerHeight is the height for a player from the NBA API
type PlayerHeight struct {
	Feets  string `json:"feets,omitempty"`
	Inches string `json:"inches,omitempty"`
	Meters string `json:"meters,omitempty"`
}

// PlayerWeight is the weight for a player from the NBA API
type PlayerWeight struct {
	Pounds    string `json:"pounds,omitempty"`
	Kilograms string `json:"kilograms,omitempty"`
}

// PlayerLeagues is the leagues for a player from the NBA API
type PlayerLeagues struct {
	Standard PlayerLeaguesStandard `json:"standard"`
}

// PlayerLeaguesStandard is the standard leagues for a player from the NBA API
type PlayerLeaguesStandard struct {
	Jersey float64 `json:"jersey,omitempty"`
	Active bool    `json:"active,omitempty"`
	Pos    string  `json:"pos,omitempty"`
}
