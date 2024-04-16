package nba

// Response is the response from the NBA API
type Response[T interface{}] struct {
	// Errors corresponds to the JSON schema field "errors".
	Errors []interface{} `json:"errors,omitempty"`

	// Response corresponds to the JSON schema field "response".
	Response []T `json:"response,omitempty"`
}

// Team is a game from the NBA API
type Team struct {
	// ID corresponds to the JSON schema field "id".
	ID float64 `json:"id,omitempty"`

	// Name corresponds to the JSON schema field "name".
	Name string `json:"name,omitempty"`

	// Nickname corresponds to the JSON schema field "nickname".
	Nickname string `json:"nickname,omitempty"`

	// Code corresponds to the JSON schema field "code".
	Code string `json:"code,omitempty"`

	// City corresponds to the JSON schema field "city".
	City string `json:"city,omitempty"`

	// Logo corresponds to the JSON schema field "logo".
	Logo string `json:"logo,omitempty"`

	// AllStar corresponds to the JSON schema field "allStar".
	AllStar bool `json:"allStar,omitempty"`

	// NBAFranchise corresponds to the JSON schema field "nbaFranchise".
	NBAFranchise bool `json:"nbaFranchise,omitempty"`

	// Leagues corresponds to the JSON schema field "leagues".
	Leagues Leagues `json:"leagues,omitempty"`
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
	// Arena corresponds to the JSON schema field "arena".
	Arena GameArena `json:"arena,omitempty"`

	// Date corresponds to the JSON schema field "date".
	Date GameDate `json:"date,omitempty"`

	// ID corresponds to the JSON schema field "id".
	ID float64 `json:"id,omitempty"`

	// League corresponds to the JSON schema field "league".
	League string `json:"league,omitempty"`

	// Periods corresponds to the JSON schema field "periods".
	Periods GamePeriods `json:"periods,omitempty"`

	// Scores corresponds to the JSON schema field "scores".
	Scores GameScores `json:"scores,omitempty"`

	// Season corresponds to the JSON schema field "season".
	Season float64 `json:"season,omitempty"`

	// Stage corresponds to the JSON schema field "stage".
	Stage float64 `json:"stage,omitempty"`

	// Status corresponds to the JSON schema field "status".
	Status GameStatus `json:"status,omitempty"`

	// Teams corresponds to the JSON schema field "teams".
	Teams GameTeams `json:"teams,omitempty"`
}

// GameArena is the arena for a game from the NBA API
type GameArena struct {
	// City corresponds to the JSON schema field "city".
	City string `json:"city,omitempty"`

	// Name corresponds to the JSON schema field "name".
	Name string `json:"name,omitempty"`

	// State corresponds to the JSON schema field "state".
	State string `json:"state,omitempty"`
}

// GameDate is the date for a game from the NBA API
type GameDate struct {

	// Start corresponds to the JSON schema field "start".
	Start string `json:"start,omitempty"`
}

// GamePeriods is the periods for a game from the NBA API
type GamePeriods struct {
	// Current corresponds to the JSON schema field "current".
	Current float64 `json:"current,omitempty"`

	// EndOfPeriod corresponds to the JSON schema field "endOfPeriod".
	EndOfPeriod bool `json:"endOfPeriod,omitempty"`

	// Total corresponds to the JSON schema field "total".
	Total float64 `json:"total,omitempty"`
}

// GameScores is the scores for a game from the NBA API
type GameScores struct {
	// Home corresponds to the JSON schema field "home".
	Home GameScore `json:"home,omitempty"`

	// Visitors corresponds to the JSON schema field "visitors".
	Visitors GameScore `json:"visitors,omitempty"`
}

// GameScore is the score for a game from the NBA API
type GameScore struct {
	// Linescore corresponds to the JSON schema field "linescore".
	Linescore []string `json:"linescore,omitempty"`

	// Loss corresponds to the JSON schema field "loss".
	Loss float64 `json:"loss,omitempty"`

	// Points corresponds to the JSON schema field "points".
	Points float64 `json:"points,omitempty"`

	// Series corresponds to the JSON schema field "series".
	Series GameScoreSeries `json:"series,omitempty"`

	// Win corresponds to the JSON schema field "win".
	Win float64 `json:"win,omitempty"`
}

// GameScoreSeries is the series for a game score from the NBA API
type GameScoreSeries struct {
	// Loss corresponds to the JSON schema field "loss".
	Loss float64 `json:"loss,omitempty"`

	// Win corresponds to the JSON schema field "win".
	Win float64 `json:"win,omitempty"`
}

// GameStatus is the status for a game from the NBA API
type GameStatus struct {
	// Clock corresponds to the JSON schema field "clock".
	Clock string `json:"clock,omitempty"`

	// Halftime corresponds to the JSON schema field "halftime".
	Halftime bool `json:"halftime,omitempty"`

	// Long corresponds to the JSON schema field "long".
	Long string `json:"long,omitempty"`

	// Short corresponds to the JSON schema field "short".
	Short float64 `json:"short,omitempty"`
}

// GameTeams is the teams for a game from the NBA API
type GameTeams struct {
	// Home corresponds to the JSON schema field "home".
	Home GameTeam `json:"home,omitempty"`

	// Visitors corresponds to the JSON schema field "visitors".
	Visitors GameTeam `json:"visitors,omitempty"`
}

// GameTeam is the team for a game from the NBA API
type GameTeam struct {
	// ID corresponds to the JSON schema field "id".
	ID float64 `json:"id,omitempty"`

	// Code corresponds to the JSON schema field "code".
	Code string `json:"code,omitempty"`

	// Logo corresponds to the JSON schema field "logo".
	Logo string `json:"logo,omitempty"`

	// Name corresponds to the JSON schema field "name".
	Name string `json:"name,omitempty"`

	// Nickname corresponds to the JSON schema field "nickname".
	Nickname string `json:"nickname,omitempty"`
}
