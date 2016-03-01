"use strict";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import React from "react";


import rootReducer from "./reducers";
import App from "./containers/App.js";

const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("mainContainer")
);






