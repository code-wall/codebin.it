package db

import (
	"time"
)

type SnippetCollection struct {
	Snippet   string
	Langauge  string
	Timestamp time.Time
}

func NewSnippet(snippet string, langauge string, timestamp time.Time) *SnippetCollection {
	s := SnippetCollection{snippet, langauge, timestamp}
	return &s
}
