package utils

import (
	"log"
	"os"
)

// LoadEnvironmentVariable loads an environment variable from the system
func LoadEnvironmentVariable(key string) string {
	apiKey, ok := os.LookupEnv(key)

	if !ok {
		log.Fatalf("%v not found in environment", key)
	}

	return apiKey
}
