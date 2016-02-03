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
        this.langButton = document.getElementById("languageButton");

        this.langLabel = document.getElementById("languageLabel");

        this.shareLinkIpt = document.getElementById("shareLinkIpt");
        this.languageSelect = document.getElementById("languageSelect");
        this.languageFilter = document.getElementById("languageFilter");


        this.languageList = document.getElementById("languageList");
        var languageListSrc = $("#languageListTemplate").html();
        this.languageListTemplate = Handlebars.compile(languageListSrc);

        this.textArea = document.getElementById("mainTextArea");

        // Event Listener
        this.saveButton.addEventListener("click", this.shareClicked.bind(this), false);
        this.langButton.addEventListener("click", this.openLanguageSelectDrawer, false);
        this.languageFilter.addEventListener("keyup", this.keypressLanguageFilter.bind(this), false)
        this.shareLinkIpt.addEventListener("click", this.clickShareLinkIpt.bind(this), false);
    }

    init() {
        this.codeEditor = new CodeEditor(this.textArea);
        // Initialise the language options side nav
        $(".languageOptions").sideNav();
        // Set display to block of body
        document.body.style.visibility = "visible";
        document.getElementsByTagName("html")[0].style.visibility = "visible";

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

    openLanguageSelectDrawer() {
       $(".languageOptions").sideNav('show');
    }

    setSupportedLangs(search=null) {
        let langs = this.codeEditor.getLanguages();
        if (search) {
            search = search.toLowerCase();
            let filtered = [];
            for (let lang of langs) {
                if (lang.name.toLowerCase().slice(0, search.length) === search) {
                    filtered.push(lang);
                }
                langs = filtered;
            }
        }
        let context = {languages: langs};
        let html = this.languageListTemplate(context);
        this.languageList.innerHTML = html;
    }

    keypressLanguageFilter(event) {
        this.setSupportedLangs(this.languageFilter.value);
    }

    setLanguage(lang) {
        console.log("Setting Language: ", lang);
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

window.MAIN = new MainDomHandler();
window.MAIN.init();
