package apiv1

import (
	"gowarriors/apis/apiv1/resource"
	"gowarriors/globals"
	"net/http"
)

// GoWarriorsAPIVersion1 wraps all API version 1 routes
func GoWarriorsAPIVersion1(context *globals.Context) *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("GET /games", resource.GetGames(context))

	return router
}
