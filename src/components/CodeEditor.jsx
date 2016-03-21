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
            theme      : "solarized dark",
        };
        console.log("Codemirror Options: ");
        console.log(options);
        this.codeMirror = CodeMirror.fromTextArea(textareaNode, options);
        this.loadLanguage(snippet.language.toLowerCase());
        this.codeMirror.on('blur', this.focusChanged.bind(this));
    }

    focusChanged(codemirrorObj) {
        let codemirrorVal = this.codeMirror.getValue();
        if (this.props.snippet.code != codemirrorVal) {
            this.props.setCode(codemirrorVal);
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
        let newLang = property.snippet.language.toLowerCase();
        let newCode = property.snippet.code;
        if (this.currentLanguage && this.currentLanguage != newLang) {
            this.loadLanguage(newLang);
        }
        if (this.codeMirror.getValue() !== newCode) {
            this.codeMirror.setOption("value", newCode);
        }
        this.codeMirror.focus();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.codeMirror.getValue() !== nextProps.snippet.code;
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
    snippet: React.PropTypes.object.isRequired,
    setCode: React.PropTypes.func.isRequired

};

export default CodeEditor;