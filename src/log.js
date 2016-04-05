"use strict";

/**
 * Color constants. todo: is this used?
 */
export const LOG_COLOR = {
    black: "color: #000000",
    muted: "color: #888888",
    error: "font-weight: bold; color: #CC0000",
    warn : "font-weight: bold; color: #CC6600",
    info : "color: #0000CC",
    debug: "color: #008800",
    trace: "color:#CC00CC"
};

const LOG_STYLE = {
    default: "background-color: transparent; color:black;",
    unity  : "background-color: #FFD6D6; color:black;",
    browser: "background-color:#D0FFDE; color:black;",
    console: "background-color:#FFFCC; color:black;",

    // Different Level styles:
    error: "font-weight: bold; color: #CC0000; background-color:transparent",
    warn : "font-weight: bold; color: #CC6600",
    info : "color: #0000CC",
    debug: "color: #008800;",
    trace: "color:#CC00CC"
};

/**
 * Log level constants.
 */
export const LOG_LEVEL_NONE = 0; // No messages.
export const LOG_LEVEL_PRODUCTION = 1; // + production messages
export const LOG_LEVEL_ERROR = 2; // + error messages.
export const LOG_LEVEL_WARN = 3; // + warn messages.
export const LOG_LEVEL_INFO = 4; // + info messages.
export const LOG_LEVEL_DEBUG = 5; // + debug messages.
export const LOG_LEVEL_TRACE = 6; // + trace messages.

/**
 * No-op function.
 */
let noop = function () {
};

/**
 * Current logging settings.
 */
let LOG_LEVEL = LOG_LEVEL_NONE;

/**
 * Exported Log functions.
 */
export let error        = noop;
export let warn         = noop;
export let info         = noop;
export let debug        = noop;
export let trace        = noop;
export let production   = noop;

/**
 * Native console Log functions.
 */
export let console_error = noop;
export let console_warn  = noop;
export let console_info  = noop;
export let console_debug = noop;
export let console_trace = noop;

/**
 * Save native console methods, if it exists!
 */
let NativeConsole;
if (typeof window === "undefined") {
    // This is just for the tests
    var window = {};
}
if (!window.console) {
    NativeConsole = {
        trace: noop,
        debug: noop,
        log  : noop,
        info : noop,
        warn : noop,
        error: noop
    };
}
else {
    NativeConsole = {
        trace: console.trace,
        debug: console.debug,
        log  : console.log,
        info : console.info,
        warn : console.warn,
        error: console.error
    };
}

/**
 * Sets the log level.
 *
 * @param {0-6} level
 */
export let setLevel = function (level) {
    LOG_LEVEL = level;
    updateBindings();
};

/**
 * Returns the log level.
 */
export let getLevel = function() {
    return LOG_LEVEL;
};


let bindConsole = function(func, level) {
    if (LOG_LEVEL < level) {
        // Disabled.
        return noop;
    }

    // Calculate bindings.
    let modeStyle = "";
    let levelText = "";
    let levelStyle = "";

    switch (level) {
        case LOG_LEVEL_ERROR:
            levelText = "Error";
            levelStyle = LOG_STYLE.error;
            break;

        case LOG_LEVEL_WARN:
            levelText = "Warn";
            levelStyle = LOG_STYLE.warn;
            break;

        case LOG_LEVEL_INFO:
            levelText = "Info";
            levelStyle = LOG_STYLE.info;
            break;

        case LOG_LEVEL_DEBUG:
            levelText = "Debug";
            levelStyle = LOG_STYLE.debug;
            break;

        case LOG_LEVEL_TRACE:
            levelText = "Trace";
            levelStyle = LOG_STYLE.trace;
            break;
    }

    if (level === LOG_LEVEL_PRODUCTION) {
        // Production is raw output
        return func.bind(console);
    } else {
        return func.bind(console, "[%c" + levelText + "%c] ", levelStyle, LOG_STYLE.default);
    }

};



/**
 * Updates the console bindings.
 */
let updateBindings = function () {
    error = bindConsole(NativeConsole.error, LOG_LEVEL_ERROR);
    warn = bindConsole(NativeConsole.warn, LOG_LEVEL_WARN);
    info = bindConsole(NativeConsole.info, LOG_LEVEL_INFO);
    debug = bindConsole(NativeConsole.log, LOG_LEVEL_DEBUG);
    trace = bindConsole(NativeConsole.log, LOG_LEVEL_TRACE);
    production = bindConsole(NativeConsole.log, LOG_LEVEL_PRODUCTION);

    console_error = bindConsole(NativeConsole.error, LOG_LEVEL_ERROR);
    console_warn = bindConsole(NativeConsole.warn, LOG_LEVEL_WARN);
    console_info = bindConsole(NativeConsole.info, LOG_LEVEL_INFO);
    console_debug = bindConsole(NativeConsole.debug, LOG_LEVEL_DEBUG);
    console_trace = bindConsole(NativeConsole.log, LOG_LEVEL_TRACE);


    if (!window.console) {
        window.console = {};
    }
    // Remap native console to our methods.
    window.console.trace = console_trace;
    window.console.debug = console_debug;
    window.console.log = console_info;
    window.console.info = console_info;
    window.console.warn = console_warn;
    window.console.error = console_error;

    // For unity 5.1 WebGL exporter bug.
    window.console.logError = console_error;

    debug("Log settings updated.",
        "Level:", getLevel()
    )
};

/**
 * Add global logger object to window - Allows for easy debugging in the console.
 */
window.Logger = {
    getLevel         : getLevel,
    setLevel         : setLevel
};
