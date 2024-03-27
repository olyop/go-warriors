package main

import (
	apiv1 "gowarriors/apis/apiv1"
	"gowarriors/globals"
	"net/http"
)

// BuildAPIRouter creates a new router for all API versions
func BuildAPIRouter(context *globals.Context) *http.ServeMux {
	router := http.NewServeMux()

	router.Handle("/v1/", http.StripPrefix("/v1", apiv1.GoWarriorsAPIVersion1(context)))

	return router
}
