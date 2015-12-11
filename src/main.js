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

        // Event Listener
        this.saveButton.addEventListener("click", this.shareClicked.bind(this), false);
        this.languageSelect.addEventListener("change", this.changeLanguage.bind(this), false);
        this.shareLinkIpt.addEventListener("click", this.clickShareLinkIpt.bind(this), false);
    }

    init() {
        this.codeEditor = new CodeEditor(this.textArea);

        this.setSupportedLangs();
        this.languageSelect.value = config.DEFAULT_LANG;
        this.codeEditor.setLanguage(config.DEFAULT_LANG);

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
        if (!this.codeEditor.shouldPersist()) {
            this.codeEditor.setContent("");
        }
    }

    setSupportedLangs() {
        for (let lang of this.codeEditor.getLanguages()) {
            let option = document.createElement("option");
            option.value = lang.name;
            option.innerHTML = lang.name;
            this.languageSelect.appendChild(option);
        }
    }

    shareClicked(event) {
        let self = this;
        this.codeEditor.saveAndGetLink()
            .then(function(link) {
              if (link != null) {
                self.showShareLinkIpt(true);
                self.shareLinkIpt.value = link;
                self.shareLinkIpt.select();
                self.copyToUsersClipboard();
              }
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
        this.shareLinkIpt.style.display = shown ? "inline-block" : "none";
    }

    clickShareLinkIpt(event) {
        this.shareLinkIpt.select();
        // Try to Copy to users clipboard
        this.copyToUsersClipboard();
    }

    /**
     * Copy whatever is currently selected in the browser
     * to the users clipboard
     * @todo: Inform user it has been copied to their clipboard
     */
    copyToUsersClipboard() {
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
        }
    }

}

let main = new MainDomHandler();
main.init();
