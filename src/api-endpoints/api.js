import "whatwg-fetch";

import * as config from "../constants/config.js";

/**
 *
 * @param {Request} request - The request object
 * @returns {*}
 */
function makeRequest(request) {
    return fetch(request)
        .then(response => response.json())
        .then(json => {
            if (json.status === config.RESPONSE_ERROR_STATUS) {
                throw json.message;
            } else {
                //return Promise.resolve(json.response);
                return json.response;
            }
        })
}

export function saveSnippet(code, language) {
    return new Promise((resolve, reject) => {
        let request = new Request(config.ROOT_HOST + "/save", {
            method     : 'POST',
            headers    : new Headers({
                'Accept'      : 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body       : "language=" + encodeURIComponent(language) +
            "&snippet=" + encodeURIComponent(code) +
            "&request_token=" + encodeURIComponent(config.CSRF_TOKEN),
            credentials: "include"
        });
        makeRequest(request)
            .then(resp => {
                resolve(resp);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function getSnippet(snippetId) {
    return new Promise((resolve, reject) => {
        let request = new Request(config.ROOT_HOST + "/snippet/" + snippetId, {});
        makeRequest(request)
            .then(resp => {
                resolve(resp);
            })
            .catch(err => {
                reject(err);
            });
    });
}



