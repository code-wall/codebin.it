import { combineReducers } from "redux";

import snippet from "./snippet-reducer";
import ui from "./ui-update-reducer.js";
import loading from "./loading-reducer.js";

const rootReducer = combineReducers({
    snippet,
    ui,
    loading
});

export default rootReducer;