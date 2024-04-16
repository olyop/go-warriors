package main

import (
	"gowarriors/apis/apiv1"
	"gowarriors/globals"

	customMiddleware "gowarriors/middleware"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

// BuildAPIRouter creates a new router for all API versions
func BuildAPIRouter(context *globals.Context) func(chi.Router) {
	return func(router chi.Router) {
		router.Use(middleware.AllowContentEncoding("gzip", "deflate"))
		router.Use(middleware.ContentCharset("utf-8", ""))
		router.Use(middleware.Compress(5, "application/json"))
		router.Use(middleware.AllowContentType("application/json"))
		router.Use(middleware.SetHeader("Content-Type", "application/json"))
		router.Use(customMiddleware.AcceptHeader)

		router.Route("/v1", apiv1.GoWarriorsAPIVersion1(context))
	}
}
