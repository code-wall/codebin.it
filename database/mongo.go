package database

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type mongoDatabase struct {
	session       *mgo.Session
	connectString string
}

func (md *mongoDatabase) connect() *mgo.Session {
	if md.session == nil {
		var err error
		md.session, err = mgo.Dial(md.connectString)
		if err != nil {
			panic(err)
		}
		md.session.SetMode(mgo.Monotonic, true)
	}
	return md.session
}

func (md *mongoDatabase) FindById(id string) (sc Snippet, err error) {
	s := md.connect().Copy()
	defer s.Close()
	c := s.DB("").C("snippets")
	var result mongoResult = mongoResult{}
	err = c.FindId(id).One(&result)
	sc = &result
	return
}

func (md *mongoDatabase) Insert(data Snippet) (id string, err error) {
	s := md.connect().Copy()
	defer s.Close()
	c := s.DB("").C("snippets")
	var result mongoResult = newResult(data)
	err = c.Insert(result)
	if err == nil {
		id = result.ID
	}
	return
}

func newResult(data Snippet) mongoResult {
	return mongoResult{
		ID:       bson.NewObjectId().Hex(),
		Snippet:  data.GetSnippet(),
		Language: data.GetLanguage(),
		Created:  data.GetDateCreated(),
	}
}
