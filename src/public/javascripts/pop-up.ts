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
  const target= document.getElementById(id);
  const popup = document.getElementById(id);
  if (!popup) return;
  popup.addEventListener('click', function () {
    // is-showを有効に
    target!.classList.add('is-show');
  });
}