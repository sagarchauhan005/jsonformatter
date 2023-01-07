chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        id: "format",
        title: 'JSON Formatter',
        contexts: ['selection'],
    });

    chrome.contextMenus.onClicked.addListener(function(info, tab) {
        if (info.menuItemId === "format") {
            if (info.selectionText) {
                let json = encodeURI(info.selectionText);
                chrome.scripting.executeScript({
                    target: {tabId: tab.id},
                    function: generateFormatUrl,
                    args: [json],
                });
            }
        }
    })
});

function generateFormatUrl(json) {
    // check if the url is a medium article
    let new_url = "https://jsonformatter.curiousconcept.com/?data="+json+"&process=true";
    console.log("new_url", new_url);
    window.open(new_url, "_blank");
}
