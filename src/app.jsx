"use strict";

import { createStore } from "redux";
import rootReducer from "./reducers";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import React from "react";
//import CodeEditor from "./code-editor"
//import Utils from "./utils";
//import * as config from "./config";
//import Shortcuts from "./shortcuts";
//import HelpModal from "./ui/modals/help-modal";
//import ShareModal from "./ui/modals/share-modal";
import App from "./containers/App.js";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("mainContainer")
);






