import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

const LANGUAGES = CodeMirror.modeInfo;

class LeftLanguageSelectNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: LANGUAGES,
            languageSearchValue: ""
        };
    }

    handleLanguageClick (index, event) {
        this.props.setLanguage(this.state.languages[index].name);
        this.resetState();
        this.props.toggleLanguageSelect(false);
    }

    resetState() {
        this.setState({
            languages: LANGUAGES,
            languageSearchValue: ""
        });
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
        this.refs.testItem.refs.listItem.refs.enhancedButton.setKeyboardFocus();
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
                <TextField ref="languageSearch" value={this.state.languageSearchValue} onChange={this.handleTextFieldChange.bind(this)}/>
                <MenuItem ref="testItem">TEST LANGUAGE 24</MenuItem>
                {this.state.languages.map((language, i) =>
                    <MenuItem onTouchTap={this.handleLanguageClick.bind(this, i)} key={i}>{language.name}</MenuItem>
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