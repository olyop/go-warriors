package service

import (
	"gowarriors/integrations/nba"
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
	"gowarriors/service/mappers"
	"sync"
	"time"
)

// RetreiveGames retrieves games from the NBA API
func RetreiveGames(client nba.NBA, options RetreiveGamesOptions) ([]schema.GoWarriorsAPIGame, error) {
	wg := sync.WaitGroup{}
	ch := make(chan gameResult, 2)

	season := mappers.DetermineSeason()

	for i := 0; i < 1; i++ {
		wg.Add(1)

		go func(index int) {
			defer wg.Done()

			dateParam := options.Date.AddDate(0, 0, index)

			parameters := response.NBAGamesParameters{
				Season: season,
				League: NBALeague,
				Date:   dateParam.Format("2006-01-02"),
			}

			data, err := client.GetGames(parameters)

			ch <- gameResult{result: data, err: err}
		}(i)
	}

	wg.Wait()
	close(ch)

	nbaGames, err := pullOutGames(ch)
	if err != nil {
		return nil, err
	}

	games := mappers.MapGames(nbaGames)
	games = filterGames(games, options)

	return games, nil
}

func pullOutGames(c chan gameResult) ([]response.NBAGameResponse, error) {
	games := make([]response.NBAGameResponse, 0)

	for game := range c {
		if game.err != nil {
			return nil, game.err
		}

		games = append(games, game.result...)
	}

	return games, nil
}

func filterGames(games []schema.GoWarriorsAPIGame, options RetreiveGamesOptions) []schema.GoWarriorsAPIGame {
	gamesFiltered := make([]schema.GoWarriorsAPIGame, 0)

	for _, game := range games {
		if options.Teams != nil {
			keep := false

			for _, teamID := range options.Teams {
				if game.Home.Team.TeamID == teamID || game.Away.Team.TeamID == teamID {
					keep = true
					break
				}
			}

			if !keep {
				continue
			}
		}

		if options.Status != "" {
			if options.Status != game.Status.Status {
				continue
			}
		}

		gamesFiltered = append(gamesFiltered, game)
	}

	return gamesFiltered
}

// RetreiveGamesOptions is the NBA league
type RetreiveGamesOptions struct {
	Date   time.Time
	Teams  []int
	Status string
}

type gameResult struct {
	result []response.NBAGameResponse
	err    error
}
