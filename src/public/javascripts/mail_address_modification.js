const current_mailaddress = {
    "value": "<%- mailaddress %>"
};
const new_mailaddress = document.querySelector('input[name="new_mailaddress"]');
const new_mailaddress_confirmation = document.querySelector('input[name="new_mailaddress_confirmation"]');
const send = document.getElementById('send');
const message = document.getElementById('message');
let disable_counter_email = 0;
let confirm_reject_counter_email = 0;

new_mailaddress.addEventListener('focusout', function () {
    if (!mailCheck(new_mailaddress.value)) {
        disable_counter_email++;
        message.innerText = 'メールアドレスの形式が正しくありません。';
        return;
    } else if (new_mailaddress.value == current_mailaddress.value) {
        disable_counter_email++;
        message.innerText = '現在のメールアドレスと同じものを入力しています。';
    } else {
        axios.post('/api/user/check_email', {
            email: new_mailaddress.value
        })
            .then(function (response) {
                console.log(response);
                if (response.data) {
                    disable_counter_email++;
                    message.innerText = 'このメールアドレスは既に登録されています。';
                    return;
                } else {
                    disable_counter_email = 0;
                    message.innerText = '';
                }
            })
    }
});

new_mailaddress_confirmation.addEventListener('keyup', function () {
    check_email_confirm()
});

function check_email_confirm() {
    if (new_mailaddress.value != new_mailaddress_confirmation.value) {
        message.innerText = 'メールアドレスが一致しません';
        confirm_reject_counter_email++;
        return false;
    } else {
        message.innerText = '';
        confirm_reject_counter_email = 0;
        if (new_mailaddress_confirmation.value.length == 0) {
            disable_counter_email++;
        } else {
            disable_counter_email = 0;
        }
        return true;
    }
}

setInterval(function () {
    if (disable_counter_email + confirm_reject_counter_email === 0) {
        send.disabled = false;
    } else {
        send.disabled = true;
    }
}, 100);

function modificationMailaddressAttempt() {
    if (check_email_confirm()) {
        axios.post('/api/user/create/modification_mailaddress/confirmationCode', {
            mailaddress: new_mailaddress.value
        })
            .then(function (response) {
                console.log(response);
                if (response.data) {
                    location.href = '/mail_address_modification/sent_confirmation_code';
                } else {
                    alert('メールアドレスの変更に失敗しました。');
                }
            })
    }
}