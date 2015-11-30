package app

import (
	"github.com/alechewitt/code-wall/api/db"
	"time"
)

func CreateSnippet(snippet string, language string) (sm *SnippetModel, err error) {
	s := db.GetSession()
	defer s.Close()

	c := s.DB("").C("snippets")
	sc := db.NewSnippet(snippet, language, time.Now())

	err = c.Insert(sc)
	sm = tranformSnippet(sc)
	return
}

func GetSnippetById(id string) (sm *SnippetModel, err error) {
	s := db.GetSession()
	defer s.Close()
	c := s.DB("").C("snippets")
	result := db.SnippetCollection{}

	err = c.FindId(id).One(&result)
	sm = tranformSnippet(&result)
	return
}

func tranformSnippet(c *db.SnippetCollection) *SnippetModel {
	return &SnippetModel{c.Id, c.Snippet, c.Language, c.Created}
}
