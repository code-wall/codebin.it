import expect from "expect"
import nock from "nock";
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import "isomorphic-fetch";
import fetchMock from "fetch-mock";


import * as actions from "../src/actions/index.js"
import * as types from "../src/constants/ActionTypes"

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {

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

        let getSnippetURL = "/snippet/" + snippetId;
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
                    actions.setAppFullyLoaded()
                ];
                expect(store.getActions()).toEqual(expectedActions, "expected actions do not match");
            })
            .then(done)
            .catch(done);
    });


});