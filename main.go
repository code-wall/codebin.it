package main

import (
	"github.com/alechewitt/code-wall/api"
	"github.com/gorilla/mux"
	"mime"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", indexHandler)
	r.HandleFunc("/dist/{folder}/{filename}", fileServer)
	r.HandleFunc("/save-snippet", app.SaveSnippet)
	r.HandleFunc("/snippet/{id}", app.GetSnippet)
	http.ListenAndServe(":"+getPort(), r)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	http.ServeFile(w, r, "./views/index.html")
}

func fileServer(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	file := vars["filename"]
	folder := vars["folder"]
	fileType := filepath.Ext(file)
	w.Header().Set("Content-Type", mime.TypeByExtension(fileType))
	http.ServeFile(w, r, "./dist/"+folder+"/"+file)
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8888"
	}
	return port
}
