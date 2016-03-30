package main

import (
	"fmt"
	"github.com/code-wall/codebin/api"
	"github.com/gorilla/csrf"
	"github.com/gorilla/mux"
	"net/http"
	"text/template"
)

var conf = GetConfig()
var temps *template.Template

func main() {
	r := mux.NewRouter()

	// Set template and the delimeters
	t := template.New("index")
	t.Delims("<<<", ">>>")
	temps = template.Must(t.ParseFiles("./views/index.html"))

	CSRF := csrf.Protect(
		[]byte(conf.CSRFKey),
		csrf.RequestHeader("Request-Token"),
		csrf.FieldName("request_token"),
		csrf.Secure(!conf.Debug),
	)

	r.HandleFunc("/", indexHandler)
	r.PathPrefix("/dist/").Handler(createStaticHandler("/dist/", "./dist/"))
	r.HandleFunc("/save", api.SaveSnippet)
	r.HandleFunc("/snippet/{id}", api.GetSnippet)
	http.ListenAndServe(":"+conf.Port, CSRF(r))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	snippetId := r.URL.Query().Get("s")
	fmt.Println("Host 1: ", r.Host)
	data := map[string]interface{}{
		"token":           csrf.Token(r),
		"twitterImageURL": getTwitterImage(r.Host, snippetId),
	}

	w.Header().Set("X-Frame-Options", "SAMEORIGIN")
	w.Header().Set("X-Xss-Protection", "1; mode=block")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	// Temp disable until serving site over https
	//	w.Header().Set("Content-Security-Policy", "script-src 'self' cdnjs.cloudflare.com")

	temps.ExecuteTemplate(w, "index.html", data)
}

func createStaticHandler(path string, location string) http.Handler {
	serve := http.FileServer(http.Dir(location))
	return http.StripPrefix(path, serve)
}

func getTwitterImage(host string, snippetId string) string {
	var twitterImageURL string
	if snippetId != "" {
		if host == "codebin.it" {
			twitterImageURL = "http://api.codebin.it/image?id=" + snippetId
		} else if host == "test.codebin.it" {
			twitterImageURL = "http://test.api.codebin.it/image?id=" + snippetId
		} else {
			twitterImageURL = "http://localhost:8080/image?id=" + snippetId
		}
	} else {
		twitterImageURL = "http://codebin.it/dist/images/light-logo.png"
	}
	return twitterImageURL
}
