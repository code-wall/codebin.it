package main

import (
	"github.com/alechewitt/code-wall/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/alechewitt/code-wall/api"
	"net/http"
	"os"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", indexHandler)
	r.PathPrefix("/dist/").Handler(createStaticHandler("/dist/", "./dist/"))
	r.HandleFunc("/save-snippet", api.SaveSnippet)
	r.HandleFunc("/snippet/{id}", api.GetSnippet)
	http.ListenAndServe(":"+getPort(), r)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	http.ServeFile(w, r, "./views/index.html")
}

func createStaticHandler(path string, location string) http.Handler {
	serve := http.FileServer(http.Dir(location))
	return http.StripPrefix(path, serve)
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8888"
	}
	return port
}
