import * as types from "../constants/ActionTypes";


export function setCode(code) {
    return {type: types.SET_CODE, code: code};
}

function setLanguage(language) {
    return {type: types.SET_LANGUAGE, language: language};
}

export function loadLanguage(language) {
    return (dispatch, getState) => {

        console.log("Loading language");
        let loadDir = "codemirror/mode/";
        let langInfo = CodeMirror.findModeByName(language);
        let mode = langInfo.mode;
        let langMime = langInfo.mime;
        //if (!CodeMirror.modes.hasOwnProperty(mode)) {
        //    CodeMirror.requireMode(mode, function() {
        //        console.log("SUCCESFFUULY LOASED MODE LIB");
        //        dispatch(setLanguage(langMime));
        //    });
        //}
        //console.log("Language: ", language);
        //console.log("Mode:", language);
        //console.log("Mime: ", langMime);
        //System.import(loadDir + mode + "/" + mode).then(function(m) {
        //    console.log("SUCCESFFUULY LOASED LIB");
        //    console.log(m);
        //    console.log("Codemirror Mode 1: ", CodeMirror.modes);
        //    dispatch(setLanguage(langMime));
        //});
        dispatch(setLanguage(language));
    }
}