import expect from "expect"
import nock from "nock";
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import * as actions from "../src/actions/index.js"
import * as types from "../src/constants/ActionTypes"

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("actions", () => {

    afterEach(() => {
        nock.cleanAll()
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

    //it('creates SET_APP_FULLY_LOADED when loading application has been done', (done) => {
    //    let snippetId = "test-id";
    //    nock('http://localhost:888/')
    //        .get('/snippet/' + snippetId)
    //        .reply(200, {
    //            body: {
    //                status: "success", response: {
    //                    snippet : "function() console.log('hello'",
    //                    language: "javascript"
    //                }
    //            }
    //        });
    //
    //    const expectedActions = [
    //        { type: types.SET_LANGUAGE, language: "javascript" },
    //        { type: types.setCode, code:  "function() console.log('hello'"}
    //    ];
    //    const store = mockStore({ todos: [] }, expectedActions, done);
    //    store.dispatch(actions.loadApplication());
    //})


});