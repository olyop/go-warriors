package mappers

import (
	"errors"
	"gowarriors/integrations/nba"
	"gowarriors/schema"
	log "log/slog"
	"strconv"
	"time"
)

// MapGames maps the NBA API games response to a GoWarriors API games response
func MapGames(response []nba.Game) []schema.GoWarriorsAPIGame {
	games := make([]schema.GoWarriorsAPIGame, len(response))

	for i := 0; i < len(response); i++ {
		games[i] = MapGame(response[i])
	}

	return games
}

// MapGame maps the NBA API game response to a GoWarriors API game response
func MapGame(game nba.Game) schema.GoWarriorsAPIGame {
	return schema.GoWarriorsAPIGame{
		GameID:    int(game.ID),
		StartTime: convertISODateToUnix(game.Date.Start),
		Status:    mapGameStatus(game),
		Home:      mapGameTeam(game, "home"),
		Away:      mapGameTeam(game, "away"),
	}
}

func convertISODateToUnix(date string) int64 {
	t, err := time.Parse(time.RFC3339, date)

	if err != nil {
		log.Error("Error parsing date: ", err)
		return 0
	}

	return t.Unix()

}

const statusScheduled string = "Scheduled"
const statusInPlay string = "In Play"
const statusFinished string = "Finished"

func mapGameStatus(game nba.Game) schema.GoWarriorsAPIGameStatus {
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

func mapGameTeam(game nba.Game, team string) schema.GoWarriorsAPIGameTeam {
	return schema.GoWarriorsAPIGameTeam{
		Score: mapGameScore(game, team),
		Team:  mapGameTeamInfo(game, team),
	}
}

func mapGameScore(game nba.Game, team string) schema.GoWarriorsAPIScore {
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

func mapGameTeamInfo(game nba.Game, team string) schema.GoWarriorsAPITeam {
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
	}

	return value
}

func hasGameStarted(game nba.Game) bool {
	return game.Status.Long != "Scheduled"
}

// MapTeams maps the NBA API teams response to a GoWarriors API teams
func MapTeams(response []nba.Team) []schema.GoWarriorsAPITeam {
	var teams []schema.GoWarriorsAPITeam

	for i := 0; i < len(response); i++ {
		nbaTeam := response[i]

		if nbaTeam.ID == 37 {
			continue
		}

		if !nbaTeam.NBAFranchise {
			continue
		}

		teams = append(teams, mapTeam(nbaTeam))
	}

	return teams
}

func mapTeam(team nba.Team) schema.GoWarriorsAPITeam {
	value := schema.GoWarriorsAPITeam{
		TeamID:     int(team.ID),
		Code:       team.Code,
		Name:       team.Name,
		Nickname:   team.Nickname,
		Logo:       fixTeamLogo(team.ID, team.Logo),
		Conference: team.Leagues.Standard.Conference,
		Division:   team.Leagues.Standard.Division,
	}

	return value
}

const washingtonWizardsLogo = "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Washington_Wizards_logo.svg/1200px-Washington_Wizards_logo.svg.png"

func fixTeamLogo(teamID float64, logo string) string {
	if int(teamID) == 41 {
		return washingtonWizardsLogo
	}

	return logo
}

// DetermineSeason determines the current NBA season
func DetermineSeason() string {
	now := time.Now()

	var year int

	// check if we are in the off-season
	// the NBA season usually starts in October
	if now.Month() < 10 {
		year = now.Year() - 1
	} else {
		year = now.Year()
	}

	return strconv.Itoa(year)
}
