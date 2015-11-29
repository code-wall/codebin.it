import CodeEditor from "./code-editor.js";

class Main {
    constructor() {
        this.codeEditor = null;

        // Dom objects
        this.saveButton = document.getElementById("saveButton");
        this.shareLinkIpt = document.getElementById("shareLinkIpt");
        this.textArea = document.getElementById("mainTextArea");

        // Event Listener
        this.saveButton.addEventListener("click", this.shareClicked.bind(this), false);
    }

    init() {
        // Get URL path to determine if there is an id in it
        let snippetId = window.location.pathname.slice(1);
        // todo more work needed to determine if it is new or existing snippet
        this.codeEditor = new CodeEditor(this.textArea);
    }

    shareClicked(event) {
        let self = this;
        this.codeEditor.saveAndGetLink()
            .then(function(link) {
                self.showShareLinkIpt(true);
                self.shareLinkIpt.value = link;
                self.shareLinkIpt.select();
            })
            .catch(function(err) {
                console.error("Error: ", err);
            });
    }

    showShareLinkIpt(shown) {
        this.shareLinkIpt.style.display = shown ? "block" : "none";
    }

}

let main = new Main();
main.init();
