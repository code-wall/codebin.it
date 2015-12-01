package api

import (
	"github.com/alechewitt/code-wall/mongo"
	"os"
)

const localConnection = "mongodb://localhost/code-wall"

var service *RepositoryService

func getService() *RepositoryService {
	if service == nil {
		service = NewService(mongo.Default(getConnectionString()))
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
