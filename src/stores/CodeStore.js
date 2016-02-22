import alt from "../alt.js";
import * as config from "../config.js";
import CodeActions from "../actions/CodeActions.js";

class CodeStore {

    constructor() {
        this.language = config.DEFAULT_LANG;
        this.code = config.DEFAULT_CONTENT;

        this.bindListeners({
            handleUpdateCode: CodeActions.UPDATE_CODE
        });

        this.exportPublicMethods({
            getLanguage: this.getLanguage.bind(this),
            getCode    : this.getCode.bind(this)
        })
    }

    handleUpdateCode(code) {
        this.code = code;
    }

    getLanguage() {
        return this.language;
    }

    getCode() {
        return this.code;
    }

}

export default alt.createStore(CodeStore, "CodeStore");
