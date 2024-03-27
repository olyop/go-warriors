package apiv1

import (
	"gowarriors/integrations/nba"
)

// MapGamesResponse maps the NBA API games response to a GoWarriors API games response
func MapGamesResponse(response nba.NBAAPIGamesResponseJson) GoWarriorsAPIResponse[[]GoWarriorsAPIGame] {
	games := mapGames(response)

	return createGoWarriorsAPIResponse(games)
}

// createGoWarriorsAPIResponse maps a NBA API response to a GoWarriors API response
func createGoWarriorsAPIResponse[T any](data T) GoWarriorsAPIResponse[T] {
	return GoWarriorsAPIResponse[T]{Data: data}
}

func mapGames(response nba.NBAAPIGamesResponseJson) []GoWarriorsAPIGame {
	games := make([]GoWarriorsAPIGame, len(response.Response))

	for i, game := range response.Response {
		games[i] = mapGame(game)
	}

	return games
}

func mapGame(game nba.NBAAPIGamesResponseJsonResponseElem) GoWarriorsAPIGame {
	return GoWarriorsAPIGame{
		Home: mapGameTeam(game, "home"),
		Away: mapGameTeam(game, "visitor"),
	}
}

func mapGameTeam(game nba.NBAAPIGamesResponseJsonResponseElem, team string) GoWarriorsAPIGameTeam {
	return GoWarriorsAPIGameTeam{
		Score: mapGameScore(game, team),
		Team:  mapGameTeamInfo(game, team),
	}
}

func mapGameScore(game nba.NBAAPIGamesResponseJsonResponseElem, team string) GoWarriorsAPIScore {
	var score int

	if team == "home" {
		score = int(*game.Scores.Home.Points)
	} else {
		score = int(*game.Scores.Visitors.Points)
	}

	return GoWarriorsAPIScore{
		Points: score,
	}
}

func mapGameTeamInfo(game nba.NBAAPIGamesResponseJsonResponseElem, team string) GoWarriorsAPITeam {
	if team == "home" {
		return GoWarriorsAPITeam{
			TeamID:   int(*game.Teams.Home.ID),
			Code:     *game.Teams.Home.Code,
			Name:     *game.Teams.Home.Name,
			Nickname: *game.Teams.Home.Nickname,
			Logo:     *game.Teams.Home.Logo,
		}
	} else {
		return GoWarriorsAPITeam{
			TeamID:   int(*game.Teams.Visitors.ID),
			Code:     *game.Teams.Visitors.Code,
			Name:     *game.Teams.Visitors.Name,
			Nickname: *game.Teams.Visitors.Nickname,
			Logo:     *game.Teams.Visitors.Logo,
		}
	}
}
