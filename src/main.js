"use strict";

import CodeEditor from "./code-editor";
import Utils from "./utils";
import * as config from "./config";


/**
 * Class deals with all events from the DOM
 */
class MainDomHandler  {

    constructor() {
        this.codeEditor = null;

        // Dom objects
        this.saveButton = document.getElementById("saveButton");
        this.shareLinkIpt = document.getElementById("shareLinkIpt");
        this.languageSelect = document.getElementById("languageSelect");
        this.textArea = document.getElementById("mainTextArea");

        // Set initial language
        this.languageSelect.value = config.DEFAULT_LANG;

        // Event Listener
        this.saveButton.addEventListener("click", this.shareClicked.bind(this), false);
        this.languageSelect.addEventListener("change", this.changeLanguage.bind(this), false);
    }

    init() {
        this.codeEditor = new CodeEditor(this.textArea);

        // Check to seed if there is a query param for the snippet
        let snippetID = Utils.getQueryParam(config.SNIPPET_QUERY_PARAM);
        if (snippetID === "") {
            this.codeEditor.setContent(config.DEFAULT_CONTENT, false)
        } else {
            // We have an ID of a snippet
            let self = this;
            Utils.xmlReq("/snippet/" + snippetID, "GET")
                .then(function(resp) {
                    self.languageSelect.value = resp.language;
                    self.codeEditor.setContent(resp.snippet);
                    self.codeEditor.setLanguage(resp.language);
                }).catch(function(err) {
                    console.error("Error: ", err);
                    self.codeEditor.setContent(config.SNIPPET_NOT_FOUND, false);
                });
        }
        // Ad event handler for editor being focussed
        this.codeEditor.on('editor-focus', this.editorFocused.bind(this));
    }

    editorFocused() {
        //console.log(this.codeEditor.shouldPersist());
        if (!this.codeEditor.shouldPersist()) {
            this.codeEditor.setContent("");
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

    changeLanguage(event) {
        let newLang = this.languageSelect.value;
        this.codeEditor.setLanguage(newLang);
    }

    showShareLinkIpt(shown) {
        this.shareLinkIpt.style.display = shown ? "block" : "none";
    }

}

let main = new MainDomHandler();
main.init();
