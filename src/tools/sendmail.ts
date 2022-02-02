export { sendMail };
import NodeMailer from "nodemailer";
// const dotenv = require('dotenv');
//  dotenv.config(); //単体デバッグ用
const mailAuthUser = process.env.U_MAIL_AUTH_USER;
const mailAuthHost = process.env.U_MAIL_AUTH_HOST;
const mailAuthPort = process.env.U_MAIL_AUTH_PORT;
const mailAuthPassword = process.env.U_MAIL_AUTH_PASSWORD;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mailText = require("./data/mailText.json"); // そのうちDBに格納してもいいかもしれない

const smtpData: NodeMailer.SentMessageInfo = {
  host: mailAuthHost,
  port: mailAuthPort,
  secure: false,
  auth: {
    user: mailAuthUser,
    pass: mailAuthPassword,
  },
  tls: {
    ciphers: "SSLv3",
  },
};

// メールを送信するメソッド
/**
 * @param {string} scene - 送信するシーン。jsonのキーとして利用されています。
 * @param {string} sendTo - 送信先メールアドレス
 * @param {string} html - HTML形式のメール本文
 * @return {void}
 */
function sendMail(scene: string, sendTo: string, html?: string): void {
  const transporter = NodeMailer.createTransport(smtpData);
  const mailData: NodeMailer.SentMessageInfo = {
    from: '"Ulabeler" <' + smtpData.auth.user + ">",
    to: sendTo,
    subject: mailText[scene].subject,
    text: mailText[scene].text,
    html: mailText[scene].html,
  };
  if (html) {
    mailData.html = html;
  }

  // メール送信
  transporter.sendMail(
    mailData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (error: any, info: { response: string }) {
      if (error) {
        // エラー処理
        console.log("Error:" + error);
      } else {
        // 送信時処理
        console.log("Email sent: " + info.response);
      }
    }
  );
}

// 実行 単体デバッグ用。dotenvの設定をしていないとエラーになる
// sendMail("sign_up_complete", "na2na@na2na.dev")
// main("nagarebosi429@gmail.com")
