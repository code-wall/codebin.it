package mongo

import (
	"github.com/alechewitt/code-wall/database"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

type MongoDatabase struct {
	session *mgo.Session
}

func (md *MongoDatabase) connect() *mgo.Session {
	if md.session == nil {
		var err error
		md.session, err = mgo.Dial(getConnectionString())
		if err != nil {
			panic(err)
		}
		md.session.SetMode(mgo.Monotonic, true)
	}
	return md.session
}

func (md *MongoDatabase) FindById(id string) (sc database.Snippet, err error) {
	s := md.connect().Copy()
	defer s.Close()
	c := s.DB("").C("snippets")
	result := new(SnippetResult)
	err = c.FindId(id).One(&result)
	sc = result
	return
}

func (md *MongoDatabase) Insert(data database.Snippet) (err error) {
	s := md.connect().Copy()
	defer s.Close()
	c := s.DB("").C("snippets")
	var result SnippetResult = newResult(data)
	err = c.Insert(result)
	return
}

func newResult(data database.Snippet) SnippetResult {
	return SnippetResult{
		Id:       bson.NewObjectId().Hex(),
		Snippet:  data.GetSnippet(),
		Language: data.GetLanguage(),
		Created:  data.GetDateCreated(),
	}
}
