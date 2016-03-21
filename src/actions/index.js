import fetch from 'isomorphic-fetch'

import * as types from "../constants/ActionTypes";
import * as config from "../constants/config.js";



export function setCode(code) {
    console.log("Setting Code ACTION: ", code);
    return {type: types.SET_CODE, code: code};
}


//export function setSnippetClearOnEdit(clear) {
//    return
//}

export function setLanguage(language) {
    return {type: types.SET_LANGUAGE, language: language};
}

export function toggleLanguageSelect(open) {
    return {type: types.TOGGLE_LANGUAGE_SELECT, open: open}
}

export function setAppFullyLoaded() {
    return {type: types.SET_APP_FULLY_LOADED};
}

export function saveSnippet() {
    return (dispatch, getState) => {
        console.log("Current STATE:", getState());
        console.log("Last Saved Snippet: ", getState().snippet.savedSnippet);
        let codeToSave = getState().snippet.code;
        let lastSaved = getState().snippet.savedSnippet;
        if (codeToSave != lastSaved) {
            console.log("We have some new code to save");
        } else {
            console.log("Code is already saved. Lets just open the modal");
        }
    }
}


export function loadApplication(snippetID=null) {
    return (dispatch, getState) => {
        console.log("Checking for code from server!!");
        if (snippetID) {
            //let snippetID = queryParams[config.SNIPPET_QUERY_PARAM];
            // Lets attempt to fetch the snippet from the backend
            return fetch("/snippet/" + snippetID)
                .then(response => response.json())
                .then(json => {
                    console.log("Response from snippet");
                    if (json.status === config.RESPONSE_ERROR_STATUS) {
                        throw json.message;
                    } else {
                        return Promise.resolve(json.response);
                    }
                })
                .then(resp => {
                    dispatch(setCode(resp.snippet));
                    dispatch(setLanguage(resp.language));
                    dispatch(setAppFullyLoaded());
                })
                .catch(err => {
                    console.log("Error retrieving snippet!!!");
                    dispatch(setCode(config.SNIPPET_NOT_FOUND));
                    dispatch(setAppFullyLoaded());
                });

        } else {
            dispatch(setAppFullyLoaded());
        }

    }
}