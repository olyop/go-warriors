package apiv1

import (
	"gowarriors/globals"

	"github.com/go-chi/chi/v5"
)

// GoWarriorsAPIVersion1 wraps all API version 1 routes
func GoWarriorsAPIVersion1(context *globals.Context) func(chi.Router) {
	return func(router chi.Router) {
		router.Route("/games", BuildGamesRouter(context))
		router.Route("/teams", BuildTeamsRouter(context))
	}
}
