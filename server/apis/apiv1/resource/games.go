package resource

import (
	"encoding/json"
	"gowarriors/globals"
	"gowarriors/utils"
	log "log/slog"
	"net/http"
)

// GetGames is the HTTP handler that retrieves a games for a given date
func GetGames(context *globals.Context) http.HandlerFunc {
	return func(response http.ResponseWriter, request *http.Request) {
		date, ok := utils.ParseDate(request.URL.Query().Get("date"))

		if !ok {
			response.WriteHeader(http.StatusBadRequest)

			return
		}

		params := map[string]string{
			"date": date,
		}

		data, err := context.NBA.GetGames(params)

		if err != nil {
			log.Error("Error getting games: ", err)

			response.WriteHeader(http.StatusInternalServerError)

			return
		}

		json, err := json.Marshal(data)

		if err != nil {
			log.Error("Error marshalling data: ", err)

			response.WriteHeader(http.StatusInternalServerError)

			return
		}

		_, err = response.Write(json)

		if err != nil {
			log.Error("Error writing response: ", err)

			response.WriteHeader(http.StatusInternalServerError)

			return
		}
	}
}
