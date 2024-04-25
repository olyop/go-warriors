package main

import (
	"gowarriors/globals"
	"gowarriors/integrations/nba"
	"log"
	"os"
)

// BuildContext constructs the application context
func BuildContext() *globals.Context {
	context := &globals.Context{}

	apiKey, ok := os.LookupEnv("RAPIDAPI_API_KEY")

	if !ok {
		log.Fatal("RAPIDAPI_API_KEY not found in environment")
	}

	context.NBA = nba.New(apiKey)

	return context
}
