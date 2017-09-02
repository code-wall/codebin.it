import * as actions from "../constants/ActionTypes";
import * as config from "../constants/config.js";

const initialState = {
    languageSelectOpen: false,
    saveDialogState: false
};

export default function ui(state = initialState, action) {
    switch (action.type) {
        case actions.TOGGLE_LANGUAGE_SELECT:
            return {
                languageSelectOpen: action.open,
                saveDialogState: state.saveDialogState
            };
        case actions.SET_SAVE_DIALOG_STATE:
            return {
                languageSelectOpen: state.languageSelectOpen,
                saveDialogState: action.showing,
            };
        default:
            return state;
    }
}