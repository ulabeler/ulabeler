/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */
// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime() {
  // ふわっ

  $(".fadeInTrigger").each(function () {
    // fadeInTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeIn"); // 画面内に入ったらfadeInというクラス名を追記
    } else {
      $(this).removeClass("fadeIn"); // 画面外に出たらfadeInというクラス名を外す
    }
  });

  $(".fadeUpTrigger").each(function () {
    // fadeUpTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeUp"); // 画面内に入ったらfadeUpというクラス名を追記
    } else {
      $(this).removeClass("fadeUp"); // 画面外に出たらfadeUpというクラス名を外す
    }
  });

  $(".fadeDownTrigger").each(function () {
    // fadeDownTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeDown"); // 画面内に入ったらfadeDownというクラス名を追記
    } else {
      $(this).removeClass("fadeDown"); // 画面外に出たらfadeDownというクラス名を外す
    }
  });

  $(".fadeLeftTrigger").each(function () {
    // fadeLeftTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeLeft"); // 画面内に入ったらfadeLeftというクラス名を追記
    } else {
      $(this).removeClass("fadeLeft"); // 画面外に出たらfadeLeftというクラス名を外す
    }
  });

  $(".fadeRightTrigger").each(function () {
    // fadeRightTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("fadeRight"); // 画面内に入ったらfadeRightというクラス名を追記
    } else {
      $(this).removeClass("fadeRight"); // 画面外に出たらfadeRightというクラス名を外す
    }
  });

  // パタッ

  $(".flipDownTrigger").each(function () {
    // flipDownTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("flipDown"); // 画面内に入ったらflipDownというクラス名を追記
    } else {
      $(this).removeClass("flipDown"); // 画面外に出たらflipDownというクラス名を外す
    }
  });

  $(".flipLeftTrigger").each(function () {
    // flipLeftTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("flipLeft"); // 画面内に入ったらflipLeftというクラス名を追記
    } else {
      $(this).removeClass("flipLeft"); // 画面外に出たらflipLeftというクラス名を外す
    }
  });

  $(".flipLeftTopTrigger").each(function () {
    // flipLeftTopTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("flipLeftTop"); // 画面内に入ったらflipLeftTopというクラス名を追記
    } else {
      $(this).removeClass("flipLeftTop"); // 画面外に出たらflipLeftTopというクラス名を外す
    }
  });

  $(".flipRightTrigger").each(function () {
    // flipRightTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("flipRight"); // 画面内に入ったらflipRightというクラス名を追記
    } else {
      $(this).removeClass("flipRight"); // 画面外に出たらflipRightというクラス名を外す
    }
  });

  $(".flipRightTopTrigger").each(function () {
    // flipRightTopTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("flipRightTop"); // 画面内に入ったらflipRightTopというクラス名を追記
    } else {
      $(this).removeClass("flipRightTop"); // 画面外に出たらflipRightTopというクラス名を外す
    }
  });

  // くるっ

  $(".rotateXTrigger").each(function () {
    // rotateXTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("rotateX"); // 画面内に入ったらrotateXというクラス名を追記
    } else {
      $(this).removeClass("rotateX"); // 画面外に出たらrotateXというクラス名を外す
    }
  });

  $(".rotateYTrigger").each(function () {
    // rotateYTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("rotateY"); // 画面内に入ったらrotateYというクラス名を追記
    } else {
      $(this).removeClass("rotateY"); // 画面外に出たらrotateYというクラス名を外す
    }
  });

  $(".rotateLeftZTrigger").each(function () {
    // rotateLeftZTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("rotateLeftZ"); // 画面内に入ったらrotateLeftZというクラス名を追記
    } else {
      $(this).removeClass("rotateLeftZ"); // 画面外に出たらrotateLeftZというクラス名を外す
    }
  });

  $(".rotateRightZTrigger").each(function () {
    // rotateRightZTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("rotateRightZ"); // 画面内に入ったらrotateRightZというクラス名を追記
    } else {
      $(this).removeClass("rotateRightZ"); // 画面外に出たらrotateRightZというクラス名を外す
    }
  });

  // ボンッ

  $(".zoomInTrigger").each(function () {
    // zoomInTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("zoomIn"); // 画面内に入ったらzoomInというクラス名を追記
    } else {
      $(this).removeClass("zoomIn"); // 画面外に出たらzoomInというクラス名を外す
    }
  });

  // ヒュッ

  $(".zoomOutTrigger").each(function () {
    // zoomOutTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("zoomOut"); // 画面内に入ったらzoomOutというクラス名を追記
    } else {
      $(this).removeClass("zoomOut"); // 画面外に出たらzoomOutというクラス名を外す
    }
  });

  // じわっ

  $(".blurTrigger").each(function () {
    // blurTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("blur"); // 画面内に入ったらblurというクラス名を追記
    } else {
      $(this).removeClass("blur"); // 画面外に出たらblurというクラス名を外す
    }
  });

  // にゅーん

  $(".smoothTrigger").each(function () {
    // smoothTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("smooth"); // 画面内に入ったらsmoothというクラス名を追記
    } else {
      $(this).removeClass("smooth"); // 画面外に出たらsmoothというクラス名を外す
    }
  });

  // スーッ（枠線が伸びて出現）

  $(".lineTrigger").each(function () {
    // lineTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("lineanime"); // 画面内に入ったらlineanimeというクラス名を追記
    } else {
      $(this).removeClass("lineanime"); // 画面外に出たらlineanimeというクラス名を外す
    }
  });

  // シャッ（背景色が伸びて出現）

  $(".bgLRextendTrigger").each(function () {
    // bgLRextendTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("bgLRextend"); // 画面内に入ったらbgLRextendというクラス名を追記
    } else {
      $(this).removeClass("bgLRextend"); // 画面外に出たらbgLRextendというクラス名を外す
    }
  });

  $(".bgRLextendTrigger").each(function () {
    // bgRLextendTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("bgRLextend"); // 画面内に入ったらbgRLextendというクラス名を追記
    } else {
      $(this).removeClass("bgRLextend"); // 画面外に出たらbgRLextendというクラス名を外す
    }
  });

  $(".bgDUextendTrigger").each(function () {
    // bgDUextendTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("bgDUextend"); // 画面内に入ったらbgDUextendというクラス名を追記
    } else {
      $(this).removeClass("bgDUextend"); // 画面外に出たらbgDUextendというクラス名を外す
    }
  });

  $(".bgUDextendTrigger").each(function () {
    // bgUDextendTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("bgUDextend"); // 画面内に入ったらbgUDextendというクラス名を追記
    } else {
      $(this).removeClass("bgUDextend"); // 画面外に出たらbgUDextendというクラス名を外す
    }
  });

  $(".bgappearTrigger").each(function () {
    // bgappearTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("bgappear"); // 画面内に入ったらbgappearというクラス名を追記
    } else {
      $(this).removeClass("bgappear"); // 画面外に出たらbgappearというクラス名を外す
    }
  });

  $(".bgUDextendTrigger").each(function () {
    // bgUDextendTriggerというクラス名が
    const elemPos = $(this).offset().top - 50; // 要素より、50px上の
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();
    if (scroll >= elemPos - windowHeight) {
      $(this).addClass("bgUDextend"); // 画面内に入ったらbgUDextendというクラス名を追記
    } else {
      $(this).removeClass("bgUDextend"); // 画面外に出たらbgUDextendというクラス名を外す
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述
