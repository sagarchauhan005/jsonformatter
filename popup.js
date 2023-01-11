// Initialize butotn with users's prefered color
let format = document.getElementById("format");

// When the button is clicked, inject setPageBackgroundColor into current page
format.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true }) ?? null;
    if(tab){
        let text = document.getElementById('unformatted_string').value ?? null;
        if(text !==null){
            text = encodeURI(text);
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: generateFormatUrl,
                args: [text],
            });
        }
    }else{
        console.log("No tab found !");
    }
});

// The body of this function will be execuetd as a content script inside the
// current page
function generateFormatUrl(json) {
    // check if the url is a medium article
    let new_url = "https://jsonformatter.curiousconcept.com/?data="+json+"&process=true";
    console.log("new_url", new_url);
    window.open(new_url, "_blank");
}
