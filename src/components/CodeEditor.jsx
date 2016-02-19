import React from "react"

import Codemirror from "react-codemirror";

import CodeStore from "../stores/code.store.js";

export default class CodeEditor extends React.Component{

    constructor(props) {
        super(props);
        this.updateCode = this.updateCode.bind(this);
        this.state = {
            code    : CodeStore.getCode(),
            readOnly: false,
            mode    : CodeStore.getLanguage()
        };
        console.log("Logging language: ", CodeStore.getLanguage());
    }

    updateCode (newCode) {
        this.setState({
            code: newCode
        });
        console.log("Logging New state: ", this.state);
    }

    changeMode (e) {
        var mode = e.target.value;
        this.setState({
            mode: mode,
            code: defaults[mode]
        });
    }

    toggleReadOnly () {
        this.setState({
            readOnly: !this.state.readOnly
        }, () => this.refs.editor.focus());
    }

    interact(cm){
        console.log(cm.getValue());
    }

    render() {
        let options = {
            lineNumbers: true,
            readOnly   : this.state.readOnly,
            mode       : this.state.mode,
            theme      : "solarized dark"
        };
        return (
            <div className="editorContainer">
                <Codemirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} interact={this.interact}/>
            </div>
        );
    }

    /**
     * Event handler for 'change' events coming from the CodeStore
     */
    _onChange() {
        this.setState({
            code: CodeStore.getCode(),
            mode: CodeStore.getMode()
        });
    }
}