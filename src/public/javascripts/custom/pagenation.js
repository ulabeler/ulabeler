let page = [];
for(let i = 0; i < 7; i++) {
    page[i] = document.getElementById(`page${i+1}`)
}

// console.log(page);
const removeclass = (page) => {
    document.querySelector(".current").classList.remove("current");
    document.querySelector(page).classList.add("current");
}
page[0].addEventListener("click", function() {
    removeclass(".stp1"); 
});
page[1].addEventListener("click", function() {
    removeclass(".stp2");
});
page[2].addEventListener("click", function() {
    removeclass(".stp3");
});
page[3].addEventListener("click", function() {
    removeclass(".stp4");
});
page[4].addEventListener("click", function() {
    removeclass(".stp5");
});
page[5].addEventListener("click", function() {
    removeclass(".stp6");
});
page[6].addEventListener("click", function() {
    removeclass(".stp7");
});
