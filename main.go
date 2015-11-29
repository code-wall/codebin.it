package main

import (
	"code-wall/app/db"
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
	http.ListenAndServe(":"+getPort(), r)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	db.AddSomething()
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
