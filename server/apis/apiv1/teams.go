package apiv1

import (
	"gowarriors/globals"
	"gowarriors/service"
	"gowarriors/utils"

	"github.com/gin-gonic/gin"
)

// TeamsHandler retrieves all NBA teams
func TeamsHandler(context *globals.Context) gin.HandlerFunc {
	return func(c *gin.Context) {
		teams, err := service.RetreiveTeams(*context.NBA)
		if err != nil {
			utils.HandleError(c, err, "Error retrieving teams")
			return
		}

		utils.HandleResponse(c, teams)
	}
}
