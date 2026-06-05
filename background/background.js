chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed");
});


chrome.storage.onChanged.addListener(() => {
    updateRules()
});


async function getSites(){
    const result = await chrome.storage.local.get(["sites"])
    const urls = result.sites
    console.log(urls)
    return urls
}


async function updateRules(){

    let urls = await getSites()

    console.log(urls)


    console.log("Loaded")

    const rules = urls.map((current,index)=>{
        console.log(current)
        return (
            {
                "id": index+1,
                "priority": 1,
                "action": {"type": "block"},
                "condition": {urlFilter: `*://*${current}/*`,resourceTypes: ["main_frame"]}
            }
        )
    })

    console.log(rules)

    chrome.declarativeNetRequest.getDynamicRules((existingRules) => {

        const removeRuleIds = existingRules.map(rule => rule.id);
        chrome.declarativeNetRequest.updateDynamicRules(
            {
                removeRuleIds: removeRuleIds,
                addRules: rules
            }
        )

    })

    console.log("Blocked")

}

updateRules()