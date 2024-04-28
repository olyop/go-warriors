package utils

import (
	log "log/slog"
	"net/http"

	"github.com/gin-gonic/gin"
)

// HandleResponse handles responses
func HandleResponse(c *gin.Context, data interface{}) {
	baseResponse(c, http.StatusOK, data, nil)
}

// HandleValidationError handles validation errors
func HandleValidationError(c *gin.Context, key string, value string, message string) {
	errorMessage := "Error validating input '" + key + "' with value '" + value + "': " + message

	log.Info(errorMessage)

	handleBaseError(c, http.StatusBadRequest, errorMessage)
}

// HandleError handles errors
func HandleError(c *gin.Context, err error, message string) {
	log.Error(message, err)

	handleBaseError(c, http.StatusInternalServerError, message)
}

const contentType = "Content-Type"
const applicationProblemJSON = "application/problem+json"

func handleBaseError(c *gin.Context, code int, message string) {
	c.Header(contentType, applicationProblemJSON)

	baseResponse(c, code, nil, message)
}

func baseResponse(c *gin.Context, code int, data interface{}, message any) {
	c.JSON(code, gin.H{
		"data":  data,
		"error": message,
	})
}
