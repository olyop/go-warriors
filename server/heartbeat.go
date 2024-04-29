package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// HeartbeatHandler is a handler function for the heartbeat route
func HeartbeatHandler(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}
