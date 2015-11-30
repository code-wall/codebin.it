package app

import (
	"github.com/alechewitt/code-wall/api/db"
	"time"
)

func CreateSnippet(snippet string, language string) (*SnippetModel, error) {
	s := db.GetSession()
	defer s.Close()

	c := s.DB("").C("snippets")
	sc := db.NewSnippet(snippet, language, time.Now())
	err := c.Insert(sc)
	if err != nil {
		return nil, err
	}
	model := tranformSnippet(sc)
	return model, err
}

func GetSnippetById(id string) (*SnippetModel, error) {
	s := db.GetSession()
	defer s.Close()
	c := s.DB("").C("snippets")
	result := db.SnippetCollection{}
	err := c.FindId(id).One(&result)
	if err != nil {
		return nil, err
	}
	model := tranformSnippet(&result)
	return model, nil
}

func tranformSnippet(c *db.SnippetCollection) *SnippetModel {
	return &SnippetModel{c.Id, c.Snippet, c.Language, c.Created}
}
