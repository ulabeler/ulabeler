/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-invalid-this */
$(document).on("ready", function () {
  // @ts-ignore
  $(".full-screen_one").slick({
    centerMode: true,
    centerPadding: "5%",
    dots: true,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 1000,
    infinite: true,
  });
  $(".full-screen_one").on(
    "afterChange",
    function (event, slick, currentSlide, nextSlide) {
      switch (currentSlide) {
        case 0:
          // 1枚目のスライド
          // @ts-ignore
          $(this).slick("slickSetOption", "autoplaySpeed", 10000);
          break;
        default:
          // その他のスライド
          // @ts-ignore
          $(this).slick("slickSetOption", "autoplaySpeed", 3500);
          break;
      }
    }
  );
});
