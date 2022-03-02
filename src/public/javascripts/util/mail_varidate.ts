/* eslint-disable @typescript-eslint/no-unused-vars */
// メールアドレスの形式確認
/**
 *
 * @param {string} mail
 * @return {boolean} 形式が正しい場合はtrueを返します。
 */
function mailCheck(mail: string) {
  const EmailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EmailRegExp.test(mail);
}

// 引数に指定したメールアドレスが、すでに登録されているかを確認する
/**
 *
 * @param {string} email
 */
function isEmailAlreadyExists(email: string) {
  // 使えるようになりたい
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  axios
    .post("/api/user/check_email", {
      email: email,
    })
    .then(function (response: { data: string }) {
      console.log("In function:" + response.data);
      return response.data;
    });
}
