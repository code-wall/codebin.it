package api

import (
	"github.com/code-wall/codebin/database"
	"os"
)

const localConnection = "mongodb://localhost/code-wall"

var service *RepositoryService

func GetService() *RepositoryService {
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
