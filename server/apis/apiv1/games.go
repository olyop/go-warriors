package apiv1

import (
	"encoding/json"
	"fmt"
	"gowarriors/apis/apiv1/utils"
	"gowarriors/globals"
	"gowarriors/integrations/nba"
	"gowarriors/schema"
	"net/http"
	"sync"
	"time"

	"github.com/go-chi/chi/v5"
)

// BuildGamesRouter is the router for the games API
func BuildGamesRouter(context *globals.Context) func(chi.Router) {
	return func(router chi.Router) {
		router.Get("/", getGames(context))
		// router.Get("/{id}", getGame(context))
	}
}

const maxDays = 7

func getGames(context *globals.Context) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		queryParams := request.URL.Query()

		startTime, err := utils.ParseUnixTime(queryParams.Get("startTime"))
		if err != nil {
			utils.SendBadInput("Invalid query parameter 'startTime'", err, response)
			return
		}

		endTime, err := utils.ParseUnixTime(queryParams.Get("endTime"))
		if err != nil {
			utils.SendBadInput("Invalid query parameter 'endTime'", err, response)
			return
		}

		statusFilter, err := utils.ParseStatusFilter(queryParams.Get("status"))
		if err != nil {
			utils.SendBadInput("Invalid query parameter 'status'", err, response)
			return
		}

		teamsFilter, err := utils.ParseTeamsFilter(queryParams.Get("teams"))
		if err != nil {
			utils.SendBadInput("Invalid query parameter 'teams'", err, response)
			return
		}

		if startTime.After(endTime) {
			utils.SendBadInput("Invalid query parameters 'startTime' must be before 'endTime'", nil, response)
			return
		}

		days := utils.DaysBetweenDates(startTime, endTime) + 1

		if days > maxDays {
			utils.SendBadInput(fmt.Sprintf("Invalid query parameters 'startTime' and 'endTime' must be within %d days", maxDays), nil, response)
			return
		}

		if len(teamsFilter) > 30 {
			utils.SendBadInput("Invalid query parameter 'teams' must contain no more than 30 items", nil, response)
			return
		}

		wg := sync.WaitGroup{}
		ch := make(chan result, days)

		season := DetermineSeason()

		for i := 0; i < days; i++ {
			wg.Add(1)

			go func() {
				defer wg.Done()

				date := utils.FormatTimeToDate(time.Unix(startTime.Unix(), 0).UTC().AddDate(0, 0, i))

				params := map[string]string{
					"date":   date,
					"season": season,
					"league": NBALeague,
				}

				data, err := context.NBA.GetGames(params)

				ch <- result{res: data.Response, err: err}
			}()
		}

		wg.Wait()
		close(ch)

		nbaGames := make([]nba.Game, 0)

		for result := range ch {
			if result.err != nil {
				utils.SendServerError("Error getting games", result.err, response)
				return
			}

			nbaGames = append(nbaGames, result.res...)
		}

		games := utils.MapGamesResponse(nbaGames)
		gamesFiltered := make([]schema.GoWarriorsAPIGame, 0)

		for _, game := range games {
			if game.StartTime <= startTime.Unix() || game.StartTime >= endTime.Unix() {
				continue
			}

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

		data := schema.GoWarriorsAPIResponse[[]schema.GoWarriorsAPIGame]{
			Data: games,
		}

		jsonString, err := json.Marshal(data)

		if err != nil {
			utils.SendServerError("Error marshalling response", err, response)
			return
		}

		_, err = response.Write(jsonString)

		if err != nil {
			utils.SendServerError("Error writing response", err, response)
			return
		}
	}
}

type result struct {
	res []nba.Game
	err error
}

// func getGame(context *globals.Context) http.HandlerFunc {
// 	return func(response http.ResponseWriter, request *http.Request) {
// 		id, err := utils.ParseID(request)

// 		if err != nil {
// 			response.WriteHeader(http.StatusBadRequest)
// 			return
// 		}

// 		params := map[string]string{
// 			"id": fmt.Sprintf("%d", id),
// 		}

// 		data, err := context.NBA.GetGames(params)

// 		if err != nil {
// 			log.Error("Error getting game: ", err)
// 			response.WriteHeader(http.StatusInternalServerError)
// 			return
// 		}

// 		r := utils.MapGamesResponse(&data)

// 		jsonString, err := json.Marshal(r)

// 		if err != nil {
// 			log.Error("Error marshalling response: ", err)
// 			response.WriteHeader(http.StatusInternalServerError)
// 			return
// 		}

// 		_, err = response.Write(jsonString)

// 		if err != nil {
// 			log.Error("Error writing response: ", err)
// 			response.WriteHeader(http.StatusInternalServerError)
// 			return
// 		}
// 	}
// }
