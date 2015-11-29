package db

import "time"

func AddSnippet(snippet string, language string) error {
	s := getSession()
	defer s.Close()

	c := s.DB("").C("snippets")

	err := c.Insert(NewSnippet(snippet, language, time.Now()))
	return err
}
