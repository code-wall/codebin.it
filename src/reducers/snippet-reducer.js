import * as actions from "../constants/ActionTypes";
import * as config from "../constants/config.js";

const initialState = {
    code        : config.DEFAULT_CONTENT,
    language    : config.DEFAULT_LANG,
    savedSnippet: ""
};

export default function snippet(state = initialState, action) {
    switch (action.type) {
        case actions.SET_CODE:
            return {
                code    : action.code,
                language: state.language
            };

        case actions.SET_LANGUAGE:
            return {
                code    : state.code,
                language: action.language
            };

        default:
            return state;
    }
}