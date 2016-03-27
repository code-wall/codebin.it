import React from "react"

class CodeEditor extends React.Component{

    componentDidMount() {
        CodeMirror.modeURL = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/%N/%N.min.js";

        const {snippet} = this.props;
        this.currentLanguage = snippet.language.toLowerCase();
        console.log("Snippet: ", snippet);
        console.log("Mounting: ");
        const textareaNode = this.refs.textarea;
        let options = {
            lineNumbers: true,
            readOnly   : false,
            mode       : snippet.language.toLowerCase(),
            theme      : "solarized dark"
        };
        console.log("Codemirror Options: ");
        console.log(options);
        this.codeMirror = CodeMirror.fromTextArea(textareaNode, options);
        this.loadLanguage(snippet.language.toLowerCase());
        this.codeMirror.on("blur", this.editorBlurred.bind(this));
        this.codeMirror.on("focus", this.editorFocused.bind(this));
    }

    editorBlurred(codemirrorObj) {
        console.log("Editor Blurred");
        let codemirrorVal = this.codeMirror.getValue();
        if (this.props.snippet.code != codemirrorVal) {
            this.props.setCode(codemirrorVal);
        }
    }

    editorFocused(codemirrorObj) {
        console.log("Editor focussed");
        console.log(this.props.snippet.clearOnFocus);
        if (this.props.snippet.clearOnFocus) {
            console.log("Setting code");
            this.props.setCode("");
            this.props.setClearOnFocus(false);
        }
    }

    loadLanguage(language) {
        // We need to load this new language
        let langInfo = CodeMirror.findModeByName(language);
        let mode = langInfo.mode;
        this.codeMirror.setOption("mode", langInfo.mime);
        CodeMirror.autoLoadMode(this.codeMirror, langInfo.mode);
        this.currentLanguage = language;
    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(property) {
        console.log("Components receiving props");
        let newLang = property.snippet.language.toLowerCase();
        let newCode = property.snippet.code;
        if (this.currentLanguage && this.currentLanguage != newLang) {
            this.loadLanguage(newLang);
        }
        if (this.codeMirror.getValue() !== newCode) {
            this.codeMirror.setValue(newCode);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        console.log("RE Rendering");
        return (
            <div className="editorContainer">
                <textarea ref="textarea" defaultValue={this.props.snippet.code}/>
            </div>
        );
    }

    
}

CodeEditor.propTypes = {
    snippet        : React.PropTypes.object.isRequired,
    setCode        : React.PropTypes.func.isRequired,
    setClearOnFocus: React.PropTypes.func.isRequired
};

export default CodeEditor;