import React, { Component, PropTypes } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import * as queryString from "query-string";


import Footer from "../components/Footer.jsx";
import CodeEditor from "../components/CodeEditor.jsx";
import LeftLanguageSelectNav from "../components/LeftLanguageSelectNav.jsx";
import * as config from "../constants/config.js";
import * as Actions from "../actions";

// Theme imports
import mui from "material-ui";
import ThemeManager from "material-ui/lib/styles/theme-manager";
import CodeBinTheme from "../constants/theme.js";


class App extends Component {

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };
    
    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(CodeBinTheme)
        };
    }

    componentDidMount(){
        let queryParams = queryString.parse(location.search);
        let snippetID = null;
        if (queryParams.hasOwnProperty(config.SNIPPET_QUERY_PARAM)) {
            snippetID = queryParams[config.SNIPPET_QUERY_PARAM];
        }
        this.props.actions.loadApplication(snippetID);
    }

    render() {
        const { snippet, actions, ui, loading } = this.props;

        if (!loading.appFullyLoaded) {
            return <div className="spinnerContainer"><div><i className="fa fa-circle-o-notch fa-spin fa-5x"></i></div></div>
        } else {
            return (
                <div>
                    <CodeEditor snippet={snippet} setCode={actions.setCode}/>
                    <Footer toggleLanguageSelect={actions.toggleLanguageSelect} saveSnippet={actions.saveSnippet}
                            snippet={snippet}/>
                    <LeftLanguageSelectNav languageSelectOpen={ui.languageSelectOpen} setLanguage={actions.setLanguage}
                                           toggleLanguageSelect={actions.toggleLanguageSelect}/>
                </div>
            )
        }
    }
}

App.propTypes = {
    snippet: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    ui     : PropTypes.object.isRequired,
    loading: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        snippet: state.snippet,
        ui     : state.ui,
        loading: state.loading
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