//変数定義
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
const token = url.searchParams.get("token");
const temp_password = <HTMLInputElement>document.querySelector('input[name="temp_password"]');
const new_password = <HTMLInputElement>document.querySelector('input[name="new_password"]');
const new_password_confirmation = <HTMLInputElement>document.querySelector('input[name="new_password_confirmation"]');
const error_temp_password = document.getElementById('error_temp_password')!;
const error_password = document.getElementById('error_password')!;
// @ts-ignore
const send = <HTMLButtonElement>document.getElementById('send')!;

let disable_counter_password = 0;
let confirm_reject_counter_password = 0;

new_password.addEventListener('keyup', function () {
    if (new_password.value.length < 8) {
        error_password.innerText = '8文字以上で入力してください';
        disable_counter_password++;
    } else if (new_password.value.length > 20) {
        error_password.innerText = '20文字以内で入力してください';
        disable_counter_password++;
    } else if (new_password.value.match(/[^a-zA-Z0-9_\-\.]/)) {
        error_password.innerText = '使用できる文字は、半角英数字、アンダーバー、ハイフン、ピリオドのみです';
        disable_counter_password++;
    } else if (new_password.value.match(/[a-z]/)) {
        error_password.innerText = '大文字小文字を最低41つ以上含めてください';
        disable_counter_password++;
    } else if (new_password.value.match(/[A-Z]/)) {
        error_password.innerText = '大文字小文字を最低1つ以上含めてください';
        disable_counter_password++;
    } else {
        error_password.innerText = '';
        if (new_password.value.length == 0) {
            disable_counter_password++;
        } else {
            disable_counter_password = 0;
        }
    }
});

setInterval(function () {
    if (disable_counter_password === 0) {
        send.disabled = false;
    } else {
        send.disabled = true;
    }
    if (confirm_reject_counter_password > 0) {
        check_password_confirm();
    }
}, 100);

function check_password_confirm() {
    if (new_password.value !== new_password_confirmation.value) {
        error_password.innerText = 'パスワードが一致しません';
        confirm_reject_counter_password++;
        return false;
    } else {
        error_password.innerText = '';
        confirm_reject_counter_password = 0;
        disable_counter_password = 0;
        return true;
    }
}

function resetPasswordAttempt() {
    console.log(id);
    console.log(token);
    console.log(temp_password.value);
    console.log(new_password.value);
    console.log(new_password_confirmation.value);


    if (check_password_confirm()) {
        // @ts-ignore
        axios.post('/api/user/reset_password_attempt', {
            id: id,
            token: token,
            temp_password: temp_password.value,
            new_password: new_password_confirmation.value
        })
            .then(function (response: { status: number; data: string; }) {
                console.log(response);
                //200と、trueが帰ったら
                if (response.status == 201) {
                    location.href = '/reset_password/complete';
                    //200かつ、回答がTemp Password is wrong
                } else if (response.status == 200 && response.data == 'Temp Password is wrong') {
                    console.log(response.status);
                    error_temp_password.innerText = '仮のパスワードが違います。';
                }
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }
}