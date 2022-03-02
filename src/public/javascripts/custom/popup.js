"use strict";
const TargetBlock = document.querySelector('.popup');
const blackBg = document.getElementById('js-black-bg');
const blackBgClass = document.querySelectorAll('.js-black-bg');
const closeBtn = document.getElementById('js-close-btn');
const showBtn = document.getElementById('js-show-popup');
function showPopUp(id) {
    console.log(id);
    const target = document.getElementById(id);
    console.log(target);
    target.classList.add('is-show');
}
function closePopUp(id) {
    console.log(id);
    const target = document.getElementById(id);
    console.log(target);
    target.classList.remove('is-show');
}
;