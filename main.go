package main

import (
	"github.com/code-wall/codebin/api"
	"github.com/gorilla/csrf"
	"github.com/gorilla/mux"
	"net/http"
	"text/template"
	"encoding/json"
)

var conf = GetConfig()
var mainTemplate *template.Template
var embedTemplate *template.Template

func main() {
	r := mux.NewRouter()

	// Set template and the delimeters
	t := template.New("index")
	t.Delims("<<<", ">>>")
	mainTemplate = template.Must(t.ParseFiles("./views/index.html"))
	embedTemplate = template.Must(t.ParseFiles("./views/embed.html"))

	CSRF := csrf.Protect(
		[]byte(conf.CSRFKey),
		csrf.RequestHeader("Request-Token"),
		csrf.FieldName("request_token"),
		csrf.Secure(!conf.Debug),
	)

	r.HandleFunc("/embed/{id}", embedHandler)
	r.HandleFunc("/", indexHandler)
	r.PathPrefix("/dist/").Handler(createStaticHandler("/dist/", "./dist/"))
	r.HandleFunc("/save", api.SaveSnippet)
	r.HandleFunc("/snippet/{id}", api.GetSnippet)
	http.ListenAndServe(":"+conf.Port, CSRF(r))
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	data := map[string]interface{}{
		"token": csrf.Token(r),
	}
	w.Header().Set("X-Frame-Options", "SAMEORIGIN")
	w.Header().Set("X-Xss-Protection", "1; mode=block")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	// Temp disable until serving site over https
	//	w.Header().Set("Content-Security-Policy", "script-src 'self' cdnjs.cloudflare.com")

	mainTemplate.ExecuteTemplate(w, "index.html", data)
}

func embedHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	snippet, err := api.GetService().GetSnippetByID(id)
	if err != nil {
		http.Error(w, "Unable to find snippet", http.StatusBadRequest)
	} else {
		// Available Query Variables:
		//     theme - { light | dark }
		//     readonly - { true | false }
		themeName := "solarized dark"
		bgColor := "#002B36"
		if r.URL.Query().Get("theme") == "light" {
			themeName = "default"
			bgColor = "#ffffff"
		}
		readonly := "true"
		if r.URL.Query().Get("readonly") == "false" {
			readonly = "false"
		}
		code, _ := json.Marshal(snippet.Snippet)
		data := map[string]interface{}{
			"code": string(code),
			"language": snippet.Language,
			"themeName": themeName,
			"bgColor": bgColor,
			"readonly": readonly,
			"snippetId": id,
		}
		embedTemplate.ExecuteTemplate(w, "embed.html", data)	
	}
	

}

func createStaticHandler(path string, location string) http.Handler {
	serve := http.FileServer(http.Dir(location))
	return http.StripPrefix(path, serve)
}
