package middleware

import "net/http"

// AcceptHeader is middleware that enforce the Accept header to be application/json
func AcceptHeader(next http.Handler) http.Handler {
	return http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
		acceptHeader := request.Header.Get("Accept")

		if acceptHeader != "application/json" {
			response.WriteHeader(http.StatusUnsupportedMediaType)
			return
		}

		next.ServeHTTP(response, request)
	})
}
