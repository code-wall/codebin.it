import { combineReducers } from "redux";

import snippet from "./snippet-reducer";

const rootReducer = combineReducers({
    snippet
});

export default rootReducer;