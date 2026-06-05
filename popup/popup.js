const urls = ["youtube.com","bing.com"]

const top = document.querySelector(".top")

urls.map(current=>{

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
    site.appendChild(trash)


    top.appendChild(site)
})

console.log(urls)