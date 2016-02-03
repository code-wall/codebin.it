/**
 * The query param in the URL that defines contains
 * the snippet ID
 * @type {string}
 */
export const SNIPPET_QUERY_PARAM = "s";

/**
 * The language the editor is defaulted to on a new
 * editor when nothing is selected;
 * @type {string} - Possible values defined in cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/mode/meta.min.js
 */
export const DEFAULT_LANG =  "JavaScript";

/**
 * The default content of the editor if we are creating
 * a new editor
 * @type {string}
 */
export const DEFAULT_CONTENT = "// Enter your code here :)";

/**
 * String to display when we cant find users requested snippet
 * @type {string}
 */
export const SNIPPET_NOT_FOUND = "/**\n * Sorry We can't find the snipped you are looking for\n * Why not create a new one :) \n */";

/**
 * The status the server returns when request is succdessful
 * @type {string}
 */
export const RESPONSE_SUCCESS_STATUS = "ok";

/**
 * The status the server returns when request is unsuccessful
 * @type {string}
 */
export const RESPONSE_ERROR_STATUS = "error";

/** SHORTCUT KEYS **/

/**
 * Immutable keyboard letter code mappings
 * @type {object}
 */
export const KEYBOARD_LETTERS = Object.freeze({

  S: 83,
  L: 76

});