package main

import (
	"github.com/gorilla/mux"
	"mime"
	"net/http"
	"path/filepath"
	"fmt"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", indexHandler)
	r.HandleFunc("/dist/{folder}/{filename}", fileServer)
	http.ListenAndServe(":8888", r)
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
