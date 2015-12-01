package api

import (
	"encoding/json"
	"github.com/alechewitt/code-wall/mongo"
	"github.com/gorilla/mux"
	"net/http"
)

type Response struct {
	Status  string        `json:"status"`
	Data    *SnippetModel `json:"response"`
	Message string        `json:"message"`
	code    int
}

var service = CreateService(new(mongo.MongoDatabase))

// GetSnippet - Handler gets a single code snippet from service by its id
func GetSnippet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	m, err := service.GetSnippetById(vars["id"])
	response := buildResponse(m, "Request Successful", err)
	writeJsonResponse(w, response)
}

// SaveSnippet - Handler saves a single code snippet to the database
func SaveSnippet(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		language := r.PostFormValue("language")
		snippet := r.PostFormValue("snippet")

		newSnippet := NewSnippet(language, snippet)
		m, err := service.CreateSnippet(newSnippet)
		response := buildResponse(m, "Snippet successfully added", err)
		writeJsonResponse(w, response)
	} else {
		http.Error(w, "Endpoint only accepts post", http.StatusBadRequest)
	}
}

func buildResponse(m *SnippetModel, successMessage string, err error) (response Response) {
	if err != nil {
		response.Status = "error"
		response.Message = "Request failed with error: " + err.Error()
		response.code = http.StatusNotFound
	} else {
		response.Status = "ok"
		response.Message = successMessage
		response.Data = m
		response.code = http.StatusOK
	}
	return
}

func writeJsonResponse(w http.ResponseWriter, response Response) {
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.code)
	w.Write(jsonResponse)
}
