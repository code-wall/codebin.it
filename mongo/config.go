package mongo

import "os"

const localConnection = "mongodb://localhost/code-wall"

func getConnectionString() string {
	connectString := os.Getenv("DB_CONNECTION")
	if connectString == "" {
		return localConnection
	}
	return connectString
}
