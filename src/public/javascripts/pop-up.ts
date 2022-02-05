/* eslint-disable @typescript-eslint/no-unused-vars */
// const TargetButton = document.querySelectorAll('.js-popupLogin');
// const TargetButtonGetById = document.getElementById('js-popupLogin');
const TargetBlock = document.querySelector('.popup');
const blackBg = document.getElementById('js-black-bg');
const closeBtn = document.getElementById('js-close-btn');
const showBtn = document.getElementById('js-show-popup');
// ボタンが押されたら、ポップアップを表示する
/**
 * @return {void}
 */
function popup() {
  TargetBlock!.classList.add('is-show');
  closePopUp(blackBg);
  closePopUp(closeBtn);
  closePopUp(showBtn);
}

// ポップアップを閉じる
/**
 * @param {*} element
 * @return {void}
 */
function closePopUp(element: any) {
  if (!element) return;
  element.addEventListener('click', function () {
    // is-showを無効に
    TargetBlock!.classList.remove('is-show');
  });
}

// ポップアップを開く
/**
 * @param {string} id
 * @return {void}
 */
function showPopUp(id: string) {
  console.log(id);
  const target= document.getElementById(id);
  console.log(target);
    target!.classList.add('is-show');
    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
}