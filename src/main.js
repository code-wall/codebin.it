"use strict";

import CodeEditor from "./code-editor";
import * as config from "./config";

class Main {

    constructor() {
        this.codeEditor = null;

        // Dom objects
        this.saveButton = document.getElementById("saveButton");
        this.shareLinkIpt = document.getElementById("shareLinkIpt");
        this.languageSelect = document.getElementById("languageSelect");
        this.textArea = document.getElementById("mainTextArea");

        // Event Listener
        this.saveButton.addEventListener("click", this.shareClicked.bind(this), false);
        this.languageSelect.addEventListener("change", this.changeLanguage.bind(this), false);
    }

    init() {
        // Check to seed if there is a query param for the snippet
        let snippetID = this.getQueryParam(config.SNIPPET_QUERY_PARAM);
        if (snippetID != "") {
            // We have an ID of a snippet
            let self = this;
            CodeEditor.xmlReq("/snippet/" + snippetID, "GET")
                .then(function(resp) {
                    self.textArea.value = resp.snippet;
                    self.languageSelect.value = resp.language;
                    self.codeEditor = new CodeEditor(self.textArea);
                    self.codeEditor.setLanguage(resp.language);
                }).catch(function(err) {
                    console.error("Error: ", err);
                });
        } else {
            this.codeEditor = new CodeEditor(this.textArea);
        }

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

    getQueryParam(param) {
        param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
        let results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    changeLanguage(event) {
        let newLang = this.languageSelect.value;
        this.codeEditor.setLanguage(newLang);
    }

    showShareLinkIpt(shown) {
        this.shareLinkIpt.style.display = shown ? "block" : "none";
    }

}

let main = new Main();
main.init();
