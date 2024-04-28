package main

import (
	"context"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var ginEngine *gin.Engine
var ginLambda *ginadapter.GinLambda

func init() {
	godotenv.Load()
	gin.SetMode(gin.ReleaseMode)

	server := createServer()

	if os.Getenv("AWS_LAMBDA_FUNCTION_NAME") != "" {
		ginLambda = ginadapter.New(server)
	} else {
		ginEngine = server
	}
}

// Handler is the entry point for Lambda requests
func Handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func main() {
	if os.Getenv("AWS_LAMBDA_FUNCTION_NAME") != "" {
		lambda.Start(Handler)
	} else {
		startHTTPServer(ginEngine)
	}
}

func createServer() *gin.Engine {
	context := BuildContext()

	g := gin.New()
	g.Use(gin.Logger())
	g.Use(gin.Recovery())

	BuildRoutes(g, context)

	return g
}

func startHTTPServer(g *gin.Engine) {
	err := g.Run(":8080")
	if err != nil {
		panic(err)
	}
}
