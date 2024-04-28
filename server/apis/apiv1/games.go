package apiv1

import (
	"gowarriors/globals"
	"gowarriors/service"
	"gowarriors/utils"

	"github.com/gin-gonic/gin"
)

// GamesHandler handles the GET /games endpoint
func GamesHandler(context *globals.Context) gin.HandlerFunc {
	return func(c *gin.Context) {
		dateParam := c.Query("date")
		teamsParam := c.Query("teams")
		statusParam := c.Query("status")

		date, err := utils.ParseDate(dateParam)
		if err != nil {
			utils.HandleValidationError(c, "date", dateParam, err.Error())
			return
		}

		teamsFilter, err := utils.ParseTeamsFilter(teamsParam)
		if err != nil {
			utils.HandleValidationError(c, "teams", teamsParam, err.Error())
			return
		}

		statusFilter, err := utils.ParseStatusFilter(statusParam)
		if err != nil {
			utils.HandleValidationError(c, "status", statusParam, err.Error())
			return
		}

		options := service.RetreiveGamesOptions{
			Date:   date,
			Teams:  teamsFilter,
			Status: statusFilter,
		}

		games, err := service.RetreiveGames(*context.NBA, options)
		if err != nil {
			utils.HandleError(c, err, "Error retrieving games")
			return
		}

		utils.HandleResponse(c, games)
	}
}
