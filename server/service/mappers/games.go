package mappers

import (
	"errors"
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
	log "log/slog"
)

// MapGames maps the NBA API games response to a GoWarriors API games response
func MapGames(response []response.NBAGameResponse) []schema.GoWarriorsAPIGame {
	games := make([]schema.GoWarriorsAPIGame, len(response))

	for i := 0; i < len(response); i++ {
		games[i] = MapGame(response[i])
	}

	return games
}

// MapGame maps the NBA API game response to a GoWarriors API game response
func MapGame(game response.NBAGameResponse) schema.GoWarriorsAPIGame {
	return schema.GoWarriorsAPIGame{
		GameID:    int(game.ID),
		StartTime: game.Date.Start.Unix(),
		Status:    mapGameStatus(game),
		Home:      mapGameTeam(game, "home"),
		Away:      mapGameTeam(game, "away"),
	}
}

const statusScheduled string = "Scheduled"
const statusInPlay string = "In Play"
const statusFinished string = "Finished"

func mapGameStatus(game response.NBAGameResponse) schema.GoWarriorsAPIGameStatus {
	var status string
	var clock string

	if game.Status.Long == statusScheduled {
		status = "scheduled"
	} else if game.Status.Long == statusInPlay {
		if game.Status.Halftime {
			status = "halftime"
		} else if game.Periods.EndOfPeriod {
			status = "end_of_period"
		} else {
			status = "in_progress"

			if game.Status.Clock == "" {
				clock = "0:00"
			} else {
				clock = game.Status.Clock
			}
		}
	} else if game.Status.Long == statusFinished {
		status = "final"
	} else {
		log.Error("Invalid game status: ", game.Status.Long, errors.New("Invalid game status"))
	}

	return schema.GoWarriorsAPIGameStatus{
		Status: status,
		Period: int(game.Periods.Current),
		Clock:  clock,
	}
}

func mapGameTeam(game response.NBAGameResponse, team string) schema.GoWarriorsAPIGameTeam {
	return schema.GoWarriorsAPIGameTeam{
		Score: mapGameScore(game, team),
		Team:  mapGameTeamInfo(game, team),
	}
}

func mapGameScore(game response.NBAGameResponse, team string) schema.GoWarriorsAPIScore {
	var score schema.GoWarriorsAPIScore

	if !hasGameStarted(game) {
		return score
	}

	if team == "home" {
		score.Points = int(game.Scores.Home.Points)
	} else if team == "away" {
		score.Points = int(game.Scores.Visitors.Points)
	} else {
		log.Error("Invalid team: ", team, errors.New("Invalid team"))
	}

	return score
}

func mapGameTeamInfo(game response.NBAGameResponse, team string) schema.GoWarriorsAPITeam {
	var value schema.GoWarriorsAPITeam

	if team == "home" {
		value = schema.GoWarriorsAPITeam{
			TeamID:   int(game.Teams.Home.ID),
			Code:     game.Teams.Home.Code,
			Name:     game.Teams.Home.Name,
			Nickname: game.Teams.Home.Nickname,
			Logo:     fixTeamLogo(game.Teams.Home.ID, game.Teams.Home.Logo),
		}
	} else if team == "away" {
		value = schema.GoWarriorsAPITeam{
			TeamID:   int(game.Teams.Visitors.ID),
			Code:     game.Teams.Visitors.Code,
			Name:     game.Teams.Visitors.Name,
			Nickname: game.Teams.Visitors.Nickname,
			Logo:     fixTeamLogo(game.Teams.Visitors.ID, game.Teams.Visitors.Logo),
		}
	} else {
		log.Error("Invalid team: ", team, errors.New("Invalid team"))
	}

	return value
}

func hasGameStarted(game response.NBAGameResponse) bool {
	return game.Status.Long != "Scheduled"
}
