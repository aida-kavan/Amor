let $ = document;

let ContactUs = $.getElementById("callUsicon")
let CloseBtn = $.getElementById("CloseBtn")
let CallUsContainer = $.querySelector(".callUs")

console.log(ContactUs);



ContactUs.addEventListener("click", function () {
    CallUsContainer.style.display = "inline"

})

CloseBtn.addEventListener("click", function () {
    CallUsContainer.style.display = "none"
})

document.body.innerHTML = document.body.innerHTML.replace(
    /\d/g,
    d => '۰۱۲۳۴۵۶۷۸۹'[d]
);
    


