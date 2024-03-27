package middleware

import "net/http"

const (
	headerKeyContentType       = "Content-Type"
	headerValueContentTypeJSON = "application/json;charset=utf8"
)

// ContentTypeJSON is a middleware that sets the Content-Type header to application/json;charset=utf8
func ContentTypeJSON(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set(headerKeyContentType, headerValueContentTypeJSON)
		next.ServeHTTP(w, r)
	})
}
