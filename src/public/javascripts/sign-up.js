/* eslint-disable max-len */
// TODO
// - [x] 変数定義
// - [ ] バリデーション→メール関係が怪しい
// - [x] 実際にPOST
// - [x] 重複判定用API準備
// - [x] ユーザー名にMeCab使った形態素解析で不適切な文字をはじくAPIとかどうですかね
// - [ ]  エラーメッセージ関係→登録失敗時のエラーページどうする

// 入力値関係の変数
const InputUserName = document.getElementById('input_username'); // <%# 重複可能なユーザー名 %>
const InputUserId = document.getElementById('input_userID'); // <%# 重複不可なユーザーID %>
const InputEmail = document.getElementById('input_email'); // <%# メールアドレス %>
const InputEmailConfirm = document.getElementById('input_email_confirm'); // <%# メールアドレス(確認用) %>
const InputPassword = document.getElementById('input_password'); // <%# パスワード %>
const InputPasswordConfirm = document.getElementById('input_password_confirm'); // <%# パスワード(確認用) %>

// ボタン関係の定義
const send = document.getElementById('send');
let DisableCounterUsername = 0;
let DisableCounterUserId = 0;
let DisableCounterEmail = 0;
let DisableCounterPassword = 0;
let ConfirmRejectCounterEmail = 0;
let ConfirmRejectCounterPassword = 0;

// エラー関係の表示用変数
const ErrorUsername = document.getElementById('error_username'); // <%# ユーザー名エラー %>
const ErrorUserId = document.getElementById('error_userID'); // <%# ユーザーIDエラー %>
const ErrorEmail = document.getElementById('error_email'); // <%# メールアドレスエラー %>
const ErrorPassword = document.getElementById('error_password'); // <%# パスワードエラー %>

// <%#input_usernameは、15文字以内%>
// <%#入力値を取得して、入力値を検証する%>
InputUserName.addEventListener('keyup', function() {
  if (InputUserName.value.length > 15) {
    ErrorUsername.innerText = '15文字以内で入力してください';
    DisableCounterUsername++;
  } else {
    ErrorUsername.innerText = '';
    if (InputUserName.value.length == 0) {
      DisableCounterUsername++;
    } else {
      DisableCounterUsername = 0;
    }
  }
});
InputUserName.addEventListener('focusout', function() {
  if (DisableCounterUsername == 0 && InputUserName.value.length > 0) {
    axios.post('https://tools.na2na.dev/api/word/is_includeNgWord', {
      text: InputUserName.value,
    })
        .then(function(response) {
          if (response.data == true) {
            ErrorUsername.innerText = '不適切なワードが含まれています。';
            DisableCounterUsername++;
          } else {
            ErrorUsername.innerText = '';
            if (InputUserName.value.length == 0) {
              DisableCounterUsername++;
            } else {
              DisableCounterUsername = 0;
            }
          }
        })
        .catch(function(error) {
          alert(error); // TODO: エラー時の遷移先
        });
  }
});

// <%#input_userIDは、半角英数字15文字以内%>
// <%# "_""-""."" "も使用可能とする%>
// <%#入力値を取得して、入力値を検証する%>
InputUserId.addEventListener('keyup', function() {
  if (InputUserId.value.length > 15) {
    ErrorUserId.innerText = '15文字以内で入力してください';
    DisableCounterUserId++;
    return;
  } else if (InputUserId.value.match(/[^a-zA-Z0-9_\-\.]/)) {
    ErrorUserId.innerText = '使用できる文字は、半角英数字、アンダーバー、ハイフン、ピリオドのみです';
    DisableCounterUserId++;
    return;
  } else {
    ErrorUserId.innerText = '';
    if (InputUserId.value.length == 0) {
      DisableCounterUserId++;
    } else {
      DisableCounterUserId = 0;
    }
  }
  // axiosを利用して重複判定
  // "/api/user/check_userID"にPOSTする
  // 戻り値が"true"なら重複している
  // 戻り値が"false"なら重複していない
});
InputUserId.addEventListener('focusout', function() {
  if (DisableCounterUserId == 0) {
    axios.post('/api/user/check_userID', {
      userID: InputUserId.value,
    })
        .then(function(response) {
          if (response.data == true) {
            ErrorUserId.innerText = '登録済みのユーザーIDです';
            DisableCounterUserId++;
          } else {
            ErrorUserId.innerText = '';
            if (InputUserId.value.length == 0) {
              DisableCounterUserId++;
            } else {
              DisableCounterUserId = 0;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
  }
});

// <%#InputEmailは、RFC違反メールアドレスは禁止%>
// <%#入力値を取得して、入力値を検証する%>
InputEmail.addEventListener('keyup', function() {
  if (!mailCheck(InputEmail.value)) {
    ErrorEmail.innerText = '正しい形式で入力してください。';
    DisableCounterEmail++;
  } else {
    axios.post('/api/user/check_email', {
      email: InputEmail.value,
    })
        .then(function(response) {
          console.log(response);
          if (response.data) {
            DisableCounterEmail++;
            ErrorEmail.innerText = 'このメールアドレスは既に登録されています。';
            return;
          } else {
            ErrorEmail.innerText = '';
            if (InputEmail.value.length == 0) {
              DisableCounterEmail++;
            } else {
              DisableCounterEmail = 0;
            }
          }
        });
  }
});

// 入力した2つのメールアドレスが合致するかを確認します。
/**
 * @return {boolean} 入力した2つのメールアドレスが合致していればtrueを返します。
 */
function checkEmailConfirm() {
  if (InputEmail.value != InputEmailConfirm.value) {
    ErrorEmail.innerText = 'メールアドレスが一致しません';
    ConfirmRejectCounterEmail++;
    return false;
  } else {
    ErrorEmail.innerText = '';
    ConfirmRejectCounterEmail = 0;
    if (InputEmailConfirm.value.length == 0) {
      DisableCounterEmail++;
    } else {
      DisableCounterEmail = 0;
    }
    return true;
  }
}


// <%#input_passwordは、半角英数字8文字以上、20文字以内%>
// <%# "_""-""."" "も使用可能とする%>
// <%#大文字小文字それぞれ最低1つ以上を使う事%>
// <%#入力値を取得して、入力値を検証する%>
InputPassword.addEventListener('keyup', function() {
  if (InputPassword.value.length < 8) {
    ErrorPassword.innerText = '8文字以上で入力してください';
    DisableCounterPassword++;
  } else if (InputPassword.value.length > 20) {
    ErrorPassword.innerText = '20文字以内で入力してください';
    DisableCounterPassword++;
  } else if (InputPassword.value.match(/[^a-zA-Z0-9_\-\.]/)) {
    ErrorPassword.innerText = '使用できる文字は、半角英数字、アンダーバー、ハイフン、ピリオドのみです';
    DisableCounterPassword++;
  } else if (!InputPassword.value.match(/[a-z]/)) {
    ErrorPassword.innerText = '大文字小文字を最低41つ以上含めてください';
    DisableCounterPassword++;
  } else if (!InputPassword.value.match(/[A-Z]/)) {
    ErrorPassword.innerText = '大文字小文字を最低1つ以上含めてください';
    DisableCounterPassword++;
  } else {
    ErrorPassword.innerText = '';
    if (InputPassword.value.length == 0) {
      DisableCounterPassword++;
    } else {
      DisableCounterPassword = 0;
    }
  }
});


// 入力した2つのパスワードが合致するかを確認します。
/**
 * @return {boolean} 入力した2つのパスワードが合致していればtrueを返します。
 */
function checkPasswordConfirm() {
  if (InputPassword.value !== InputPasswordConfirm.value) {
    ErrorPassword.innerText = 'パスワードが一致しません';
    ConfirmRejectCounterPassword++;
    return false;
  } else {
    ErrorPassword.innerText = '';
    if (InputEmail.value.length == 0) {
      DisableCounterPassword++;
    } else {
      DisableCounterPassword = 0;
    }
    return true;
  }
}

// それぞれのdisable_counterの合計を監視し続ける
setInterval(function() {
  if (DisableCounterUsername + DisableCounterUserId + DisableCounterEmail + DisableCounterPassword === 0) {
    send.disabled = false;
  } else {
    send.disabled = true;
  }
  if (ConfirmRejectCounterEmail > 0) {
    checkEmailConfirm();
  }
  if (ConfirmRejectCounterPassword > 0) {
    checkPasswordConfirm();
  }
}, 100);


// sendを押した際の動作
// checkPasswordConfirm,checkEmailConfirmを実行する
send.addEventListener('click', function() {
  const ValidateEmail = checkEmailConfirm();
  const ValidatePassword = checkPasswordConfirm();
  if (ValidateEmail && ValidatePassword) {
    axios.post('/api/user/sign_up', {
      username: InputUserName.value,
      userID: InputUserId.value,
      email: InputEmail.value,
      password: InputPassword.value,
    })
        .then(function(response) {
        // 201が返ってきた場合は、ユーザー登録が成功したということ
        // それ以外は、エラーが発生したということ
          if (response.status === 201) {
            alert('ユーザー登録が完了しました');
            window.location.href = '/';
          } else {
            alert('ユーザー登録に失敗しました');
          }
        })
        .catch(function(error) {
          alert(error); // TODO: エラー時の遷移先
        });
  }
});
