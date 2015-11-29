package db

import "time"

func AddSomething() {
	s := getSession()
	defer s.Close()

	c := s.DB("").C("snippets")

	err := c.Insert(NewSnippet("hello", "hello again", time.Now()))

	if err != nil {
		panic("ahahahah")
	}

}
