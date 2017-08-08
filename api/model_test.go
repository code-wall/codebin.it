package api

import (
"testing"
)


func TestNewSnippet(t *testing.T) {
    code := "function() \n console.log(\"hello\")"
    language := "javascript"
    snippet, err := NewSnippet(code, language)
    if err != nil {
        t.Error("Expected no error go ", err.Error())
    }
    if snippet.GetLanguage() != language {
        t.Error("Expected language to equal", language, " got: ", snippet.GetLanguage())
    }
    if snippet.GetSnippet() != code {
        t.Error("Expected code to equal", code, " got: ", snippet.GetSnippet())
    }
}

func TestNewSnippetTooLong(t *testing.T) {
    tooLong := "function\n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n \n"
    _, err := NewSnippet(tooLong, "javascript")
    if err == nil {
        t.Error("Expected an error for snippet having too many lines")
    }
}