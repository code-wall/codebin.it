package app

import "time"

type SnippetModel struct {
	Id       string    `json:"id"`
	Snippet  string    `json:"snippet"`
	Langauge string    `json:"language"`
	Created  time.Time `json:"created"`
}
