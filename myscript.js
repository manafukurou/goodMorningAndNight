function morning() {

    var urls = [

    ];

    for(var i = 0; i < urls.length; i++) {
        chrome.tabs.create({
            url: urls[i]
        });
    }
}

function goodNight() {

    var urls = [

    ];

    for(var i = 0; i < urls.length; i++) {
        chrome.tabs.create({
            url: urls[i]
        });
    }
}

document.getElementById("morning").onclick = function () {
    morning();
}
document.getElementById("morning_sys3").onclick = function () {
    morningSys3();
}
document.getElementById("mid").onclick = function () {
    mid();
}
document.getElementById("goodNight").onclick = function () {
    goodNight();
}

