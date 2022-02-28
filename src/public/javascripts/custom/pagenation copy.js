let page = [];
for(let i = 0; i < 3; i++) {
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
