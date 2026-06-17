async function getSites(){
    const result = await chrome.storage.local.get(["sites"])
    return result.sites || [];
}


chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)=>{
    const blockedSites = await getSites()

    if (!tab.url || changeInfo.status !== "complete") return;
    console.log(changeInfo.url)
    const hostname = new URL(tab.url).hostname;

    console.log(blockedSites)

    const blocked = blockedSites.some(site =>
        hostname === site || hostname.endsWith("." + site)
    );

    if (blocked) {
        chrome.tabs.update(tabId, {
            url: "https://www.google.com"
        });
    }
})