package mongo

import "time"

type SnippetResult struct {
	Id       string    `bson:"_id"`
	Snippet  string    `bson:"snippet"`
	Language string    `bson:"language"`
	Created  time.Time `bson:"created"`
}

func (sr *SnippetResult) GetId() string {
	return sr.Id
}

func (sr *SnippetResult) GetSnippet() string {
	return sr.Snippet
}

func (sr *SnippetResult) GetLanguage() string {
	return sr.Language
}

func (sr *SnippetResult) GetDateCreated() time.Time {
	return sr.Created
}
