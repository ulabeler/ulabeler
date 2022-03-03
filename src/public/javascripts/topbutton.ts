/* eslint-disable no-invalid-this */
$(function () {
  const topBtn = $("#page-top");
  topBtn.hide();
  // スクロールが100に達したらボタン表示
  $(window).scroll(function () {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if ($(this).scrollTop() > 300) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  // スクロールしてトップ
  topBtn.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });
});
