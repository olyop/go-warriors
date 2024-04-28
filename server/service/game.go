package service

import (
	"errors"
	"gowarriors/integrations/nba"
	"gowarriors/integrations/nba/response"
	"gowarriors/schema"
	"gowarriors/service/mappers"
	"sync"
)

// RetreiveGame retrieves a game from the NBA API
func RetreiveGame(client nba.NBA, gameID int) (game schema.GoWarriorsAPIGame, err error) {
	var gameData []response.NBAGameResponse
	var gameStatisticsData []response.NBAGamesStatisticsResponse
	var gamePlayersStatisticsData []response.NBAPlayerStatisticsResponse

	wg := sync.WaitGroup{}
	wg.Add(3)

	go func() {
		defer wg.Done()

		gameData, err = client.GetGames(response.NBAGamesParameters{
			ID: gameID,
		})
	}()
	go func() {
		defer wg.Done()

		gameStatisticsData, err = client.GetGamesStatistics(response.NBAGamesStatisticsParameters{
			ID: gameID,
		})
	}()
	go func() {
		defer wg.Done()

		gamePlayersStatisticsData, err = client.GetPlayersStatistics(response.NBAPlayersStatisticsParameters{
			Game: gameID,
		})
	}()

	wg.Wait()

	if err != nil {
		return game, err
	}
	if len(gameData) == 0 {
		return game, errors.New("Game not found")
	}

	game = mappers.MapGame(gameData[0])
	game = mappers.MapGameStatistics(game, gameStatisticsData, gamePlayersStatisticsData)

	return game, nil
}
