import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

const LANGUAGES = CodeMirror.modeInfo;

const langBtnRef = "langBtn_";

class LeftLanguageSelectNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: LANGUAGES,
            languageSearchValue: ""
        };
        this.highlightedLan = null;
    }

    handleLanguageClick (index, event) {
        this.selectLanguage(index)
    }

    selectLanguage(index) {
        this.props.setLanguage(this.state.languages[index].name);
        this.resetState();
        this.props.toggleLanguageSelect(false);
    }

    resetState() {
        this.setState({
            languages: LANGUAGES,
            languageSearchValue: ""
        });
        // Determine if we need to unhighlight a button
        if (this.highlightedLan !== null && this.refs.hasOwnProperty(langBtnRef + this.highlightedLan)) {
            this.refs[langBtnRef + this.highlightedLan].refs.listItem.refs.enhancedButton.removeKeyboardFocus();
        }
        this.highlightedLan = null;
    }

    handleTextFieldChange(event) {
        console.log("EVENT: ", event);
        console.log("Native Event: ", event.nativeEvent);
        console.log("Event Type: ", event.type);
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
        console.log("Highlighted Lang: ", this.highlightedLan);
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
        console.log("Key code", event.keyCode);
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
        console.log("New Highlighed: ", this.highlightedLan);
    }



    handleMenuChange(open, reason) {
        this.props.toggleLanguageSelect(open);
        if (!open) {
            // Reset Data upon closing menu
            this.resetState();
        }
    }

    render() {
        const {languageSelectOpen} = this.props;
        const languages = this.languages;
        return (
            <LeftNav
                docked={false}
                width={200}
                open={languageSelectOpen}
                onRequestChange={this.handleMenuChange.bind(this)}
                >
                <TextField ref="languageSearch" value={this.state.languageSearchValue}
                           onKeyDown={this.handleKeyDown.bind(this)}
                           onChange={this.handleTextFieldChange.bind(this)}/>
                <MenuItem ref="testItem">TEST LANGUAGE 37</MenuItem>
                {this.state.languages.map((language, i) =>
                    <MenuItem onTouchTap={this.handleLanguageClick.bind(this, i)} key={i} ref={langBtnRef + i}>
                        {language.name}
                    </MenuItem>
                )}
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