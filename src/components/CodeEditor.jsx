import React from "react"
import Codemirror from "react-codemirror";

import CodeStore from "../stores/CodeStore";
import CodeActions from "../actions/CodeActions";

export default class CodeEditor extends React.Component{

    constructor(props) {
        super(props);
        this.updateCode = this.updateCode.bind(this);
        this.state = {
            code    : CodeStore.getCode(),
            readOnly: false,
            mode    : CodeStore.getLanguage()
        };
    }

    componentDidMount () {
        CodeStore.listen(this._onChange.bind(this));
    }

    componentWillUnmount () {
        CodeStore.unlisten(this._onChange.bind(this));
    }

    updateCode (newCode) {
        CodeActions.updateCode(newCode);
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
            code: CodeStore.getCode()
        });
    }
}