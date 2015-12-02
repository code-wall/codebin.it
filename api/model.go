package api

import "time"

// SnippetModel - Model to describe a snippet
// conforming to the database.Snippet interface
type SnippetModel struct {
	ID       string    `json:"id"`
	Snippet  string    `json:"snippet"`
	Language string    `json:"language"`
	Created  time.Time `json:"created"`
}

// NewSnippet - helper to create a new SnippetModel
func NewSnippet(snippet string, language string) *SnippetModel {
	return &SnippetModel{Snippet: snippet, Language: language, Created: time.Now()}
}

// GetID - returns the string id
// conforms to database package Snippet interface
func (sm *SnippetModel) GetID() string {
	return sm.ID
}

// GetSnippet - returns the string code snippet
// conforms to database package Snippet interface
func (sm *SnippetModel) GetSnippet() string {
	return sm.Snippet
}

// GetLanguage - returns the string code language
// conforms to database package Snippet interface
func (sm *SnippetModel) GetLanguage() string {
	return sm.Language
}

// GetDateCreated - returns the string timestamp when the snippet was created
// conforms to database package Snippet interface
func (sm *SnippetModel) GetDateCreated() time.Time {
	return sm.Created
}
