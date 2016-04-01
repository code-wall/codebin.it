import expect from "expect"
import nock from "nock";
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import "isomorphic-fetch";
import fetchMock from "fetch-mock";


import * as actions from "../src/actions/index.js";
import * as types from "../src/constants/ActionTypes";
import * as config from "../src/constants/config.js";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {

    beforeEach(() => {
        config.ROOT_HOST = "http://0.0.0.0";
    });

    afterEach(() => {
        fetchMock.restore();
    });



    it("Should set the code", () => {
        let code = "func() {\n\tfmt.Println(\"hello world\"}";
        let expectedAction = {
            type: types.SET_CODE,
            code: code
        };
        expect(actions.setCode(code)).toEqual(expectedAction);
    });

    it("Should set the language", () => {
        let language = "javascript";
        let expectedAction = {
            type    : types.SET_LANGUAGE,
            language: language
        };
        expect(actions.setLanguage(language)).toEqual(expectedAction);
    });

    it("Should set the saved snippet", ()=> {
        let savedSnippet = "a saved snippet";
        let expectedAction = {
            type        : types.SET_SAVED_SNIPPET,
            savedSnippet: savedSnippet
        };
        expect(actions.setSavedSnippet(savedSnippet)).toEqual(expectedAction);
    });


    it("Should set clear on focus to false", () => {
        let clearOnFocus = false;
        let expectedAction = {
            type: types.SET_CLEAR_ON_FOCUS,
            clearOnFocus: clearOnFocus
        };
        expect(actions.setClearOnFocus(clearOnFocus)).toEqual(expectedAction);
    });

    it("Should toggle language select", () => {
        let open = false;
        let expectedAction = {
            type: types.TOGGLE_LANGUAGE_SELECT,
            open: open
        };
        expect(actions.toggleLanguageSelect(open)).toEqual(expectedAction);
    });


    it("Should set the app state to fully loaded", () => {
        let expectedAction = {
            type: types.SET_APP_FULLY_LOADED
        };
        expect(actions.setAppFullyLoaded()).toEqual(expectedAction);
    });

    it('creates SET_APP_FULLY_LOADED when loading application has been done', (done) => {
        let snippetId = "test-id";

        let getSnippetURL = config.ROOT_HOST + "/snippet/" + snippetId;
        let snippet = "hello";
        let language = "javascript";
        fetchMock
            .mock(getSnippetURL, {
                body: {
                    status  : "success",
                    response: {
                        "snippet" : snippet,
                        "language": language
                    }
                }
            });

        const store = mockStore({});
        store.dispatch(actions.loadApplication(snippetId))
            .then(() => {
                expect(fetchMock.called(getSnippetURL)).toEqual(true, "wrong url called");
                let expectedActions = [
                    actions.setCode(snippet),
                    actions.setLanguage(language),
                    actions.setClearOnFocus(false),
                    actions.setAppFullyLoaded()
                ];
                expect(store.getActions()).toEqual(expectedActions, "expected actions do not match");
            })
            .then(done)
            .catch(done);
    });


    it("Should save a snippet correctly", function(done) {
        console.log("inside test root host: ", config.ROOT_HOST);
        let saveSnippetURL = config.ROOT_HOST + "/save";
        let code = "test code";
        let language = "javascript";
        fetchMock
            .mock(saveSnippetURL, "POST", {
                body: {
                    status  : "ok",
                    response: {
                        "snippet" : code,
                        "language": language,
                        "id"      : "random-test-id"
                    }
                }
            });

        let store = mockStore({
            snippet:{
                code: code,
                language: language,
                savedSnippet: ""
            }});

        store.dispatch(actions.saveSnippet())
            .then(()=> {
                expect(fetchMock.called(saveSnippetURL)).toEqual(true, "wrong url called");
                let expectedActions = [
                    actions.setSnippetSaving(true),
                    actions.setSavedSnippet(code),
                    actions.setSnippetSaving(false)
                ];
                expect(store.getActions()).toEqual(expectedActions, "expected actions not called in correct order");
            })
            .then(done)
            .catch(done);
    });

    it("Should not try to save", function(done) {
        let saveSnippetUrl = config.ROOT_HOST + "/save";
        let code = "test";
        let language = "test";
        let store = mockStore({
            snippet: {
                code        : code,
                language    : language,
                savedSnippet: code
            }
        });
        store.dispatch(actions.saveSnippet())
            .then(() => {
                expect(fetchMock.called(saveSnippetUrl)).toEqual(false, "URL should not have been called");
                expect(store.getActions()).toEqual([], 'should be no actions taking place');
            })
            .then(done)
            .catch(done)
    });




});