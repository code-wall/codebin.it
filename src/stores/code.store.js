import * as config from "../config.js";

class CodeStore {

    constructor() {
        this.language = config.DEFAULT_LANG;
        this.code = config.DEFAULT_CONTENT;
    }

    getLanguage() {
        return this.language;
    }

    getCode() {
        return this.code;
    }

}

export default new CodeStore();
