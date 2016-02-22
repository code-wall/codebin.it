import React from "react";

import CodeActions from "../actions/CodeActions.js";

export default class Footer extends React.Component {
    /**
     * Temporary method to set the code via the code action
     */
    setCode(event) {
        CodeActions.updateCode("Temporary code added through flux architecture");
    }

    render() {
        return (
            <div className="border-bottom">
                <div className="logo">
                    <picture>
                        <source
                            media="(min-width: 465px)"
                            srcSet="/dist/images/dark-logo-small.png" />
                            <img
                                src="/dist/images/dark-logo-letter-small.png"
                                alt="codebin.it"/>
                    </picture>
                </div>
                <ul className="menu-items">
                    <li id="languageButton" onClick={this.setCode}>
                        <i className="fa fa-code"></i> <span id="lenguageLabel">Javascript</span>
                    </li>
                    <li id="saveButton">
                        <i className="fa fa-floppy-o"></i> Save
                    </li>
                </ul>
                <div className="help-control">
                    <span className="keyboard">cmd</span> + <span className="keyboard">?</span>
                </div>
            </div>
        );
    }
}
