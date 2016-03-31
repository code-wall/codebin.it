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

const productionAnalytics = "UA-75805487-1"
const stagingAnalytics = "UA-75805487-2"

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
		"token":            csrf.Token(r),
		"twitterImageURL":  getPreviewImageURL(r.Host, snippetId, "twitter"),
		"facebookImageURL": getPreviewImageURL(r.Host, snippetId, "facebook"),
		"gaTag":            getAnalyticsTag(r.Host),
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

func getPreviewImageURL(host string, snippetId string, vendor string) string {
	var previewImageURL string
	var extension string
	if vendor == "twitter" {
		extension = "twitterFriendly=true"
	} else if vendor == "facebook" {
		extension = "facebookFriendly=true"
	}
	if snippetId != "" {
		if host == "codebin.it" {
			previewImageURL = "http://api.codebin.it/image?id=" + snippetId + "&" + extension
		} else if host == "test.codebin.it" {
			previewImageURL = "http://test.api.codebin.it/image?id=" + snippetId + "&" + extension
		} else {
			previewImageURL = "http://localhost:8080/image?id=" + snippetId + "&" + extension
		}
	} else {
		previewImageURL = "http://codebin.it/dist/images/light-logo.png"
	}
	return previewImageURL
}

func getAnalyticsTag(host string) string {
	if host == "codebin.it" {
		return productionAnalytics
	} else if host == "test.codebin.it" {
		return stagingAnalytics
	} else {
		return ""
	}
}
