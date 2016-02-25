import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Footer from "../components/Footer.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import * as SnippetActions from '../actions';

class App extends Component {
    render() {
        const { snippet, actions } = this.props;
        return (
            <div>
                <CodeEditor snippet={snippet} />
                <Footer setLanguage={actions.setLanguage} setCode={actions.setCode}/>
            </div>
        )
    }
}

App.propTypes = {
    snippet: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        snippet: state.snippet
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(SnippetActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)