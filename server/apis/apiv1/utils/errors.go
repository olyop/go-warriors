package utils

import (
	log "log/slog"
	"net/http"
)

// SendBadInput logs a message and sets the response status code to 400.
func SendBadInput(message string, err error, response http.ResponseWriter) {
	log.Info("Bad input request: ", message, ":", err)
	response.WriteHeader(http.StatusBadRequest)
}

// SendServerError logs an error message and sets the response status code to 500.
func SendServerError(message string, err error, response http.ResponseWriter) {
	log.Error("Server error: ", message, ":", err)
	response.WriteHeader(http.StatusInternalServerError)
}
