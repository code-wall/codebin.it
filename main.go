package main

import (
  "github.com/gorilla/mux"
  "net/http"
  "mime"
  "path/filepath"
  "strings"
)

func main() {
  r := mux.NewRouter()
  r.HandleFunc("/", indexHandler)
  r.HandleFunc("/dist/{filename}", fileServer)
  http.ListenAndServe(":8888", r)
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
  w.Header().Set("Content-Type", "text/html")
  http.ServeFile(w, r, "./views/index.html")
}

func fileServer(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    file := vars["filename"]
    fileType := filepath.Ext(file)
    w.Header().Set("Content-Type", mime.TypeByExtension(fileType))
    fileDir := strings.Replace(fileType, ".", "", -1)
    http.ServeFile(w, r, "./dist/" + fileDir + "/" +file)
}
