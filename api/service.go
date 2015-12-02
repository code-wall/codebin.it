package api

import "github.com/alechewitt/code-wall/database"

// RepositoryService - used to interface with a
// repository to query and save new snippets. Service requires a
// database.Repository implementation.
type RepositoryService struct {
	repository database.Repository
}

func NewService(repo database.Repository) *RepositoryService {
	r := RepositoryService{repository: repo}
	return &r
}

func (rs *RepositoryService) CreateSnippet(s *SnippetModel) (sm *SnippetModel, err error) {
	id, err := rs.repository.Insert(s)
	if err == nil {
		s.Id = id
		sm = tranformSnippet(s)
	}
	return
}

func (rs *RepositoryService) GetSnippetById(id string) (sm *SnippetModel, err error) {
	result, err := rs.repository.FindById(id)
	if err == nil {
		sm = tranformSnippet(result)
	}
	return
}

func tranformSnippet(c database.Snippet) *SnippetModel {
	return &SnippetModel{c.GetId(), c.GetSnippet(), c.GetLanguage(), c.GetDateCreated()}
}
