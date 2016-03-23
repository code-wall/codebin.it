package database

import (
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type mongoDatabase struct {
	session       *mgo.Session
}

func (md *mongoDatabase) Connect(connectionString string) {
	if md.session == nil {
		var err error
		md.session, err = mgo.Dial(connectionString)
		if err != nil {
			panic(err)
		}
		md.session.SetMode(mgo.Monotonic, true)
	}
}

func (md *mongoDatabase) FindByID(id string) (sc Snippet, err error) {
	s := md.session.Copy()
	defer s.Close()
	c := s.DB("").C("snippets")
	result := mongoResult{}
	err = c.FindId(id).One(&result)
	sc = &result
	return
}

func (md *mongoDatabase) Insert(data Snippet) (id string, err error) {
	s := md.session.Copy()
	defer s.Close()
	c := s.DB("").C("snippets")
	result := newResult(data)
	err = c.Insert(&result)
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
