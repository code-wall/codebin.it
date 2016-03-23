import * as actions from "../constants/ActionTypes";
import * as config from "../constants/config.js";

const initialState = {
    code        : config.DEFAULT_CONTENT,
    language    : config.DEFAULT_LANG,
    savedSnippet: "",
    saving      : false
};

export default function snippet(state = initialState, action=null) {
    switch (action.type) {
        case actions.SET_CODE:
            return {
                code        : action.code,
                language    : state.language,
                savedSnippet: state.savedSnippet,
                saving      : state.saving
            };

        case actions.SET_LANGUAGE:
            return {
                code        : state.code,
                language    : action.language,
                savedSnippet: state.savedSnippet,
                saving      : state.saving
            };

        case actions.SET_SNIPPET_SAVING:
            console.log("Setting snippet Saving: ", action.saving);
            return {
                code        : state.code,
                language    : state.language,
                savedSnippet: state.savedSnippet,
                saving      : action.saving
            };

        default:
            return state;
    }
}