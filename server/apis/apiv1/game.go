package apiv1

import (
	"gowarriors/globals"
	"gowarriors/schema"
	"gowarriors/service"
	"gowarriors/utils"

	"github.com/gin-gonic/gin"
)

// GameHandler handles the GET /games/:id endpoint
func GameHandler(context *globals.Context) gin.HandlerFunc {
	return func(c *gin.Context) {
		idParam := c.Param("gameID")

		id, err := utils.ParseID(idParam)
		if err != nil {
			utils.HandleValidationError(c, "id", idParam, err.Error())
			return
		}

		game, err := service.RetreiveGame(*context.NBA, id)
		if err != nil {
			utils.HandleError(c, err, "Error retrieving game")
			return
		}

		utils.HandleResponse(c, []schema.GoWarriorsAPIGame{game})
	}
}

const port = 3000
