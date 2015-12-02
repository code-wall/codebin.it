package main

import (
	"github.com/alechewitt/code-wall/api"
	"github.com/gorilla/mux"
	"net/http"
	"os"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", indexHandler)
	r.PathPrefix("/dist/").Handler(staticHandler("/dist/", "./dist/"))
	r.PathPrefix("/node_modules/").Handler(staticHandler("/node_modules/", "./node_modules/"))
	r.HandleFunc("/save-snippet", api.SaveSnippet)
	r.HandleFunc("/snippet/{id}", api.GetSnippet)
	http.ListenAndServe(":"+getPort(), r)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	http.ServeFile(w, r, "./views/index.html")
}

func staticHandler(path string, location string) http.Handler {
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
