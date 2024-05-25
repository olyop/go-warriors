package main

import (
	"os"

	"github.com/akrylysov/algnhsa"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	gin.SetMode(gin.ReleaseMode)

	g := gin.New()
	g.Use(gin.Logger())
	g.Use(gin.Recovery())

	context := BuildContext()
	BuildRoutes(g, context)

	if os.Getenv("AWS_LAMBDA_FUNCTION_NAME") != "" {
		algnhsa.ListenAndServe(g, nil)
	} else {
		g.Run()
	}
}
