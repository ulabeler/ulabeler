/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// 変数定義
const confirmationCode = document.querySelectorAll('input[type="tel"]');
const isFirst = document.getElementById("isFirst");
const isLast = document.getElementById("isLast");
const sendButton = document.querySelector("#send");
const error_message5 = document.querySelector(".error_message5")!;
let rejectCount = 0;

// イベント設定
// confirmationCodeへは、0~9のみ入力可能、バックスペースも使用可能
for (let i = 0; i < confirmationCode.length; i++) {
  confirmationCode[i].addEventListener("keyup", function (e) {
    console.log(e.code);
    if (e.keyCode === 8 && e.target.value.length === 0) {
      if (confirmationCode[i] != isFirst) {
        confirmationCode[i - 1].focus();
        return;
      }
    }
    if (e.keyCode < 48 || e.keyCode > 57) {
      if (e.keyCode < 106 && e.keyCode > 95) {
        confirmationCode[i].value = e.code.slice(6);
      }
      if (e.keyCode == 8) {
        return;
      } else if (e.keyCode == 39 && confirmationCode[i] != isLast) {
        confirmationCode[i + 1].focus();
        return;
      } else if (e.keyCode == 37 && confirmationCode[i] != isFirst) {
        confirmationCode[i - 1].focus();
        return;
      } // テンキーの数字も許可
      // if (e.target.value.length > 0) {
      //   confirmationCode[i].value = e.code.slice(6);
      // }
      e.preventDefault();
    } else {
      if (e.target!.value.length > 0) {
        confirmationCode[i].value = e.code.slice(5);
      }
    }
    if (confirmationCode[i] != isLast) {
      if (e.target!.value.length === 1) {
        confirmationCode[i + 1].focus();
      }
    }
  });
}

function changeEmailAttempt() {
  const RegExp = /^[0-9]{1}$/;
  const confirmationCodeArrayToStr = Array.from(confirmationCode)
    .map(function (e) {
      // e.valueに0~9以外が入っていた場合
      if (!RegExp.test(e.value)) {
        rejectCount++;
        error_message5.innerHTML = "4桁の数字を入力してください";
      }
      return e.value;
    })
    .join("");
  console.log(confirmationCodeArrayToStr.length);
  console.log("rejectCount:" + rejectCount);
  if (rejectCount != 0) {
    rejectCount = 0;
    return;
  }
  if (rejectCount == 0) {
    error_message5.innerHTML = "";
  }

  // axiosを利用して、サーバーにPOSTリクエストを送信
  axios
    .post("/api/user/modification_mailaddress_attempt", {
      confirmationAttemptCode: confirmationCodeArrayToStr,
    })
    .then(function (response: { status: number; data: string }) {
      console.log(response);
      if (response.status == 201) {
        window.location.href = "/mail_address_modification/complete";
      } else {
        error_message5.innerHTML = response.data;
        return;
      }
    })
    .catch(function (error: Error) {
      console.log(error);
    });
}
