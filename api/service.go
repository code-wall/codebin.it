package api

import "github.com/alechewitt/code-wall/database"

// RepositoryService - used to interface with a
// repository to query and save new snippets. Service requires a
// database.Repository implementation.
type RepositoryService struct {
	repository database.Repository
}

// NewService - Create a new RepositoryService
// with an implementation of the database.Repository
func NewService(repo database.Repository) *RepositoryService {
	r := RepositoryService{repository: repo}
	return &r
}

// CreateSnippet - Adds a new snippet to the repository
func (rs *RepositoryService) CreateSnippet(s *SnippetModel) (sm *SnippetModel, err error) {
	id, err := rs.repository.Insert(s)
	if err == nil {
		s.ID = id
		sm = tranformSnippet(s)
	}
	return
}

// GetSnippetByID - Retrieves a snippet from the repository by ID
func (rs *RepositoryService) GetSnippetByID(id string) (sm *SnippetModel, err error) {
	result, err := rs.repository.FindByID(id)
	if err == nil {
		sm = tranformSnippet(result)
	}
	return
}

func tranformSnippet(c database.Snippet) *SnippetModel {
	return &SnippetModel{c.GetID(), c.GetSnippet(), c.GetLanguage(), c.GetDateCreated()}
}
