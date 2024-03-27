package main

import (
	"flag"
	"log"
	"net/http"
	"os"

	"gowarriors/globals"
	"gowarriors/integrations/nba"
	"gowarriors/middleware"

	"github.com/joho/godotenv"
)

func main() {
	loadEnv()

	context := buildContext()
	router := buildRouter(context)
	server := buildServer(router)

	startServer(server)
}

func loadEnv() {
	mode := flag.String("mode", "development", "The mode to run the server in")

	log.Println("Running in", *mode, "mode")

	if *mode != "development" {
		return
	}

	log.Println("Loading .env file")

	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func buildContext() *globals.Context {
	context := &globals.Context{}

	apiKey, ok := os.LookupEnv("RAPIDAPI_API_KEY")

	if !ok {
		log.Fatal("RAPIDAPI_API_KEY not found in environment")
	}

	context.NBA = nba.New(apiKey)

	return context
}

func buildRouter(context *globals.Context) *http.ServeMux {
	router := http.NewServeMux()

	router.Handle("/api/", http.StripPrefix("/api", BuildAPIRouter(context)))

	return router
}

func buildServer(router *http.ServeMux) *http.Server {
	return &http.Server{
		Addr:    globals.Address,
		Handler: middleware.Heartbeat(middleware.ContentTypeJSON(router)),
	}
}

func startServer(server *http.Server) {
	log.Println("Starting server on", globals.Address)

	err := server.ListenAndServe()

	if err != nil && err != http.ErrServerClosed {
		log.Fatal("Error starting server:", err)
	}

	log.Println("Server shutdown successfully")
}
