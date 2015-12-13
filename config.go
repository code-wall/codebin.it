package main

import "os"

const (
	debugMode      = "DEBUG"
	defaultPort    = "8888"
	defaultCSRFKey = "debug_key"
)

// Config - CodeBin config data
type Config struct {
	Env     string
	Port    string
	Debug   bool
	CSRFKey string
}

// GetConfig -
func GetConfig() *Config {
	env := getEnvVar("ENV", debugMode)
	port := getEnvVar("PORT", defaultPort)
	csrfKey := getEnvVar("CSRF_KEY", defaultCSRFKey)

	return &Config{
		Env:     env,
		Port:    port,
		Debug:   env == debugMode,
		CSRFKey: csrfKey,
	}
}

func getEnvVar(v string, def string) string {
	env := os.Getenv(v)
	if env == "" {
		env = def
	}
	return env
}
