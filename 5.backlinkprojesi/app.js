const modal = document.getElementById("modal");
const modalShow  = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const websiteName = document.getElementById("website-name");
const websiteUrl = document.getElementById("website-url");

const backLinksContainer = document.getElementById("backlinks-container");

const backLinkForm = document.getElementById("backlink form");

let backlinks = [];

function showModal(){
    modal.classList.add("show-modal");
    websiteName.focus();
    // modal form unu açtığı zaman website name den itibaren yazma işareti oto oalrka getirir
}

modalShow.addEventListener("click", showModal);


modalClose.addEventListener("click", ()=>{
    modal.classList.remove("show-modal")
});

function validate(nameValue,urlValue) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/g;
    const regex = new RegExp(expression);

    if(!nameValue || !urlValue ) {
        alert("Lütfen gerekli alanları kullanınız");
        return false;
    }

    if(!urlValue.match(regex)) {
        alert("Lütfen geçerli bir website adresi giriniz");
        return false;
    } 
    return true;
}


function deleteBackLink(url) {
    backlinks.forEach((backlink, i) => {
        if(backlink.url === url){
            backlinks.splice(i,1)
        }
    });
    localStorage.setItem("backlinks", JSON.stringify(backlinks));
    fetchBackLinks();
}

function  buildBackLinks() {

    backLinksContainer.textContent = "";
    backlinks.forEach((backlink)=>{
        const {name,url} = backlink
        // bunu reactte daha detaylı göricez
        // backlink içindeki name ve url i başka birdeğişkene atamak yerine destructr yapıyoruz
        const item = document.createElement("div");
        item.classList.add("item");
        const closeIcon = document.createElement("i");        
        closeIcon.classList.add("fas", "fa-times");
        closeIcon.setAttribute("onclick", `deleteBackLink('${url}')`);


        const linkInfo = document.createElement("div");
        linkInfo.classList.add("name");

        const link = document.createElement("a");
        link.setAttribute("href", `${url}`);
        link.setAttribute("target", "_blank");
        link.textContent = name;


        linkInfo.appendChild(link);
        item.append(closeIcon, linkInfo);
        // item.appendChild(closeIcon);
        // item.appendChild(linkInfo);
        backLinksContainer.appendChild(item);
    })
}



function fetchBackLinks() {
    if(localStorage.getItem("backlinks")) {
        backlinks = JSON.parse(localStorage.getItem("backlinks"));
    }
    buildBackLinks();
}

function storeBackLink(e){
    e.preventDefault();
    const nameValue = websiteName.value;
    let urlValue = websiteUrl.value;

    if(!urlValue.includes("https://" && !urlValue.includes("http://")))
    {
       urlValue = `https://${urlValue}`;
    }
    console.log(nameValue, urlValue);

    if(!validate(nameValue, urlValue)){
        return false;
    };

    const backlink = {
        name: nameValue,
        url: urlValue
    }
    backlinks.push(backlink);
    localStorage.setItem("backlinks", JSON.stringify(backlinks));
    modal.classList.remove("show-modal");
    fetchBackLinks();
    backLinkForm.reset();
    websiteName.focus();

}

// js objesini json  a çevirmk için JSON.stringify() kullanılır
// json ifadeyi js objesine çevirmek için JSON.parse()

backLinkForm.addEventListener("submit", storeBackLink);

fetchBackLinks();