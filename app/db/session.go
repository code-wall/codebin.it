package db

import (
	"gopkg.in/mgo.v2"
)

func getSession() *mgo.Session {
	return connect().Copy()
}
