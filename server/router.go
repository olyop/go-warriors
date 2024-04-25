package main

import (
	"gowarriors/apis/apiv1"
	"gowarriors/globals"

	"github.com/gin-gonic/gin"
)

// BuildRoutes constructs the routes for the application
func BuildRoutes(router *gin.Engine, context *globals.Context) {
	api := router.Group("/api/v1")
	{
		games := api.Group("/games")
		{
			games.GET("/", apiv1.GamesHandler(context))
			games.GET("/:id", apiv1.GameHandler(context))
		}

		teams := api.Group("/teams")
		{
			teams.GET("/", apiv1.GetTeams(context))
		}
	}
}
