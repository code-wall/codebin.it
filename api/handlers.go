package app

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

type Response struct {
	Status  string        `json:"status"`
	Data    *SnippetModel `json:"response"`
	Message string        `json:"message"`
	code    int
}

// GetSnippet - Handler gets a single code snippet from service by its id
func GetSnippet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	m, err := GetSnippetById(vars["id"])
	response := buildResponse(m, "Request Successful", err)
	writeJsonResponse(w, response)
}

// SaveSnippet - Handler saves a single code snippet to the database
func SaveSnippet(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		language := r.PostFormValue("language")
		snippet := r.PostFormValue("snippet")
		m, err := CreateSnippet(snippet, language)
		response := buildResponse(m, "Snippet successfully added", err)
		writeJsonResponse(w, response)
	} else {
		http.Error(w, "Endpoint only accepts post", http.StatusBadRequest)
	}
}

func buildResponse(m *SnippetModel, successMessage string, err error) *Response {
	var response = Response{}
	if err != nil {
		response.Status = "error"
		response.Message = "Request failed with error: " + err.Error()
		response.Data = m
		response.code = http.StatusNotFound
	} else {
		response.Status = "ok"
		response.Message = successMessage
		response.Data = m
		response.code = http.StatusOK
	}
	return &response
}

func writeJsonResponse(w http.ResponseWriter, response *Response) {
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.code)
	w.Write(jsonResponse)
}
