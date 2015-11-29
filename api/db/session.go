package db

import (
	"gopkg.in/mgo.v2"
)

func GetSession() *mgo.Session {
	return connect().Copy()
}
