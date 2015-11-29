

class Main {
    constructor() {
        this.saveButton = document.getElementById("saveButton");
        this.saveButton.addEventListener("click", this.saveClicked.bind(this), false);

        // Init the text area
        let textArea = document.getElementById("mainTextArea");
        let codeMirrorOpts = {
            lineNumbers: true,
            theme      : "solarized dark"
        };
        this.codeEditor = CodeMirror.fromTextArea(textArea, codeMirrorOpts);
    }

    saveClicked(event) {
        let snippet = this.codeEditor.getValue();
        this.xmlPost("/save-snippet", {language: "javascript", snippet: snippet})
            .then(function() {
                console.log("Success");
            }).catch(function(err) {
                console.error("Error");
            })
    }

    xmlPost(url, params) {
        return new Promise(function(resolve, reject) {
            let xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    resolve();
                }
            };
            xhttp.onerror = function(err) {
                reject(err)
            };
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            let queryStr = Object.keys(params).reduce(function(a,k){a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&');
            xhttp.send(queryStr);
        });

    }
}

let main = new Main();
