/* eslint-disable @typescript-eslint/ban-ts-comment */
$(function () {
  for (let i = 1; i <= 3; i++) {
    // @ts-ignore
    $("#box" + i).draggable();
  }
});
