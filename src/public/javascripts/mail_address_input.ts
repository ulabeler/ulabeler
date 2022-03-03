/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable camelcase */
// メールアドレスのバリデーション
const input_email = <HTMLInputElement>document.getElementById("mailaddress");
const error_message = <HTMLInputElement>(
  document.getElementById("error_message")
);
// @ts-ignore
const send = <HTMLButtonElement>document.getElementById("send")!;
// @ts-ignore
let disable_counter_email = 0;

input_email.addEventListener("keyup", function () {
  if (!mailCheck(input_email.value)) {
    error_message.innerText = "正しい形式で入力してください。";
    disable_counter_email++;
  } else {
    error_message.innerText = "";
    if (input_email.value.length == 0) {
      disable_counter_email++;
    } else {
      disable_counter_email = 0;
    }
  }
});

setInterval(function () {
  if (disable_counter_email === 0) {
    send.disabled = false;
  } else {
    send.disabled = true;
  }
}, 100);

// 送信ボタンを押したら、axiosで"/api/user/reset_password"にpostする"
send.addEventListener("click", function () {
  // @ts-ignore
  axios
    .post("/api/user/create/temp_password", {
      mail: input_email.value,
    })
    .then(function (response: { status: number }) {
      console.log(response);
      if (response.status == 201) {
        window.location.href = "/password_forgot/sent";
      } else {
        error_message.innerText =
          "入力されたメールアドレスは、登録されていません。";
      }
    })
    .catch(function (error: Error) {
      console.log(error);
    });
});
