package service

import (
	"gowarriors/integrations/nba"
	"gowarriors/schema"
	"gowarriors/service/mappers"
	"strconv"
	"sync"
	"time"
)

// RetreiveGames retrieves games from the NBA API
func RetreiveGames(client nba.NBA, date time.Time, teamsFilter []int, statusFilter string) ([]schema.GoWarriorsAPIGame, error) {
	wg := sync.WaitGroup{}
	ch := make(chan result, 2)

	season := mappers.DetermineSeason()

	for i := 0; i < 1; i++ {
		wg.Add(1)

		go func(index int) {
			defer wg.Done()

			dateParam := date.AddDate(0, 0, index)
			dateFormatted := dateParam.Format("2006-01-02")

			params := map[string]string{
				"season": season,
				"league": NBALeague,
				"date":   dateFormatted,
			}

			data, err := client.GetGames(params)

			ch <- result{res: data.Response, err: err}
		}(i)
	}

	wg.Wait()
	close(ch)

	nbaGames := make([]nba.Game, 0)

	for result := range ch {
		if result.err != nil {
			return nil, result.err
		}

		nbaGames = append(nbaGames, result.res...)
	}

	games := mappers.MapGames(nbaGames)

	return filterGames(games, teamsFilter, statusFilter), nil
}

func filterGames(games []schema.GoWarriorsAPIGame, teamsFilter []int, statusFilter string) []schema.GoWarriorsAPIGame {
	gamesFiltered := make([]schema.GoWarriorsAPIGame, 0)

	for _, game := range games {
		if teamsFilter != nil {
			keep := false

			for _, teamID := range teamsFilter {
				if game.Home.Team.TeamID == teamID || game.Away.Team.TeamID == teamID {
					keep = true
					break
				}
			}

			if !keep {
				continue
			}
		}

		if statusFilter != "" {
			if statusFilter != game.Status.Status {
				continue
			}
		}

		gamesFiltered = append(gamesFiltered, game)
	}

	return gamesFiltered
}

type result struct {
	res []nba.Game
	err error
}

// RetreiveGame retrieves a game from the NBA API
func RetreiveGame(client nba.NBA, id int) (schema.GoWarriorsAPIGame, error) {
	params := map[string]string{
		"id": strconv.Itoa(id),
	}

	data, err := client.GetGames(params)

	if err != nil {
		return schema.GoWarriorsAPIGame{}, err
	}

	game := mappers.MapGame(data.Response[0])

	return game, nil
}
