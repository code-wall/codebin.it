import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Footer from "../components/Footer.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import LeftLanguageSelectNav from "../components/LeftLanguageSelectNav.jsx";

import * as Actions from '../actions';

class App extends Component {
    render() {
        const { snippet, actions, ui } = this.props;
        return (
            <div>
                <CodeEditor snippet={snippet} />
                <Footer toggleLanguageSelect={actions.toggleLanguageSelect} setCode={actions.setCode} language={snippet.language}/>
                <LeftLanguageSelectNav languageSelectOpen={ui.languageSelectOpen} setLanguage={actions.setLanguage} toggleLanguageSelect={actions.toggleLanguageSelect}/>
            </div>
        )
    }
}

App.propTypes = {
    snippet: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    ui     : PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        snippet: state.snippet,
        ui     : state.ui
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)