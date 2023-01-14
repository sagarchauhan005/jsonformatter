chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.active) {
        chrome.contextMenus.removeAll(function() {
            chrome.contextMenus.create({
                id: "format",
                title: 'JSON Formatter',
                contexts: ['selection']
            });
        });
    }
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    console.log("context menu was clicked");
    if (info.menuItemId === "format") {
        if (info.selectionText) {
            let json = encodeURI(info.selectionText);
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                function: generateFormatUrl,
                args: [json],
            });
        }
    }else{
        console.log("something went wrong");
    }
})

// chrome.runtime.onInstalled.addListener(function() {
//     initContextMenu();
// });

function generateFormatUrl(json) {
    // check if the url is a medium article
    let new_url = "https://jsonformatter.curiousconcept.com/?data="+json+"&process=true";
    console.log("new_url", new_url);
   window.open(new_url, "_blank");
}
