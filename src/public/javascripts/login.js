/* eslint-disable @typescript-eslint/no-unused-vars */
// 変数定義
const errorMessageArea = document.getElementById('login_errormessage');
const password = document.getElementById('password');
const username = document.getElementById('username');
// ログイン試行のためのメソッド
/**
 * @return {void}
 */
function loginAttempt() {
  // axiosを利用して、/api/user/sign_inへPOSTリクエストを送信
  axios.post('/api/user/v2_sign_in', {
    username: username.value,
    password: password.value,
  })
  // 401エラーが返ってきた場合、errorMessageAreaにinnerHTMLでエラーメッセージを表示
      .then(function(response) {
        if (response.data === false) {
          // errorMessageAreaにclass=login_error_boxを追加
          errorMessageArea.classList.add('login_error_box');
          errorMessageArea.innerHTML = '<p>入力されたユーザーIDまたはパスワードが正しくありません。<br>ユーザーIDとパスワードを確認して、もう一度お試しください。</p>';
        } else if (response.data === true) {
          errorMessageArea.innerHTML = '<p>ログインに成功しました。</p>';
          // ログインに成功した場合、ログインページを閉じる
          setTimeout(function() {
            window.location.href = '/';
          }, 1000);
        }
      });
}
