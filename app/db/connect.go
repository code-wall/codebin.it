package db

import "gopkg.in/mgo.v2"

var session *mgo.Session

func connect() *mgo.Session {
	if session == nil {
		var err error
		session, err = mgo.Dial(getConnectionString())
		if err != nil {
			panic(err)
		}
		session.SetMode(mgo.Monotonic, true)
	}
	return session
}
