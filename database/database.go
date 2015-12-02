package database

import "time"

type Repository interface {
	FindById(id string) (Snippet, error)
	Insert(data Snippet) (string, error)
}

type Snippet interface {
	GetId() string
	GetSnippet() string
	GetLanguage() string
	GetDateCreated() time.Time
}

func Default(connectionString string) Repository {
	m := new(mongoDatabase)
	m.connectString = connectionString
	return m
}
