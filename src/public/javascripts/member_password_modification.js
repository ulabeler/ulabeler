//変数定義
const CurrentPassword = document.querySelector('.CurrentPassword');
const NewPassword = document.querySelectorAll('.NewPassword');
const errorCurrentPassword = document.querySelector('.errorCurrentPassword');
const errorNewPassword = document.querySelector('.errorNewPassword');
const send = document.getElementById('send');
let DisableCounterPassword = 0;
let ConfirmRejectCounterPassword = 0;

//イベント設定
NewPassword[0].addEventListener('keyup', function () {
    validateNewPassword(0);
});
NewPassword[1].addEventListener('focusout', function () {
    //NewPassword[0].valueと一致するかを確認
    checkPasswordConfirm()
});
function validateNewPassword(i) {
    if (NewPassword[i].value.length < 8) {
        errorNewPassword.innerText = '8文字以上で入力してください';
        DisableCounterPassword++;
    } else if (NewPassword[i].value.length > 20) {
        errorNewPassword.innerText = '20文字以内で入力してください';
        DisableCounterPassword++;
    } else if (NewPassword[i].value.match(/[^a-zA-Z0-9_\-\.]/)) {
        errorNewPassword.innerText = '使用できる文字は、半角英数字、アンダーバー、ハイフン、ピリオドのみです';
        DisableCounterPassword++;
    } else if (!NewPassword[i].value.match(/[a-z]/)) {
        errorNewPassword.innerText = '大文字小文字を最低41つ以上含めてください';
        DisableCounterPassword++;
    } else if (!NewPassword[i].value.match(/[A-Z]/)) {
        errorNewPassword.innerText = '大文字小文字を最低1つ以上含めてください';
        DisableCounterPassword++;
    } else {
        errorNewPassword.innerText = '';
        if (NewPassword[i].value.length == 0) {
            DisableCounterPassword++;
        } else {
            DisableCounterPassword = 0;
        }
    }
}

function checkPasswordConfirm() {
    if (NewPassword[0].value !== NewPassword[1].value) {
        errorNewPassword.innerHTML = '新しいパスワードと確認用パスワードが一致しません。';
        DisableCounterPassword++;
        ConfirmRejectCounterPassword++;
        send.disabled = true;
    } else {
        errorNewPassword.innerHTML = '';
        DisableCounterPassword = 0;
        ConfirmRejectCounterPassword = 0;
        send.disabled = false;
    }
}

setInterval(function () {
    if (DisableCounterPassword === 0) {
        send.disabled = false;
    } else {
        send.disabled = true;
    }
    if (ConfirmRejectCounterPassword > 0) {
        checkPasswordConfirm();
    }
}, 100);

// NewPasswordを持つ全ての要素のvalueが一致しているかを確認する
function changePasswordAttempt() {
    //CurrentPasswordが空でないかを確認
    if (CurrentPassword.value.length === 0) {
        errorCurrentPassword.innerText = '現在のパスワードを入力してください。';
        return false;
    } else {
        errorCurrentPassword.innerText = '';
    }
    checkPasswordConfirm();
    //axiosでPOST送信
    axios.post('/api/user/password/changeAttempt', {
        CurrentPassword: CurrentPassword.value,
        NewPassword: NewPassword[0].value
    })
        .then(function (response) {
            console.log(response);
            if (response.status == 201) {
                location.href = '/reset_password/complete';
                //200かつ、回答がTemp Password is wrong
            } else if (response.status == 200) {
                console.log(response.status);
                errorCurrentPassword.innerText = response.data;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}