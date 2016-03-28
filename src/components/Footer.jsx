import React from "react";

export default class Footer extends React.Component {
    /**
     * Temporary method to set the code via the code action
     */
    handleSetCode() {
        //this.props.setCode("Temporary code added through flux architecture")
        this.props.saveSnippet();
    }

    handleOpenLanguageSelect() {
        //let lang = ["Go", "Python", "Ruby", "PHP", "Java"][Math.floor(Math.random() * 5)];
        //this.props.loadLanguage(lang);
        this.props.toggleLanguageSelect(true);
    }

    render() {
        const { snippet } = this.props;
        var saveButton;
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
                    <li id="languageButton" onClick={this.handleOpenLanguageSelect.bind(this)}>
                        <i className="fa fa-code"></i> <span id="lenguageLabel">{snippet.language}</span>
                    </li>
                    <li id="saveButton" onClick={this.handleSetCode.bind(this)}>
                        <i className="fa fa-floppy-o"></i> {snippet.saving ? 'Saving' : 'Save'}
                    </li>
                </ul>
                <div className="help-control">
                    <span className="keyboard">cmd</span> + <span className="keyboard">?</span>
                </div>
            </div>
        );
    }
}

Footer.propTypes = {
    saveSnippet         : React.PropTypes.func.isRequired,
    toggleLanguageSelect: React.PropTypes.func.isRequired,
    snippet             : React.PropTypes.object.isRequired
};