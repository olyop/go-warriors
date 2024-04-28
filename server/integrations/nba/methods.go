package nba

import (
	"gowarriors/integrations/nba/response"
)

// GetGames returns the games for a given date
func (nba *NBA) GetGames(p response.NBAGamesParameters) ([]response.NBAGameResponse, error) {
	return Query[response.NBAGameResponse](nba, "games", p)
}

// GetPlayers returns the players for a given date
func (nba *NBA) GetPlayers(p response.NBAPlayersParameters) ([]response.NBAPlayerResponse, error) {
	return Query[response.NBAPlayerResponse](nba, "players", p)
}

// GetPlayersStatistics returns the players statistics for a given date
func (nba *NBA) GetPlayersStatistics(p response.NBAPlayersStatisticsParameters) ([]response.NBAPlayerStatisticsResponse, error) {
	return Query[response.NBAPlayerStatisticsResponse](nba, "players/statistics", p)
}

// GetTeams returns the teams for a given date
func (nba *NBA) GetTeams(p response.NBATeamsParameters) ([]response.NBATeamResponse, error) {
	return Query[response.NBATeamResponse](nba, "teams", p)
}

// GetGamesStatistics returns the games statistics for a given date
func (nba *NBA) GetGamesStatistics(p response.NBAGamesStatisticsParameters) ([]response.NBAGamesStatisticsResponse, error) {
	return Query[response.NBAGamesStatisticsResponse](nba, "games/statistics", p)
}
