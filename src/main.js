

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
        console.log("Save button Clicked");
        console.log(this.codeEditor.getValue());
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
                console.log("xhttp ready state: ", xhttp.readyState);
                console.log("status: ", xhttp.status);
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log("Response: ", xhttp.responseText);
                    resolve();
                }
            };
            xhttp.onerror = function(err) {
                console.error("Error in request");
                reject()
            };
            xhttp.open("POST", url, true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            let queryStr = Object.keys(params).reduce(function(a,k){a.push(k+'='+encodeURIComponent(params[k]));return a},[]).join('&');
            console.log(queryStr);
            xhttp.send(queryStr);
        });

    }
}

let main = new Main();
