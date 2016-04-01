import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

import {LANGUAGES} from "../constants/languages.js";

const langBtnRef = "langBtn_";
const defaultIcon = "";

class LeftLanguageSelectNav extends React.Component {

    constructor(props) {
        super(props);
        this.getSvgIcons();
        this.state = {
            languages          : LANGUAGES,
            languageSearchValue: ""
        };
        this.highlightedLan = null;
    }

    getSvgIcons() {
        let parser = new DOMParser();
        for (let language of LANGUAGES) {
            if (language.hasOwnProperty("iconKey") && language.hasOwnProperty("iconVersion")) {
                fetch("/lang-icons/" + language.iconKey + "/" + language.iconKey + "-" + language.iconVersion + ".svg")
                    .then(response => response.text())
                    .then(text => {
                        let svgDoc = parser.parseFromString(text, "image/svg+xml");
                        let svg = svgDoc.getElementsByTagName("svg")[0];
                        language.svgIcon = svg.innerHTML;
                    });
            } else {
                language.svgIcon = false;
            }
        }
    }

    handleLanguageClick(index, event) {
        this.selectLanguage(index)
    }

    selectLanguage(index) {
        this.props.setLanguage(this.state.languages[index].name);
        this.resetState();
        this.props.toggleLanguageSelect(false);
    }

    resetState() {
        this.setState({
            languages          : LANGUAGES,
            languageSearchValue: ""
        });
        // Determine if we need to unhighlight a button
        if (this.highlightedLan !== null && this.refs.hasOwnProperty(langBtnRef + this.highlightedLan)) {
            this.refs[langBtnRef + this.highlightedLan].refs.listItem.refs.enhancedButton.removeKeyboardFocus();
        }
        this.highlightedLan = null;
    }

    handleTextFieldChange(event) {
        let value = event.target.value;
        this.setState({languageSearchValue: value});
        value = value.toLowerCase();
        let languages = LANGUAGES.filter((langObj, i) => {
            let langStr = langObj.name.toLowerCase();
            return value === langStr.slice(0, value.length);
        });
        this.setState({
            languages: languages
        });
        this.highlightLanguage(0);
    }

    handleKeyDown(event) {
        switch (event.keyCode) {
            case 13:
                // Enter Pressed
                this.selectLanguage(this.highlightedLan);
                break;
            case 38:
                // Up Arrow pressed
                this.highlightLanguage(this.highlightedLan === null ? 0 : this.highlightedLan - 1);
                break;
            case 40:
                // Down Arrow pressed
                this.highlightLanguage(this.highlightedLan === null ? 0 : this.highlightedLan + 1);
                break;
        }
    }


    highlightLanguage(num) {
        let newHighLighted;
        // Highlight New
        if (this.state.languages.length === 0) {
            // No languages in list
            newHighLighted = null;
        } else if (num < 0) {
            // Gone off top of list
            let idx = this.state.languages.length - 1;
            newHighLighted = idx;
            this.refs[langBtnRef + idx].refs.listItem.refs.enhancedButton.setKeyboardFocus();
        } else if (this.state.languages.length > num) {
            // Valid index for language
            newHighLighted = num;
            this.refs[langBtnRef + num].refs.listItem.refs.enhancedButton.setKeyboardFocus();
        } else {
            // Gone off bottom of list
            newHighLighted = 0;
            this.refs[langBtnRef + "0"].refs.listItem.refs.enhancedButton.setKeyboardFocus();
        }

        // Unhighlight Previous
        if (this.highlightedLan !== null &&
            this.refs.hasOwnProperty(langBtnRef + this.highlightedLan)) {
            let oldBtn = this.refs[langBtnRef + this.highlightedLan];
            // Ensure they are not the same button that we have just highlighted
            if (newHighLighted !== null && this.refs[langBtnRef + newHighLighted] !== oldBtn) {
                oldBtn.refs.listItem.refs.enhancedButton.removeKeyboardFocus();
            }
        }

        // Set the new state of what is highlighted
        this.highlightedLan = newHighLighted;
    }


    handleMenuChange(open, reason) {
        this.props.toggleLanguageSelect(open);
        if (!open) {
            // Reset Data upon closing menu
            this.resetState();
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("LangSelect Open: ", nextProps.languageSelectOpen);
        if (nextProps.languageSelectOpen) {
            setTimeout(() => {
                console.log("Focussing language search");
                this.refs.languageSearch.focus();
            }, 100);
        }
    }

    setInnerHtml(str) {
        return {__html: str}
    }

    renderLangIcon(language) {
        let style = {
            margin: '9px',
            backgroundColor:'rgba(255,255,255,0.95)',
            padding:'3px',
            borderRadius:'5px'
        };
        if (language.svgIcon) {
            return (
                <svg viewBox="0 0 128 128"
                     style={style}
                     dangerouslySetInnerHTML={this.setInnerHtml(language.svgIcon)}/>
            );
        } else {
            style.textAlign = 'center';
            style.lineHeight = '24px';
            return (
                <b style={style}>{language.name[0].toUpperCase()}</b>
            )
        }
    }


    render() {
        const {languageSelectOpen} = this.props;
        return (
            <LeftNav
                docked={false}
                width={275}
                open={languageSelectOpen}
                onRequestChange={this.handleMenuChange.bind(this)}>
                <div style={{marginLeft:"10px", marginRight:"10px", overflow:"hidden"}}>
                    <TextField ref="languageSearch" value={this.state.languageSearchValue}
                               fullWidth={true}
                               onKeyDown={this.handleKeyDown.bind(this)}
                               onChange={this.handleTextFieldChange.bind(this)}/>
                </div>
                {this.state.languages.map((language, i) => {
                    return (
                        <MenuItem onTouchTap={this.handleLanguageClick.bind(this, i)}
                                  key={i}
                                  ref={langBtnRef + i}
                                  leftIcon={this.renderLangIcon(language)}>
                            {language.name}
                        </MenuItem>
                    )
                })}
            </LeftNav>
        );
    }
}

LeftLanguageSelectNav.propTypes = {
    languageSelectOpen  : React.PropTypes.bool.isRequired,
    toggleLanguageSelect: React.PropTypes.func.isRequired,
    setLanguage         : React.PropTypes.func.isRequired
};

export default LeftLanguageSelectNav
