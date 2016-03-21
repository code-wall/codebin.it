import * as actions from "../constants/ActionTypes";
import * as config from "../constants/config.js";

const initialState = {
    languageSelectOpen: false
};

export default function ui(state = initialState, action) {
    switch (action.type) {
        case actions.TOGGLE_LANGUAGE_SELECT:
            return {
                languageSelectOpen: action.open,
            };
        default:
            return state;
    }
}