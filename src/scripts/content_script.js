(function() {
    // Do not update stars and forks if logged in profile is not same as user profile.
    let loggedInProfile = $(".header-nav-current-user a.user-profile-link strong");
    let userProfile = $(".vcard-names-container h1.vcard-names span.p-nickname");
    if (loggedInProfile === undefined
        || userProfile === undefined
        || (loggedInProfile.text() !== userProfile.text())) {
        return;
    }

    // Check if feature is enabled. If not, return.
    isFeatureEnabled().then(() => {
        console.log("Feature is enabled");
        chrome.storage.sync.get("feel_option", function (data) {
            let feelOption = data["feel_option"];
            if (feelOption === -1) {
                return;
            } else if (feelOption === undefined) {
                // Default mode, which is 1.
                feelOption = FEEL_GOOD;
                chrome.storage.sync.set({"feel_option": feelOption}, function () { });
            }
            makeDeveloperFeelDifferent(parseInt(feelOption));
        });
    }).catch((err) => {
        console.log("Feature is not enabled");
        return err;
    });
})();

function isFeatureEnabled() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get("feature_enabled", function(data) {
            console.log("Read feature_enabled: ", data);
            let enabled = data["feature_enabled"];
            if (enabled !== 1) {
                reject();
            } else {
                resolve();
            }
        });
    });
}

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    value =  Math.floor(Math.random() * (max - min)) + min;
    return value;
}

function getRepos() {
    return $(".pinned-items-list .pinned-item-list-item");
}

function getNewStarCount(FEEL_TYPE) {
    if (FEEL_TYPE === FEEL_BETTER) {
        return getRandomInt(FEEL_BETTER_MIN, FEEL_BETTER_MAX);
    } else if (FEEL_TYPE === FEEL_LIKE_ROCKSTAR) {
        return getRandomInt(FEEL_ROCKSTAR_MIN, FEEL_ROCKSTAR_MAX);
    }
    // By default, feel good.
    return getRandomInt(FEEL_GOOD_MIN, FEEL_GOOD_MAX);
}

function getNewRepositoriesCount(FEEL_TYPE) {
    if (FEEL_TYPE === FEEL_BETTER) {
        return getRandomInt(FEEL_BETTER_REPO_MIN, FEEL_BETTER_REPO_MAX);
    } else if (FEEL_TYPE === FEEL_LIKE_ROCKSTAR) {
        return getRandomInt(FEEL_ROCKSTAR_REPO_MIN, FEEL_ROCKSTAR_REPO_MAX);
    }
    // By default, feel good.
    return getRandomInt(FEEL_GOOD_REPO_MIN, FEEL_GOOD_REPO_MAX);
}

function getStarredCount(FEEL_TYPE) {
    if (FEEL_TYPE === FEEL_BETTER) {
        return getRandomInt(FEEL_BETTER_REPO_MIN*2, FEEL_BETTER_REPO_MAX*2);
    } else if (FEEL_TYPE === FEEL_LIKE_ROCKSTAR) {
        return getRandomInt(FEEL_ROCKSTAR_REPO_MIN*2, FEEL_ROCKSTAR_REPO_MAX*2);
    }
    // By default, feel good.
    return getRandomInt(FEEL_GOOD_REPO_MIN*2, FEEL_GOOD_REPO_MAX*2);
}

function getNewForkCount(FEEL_TYPE, starsCount) {
    let randomPercentage = getRandomInt(30, 70) / 100;
    return Math.ceil(randomPercentage * starsCount);
}

function updateStarsAndForksCount(starsAndForks, startAndForksParent, repoName, FEEL_TYPE) {
    chrome.storage.sync.get([repoName], function (repoDetails) {
        if (Object.keys(repoDetails).length === 0) {
            repoDetails = {};
            repoDetails.stars_count = getNewStarCount(FEEL_TYPE);
            repoDetails.forks_count = getNewForkCount(FEEL_TYPE, repoDetails.stars_count);
            storageObj = {};
            storageObj[repoName] = repoDetails;
            chrome.storage.sync.set(storageObj, function () { });
            repoDetails = storageObj;
        }

        let formattedStarsCount = kFormatter(repoDetails[repoName].stars_count);
        let formattedForksCount = kFormatter(repoDetails[repoName].forks_count);

        // Update Stars Count
        if (starsAndForks[0] === undefined) {
            let starsContainer = getStarsContainer(repoName, formattedStarsCount);
            $(startAndForksParent).append(starsContainer);
        } else {
            $(starsAndForks[0]).html(svgStarComponent + ' ' + formattedStarsCount);
        }

        // Update Forks Count
        if (starsAndForks[1] === undefined) {
            let forksContainer = getForksContainer(repoName, formattedForksCount);
            $(startAndForksParent).append(forksContainer);
        } else {
            $(starsAndForks[1]).html(svgForkComponent + ' ' + formattedForksCount);
        }
    });
}

function getContributionLevel(FEEL_TYPE) {
    if (FEEL_TYPE === FEEL_BETTER) {
        return FEEL_BETTER_CONTRIBUTION_LEVELS[Math.floor(Math.random()*FEEL_BETTER_CONTRIBUTION_LEVELS.length)];
    } else if (FEEL_TYPE === FEEL_LIKE_ROCKSTAR) {
        return FEEL_LIKE_ROCKSTAR_CONTRIBUTION_LEVELS[Math.floor(Math.random()*FEEL_LIKE_ROCKSTAR_CONTRIBUTION_LEVELS.length)];
    }
    // By default, feel good.
    return FEEL_GOOD_CONTRIBUTION_LEVELS[Math.floor(Math.random()*FEEL_GOOD_CONTRIBUTION_LEVELS.length)];
}

function updateContributionsTable(FEEL_TYPE) {
    let graphTableGs = $(".js-calendar-graph svg g g");
    for (let i = 0; i < graphTableGs.length; ++i) {
        let g = graphTableGs[i];
        let gRects = $(g).find("rect");
        for (let j = 0; j < gRects.length; ++j) {
            let contributionLevel = getContributionLevel(FEEL_TYPE);
            $(gRects[j]).attr("fill", contributionLevel);
        }
    }
}

function makeDeveloperFeelDifferent(FEEL_TYPE) {
    let repos = getRepos();
    for (let i = 0; i < repos.length; ++i) {
        let repo = repos[i];
        let startAndForksParent = $(repo).find(".pinned-item-list-item-content p:nth-child(3)");
        let starsAndForks = $(repo).find(".pinned-item-list-item-content p:nth-child(3) a");
        let repoName = $(repo).find(".pinned-item-list-item-content div a span").text();
        updateStarsAndForksCount(starsAndForks, startAndForksParent, repoName, FEEL_TYPE);
    }

    // Update Repo Count
    let repositoriesCount = getNewRepositoriesCount(FEEL_TYPE);
    let formattedRepoCount = kFormatter(repositoriesCount);
    $(".UnderlineNav-body :nth-child(2) span").text(formattedRepoCount);

    // Update Repo Count
    let starsCount = getStarredCount(FEEL_TYPE);
    let formattedStarsCount = kFormatter(starsCount);
    $(".UnderlineNav-body :nth-child(4) span").text(formattedStarsCount);

    // Update Repo Count
    let followersCount = getNewStarCount(FEEL_TYPE);
    let formattedFollowersCount = kFormatter(followersCount);
    $(".UnderlineNav-body :nth-child(5) span").text(formattedFollowersCount);

    updateContributionsTable(FEEL_TYPE);
}