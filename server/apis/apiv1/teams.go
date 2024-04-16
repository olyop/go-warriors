package apiv1

import (
	"encoding/json"
	"gowarriors/apis/apiv1/utils"
	"gowarriors/globals"
	log "log/slog"
	"net/http"

	"github.com/go-chi/chi/v5"
)

// BuildTeamsRouter is the router for the games API
func BuildTeamsRouter(context *globals.Context) func(chi.Router) {
	return func(router chi.Router) {
		router.Get("/", getTeams(context))
	}
}

func getTeams(context *globals.Context) func(response http.ResponseWriter, request *http.Request) {
	return func(response http.ResponseWriter, request *http.Request) {
		data, err := context.NBA.GetTeams(map[string]string{})

		if err != nil {
			response.WriteHeader(http.StatusInternalServerError)
			return
		}

		teams := utils.MapTeamsResponse(data.Response)

		json, err := json.Marshal(teams)

		if err != nil {
			log.Error("Error marshalling teams: ", err)
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
