package mappers

import (
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
	"gowarriors/utils"
)

// MapGameStatistics maps the NBA API game team statistics response to a GoWarriors API game team response
func MapGameStatistics(game schema.GoWarriorsAPIGame, teamStatistics []response.NBAGamesStatisticsResponse, playersStatistics []response.NBAPlayerStatisticsResponse) schema.GoWarriorsAPIGame {
	game.Home.Statistics = findTeamStatistics(teamStatistics, game.Home.Team.TeamID)
	game.Away.Statistics = findTeamStatistics(teamStatistics, game.Away.Team.TeamID)
	game.Home.Players = findTeamPlayerStatistics(playersStatistics, game.Home.Team.TeamID)
	game.Away.Players = findTeamPlayerStatistics(playersStatistics, game.Away.Team.TeamID)

	return game
}

func findTeamStatistics(teamStatistics []response.NBAGamesStatisticsResponse, teamID int) (result schema.GoWarriorsAPITeamStatistics) {
	for _, team := range teamStatistics {
		if int(team.Team.ID) != teamID {
			continue
		}

		if len(team.Statistics) == 0 {
			continue
		}

		result = mapTeamStatistics(team.Statistics[0])
	}

	return result
}

func mapTeamStatistics(value response.NBAGamesStatisticsStatisticsResponse) schema.GoWarriorsAPITeamStatistics {
	return schema.GoWarriorsAPITeamStatistics{
		FastBreakPoints:        value.FastBreakPoints,
		PointsInPaint:          value.PointsInPaint,
		BiggestLead:            value.BiggestLead,
		SecondChancePoints:     value.SecondChancePoints,
		PointsOffTurnovers:     value.PointsOffTurnovers,
		LongestRun:             value.LongestRun,
		Points:                 value.Points,
		FieldGoalsMade:         value.FGM,
		FieldGoalsAttempted:    value.FGA,
		FieldGoalPercentage:    utils.ParseFloat(value.FGP),
		FreeThrowsMade:         value.FTM,
		FreeThrowsAttempted:    value.FTA,
		FreeThrowPercentage:    utils.ParseFloat(value.FTP),
		ThreePointersMade:      value.TPM,
		ThreePointersAttempted: value.TPA,
		ThreePointPercentage:   utils.ParseFloat(value.TPP),
		OffensiveRebounds:      value.OffReb,
		DefensiveRebounds:      value.DefReb,
		TotalRebounds:          value.TotReb,
		Assists:                value.Assists,
		PersonalFouls:          value.PFouls,
		Steals:                 value.Steals,
		Turnovers:              value.Turnovers,
		Blocks:                 value.Blocks,
	}
}

func findTeamPlayerStatistics(playerStatistics []response.NBAPlayerStatisticsResponse, teamID int) []schema.GoWarriorsAPIGamePlayer {
	players := make([]schema.GoWarriorsAPIGamePlayer, 0)

	for _, player := range playerStatistics {
		if int(player.Team.ID) != teamID {
			continue
		}

		players = append(players, schema.GoWarriorsAPIGamePlayer{
			Statistics: mapTeamPlayerStatistics(player),
			Player: schema.GoWarriorsAPIPlayer{
				PlayerID:  player.Player.ID,
				FirstName: player.Player.FirstName,
				LastName:  player.Player.LastName,
			},
		})
	}

	return players
}

func mapTeamPlayerStatistics(value response.NBAPlayerStatisticsResponse) schema.GoWarriorsAPIGamePlayerStatistics {
	return schema.GoWarriorsAPIGamePlayerStatistics{
		Points:                 value.Points,
		Position:               value.Pos,
		Minutes:                value.Min,
		FieldGoalsMade:         value.FGM,
		FieldGoalsAttempted:    value.FGA,
		FieldGoalPercentage:    utils.ParseFloat(value.FGP),
		FreeThrowsMade:         value.FTM,
		FreeThrowsAttempted:    value.FTA,
		FreeThrowPercentage:    utils.ParseFloat(value.FTP),
		ThreePointersMade:      value.TPM,
		ThreePointersAttempted: value.TPA,
		ThreePointPercentage:   utils.ParseFloat(value.TPP),
		OffensiveRebounds:      value.OffReb,
		DefensiveRebounds:      value.DefReb,
		TotalRebounds:          value.TotReb,
		Assists:                value.Assists,
		PersonalFouls:          value.PFouls,
		Steals:                 value.Steals,
		Turnovers:              value.Turnovers,
		Blocks:                 value.Blocks,
		PlusMinus:              value.PlusMinus,
		Comment:                value.Comment,
	}
}
