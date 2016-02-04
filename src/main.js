"use strict";

import CodeEditor from "./code-editor";
import Utils from "./utils";
import * as config from "./config";
import Shortcuts from "./shortcuts";


/**
 * Class deals with all events from the DOM
 */
class MainDomHandler  {

    constructor() {
        this.codeEditor = null;

        // Dom objects
        this.saveButton = document.getElementById("saveButton");
        this.langButton = document.getElementById("languageButton");

        this.langLabel = document.getElementById("languageLabel");

        this.shareLinkIpt = document.getElementById("shareLinkIpt");

        this.languageList = document.getElementById("languageList");
        this.textArea = document.getElementById("mainTextArea");

        // Event Listener
        this.saveButton.addEventListener("click", this.shareClicked.bind(this), false);
        this.langButton.addEventListener("click", this.openLanguageSelectDrawer, false);

        this.shareLinkIpt.addEventListener("click", this.clickShareLinkIpt.bind(this), false);
    }

    init() {
        this.codeEditor = new CodeEditor(this.textArea);
        // Initialise the language options side nav
        $(".languageOptions").sideNav();
        // Set display to block of body
        document.body.style.visibility = "visible";
        document.getElementsByTagName("html")[0].style.visibility = "visible";

        // Set save short cut
        Shortcuts.save(this.shareClicked.bind(this));
        Shortcuts.languageSelect(this.openLanguageSelectDrawer);
        Shortcuts.displayShortcuts(this.displayShortcutOptions);

        this.setSupportedLangs();
        this.codeEditor.setLanguage(config.DEFAULT_LANG);
        this.langLabel.innerHTML = config.DEFAULT_LANG;

        // Check to seed if there is a query param for the snippet
        let snippetID = Utils.getQueryParam(config.SNIPPET_QUERY_PARAM);
        if (snippetID === "") {
            this.codeEditor.setContent(config.DEFAULT_CONTENT, false);
        } else {
            // We have an ID of a snippet
            Utils.xmlReq("/snippet/" + snippetID, "GET")
                .then(resp => {
                    this.langLabel.innerHTML = resp.language;
                    this.codeEditor.setContent(resp.snippet);
                    this.codeEditor.setLanguage(resp.language);
                }).catch(err => {
                    console.error("Error: ", err);
                    this.codeEditor.setContent(config.SNIPPET_NOT_FOUND, false);
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

    displayShortcutOptions() {
      Materialize.toast('Not implemented', 1000);
    }

    openLanguageSelectDrawer() {
       $(".languageOptions").sideNav('show');
    }

    setSupportedLangs() {
        for (let lang of this.codeEditor.getLanguages()) {
            let option = document.createElement("li");
            option.innerHTML = lang.name;
            option.onclick = function() {this.setLanguage(lang.name)}.bind(this);
            this.languageList.appendChild(option);
        }
    }

    setLanguage(lang) {
        this.codeEditor.setLanguage(lang);
        this.langLabel.innerHTML = lang;
        $(".languageOptions").sideNav('hide');
    }

    shareClicked(event) {
        this.codeEditor.saveAndGetLink()
            .then(linkQueryParam => {
                if (linkQueryParam != null) {
                    $('#shareLinkModal').openModal();
                    this.shareLinkIpt.value = window.location.protocol + "//" + window.location.host + linkQueryParam;
                    this.shareLinkIpt.select();
                    this.copyToUsersClipboard();
                    this.setUrlPath("/" + linkQueryParam);
                } else {
                    Materialize.toast('You need to write some new code before saving', 3000);
                }
            })
            .catch(function(err) {
                console.error("Error: ", err);
            });
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

    setUrlPath(path) {
        window.history.pushState("", "", path);
    }

}

let main = new MainDomHandler();
main.init();
