const urls = ["youtube.com", "bing.com"]

console.log("Loaded")

const rules = urls.map((current,index)=>{
    return (
        {
            "id": index+1,
            "priority": 1,
            "action": {"type": "block"},
            "condition": {"urlFilter":current, "resourceTypes": ["main_frame"]}
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