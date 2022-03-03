/* eslint-disable @typescript-eslint/no-unused-vars */
// 変数定義
const errorMessageArea = <HTMLInputElement>(
  document.getElementById("login_errormessage")
);
const password = <HTMLInputElement>document.getElementById("password");
const username = <HTMLInputElement>document.getElementById("username");
// ログイン試行のためのメソッド
/**
 * @return {void}
 */
function loginAttempt() {
  // axiosを利用して、/api/user/sign_inへPOSTリクエストを送信
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios
    .post("/api/user/v2_sign_in", {
      username: username.value,
      password: password.value,
    })
    // 401エラーが返ってきた場合、errorMessageAreaにinnerHTMLでエラーメッセージを表示
    .then(function (response: { data: boolean }) {
      if (response.data === false) {
        // errorMessageAreaにclass=login_error_boxを追加
        errorMessageArea.classList.add("login_error_box");
        errorMessageArea.innerHTML =
          "<p>入力されたユーザーIDまたはパスワードが正しくありません。<br>ユーザーIDとパスワードを確認して、もう一度お試しください。</p>";
      } else if (response.data === true) {
        // errorMessageArea.classListにlogin_error_boxがある場合は削除
        errorMessageArea.classList.remove("login_error_box");
        errorMessageArea.innerHTML = "<p>ログインに成功しました。</p>";
        // ログインに成功した場合、ログインページを閉じる
        setTimeout(function () {
          window.location.href = "/";
        }, 1000);
      }
    })
    .catch(function (error: Error) {
      // 400が帰ってきたら、errorMessageAreaにinnerHTMLでエラーメッセージを表示
      errorMessageArea.classList.add("login_error_box");
      errorMessageArea.innerHTML =
        "<p>ユーザID、またはパスワードを入力してください。</p>";
    });
}

// passwordにフォーカスが当たっている状態で、Enterキーが押されたらloginAttemptを実行
password.addEventListener("keydown", function (event: KeyboardEvent) {
  if (event.keyCode === 13) {
    loginAttempt();
  }
});
