package api

import "time"

type SnippetModel struct {
	Id       string    `json:"id"`
	Snippet  string    `json:"snippet"`
	Language string    `json:"language"`
	Created  time.Time `json:"created"`
}

func NewSnippet(snippet string, language string) *SnippetModel {
	return &SnippetModel{Snippet: snippet, Language: language, Created: time.Now()}
}

func (sm *SnippetModel) GetId() string {
	return sm.Id
}

func (sm *SnippetModel) GetSnippet() string {
	return sm.Snippet
}

func (sm *SnippetModel) GetLanguage() string {
	return sm.Language
}

func (sm *SnippetModel) GetDateCreated() time.Time {
	return sm.Created
}
