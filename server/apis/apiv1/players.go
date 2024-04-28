package apiv1

import (
	"gowarriors/globals"
	"gowarriors/service"
	"gowarriors/utils"

	"github.com/gin-gonic/gin"
)

// PlayersHandler handles the GET /players endpoint
func PlayersHandler(context *globals.Context) gin.HandlerFunc {
	return func(c *gin.Context) {
		teamParam := c.Param("teamID")

		team, err := utils.ParseID(teamParam)
		if err != nil {
			utils.HandleValidationError(c, "team", teamParam, err.Error())
			return
		}

		players, err := service.RetreivePlayers(*context.NBA, team)
		if err != nil {
			utils.HandleError(c, err, "Error retrieving players")
			return
		}

		utils.HandleResponse(c, players)
	}
}
