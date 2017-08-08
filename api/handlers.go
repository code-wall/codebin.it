package api

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

// Response - data object returned on client request
type Response struct {
	Status  string        `json:"status"`
	Data    *SnippetModel `json:"response"`
	Message string        `json:"message"`
	code    int
}

const (
	statusError = "error"
	statusOK    = "ok"

	languageKey = "language"
	snippetKey  = "snippet"
)

// GetSnippet - HTTP Handler gets a single code snippet from service by its id
func GetSnippet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	m, err := GetService().GetSnippetByID(id)
	var response Response
	if err != nil {
		response = buildErrorResponse(err)
	} else {
		response = buildSuccessResponse(m, "Request Successful")
	}
	w.Header().Set("Cache-Control", "max-age=31536000")
	writeJSONResponse(w, response)
}

// SaveSnippet - HTTP Handler saves a single code snippet to the database
func SaveSnippet(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		language := r.PostFormValue(languageKey)
		snippet := r.PostFormValue(snippetKey)

		if language == "" || snippet == "" {
			http.Error(w, "Missing data, language and snippet fields are required", http.StatusBadRequest)
		} else {
			var response Response
			var err error
			var newSnippet *SnippetModel
			newSnippet, err = NewSnippet(snippet, language)
			if err != nil {
				response = buildErrorResponse(err)
			} else {
				var m *SnippetModel
				m, err = GetService().CreateSnippet(newSnippet)
				if err != nil {
					response = buildErrorResponse(err)	
				} else {
					response = buildSuccessResponse(m, "Snippet successfully added")
				}
			}
			writeJSONResponse(w, response)
		}

	} else {
		http.Error(w, "Endpoint only accepts post", http.StatusBadRequest)
	}
}

func buildErrorResponse(err error) (response Response) {
	response.Status = statusError
	response.Message = "Request failed with error: " + err.Error()
	response.code = http.StatusNotFound
	return 
}

func buildSuccessResponse(m *SnippetModel, successMessage string) (response Response) {
	response.Status = statusOK
	response.Message = successMessage
	response.Data = m
	response.code = http.StatusOK	

	return 
}

func writeJSONResponse(w http.ResponseWriter, response Response) {
	jsonResponse, err := json.Marshal(response)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(response.code)
	w.Write(jsonResponse)
}
