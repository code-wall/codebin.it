class Main {
    constructor() {
        let mainTextArea = document.getElementById("mainTextArea");
        let codeMirrorOpts = {
            lineNumbers: true,
            theme      : "solarized dark"
        };
        let myCodeMirror = CodeMirror.fromTextArea(mainTextArea, codeMirrorOpts);
        console.log(myCodeMirror);
    }
}

let main = new Main();