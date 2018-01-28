var refreshButton = document.getElementById("refresh");
var outputParagraph = document.getElementById("output");
var suggestion1 = document.getElementById("sugguestion1");
var suggestion2 = document.getElementById("sugguestion2");
var suggestion3 = document.getElementById("sugguestion3");


var requestStream = Rx.Observable.of('https://api.github.com/users');
var refreshStream = Rx.Observable.fromEvent(refreshButton, "click");

var responseMetastream = refreshStream.startWith("")
    .map(function () {
        var randomOffset = Math.floor(Math.random() * 500);
        return 'https://api.github.com/users?since=' + randomOffset;
    });

var responseStream = responseMetastream
    .flatMap(function (requestUrl) {
        return Rx.Observable.fromPromise($.getJSON(requestUrl));
    });


responseStream.subscribe(function (responseText) {
    responseText = responseText.slice(0, 3);
    suggestion1.innerHTML = buildGitHubHtml(responseText[0]);
    suggestion2.innerHTML = buildGitHubHtml(responseText[1]);
    suggestion3.innerHTML = buildGitHubHtml(responseText[2]);
});


function buildGitHubHtml(user) {

    return "<img src=\" " + user.avatar_url + " \"> </img>" + "<a href=" + user.html_url + ">" + user.login + "</a>";
}