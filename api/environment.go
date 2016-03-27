package api

import (
	"github.com/code-wall/codebin.it/database"
	"os"
)

const localConnection = "mongodb://localhost/code-wall"

var service *RepositoryService

func getService() *RepositoryService {
	if service == nil {
		service = NewService(database.Default(getConnectionString()))
	}
	return service
}

func getConnectionString() string {
	connectString := os.Getenv("DB_CONNECTION")
	if connectString == "" {
		return localConnection
	}
	return connectString
}
