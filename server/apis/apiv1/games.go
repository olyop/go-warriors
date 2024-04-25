package apiv1

import (
	"gowarriors/globals"
	"gowarriors/service"
	"gowarriors/utils"

	"github.com/gin-gonic/gin"
)

// GamesHandler handles the GET /games endpoint
func GamesHandler(context *globals.Context) func(c *gin.Context) {
	return func(c *gin.Context) {
		dateParam := c.Query("date")
		teamsParam := c.Query("teams")
		statusParam := c.Query("status")

		date, err := utils.ParseDate(dateParam)
		if err != nil {
			utils.HandleValidationError("date", dateParam, err.Error(), c)
			return
		}

		teamsFilter, err := utils.ParseTeamsFilter(teamsParam)
		if err != nil {
			utils.HandleValidationError("teams", teamsParam, err.Error(), c)
			return
		}

		statusFilter, err := utils.ParseStatusFilter(statusParam)
		if err != nil {
			utils.HandleValidationError("status", statusParam, err.Error(), c)
			return
		}

		games, err := service.RetreiveGames(*context.NBA, date, teamsFilter, statusFilter)
		if err != nil {
			utils.HandleError("Error retrieving games", err, c)
			return
		}

		utils.HandleResponse(games, c)
	}
}

// GameHandler handles the GET /games/:id endpoint
func GameHandler(context *globals.Context) func(c *gin.Context) {
	return func(c *gin.Context) {
		idParam := c.Param("id")

		id, err := utils.ParseID(idParam)
		if err != nil {
			utils.HandleValidationError("id", idParam, err.Error(), c)
			return
		}

		game, err := service.RetreiveGame(*context.NBA, id)
		if err != nil {
			utils.HandleError("Error retrieving game", err, c)
			return
		}

		utils.HandleResponse(game, c)
	}
}
