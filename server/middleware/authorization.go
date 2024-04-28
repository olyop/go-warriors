package middleware

import (
	"os"

	"github.com/gin-gonic/gin"
)

// Authorization is a middleware that checks for basic auth credentials
func Authorization() gin.HandlerFunc {
	return gin.BasicAuth(gin.Accounts{
		"nextjs": os.Getenv("NEXTJS_PASSWORD"),
	})
}
