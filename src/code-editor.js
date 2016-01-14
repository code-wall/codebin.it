"use strict";

import * as config from "./config";
import Utils from "./utils";


/**
 * Class wrap the CodeMirror library
 * and provides all the logic for saving
 * and getting a new code editor
 */
export default class CodeEditor {

    /**
     * Creates a new code editor from a text area
     * @param {DOMElement} textArea
     */
    constructor(textArea) {
        CodeMirror.modeURL = "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/%N/%N.min.js";
        this.options = {
            lineNumbers: true,
            theme      : "solarized dark"
        };
        this.events = new Map();

        this.codeMirror = CodeMirror.fromTextArea(textArea, this.options);
        this.codeMirror.on("focus", this.codeMirrorFocused.bind(this));

        // the Last value that was saved
        this.lastValue = "";

        // Whether content is to be persisted after first focus
        this.persistContent = false;
        window.MIRROR = this.codeMirror;
    }

    /**
     * Return the current value of the code editor
     * @returns {string}
     */
    getValue() {
        return this.codeMirror.getValue();
    }

    getLanguages() {
        return CodeMirror.modeInfo;
    }

    setLanguage(language) {
        let langInfo = CodeMirror.findModeByName(language);
        this.codeMirror.setOption("mode", langInfo.mime);
        CodeMirror.autoLoadMode(this.codeMirror, langInfo.mode);
        this.options.language = language;
    }

    setContent(content, persist=true) {
        this.persistContent = persist;
        this.options.value = content;
        this.codeMirror.setOption("value", content);
    }

    /**
     * Gets whether we should persist the the current data in the editor
     * @returns {*}
     */
    shouldPersist() {
        return this.persistContent;
    }

    /**
     * Callback for when our code mirror is
     * focussed
     */
    codeMirrorFocused() {
        this.emit("editor-focus");
    }

    /**
     * Register an event Handler
     * @param event
     * @param cb
     * @returns {*}
     */
    on(event, cb) {
       if (this.events.has(event)) {
           this.events.set(event, this.events.get(event).push(cb));
       } else {
           this.events.set(event, [cb]);
       }
    }

    /**
     * Emit an event, calls all the subscriber functions
     * @param event
     */
    emit(event) {
        if (this.events.has(event) ) {
            for (let cb of this.events.get(event)) {
                cb();
            }
        }
    }

    /**
     * Checks that the value has changed since the last save
     * and if so will make a post request to backend to save snippet
     * and create a new unique url that can be used to share snippet
     * @returns {Promise}
     */
    saveAndGetLink() {
        let snippet = this.codeMirror.getValue();
        let language = this.options.language;
        if (this.lastValue === snippet) {
            return Promise.resolve();
        }
        else {
            this.lastValue = snippet;
            return new Promise(function(resolve, reject) {
                Utils.xmlReq(
                    "/save",
                    "POST",
                    {language: language, snippet: snippet})
                    .then(function(resp) {
                        let snippetId = resp.id;
                        let shareLink = window.location.protocol + "//"
                                        + window.location.host
                                        + "?" + config.SNIPPET_QUERY_PARAM + "="
                                        + snippetId;
                        resolve(shareLink);
                    })
                    .catch(function(err) {
                        console.error("No post response");
                        reject("Error", err);
                    });
            });
        }

    }

}
