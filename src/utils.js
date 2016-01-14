"use strict";

import * as config from "./config";

export default class Utils {
    constructor() {

    }

    /**
     * Gets the current value of a query param if it exists in the current URL
     * @param param
     * @returns {string} - The param or and empty string
     */
    static getQueryParam(param) {
        param = param.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        let regex = new RegExp("[\\?&]" + param + "=([^&#]*)");
        let results = regex.exec(window.location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    /**
     * Static method that wraps XMLHttpRequest in a promise
     * @param {string} url - url to make the request to
     * @param {'POST'|'GET'} type
     * @param {object} params - optional params to pass
     * @returns {Promise}
     */
    static xmlReq(url, type, params={}) {
        return new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    let response = JSON.parse(xhttp.responseText);
                    if (response.status == config.RESPONSE_SUCCESS_STATUS) {
                        resolve(response.response);
                    } else {
                        // Reject entire response. Calling method can deal with error
                        reject(response);
                    }
                }
                else {
                    reject(xhttp.responseText + " code: " + xhttp.status);
                }
            };
            xhttp.onerror = function(err) {
                reject(err);
            };
            xhttp.onabort = function(err) {
                reject(err);
            };
            xhttp.open(type, url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            let token = document.getElementById('token').value;
            params['request_token'] = token;
            let queryStr = Object.keys(params).reduce((a, k) => {
                a.push(k + "=" + encodeURIComponent(params[k]));
                return a;
            }, []).join("&");

            xhttp.send(queryStr);
        });
    }
}
