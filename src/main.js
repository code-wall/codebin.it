

class Main {
    constructor() {
        let mainTextArea = document.getElementById("mainTextArea");
        let codeMirrorOpts = {
            lineNumbers: true,
            theme      : "solarized dark"
        };
        let myCodeMirror = CodeMirror.fromTextArea(mainTextArea, codeMirrorOpts);
    }
}

let main = new Main();
