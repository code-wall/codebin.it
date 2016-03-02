import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

const LANGUAGES = CodeMirror.modeInfo;

class LeftLanguageSelectNav extends React.Component {

    constructor(props) {
        super(props);
    }

    handleLanguageClick (index, event) {
        this.props.setLanguage(LANGUAGES[index].name);
        this.props.toggleLanguageSelect(false);
    }

    handleMenuChange(open, reason) {
        this.props.toggleLanguageSelect(open);
    }

    render() {
        const {languageSelectOpen} = this.props;
        return (
            <LeftNav
                docked={false}
                width={200}
                open={languageSelectOpen}
                onRequestChange={this.handleMenuChange.bind(this)}
                >
                {LANGUAGES.map((language, i) =>
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