package database

import "time"

type mongoResult struct {
	ID      string    `bson:"_id"`
	Snippet  string    `bson:"snippet"`
	Language string    `bson:"language"`
	Created  time.Time `bson:"created"`
}

// GetID - returns the string id
// conforms to database package Snippet interface
func (mr *mongoResult) GetID() string {
	return mr.ID
}

// GetSnippet - returns the string code snippet
// conforms to database package Snippet interface
func (mr *mongoResult) GetSnippet() string {
	return mr.Snippet
}

// GetLanguage - returns the string code language
// conforms to database package Snippet interface
func (mr *mongoResult) GetLanguage() string {
	return mr.Language
}

// GetDateCreated - returns the string timestamp when the snippet was created
// conforms to database package Snippet interface
func (mr *mongoResult) GetDateCreated() time.Time {
	return mr.Created
}
