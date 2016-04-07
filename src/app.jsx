"use strict";

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import React from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui, { RaisedButton } from 'material-ui';

import rootReducer from "./reducers";
import App from "./containers/App.js";


import * as log from "./log.js";


// Todo: we need to conditionally set this depending on what environment we are in.
if (process.env.NODE_ENV === 'production') {
    log.setLevel(3);
} else {
    log.setLevel(6);
}
log.production("\n    ======   ======   =====    =====   =====    =====   ==   =           =====   =====\n    =        =    =   =    =   =       =    =     =     = =  =             =       =\n    =        =    =   =    =   =====   =====      =     =  = =             =       =\n    =        =    =   =    =   =       =    =     =     =   ==             =       =\n    ======   ======   =====    =====   ======   =====   =    =     =     =====     =\n\n------------  see source at: https://github.com/code-wall/codebin.it -----------------");

// Needed for Material-UI onTouchTap to work
// Can go away when react 1.0 release
injectTapEventPlugin();

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






