import React from "react"
import Codemirror from "react-codemirror";

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/go/go';
import 'codemirror/mode/python/python';

class CodeEditor extends React.Component{

    render() {
        const {snippet} = this.props;
        console.log("Snippet: ", snippet);
        let options = {
            lineNumbers: true,
            readOnly   : false,
            mode       : snippet.language.toLowerCase(),
            theme      : "solarized dark"
        };
        return (
            <div className="editorContainer">
                <Codemirror ref="editor" value={snippet.code} options={options}/>
            </div>
        );
    }
}

CodeEditor.propTypes = {
    snippet: React.PropTypes.object.isRequired
};

export default CodeEditor;