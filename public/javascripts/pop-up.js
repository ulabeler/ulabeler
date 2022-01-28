function popupImage() {
    var popup = document.getElementById('js-popup');
    if(!popup) return;
  
    var blackBg = document.getElementById('js-black-bg');
    var closeBtn = document.getElementById('js-close-btn');
    var showBtn = document.getElementById('js-show-popup');
  
    closePopUp(blackBg);
    closePopUp(closeBtn);
    closePopUp(showBtn);

    function closePopUp(elem) {
      if(!elem) return;
      elem.addEventListener('click', function() {
        popup.classList.toggle('is-show');
        });
    }
  }

  popupImage();

  // function popupImage() {
  //   var popup = document.getElementById('js-popup2');
  //   if(!popup) return;
  
  //   var blackBg = document.getElementById('js-black-bg2');
  //   var closeBtn = document.getElementById('js-close-btn2');
  //   var showBtn = document.getElementById('js-show-popup2');
  
  //   closePopUp(blackBg);
  //   closePopUp(closeBtn);
  //   closePopUp(showBtn);

  //   function closePopUp(elem) {
  //     if(!elem) return;
  //     elem.addEventListener('click', function() {
  //       popup.classList.toggle('is-show');
  //       });
  //   }
  // }
  // popupImage();