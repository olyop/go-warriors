package main

import (
	"gowarriors/apis/apiv1"
	"gowarriors/globals"
	"gowarriors/middleware"

	"github.com/gin-gonic/gin"
)

// BuildRoutes constructs the routes for the application
func BuildRoutes(router *gin.Engine, context *globals.Context) {
	router.GET("/heartbeat", apiv1.HeartbeatHandler)

	apiRouter := router.Group("/api/v1", middleware.Authorization())
	{

		teamsRouter := apiRouter.Group("/teams")
		{
			teamsRouter.GET("/", apiv1.TeamsHandler(context))
		}

		playersRouter := apiRouter.Group("/players")
		{
			playersRouter.GET("/:teamID", apiv1.PlayersHandler(context))
		}

		gamesRouter := apiRouter.Group("/games")
		{
			gamesRouter.GET("/", apiv1.GamesHandler(context))
			gamesRouter.GET("/:gameID", apiv1.GameHandler(context))
		}
	}
}
