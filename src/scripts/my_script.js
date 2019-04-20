(function() {
    chrome.storage.sync.get("feel_option", function(data) {
        let feelOption = parseInt(data["feel_option"]);
        if (feelOption === 1) {
            $("#feel_good").prop("checked", true);
        } else if (feelOption === 2) {
            $("#feel_better").prop("checked", true);
        } else if (feelOption === 3) {
            $("#feel_rockstar").prop("checked", true);
        }
    });

    chrome.storage.sync.get("feature_enabled", function (data) {
        let enabled = data["feature_enabled"];
        let enableDisableButton = $("#enable-disable");
        if (enabled === 1) {
            $(enableDisableButton).css("background-color", "#00e92d");
            $(enableDisableButton).attr("enabled", "yes");
            $(enableDisableButton).text("Enabled");
            $("#feel-options").removeClass("disableContent");
        } else {
            $(enableDisableButton).css("background-color", "#e95758");
            $(enableDisableButton).attr("enabled", "no");
            $(enableDisableButton).text("Disabled");
            $("#feel-options").addClass("disableContent");
        }
    });
})();

function reloadPage() {
    chrome.tabs.getSelected(null, function(tab) {
        var code = 'window.location.reload();';
        chrome.tabs.executeScript(tab.id, {code: code});
    });
}

$("input[type='radio']").click(function() {
    let feelOption = $("input[name='feel-type']:checked").val();
    if (feelOption !== undefined) {
        chrome.storage.sync.clear();
        chrome.storage.sync.set({"feature_enabled": 1}, function () { });
        chrome.storage.sync.set({"feel_option": feelOption}, function () { });
        reloadPage();
    }
});

$("#enable-disable").click(function() {
    let enableDisableButton = $("#enable-disable");
    let enabled = $(enableDisableButton).attr("enabled");

    if (enabled === "yes") {
        $(enableDisableButton).css("background-color", "#e95758");
        $(enableDisableButton).attr("enabled", "no");
        $(enableDisableButton).text("Disabled");
        $("#feel-options").addClass("disableContent");
        chrome.storage.sync.set({"feature_enabled": -1}, function () { });
    } else {
        $(enableDisableButton).css("background-color", "#00e92d");
        $(enableDisableButton).attr("enabled", "yes");
        $(enableDisableButton).text("Enabled");
        $("#feel-options").removeClass("disableContent");
        chrome.storage.sync.set({"feature_enabled": 1}, function () { });
    }
    reloadPage();
});