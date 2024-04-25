package utils

import (
	log "log/slog"
	"net/http"

	"github.com/gin-gonic/gin"
)

// HandleResponse handles responses
func HandleResponse(data interface{}, c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"data": data,
	})
}

// HandleValidationError handles query params errors
func HandleValidationError(key string, value string, message string, c *gin.Context) {
	errorMessage := "Error validating input '" + key + "' with value '" + value + "': " + message

	log.Info(errorMessage)

	baseHandle(c, http.StatusBadRequest, errorMessage)
}

// HandleError handles errors
func HandleError(message string, err error, c *gin.Context) {
	log.Error(message, err)

	baseHandle(c, http.StatusInternalServerError, message)
}

const applicationJSON = "application/json"
const applicationProblemJSON = "application/problem+json"

func baseHandle(c *gin.Context, code int, message string) {
	c.Header("Content-Type", applicationProblemJSON)

	c.JSON(code, gin.H{
		"error": message,
	})
}
