package middleware

import (
	"net/http"
	"strings"
)

// Heartbeat is a middleware that responds to GET and HEAD requests to the /health endpoint with a 200 OK status code and a single period.
// Intended for use with AWS ELB health checks.
func Heartbeat(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
		if (request.Method == "GET" || request.Method == "HEAD") && strings.EqualFold(request.URL.Path, "/health") {
			response.Header().Set("Content-Type", "text/plain")
			response.WriteHeader(http.StatusOK)
			response.Write([]byte("."))
			return
		}

		handler.ServeHTTP(response, request)
	})
}
