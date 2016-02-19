import React from "react";

export default class Footer extends React.Component {
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
                    <li id="languageButton">
                        <i className="fa fa-code"></i> <span id="languageLabel">Javascript</span>
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
