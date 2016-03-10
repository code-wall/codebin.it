import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';

const LANGUAGES = CodeMirror.modeInfo;

class LeftLanguageSelectNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {languages: LANGUAGES};
    }

    handleLanguageClick (index, event) {
        this.props.setLanguage(LANGUAGES[index].name);
        this.props.toggleLanguageSelect(false);
    }

    handleTextFieldChange(event) {
        console.log("Text field change value");
        console.log("Native Event: ", event.nativeEvent);
        let value = this.refs.languageSearch.getValue().toLowerCase();
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
                <TextField ref="languageSearch" onChange={this.handleTextFieldChange.bind(this)}/>
                <MenuItem ref="testItem">TEST LANGUAGE 18</MenuItem>
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