package api

import "github.com/alechewitt/code-wall/database"

type RepositoryService struct {
	db database.Repository
}

func CreateService(db database.Repository) RepositoryService {
	return RepositoryService{db}
}

func (rs *RepositoryService) CreateSnippet(s *SnippetModel) (sm *SnippetModel, err error) {
	err = rs.db.Insert(s)
	if err == nil {
		sm = tranformSnippet(s)
	}
	return
}

func (rs *RepositoryService) GetSnippetById(id string) (sm *SnippetModel, err error) {
	result, err := rs.db.FindById(id)
	if err == nil {
		sm = tranformSnippet(result)
	}
	return
}

func tranformSnippet(c database.Snippet) *SnippetModel {
	return &SnippetModel{c.GetId(), c.GetSnippet(), c.GetLanguage(), c.GetDateCreated()}
}
