package database

import "time"

type Repository interface {
	FindById(id string) (Snippet, error)
	Insert(data Snippet) error
}

type Snippet interface {
	GetId() string
	GetSnippet() string
	GetLanguage() string
	GetDateCreated() time.Time
}
