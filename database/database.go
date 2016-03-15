package database

import "time"

// Repository - interface
type Repository interface {
	Connect(connectionString string)
	FindByID(id string) (Snippet, error)
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
	m.Connect(connectionString)
	return m
}
