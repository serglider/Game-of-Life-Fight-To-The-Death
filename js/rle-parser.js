var el = document.getElementById("results");
var patternUrl = "http://www.conwaylife.com/patterns/glider.cells";
var req;

// var iframe = document.getElementById("iframe");
// setTimeout(function funcname() {
//     console.log(iframe.contentWindow.document.body.innerHTML);
// }, 2000);

function makeRequest(url) {
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP");
            }catch (ev) {}
        }
    }
    if (!req) { return false; }
    req.onreadystatechange = showResponse;
    req.open("GET", url);
    req.send();
}

function showResponse() {
    if (req.readyState === 4 && req.status === 200) {
        el.textContent = req.responseText;
    }
}
window.open(patternUrl);


// makeRequest(patternUrl);