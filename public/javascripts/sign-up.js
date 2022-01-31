// TODO
// - [x] 変数定義
// - [ ] バリデーション→メール関係が怪しい
// - [x] 実際にPOST
// - [x] 重複判定用API準備
// - [x] ユーザー名にMeCab使った形態素解析で不適切な文字をはじくAPIとかどうですかね
// - [ ]  エラーメッセージ関係→登録失敗時のエラーページどうする

// 入力値関係の変数
const input_username = document.getElementById('input_username');  //<%# 重複可能なユーザー名 %>
const input_userID = document.getElementById('input_userID'); //<%# 重複不可なユーザーID %>
const input_email = document.getElementById('input_email'); //<%# メールアドレス %>
const input_email_confirm = document.getElementById('input_email_confirm'); //<%# メールアドレス(確認用) %>
const input_password = document.getElementById('input_password'); //<%# パスワード %>
const input_password_confirm = document.getElementById('input_password_confirm'); //<%# パスワード(確認用) %>

//ボタン関係の定義
const send = document.getElementById('send');
let disable_counter_username = 0;
let disable_counter_userID = 0;
let disable_counter_email = 0;
let disable_counter_password = 0;
let confirm_reject_counter_email = 0;
let confirm_reject_counter_password = 0;

// エラー関係の表示用変数
const error_username = document.getElementById('error_username'); //<%# ユーザー名エラー %>
const error_userID = document.getElementById('error_userID'); //<%# ユーザーIDエラー %>
const error_email = document.getElementById('error_email'); //<%# メールアドレスエラー %>
const error_password = document.getElementById('error_password'); //<%# パスワードエラー %>

//<%#input_usernameは、15文字以内%>
//<%#入力値を取得して、入力値を検証する%>
input_username.addEventListener('keyup', function () {
    if (input_username.value.length > 15) {
        error_username.innerText = '15文字以内で入力してください';
        disable_counter_username++;
    } else {
        error_username.innerText = '';
        if (input_username.value.length == 0) {
            disable_counter_username++;
        } else {
            disable_counter_username = 0;
        }
    }
});
input_username.addEventListener('focusout', function () {
    if (disable_counter_username == 0 && input_username.value.length > 0) {
        axios.post('https://tools.na2na.dev/api/word/is_includeNgWord', {
            text: input_username.value,
        })
            .then(function (response) {
                if (response.data == true) {
                    error_username.innerText = "不適切なワードが含まれています。";
                    disable_counter_username++;
                } else {
                    error_username.innerText = '';
                    if (input_username.value.length == 0) {
                        disable_counter_username++;
                    } else {
                        disable_counter_username = 0;
                    }
                }
            })
            .catch(function (error) {
                alert(error); //TODO: エラー時の遷移先
            });
    }
})

//<%#input_userIDは、半角英数字15文字以内%>
//<%# "_""-""."" "も使用可能とする%>
//<%#入力値を取得して、入力値を検証する%>
input_userID.addEventListener('keyup', function () {
    if (input_userID.value.length > 15) {
        error_userID.innerText = '15文字以内で入力してください';
        disable_counter_userID++;
        return;
    } else if (input_userID.value.match(/[^a-zA-Z0-9_\-\.]/)) {
        error_userID.innerText = '使用できる文字は、半角英数字、アンダーバー、ハイフン、ピリオドのみです';
        disable_counter_userID++;
        return;
    } else {
        error_userID.innerText = '';
        if (input_userID.value.length == 0) {
            disable_counter_userID++;
        } else {
            disable_counter_userID = 0;
        }
    }
    //axiosを利用して重複判定
    //"/api/user/check_userID"にPOSTする
    //戻り値が"true"なら重複している
    //戻り値が"false"なら重複していない
});
input_userID.addEventListener('focusout', function () {
    if (disable_counter_userID == 0) {
        axios.post('/api/user/check_userID', {
            userID: input_userID.value
        })
            .then(function (response) {
                if (response.data == true) {
                    error_userID.innerText = '登録済みのユーザーIDです';
                    disable_counter_userID++;
                } else {
                    error_userID.innerText = '';
                    if (input_userID.value.length == 0) {
                        disable_counter_userID++;
                    } else {
                        disable_counter_userID = 0;
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});

//<%#input_emailは、RFC違反メールアドレスは禁止%>
//<%#入力値を取得して、入力値を検証する%>
input_email.addEventListener('keyup', function () {
    if (MailCheck(input_email.value)) {
        error_email.innerText = '正しい形式で入力してください。';
        disable_counter_email++;
    } else {
        error_email.innerText = '';
        if (input_email.value.length == 0) {
            disable_counter_email++;
        } else {
            disable_counter_email = 0;
        }
    }
});

//<%#input_email_confirmは、input_passwordと同じ値を入力%>
function check_email_confirm() {
    if (input_email.value != input_email_confirm.value) {
        error_email.innerText = 'メールアドレスが一致しません';
        confirm_reject_counter_email++;
        return false;
    } else {
        error_email.innerText = '';
        confirm_reject_counter_email = 0;
        if (input_email_confirm.value.length == 0) {
            disable_counter_email++;
        } else {
            disable_counter_email = 0;
        }
        return true;
    }
}



//<%#input_passwordは、半角英数字8文字以上、20文字以内%>
//<%# "_""-""."" "も使用可能とする%>
//<%#大文字小文字それぞれ最低1つ以上を使う事%>
//<%#入力値を取得して、入力値を検証する%>
input_password.addEventListener('keyup', function () {
    if (input_password.value.length < 8) {
        error_password.innerText = '8文字以上で入力してください';
        disable_counter_password++;
    } else if (input_password.value.length > 20) {
        error_password.innerText = '20文字以内で入力してください';
        disable_counter_password++;
    } else if (input_password.value.match(/[^a-zA-Z0-9_\-\.]/)) {
        error_password.innerText = '使用できる文字は、半角英数字、アンダーバー、ハイフン、ピリオドのみです';
        disable_counter_password++;
    } else if (!input_password.value.match(/[a-z]/)) {
        error_password.innerText = '大文字小文字を最低41つ以上含めてください';
        disable_counter_password++;
    } else if (!input_password.value.match(/[A-Z]/)) {
        error_password.innerText = '大文字小文字を最低1つ以上含めてください';
        disable_counter_password++;
    } else {
        error_password.innerText = '';
        if (input_password.value.length == 0) {
            disable_counter_password++;
        } else {
            disable_counter_password = 0;
        }
    }
});


//<%#input_password_confirmは、input_passwordと同じ値を入力%>
function check_password_confirm() {
    if (input_password.value !== input_password_confirm.value) {
        error_password.innerText = 'パスワードが一致しません';
        confirm_reject_counter_password++;
        return false;
    } else {
        error_password.innerText = '';
        disable_counter_password_confirm = 0;
        if (input_email.value.length == 0) {
            disable_counter_password++;
        } else {
            disable_counter_password = 0;
        }
        return true;
    }
}

//それぞれのdisable_counterの合計を監視し続ける
setInterval(function () {
    if (disable_counter_username + disable_counter_userID + disable_counter_email + disable_counter_password === 0) {
        send.disabled = false;
    } else {
        send.disabled = true;
    }
    if (confirm_reject_counter_email > 0) {
        check_email_confirm();
    }
    if (confirm_reject_counter_password > 0) {
        check_password_confirm();
    }
}, 100);




function MailCheck(mail) {
    const mail_regex1 = new RegExp('(?:[-!#-\'*+/-9=?A-Z^-~]+\.?(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*|"(?:[!#-\[\]-~]|\\\\[\x09 -~])*")@[-!#-\'*+/-9=?A-Z^-~]+(?:\.[-!#-\'*+/-9=?A-Z^-~]+)*');
    const mail_regex2 = new RegExp('^[^\@]+\@[^\@]+$');
    //連続ドットを禁止
    const mail_regex3 = new RegExp('\.\.');
    //アットマークの前のドットを禁止
    const mail_regex4 = new RegExp('^\.\@');

    if (mail.match(mail_regex1) && mail.match(mail_regex2) && !mail.match(mail_regex3) && !mail.match(mail_regex4)) {
        // 全角チェック
        if (mail.match(/[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/)) { return false; }
        // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
        if (!mail.match(/\.[a-z]+$/)) { return false; }
        return true;
    } else {
        return false;
    }
}

//sendを押した際の動作
//check_password_confirm,check_email_confirmを実行する
send.addEventListener('click', function () {
    let vd_email = check_email_confirm();
    let vd_password = check_password_confirm();
    console.log(vd_email);
    console.log(vd_password);
    if (vd_email && vd_password) {
        axios.post('/api/user/sign_up', {
            username: input_username.value,
            userID: input_userID.value,
            email: input_email.value,
            password: input_password.value,
        })
            .then(function (response) {
                if (response.data == true) {
                    //"/"へ遷移
                    window.location.href = '/';
                } else {
                    alert('登録に失敗しました'); //TODO: エラー時の遷移先
                }
            })
            .catch(function (error) {
                alert(error); //TODO: エラー時の遷移先
            });
    }
});