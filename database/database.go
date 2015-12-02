package database

import "time"

// Repository - interface
type Repository interface {
	FindById(id string) (Snippet, error)
	Insert(data Snippet) (string, error)
}

// Snippet - interface
type Snippet interface {
	GetID() string
	GetSnippet() string
	GetLanguage() string
	GetDateCreated() time.Time
}

// Default - Returns the current default Repository database
func Default(connectionString string) Repository {
	m := new(mongoDatabase)
	m.connectString = connectionString
	return m
}
