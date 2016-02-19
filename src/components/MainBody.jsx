"use strict";

import React from "react";

import Footer from "./Footer.jsx";
import CodeEditor from "./CodeEditor.jsx";

class MainBody extends React.Component {

    render() {
        return (
            <div>
                <CodeEditor />
                <Footer />
            </div>
        );
    }
}

export default MainBody;
