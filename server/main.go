package main

import _ "github.com/joho/godotenv/autoload"

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"gowarriors/globals"
	"gowarriors/integrations/nba"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func main() {
	mode := os.Getenv("MODE")

	context := buildContext()
	router := buildRouter(context)
	server := buildServer(mode, router)

	startServer(mode, server)
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

func buildRouter(context *globals.Context) *chi.Mux {
	router := chi.NewRouter()

	router.Use(middleware.Recoverer)
	router.Use(middleware.Logger)
	router.Use(middleware.RealIP)
	router.Use(middleware.RequestID)
	router.Use(middleware.CleanPath)
	router.Use(middleware.RedirectSlashes)
	router.Use(middleware.NoCache)
	router.Use(middleware.Timeout(time.Second * 60))
	router.Use(middleware.Heartbeat("/health"))
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{"https://localhost:3000", "https://192.168.1.79:3000"},
		AllowedMethods: []string{"GET"},
	}))

	router.Route("/api", BuildAPIRouter(context))

	return router
}

func buildServer(mode string, router *chi.Mux) *http.Server {
	return &http.Server{
		Addr:    fmt.Sprintf(":%d", globals.GetPort(mode)),
		Handler: router,
	}
}

func startServer(mode string, server *http.Server) {
	log.Println("Starting server on port", globals.GetPort(mode))

	// Server run context
	serverCtx, serverStopCtx := context.WithCancel(context.Background())

	// Listen for syscall signals for process to interrupt/quit
	sig := make(chan os.Signal, 1)

	signal.Notify(sig, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)

	go func() {
		<-sig

		// Shutdown signal with grace period of 30 seconds
		shutdownCtx, _ := context.WithTimeout(serverCtx, 30*time.Second)

		go func() {
			<-shutdownCtx.Done()
			if shutdownCtx.Err() == context.DeadlineExceeded {
				log.Fatal("graceful shutdown timed out.. forcing exit.")
			}
		}()

		// Trigger graceful shutdown
		err := server.Shutdown(shutdownCtx)
		if err != nil {
			log.Fatal(err)
		}

		serverStopCtx()
	}()

	err := server.ListenAndServeTLS("/home/op/.mkcert/localhost.pem", "/home/op/.mkcert/localhost-key.pem")

	if err != nil && err != http.ErrServerClosed {
		log.Fatal("Error starting server:", err)
	}

	// Wait for server context to be stopped
	<-serverCtx.Done()

	log.Println("Server shutdown successfully")
}
