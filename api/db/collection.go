package db

import (
	"gopkg.in/mgo.v2/bson"
	"time"
)

type SnippetCollection struct {
	Id       string `bson:"_id"`
	Snippet  string
	Language string
	Created  time.Time
}

func NewSnippet(snippet string, language string, time time.Time) *SnippetCollection {
	id := bson.NewObjectId().Hex()
	s := SnippetCollection{id, snippet, language, time}
	return &s
}
