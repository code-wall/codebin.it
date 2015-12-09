package main

import (
	// "fmt"
	"github.com/code-wall/codebin/Godeps/_workspace/src/github.com/gorilla/csrf"
	"github.com/code-wall/codebin/Godeps/_workspace/src/github.com/gorilla/mux"
	"github.com/code-wall/codebin/api"
	"html/template"
	"net/http"
	"os"
)

func main() {
	r := mux.NewRouter()

	// Todo: move to suitable place
	CSRF := csrf.Protect(
		[]byte("a-32-byte-key-replace-me"),
		csrf.RequestHeader("Request-Token"),
		csrf.FieldName("request_token"),
		csrf.Secure(false), // This should be true in production over https
	)

	r.HandleFunc("/", indexHandler)
	r.PathPrefix("/dist/").Handler(createStaticHandler("/dist/", "./dist/"))
	r.HandleFunc("/save-snippet", api.SaveSnippet)
	r.HandleFunc("/snippet/{id}", api.GetSnippet)
	http.ListenAndServe(":"+getPort(), CSRF(r))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	t := template.New("index") // todo: move to templating
	var temps = template.Must(t.ParseFiles("./views/index.html"))
	data := map[string]interface{}{
		"token": csrf.Token(r),
	}
	temps.ExecuteTemplate(w, "index.html", data)
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
