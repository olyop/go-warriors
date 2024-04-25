package apiv1

import (
	"gowarriors/globals"
	"gowarriors/service"
	"gowarriors/utils"

	"github.com/gin-gonic/gin"
)

// GetTeams retrieves all NBA teams
func GetTeams(context *globals.Context) func(c *gin.Context) {
	return func(c *gin.Context) {
		teams, err := service.RetreiveTeams(*context.NBA)

		if err != nil {
			utils.HandleError("Error retrieving teams", err, c)
			return
		}

		utils.HandleResponse(teams, c)
	}
}
