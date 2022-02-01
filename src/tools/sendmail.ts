export { sendMail };
const NodeMailer = require('nodemailer');
// const dotenv = require('dotenv');
//  dotenv.config(); //単体デバッグ用
const mail_auth_user = process.env.U_MAIL_AUTH_USER;
const mail_auth_host = process.env.U_MAIL_AUTH_HOST;
const mail_auth_port = process.env.U_MAIL_AUTH_PORT;
const mail_auth_password = process.env.U_MAIL_AUTH_PASSWORD;
const mailText = require('./data/mailText.json'); //そのうちDBに格納してもいいかもしれない

import { mailData } from '../mailData_alias';

const smtpData = {
    host: mail_auth_host,
    port: mail_auth_port,
    secure: false,
    auth: {
        user: mail_auth_user,
        pass: mail_auth_password
    },
    tls: {
        ciphers: 'SSLv3'
    }
}

function sendMail(scene: string, send_to: string, html?: string) {
    const transporter = NodeMailer.createTransport(smtpData)
    const mailData:mailData = {
        from: '"Ulabeler" <' + smtpData.auth.user + '>',
        to: send_to,
        subject: mailText[scene].subject,
        text: mailText[scene].text,
        html: mailText[scene].html
    }

    if (html) {
        mailData.html = html;
    }

    // メール送信
    transporter.sendMail(mailData, function (error: any, info: { response: string; }) {
        if (error) {
            // エラー処理
            console.log('Error:' + error)
        } else {
            // 送信時処理
            console.log('Email sent: ' + info.response)
        }
    })
}

// 実行 単体デバッグ用。dotenvの設定をしていないとエラーになる
//sendMail("sign_up_complete", "na2na@na2na.dev")
// main("nagarebosi429@gmail.com")