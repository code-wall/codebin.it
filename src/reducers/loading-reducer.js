import * as actions from "../constants/ActionTypes";
import * as config from "../constants/config.js";

const initialState = {
    appFullyLoaded: false
};

export default function loading(state = initialState, action) {
    switch (action.type) {
        case actions.SET_APP_FULLY_LOADED:
            return {
                appFullyLoaded: true
            };
        default:
            return state;
    }
}