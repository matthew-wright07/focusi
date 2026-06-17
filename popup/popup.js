
async function getSites(){
    const result = await chrome.storage.local.get(["sites"])
    return result.sites || [];
}

let urls = await getSites()
console.log(urls)

const top = document.querySelector(".top")

function update(urls){
    top.innerHTML = ""

    urls.map((current,index)=>{

        const site = document.createElement("div")
        site.className = "site"

        const site_details = document.createElement("div")
        site_details.className = "site-details"
        site.appendChild(site_details)

        const logo = document.createElement("img")
        logo.src = `https://www.google.com/s2/favicons?domain=${current}&sz=64`
        logo.className = "site-logo"
        site_details.appendChild(logo)

        const paragraph = document.createElement("p")
        paragraph.innerHTML = current
        site_details.appendChild(paragraph)

        const trash = document.createElement("img")
        trash.src="../images/trash.svg"
        trash.className = "site-trash"
        trash.addEventListener("click",async ()=>{
            console.log("Cliked")
            urls.splice(index,1)
            await setSites(urls)
            urls = await getSites()
            update(urls)
            console.log(urls)
        })
        site.appendChild(trash)


        top.appendChild(site)
    })

}

update(urls)


async function addSite(newSite){
    await chrome.storage.local.set({sites:[...urls,newSite]})
}
async function setSites(urls){
    await chrome.storage.local.set({sites:urls})
}

const addButton = document.querySelector(".arrow-right")
const input = document.querySelector(".add-input")

addButton.addEventListener("click",async ()=>{
    await addSite(input.value)
    input.value = ""
    urls = await getSites()
    update(urls)
})

input.addEventListener("keydown",async (event)=>{
    if (event.key==="Enter"){
        event.preventDefault()
        await addSite(input.value)
        input.value = ""
        urls = await getSites()
        update(urls)
    }
})