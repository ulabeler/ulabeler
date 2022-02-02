// メールアドレスが正しい形式かを確認する
/**
 * @param {string} email - email address
 * @return {boolean}
 */
function mailCheck(email: string): boolean {
  const EmailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return EmailRegExp.test(email);
}
export { mailCheck };
