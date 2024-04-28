package response

import (
	"time"
)

// NBAGamesParameters is the parameters for the games from the NBA API
type NBAGamesParameters struct {
	ID     int    `json:"id,omitempty"`
	Date   string `json:"date,omitempty"`
	Live   string `json:"live,omitempty"`
	League string `json:"league,omitempty"`
	Season string `json:"season,omitempty"`
	Team   string `json:"team,omitempty"`
	H2H    string `json:"h2h,omitempty"`
}

// NBAGameResponse is the date for a game from the NBA API
type NBAGameResponse struct {
	ID          int                     `json:"id,omitempty"`
	League      string                  `json:"league,omitempty"`
	Season      int                     `json:"season,omitempty"`
	Date        NBAGamesDateResponse    `json:"date,omitempty"`
	Stage       int                     `json:"stage,omitempty"`
	Status      NBAGamesStatusResponse  `json:"status,omitempty"`
	Periods     NBAGamesPeriodsResponse `json:"periods,omitempty"`
	Arena       NBAGamesArenaResponse   `json:"arena,omitempty"`
	Teams       NBAGamesTeamsResponse   `json:"teams,omitempty"`
	Scores      NBAGamesScoresResponse  `json:"scores,omitempty"`
	Officials   []string                `json:"officials,omitempty"`
	TimesTied   int                     `json:"timesTied,omitempty"`
	LeadChanges int                     `json:"leadChanges,omitempty"`
}

// NBAGamesDateResponse is the date for a game from the NBA API
type NBAGamesDateResponse struct {
	Start time.Time `json:"start,omitempty"`
	End   time.Time `json:"end,omitempty"`
}

// NBAGamesStatusResponse is the status for a game from the NBA API
type NBAGamesStatusResponse struct {
	Clock    string `json:"clock,omitempty"`
	Halftime bool   `json:"halftime,omitempty"`
	Short    int    `json:"short,omitempty"`
	Long     string `json:"long,omitempty"`
}

// NBAGamesPeriodsResponse is the periods for a game from the NBA API
type NBAGamesPeriodsResponse struct {
	Current     int  `json:"current,omitempty"`
	Total       int  `json:"total,omitempty"`
	EndOfPeriod bool `json:"endOfPeriod,omitempty"`
}

// NBAGamesArenaResponse is the arena for a game from the NBA API
type NBAGamesArenaResponse struct {
	City    string `json:"city,omitempty"`
	Name    string `json:"name,omitempty"`
	State   string `json:"state,omitempty"`
	Country string `json:"country,omitempty"`
}

// NBAGamesTeamsResponse is the teams for a game from the NBA API
type NBAGamesTeamsResponse struct {
	Visitors NBAGamesTeamResponse `json:"visitors,omitempty"`
	Home     NBAGamesTeamResponse `json:"home,omitempty"`
}

// NBAGamesTeamResponse is the team for a game from the NBA API
type NBAGamesTeamResponse struct {
	ID       int    `json:"id,omitempty"`
	Name     string `json:"name,omitempty"`
	Nickname string `json:"nickname,omitempty"`
	Code     string `json:"code,omitempty"`
	Logo     string `json:"logo,omitempty"`
}

// NBAGamesScoresResponse is the scores for a game from the NBA API
type NBAGamesScoresResponse struct {
	Visitors NBAGamesScoreResponse `json:"visitors,omitempty"`
	Home     NBAGamesScoreResponse `json:"home,omitempty"`
}

// NBAGamesScoreResponse is the score for a game from the NBA API
type NBAGamesScoreResponse struct {
	Linescore []string                    `json:"linescore,omitempty"`
	Loss      int                         `json:"loss,omitempty"`
	Points    int                         `json:"points,omitempty"`
	Series    NBAGamesScoreSeriesResponse `json:"series,omitempty"`
	Win       int                         `json:"win,omitempty"`
}

// NBAGamesScoreSeriesResponse is the series for a game score from the NBA API
type NBAGamesScoreSeriesResponse struct {
	Loss int `json:"loss,omitempty"`
	Win  int `json:"win,omitempty"`
}
