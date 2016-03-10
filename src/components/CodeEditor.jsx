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
        this.codeMirror = CodeMirror.fromTextArea(textareaNode, options);
        this.loadLanguage(snippet.language.toLowerCase());
        //this.codeMirror.on('change', this.codemirrorValueChanged);
        //this.codeMirror.on('focus', this.focusChanged.bind(this, true));
        //this.codeMirror.on('blur', this.focusChanged.bind(this, false));
        //this._currentCodemirrorValue = this.props.defaultValue || this.props.value || '';
        //this.codeMirror.setValue(this._currentCodemirrorValue);
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
        this.codeMirror.setOption("value", newCode);
    }

    render() {
        return (
            <div className="editorContainer">
                <textarea ref="textarea" name={this.props.path} defaultValue={this.props.snippet.code} autoComplete="off"/>
            </div>
        );
    }

    
}

CodeEditor.propTypes = {
    snippet: React.PropTypes.object.isRequired
};

export default CodeEditor;