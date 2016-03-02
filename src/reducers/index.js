import { combineReducers } from "redux";

import snippet from "./snippet-reducer";
import ui from "./ui-update-reducer.js";

const rootReducer = combineReducers({
    snippet,
    ui
});

export default rootReducer;