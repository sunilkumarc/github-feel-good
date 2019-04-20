let svgStarComponent = "<svg aria-label=\"stars\" class=\"octicon octicon-star\" viewBox=\"0 0 14 16\" version=\"1.1\" width=\"14\" height=\"16\" role=\"img\"><path fill-rule=\"evenodd\" d=\"M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z\"></path></svg>";
let svgForkComponent = "<svg aria-label=\"fork\" class=\"octicon octicon-repo-forked\" viewBox=\"0 0 10 16\" version=\"1.1\" width=\"10\" height=\"16\" role=\"img\"><path fill-rule=\"evenodd\" d=\"M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg>";

let FEEL_GOOD = 1;
let FEEL_BETTER = 2;
let FEEL_LIKE_ROCKSTAR = 3;

let FEEL_GOOD_MIN = 100;
let FEEL_GOOD_MAX = 1001;
let FEEL_BETTER_MIN = 1001;
let FEEL_BETTER_MAX = 10001;
let FEEL_ROCKSTAR_MIN = 10001;
let FEEL_ROCKSTAR_MAX = 100001;

let FEEL_GOOD_REPO_MIN = 50;
let FEEL_GOOD_REPO_MAX = 501;
let FEEL_BETTER_REPO_MIN = 501;
let FEEL_BETTER_REPO_MAX = 1001;
let FEEL_ROCKSTAR_REPO_MIN = 1001;
let FEEL_ROCKSTAR_REPO_MAX = 2001;

let FEEL_GOOD_CONTRIBUTION_LEVELS = ["#ebedf0", "#ebedf0", "#ebedf0", "#c6e48b", "#c6e48b", "#7bc96f"];
let FEEL_BETTER_CONTRIBUTION_LEVELS = ["#ebedf0", "#ebedf0", "#c6e48b", "#c6e48b", "#c6e48b", "#7bc96f", "#239a3b"];
let FEEL_LIKE_ROCKSTAR_CONTRIBUTION_LEVELS = ["#ebedf0", "#c6e48b", "#c6e48b", "#c6e48b", "#7bc96f", "#7bc96f", "#239a3b", "#239a3b", "#c6e48b", "#c6e48b", "#c6e48b", "#7bc96f", "#7bc96f", "#239a3b", "#239a3b"];

function getUsername() {
    let locationURL = window.location.href;
    return locationURL.split("/")[3];
}

function getStarsContainer(repoName, starsCount) {
    return "<a href=\"/"+getUsername()+"/"+repoName+"/stargazers\" class=\"pinned-item-meta muted-link\"><svg aria-label=\"stars\" class=\"octicon octicon-star\" viewBox=\"0 0 14 16\" version=\"1.1\" width=\"14\" height=\"16\" role=\"img\"><path fill-rule=\"evenodd\" d=\"M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z\"></path></svg> " + starsCount + "</a>";
}

function getForksContainer(repoName, forksCount) {
    return "<a href=\"/"+getUsername()+"/"+repoName+"/network\" class=\"pinned-item-meta muted-link\"><svg aria-label=\"fork\" class=\"octicon octicon-repo-forked\" viewBox=\"0 0 10 16\" version=\"1.1\" width=\"10\" height=\"16\" role=\"img\"><path fill-rule=\"evenodd\" d=\"M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z\"></path></svg> " + forksCount + "</a>";
}