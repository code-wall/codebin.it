import "whatwg-fetch";

import * as types from "../constants/ActionTypes";
import * as config from "../constants/config.js";
import * as api from "../api-endpoints/api.js";



// ================= Snippet Actions ================

export function setCode(code) {
    console.log("Setting Code ACTION: ", code);
    return {type: types.SET_CODE, code: code};
}

export function setLanguage(language) {
    return {type: types.SET_LANGUAGE, language: language};
}

export function setSnippetSaving(saving=true) {
    return {type: types.SET_SNIPPET_SAVING, saving: saving};
}

export function setSavedSnippet(snippet) {
    return {type: types.SET_SAVED_SNIPPET, savedSnippet: snippet};
}

export function saveSnippet() {
    return (dispatch, getState) => {
        let codeToSave = getState().snippet.code;
        let lastSaved = getState().snippet.savedSnippet;
        let language = getState().snippet.language;
        if (codeToSave != lastSaved) {
            dispatch(setSnippetSaving(true));
            return api.saveSnippet(codeToSave, language)
                .then(resp => {
                    console.log("Successfully saved snippet. ID: ", resp.id);
                    dispatch(setSavedSnippet(resp.snippet));
                    dispatch(setSnippetSaving(false));
                })
                .catch(err => {
                    console.log("Error saving snippet ", err)
                });
        } else {
            // Code Already saved, lets open the modal with the link
            // Or we could show a sign saying that the snippet is already saved
            console.log("Code is already saved. Lets just open the modal");
            return Promise.resolve();
        }
    }
}


// ================= UI Actions =====================

export function toggleLanguageSelect(open) {
    return {type: types.TOGGLE_LANGUAGE_SELECT, open: open}
}


// =============== Loading Actions =================

export function setAppFullyLoaded() {
    return {type: types.SET_APP_FULLY_LOADED};
}

export function loadApplication(snippetID=null) {
    return (dispatch, getState) => {
        console.log("Checking for code from server!!");
        if (snippetID) {
            // Lets attempt to fetch the snippet from the backend
            return api.getSnippet(snippetID)
                .then(resp => {
                    dispatch(setCode(resp.snippet));
                    dispatch(setLanguage(resp.language));
                    dispatch(setAppFullyLoaded());
                })
                .catch(err => {
                    console.log("Error retrieving snippet!!!");
                    console.log(err);
                    dispatch(setCode(config.SNIPPET_NOT_FOUND));
                    dispatch(setAppFullyLoaded());
                });

        } else {
            dispatch(setAppFullyLoaded());
        }

    }
}
