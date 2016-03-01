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
        //this.codeMirror.on('change', this.codemirrorValueChanged);
        //this.codeMirror.on('focus', this.focusChanged.bind(this, true));
        //this.codeMirror.on('blur', this.focusChanged.bind(this, false));
        //this._currentCodemirrorValue = this.props.defaultValue || this.props.value || '';
        //this.codeMirror.setValue(this._currentCodemirrorValue);
    }

    componentWillUnmount() {
        // todo: is there a lighter-weight way to remove the cm instance?
        //if (this.codeMirror) {
        //    this.codeMirror.toTextArea();
        //}
    }

    componentWillReceiveProps(property) {
        let newLang = property.snippet.language.toLowerCase();
        let newCode = property.snippet.code;
        if (this.currentLanguage && this.currentLanguage != newLang) {
            // We need to load this new language
            let langInfo = CodeMirror.findModeByName(newLang);
            let mode = langInfo.mode;
            this.codeMirror.setOption("mode", langInfo.mime);
            CodeMirror.autoLoadMode(this.codeMirror, langInfo.mode);
            this.currentLanguage = newLang;
        }

    }

    getCodeMirror() {
        return this.codeMirror;
    }

    focus() {
        if (this.codeMirror) {
            this.codeMirror.focus();
        }
    }

    //focusChanged(focused) {
    //    this.setState({
    //        isFocused: focused
    //    });
    //    this.props.onFocusChange && this.props.onFocusChange(focused);
    //}

    //codemirrorValueChanged(doc, change) {
    //    const newValue = doc.getValue();
    //    this._currentCodemirrorValue = newValue;
    //    this.props.onChange && this.props.onChange(newValue);
    //}

    render() {
        return (
            <div className="editorContainer">
                <textarea ref="textarea" name={this.props.path} defaultValue={this.props.value} autoComplete="off"/>
            </div>
        );
    }

    
}

CodeEditor.propTypes = {
    snippet: React.PropTypes.object.isRequired
};

export default CodeEditor;