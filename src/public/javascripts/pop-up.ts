/* eslint-disable @typescript-eslint/no-unused-vars */
// const TargetBlock = document.querySelector('.popup');
// const blackBg = document.getElementById('js-black-bg');
// const blackBgClass = document.querySelectorAll('.js-black-bg');
// const closeBtn = document.getElementById('js-close-btn');
// const showBtn = document.getElementById('js-show-popup');

// ポップアップを開く
/**
 * @param {string} id
 * @return {void}
 */
function showPopUp(id: string) {
  console.log(id);
  const target = document.getElementById(id);
  console.log(target);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  target!.classList.add("is-show");
}

// ポップアップを閉じる
/**
 * @param {string} id
 * @return {void}
 */
function closePopUp(id: string) {
  console.log(id);
  const target = document.getElementById(id);
  console.log(target);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  target!.classList.remove("is-show");
}
