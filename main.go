package main

import (
	"encoding/json"
	"fmt"
	"github.com/alechewitt/code-wall/app/db"
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
	r.HandleFunc("/save-snippet", saveSnippet)
	r.HandleFunc("/get-snippet", getSnippet)
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

func saveSnippet(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		language := r.PostFormValue("language") // This is the realm token.
		snippet := r.PostFormValue("snippet")
		err := db.AddSnippet(snippet, language)

		var response map[string]string
		if err != nil {
			response = map[string]string{
				"status": "error",
			}
		} else {
			response = map[string]string{
				"status": "ok",
			}
		}
		writeJsonResponse(w, response)
	} else {
		http.Error(w, "Endpoint only accepts post", http.StatusBadRequest)
	}
}

func getSnippet(w http.ResponseWriter, r *http.Request) {

}

func writeJsonResponse(w http.ResponseWriter, response interface{}) {
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonResponse)
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8888"
	}
	return port
}
