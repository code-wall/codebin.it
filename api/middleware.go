package api

import (
	"time"
	"strconv"
	"log"
	"net/http"
	"github.com/codegangsta/negroni"
)


func Logger(rw http.ResponseWriter, r *http.Request, next http.HandlerFunc) {
	start := time.Now()
	next(rw, r)
	res := rw.(negroni.ResponseWriter)
	timeTaken := time.Since(start)
	timeInMicroSeconds := strconv.FormatInt(timeTaken.Nanoseconds() / 1000, 10) + "μs"
	log.Println("Codebin Log:", r.Method, r.URL, res.Status(), timeInMicroSeconds)
}