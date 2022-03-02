/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// 変数定義
const CurrentPassword = <HTMLInputElement>(
  document.querySelector(".CurrentPassword")
);
const NewPassword = document.querySelectorAll(".NewPassword");
const errorCurrentPassword = document.querySelector(".errorCurrentPassword")!;
const errorNewPassword = document.querySelector(".errorNewPassword")!;
// @ts-ignore
const send = <HTMLButtonElement>document.getElementById("send");
// @ts-ignore
let DisableCounterPassword = 0;
// @ts-ignore
let ConfirmRejectCounterPassword = 0;
// イベント設定
NewPassword[0].addEventListener("keyup", function () {
  validateNewPassword(0);
});
NewPassword[1].addEventListener("focusout", function () {
  // NewPassword[0].valueと一致するかを確認
  checkPasswordConfirm();
});

// パスワードバリデーション
/**
 * @param {number} i なんだっけ
 */
function validateNewPassword(i: number) {
  // @ts-ignore
  if (NewPassword[i].value.length < 8) {
    // @ts-ignore
    errorNewPassword.innerText = "8文字以上で入力してください";
    DisableCounterPassword++;
    // @ts-ignore
  } else if (NewPassword[i].value.length > 20) {
    // @ts-ignore
    errorNewPassword.innerText = "20文字以内で入力してください";
    DisableCounterPassword++;
    // @ts-ignore
  } else if (NewPassword[i].value.match(/[^a-zA-Z0-9_\-\.]/)) {
    // @ts-ignore
    errorNewPassword.innerText =
      "使用できる文字は、半角英数字、アンダーバー、ハイフン、ピリオドのみです";
    DisableCounterPassword++;
    // @ts-ignore
  } else if (!NewPassword[i].value.match(/[a-z]/)) {
    // @ts-ignore
    errorNewPassword.innerText = "大文字小文字を最低41つ以上含めてください";
    DisableCounterPassword++;
    // @ts-ignore
  } else if (!NewPassword[i].value.match(/[A-Z]/)) {
    // @ts-ignore
    errorNewPassword.innerText = "大文字小文字を最低1つ以上含めてください";
    DisableCounterPassword++;
  } else {
    // @ts-ignore
    errorNewPassword.innerText = "";
    // @ts-ignore
    if (NewPassword[i].value.length == 0) {
      DisableCounterPassword++;
    } else {
      DisableCounterPassword = 0;
    }
  }
}

// @ts-ignore
// eslint-disable-next-line require-jsdoc
function checkPasswordConfirm() {
  // @ts-ignore
  if (NewPassword[0].value !== NewPassword[1].value) {
    errorNewPassword.innerHTML =
      "新しいパスワードと確認用パスワードが一致しません。";
    DisableCounterPassword++;
    ConfirmRejectCounterPassword++;
    send.disabled = true;
  } else {
    errorNewPassword.innerHTML = "";
    DisableCounterPassword = 0;
    ConfirmRejectCounterPassword = 0;
    send.disabled = false;
  }
}

setInterval(function () {
  if (DisableCounterPassword === 0) {
    send.disabled = false;
  } else {
    send.disabled = true;
  }
  if (ConfirmRejectCounterPassword > 0) {
    checkPasswordConfirm();
  }
}, 100);

// NewPasswordを持つ全ての要素のvalueが一致しているかを確認する
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line require-jsdoc
function changePasswordAttempt() {
  // CurrentPasswordが空でないかを確認
  if (CurrentPassword.value.length === 0) {
    // @ts-ignore
    errorCurrentPassword.innerText = "現在のパスワードを入力してください。";
    return false;
  } else {
    // @ts-ignore
    errorCurrentPassword.innerText = "";
  }
  checkPasswordConfirm();
  // axiosでPOST送信
  // @ts-ignore
  axios
    .post("/api/user/password/changeAttempt", {
      CurrentPassword: CurrentPassword.value,
      // @ts-ignore
      NewPassword: NewPassword[0].value,
    })
    .then(function (response: { status: number; data: any }) {
      console.log(response);
      if (response.status == 201) {
        location.href = "/reset_password/complete";
        // 200かつ、回答がTemp Password is wrong
      } else if (response.status == 200) {
        console.log(response.status);
        // @ts-ignore
        errorCurrentPassword.innerText = response.data;
      }
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
