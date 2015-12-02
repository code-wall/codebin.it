package database

import "time"

type mongoResult struct {
	Id       string    `bson:"_id"`
	Snippet  string    `bson:"snippet"`
	Language string    `bson:"language"`
	Created  time.Time `bson:"created"`
}

func (sr *mongoResult) GetId() string {
	return sr.Id
}

func (sr *mongoResult) GetSnippet() string {
	return sr.Snippet
}

func (sr *mongoResult) GetLanguage() string {
	return sr.Language
}

func (sr *mongoResult) GetDateCreated() time.Time {
	return sr.Created
}
