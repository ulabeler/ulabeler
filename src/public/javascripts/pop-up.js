  const target_button = document.querySelectorAll(".js-popup_login");
  const target_button_getbyId = document.getElementById("js-popup_login");
  const target_block = document.querySelector(".popup");
  const blackBg = document.getElementById('js-black-bg');
  const closeBtn = document.getElementById('js-close-btn');
  const showBtn = document.getElementById('js-show-popup');

  // target_button.forEach(function(button) {
  //   button.addEventListener("click", function() {
  //     console.log('click');
  //     target_block.classList.add('is-show');

  //     closePopUp(blackBg);
  //     closePopUp(closeBtn);
  //     closePopUp(showBtn);
  //   });
  // });

  function popup_login() {
    target_block.classList.add('is-show');
    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);
  }

  function closePopUp(elem) {
    if(!elem) return;
    elem.addEventListener('click', function() {
      //is-showを無効に
      target_block.classList.remove('is-show');
      });
  }