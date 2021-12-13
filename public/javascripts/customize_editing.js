const txt1 = document.getElementById("text1");
const txt2 = document.getElementById("text2");
const txt3 = document.getElementById("text3");
const view = document.getElementById( "view" );
const number = document.getElementById("number");
const font_style = document.getElementById("font_style");
const color = document.getElementById("color");
const gridbtn = document.getElementById("gridbtn");
const ctx = document.getElementById('canvas').getContext('2d');

// 現在の状況を保持
let keep = [];

function finish() {
  //cookieに保存
  document.cookie = "keep=" + keep_json;
}

function send_value() {
  console.log(keep);
  keep_json = JSON.stringify(keep);
  //Cookieから、"category_sub"というキー名称のCookieを取得する
  const category_sub = document.cookie.replace(/(?:(?:^|.*;\s*)category_sub\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  // const from_parent = document.getElementById("set_value_hiddenform");
  //hidden属性のformを2つ用意し、keepとcategory_subをvalueに設定
  //createElementでhidden属性のformを作成
  //"/create/work_settings"にPOSTで送信

  //hiddenformをsubmit
  const form = document.createElement('form');
  form.method = 'post';
  form.action = '/create/work_settings';
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'keep';
  input.value = keep_json;
  form.appendChild(input);
  const input2 = document.createElement('input');
  input2.type = 'hidden';
  input2.name = 'category_sub';
  input2.value = category_sub;
  form.appendChild(input2);
  document.body.appendChild(form);
  form.submit();
}

// リロードさせない
function form1submit() {
  return false;
}

let textarray = ["","",""];
function form2submit() {
  const messageElement = document.getElementsByName("message");
  let message = messageElement[0].value;
  if(textarray[0] == "") {
    textarray[0] = message;
    // ctx.fillText(textarray[0], 50, 50);
    txt1.innerHTML = textarray[0];
    keep.push([textarray[0],"16","Arial","#000"]);
  }else if(textarray[1] == "") {
    textarray[1] = message;
    txt2.innerHTML = textarray[1];
    keep.push([textarray[1],"16","Arial","#000"]);
    // ctx.fillText(textarray[1], 10, 50);
  }else if(textarray[2] == "") {
    textarray[2] = message;
    txt3.innerHTML = textarray[2];
    keep.push([textarray[2],"16","Arial","#000"]);
    // ctx.fillText(textarray[2], 10, 50);
  }else {
    alert("３つ以上は追加できません。")
  }
  return false;
}

// テキスト回転
function txt_rotate(e) {
  //座標を取得する
  const mX = e.pageX;  //X座標
  const mY = e.pageY;  //Y座標
  let angle = 0;
  // 要素の位置座標を取得
  let clientRect = txt1.getBoundingClientRect() ;
  // 画面の左端から、要素の左端までの距離
  let Xs = clientRect.left ;
  // 画面の上端から、要素の上端までの距離
  let Ys = clientRect.top ;
  angle = Math.atan( (Ys-mY) / -(mX-Xs)  );
  angle *= 50;
  txt1.style.transform = "rotateZ("+angle+"deg)";
};

// 文字サイズ変更
function numberchange1(e,) {
  console.log(e.currentTarget.value);
  txt1.style.fontSize = e.currentTarget.value + "px";
  keep[0][1] = e.currentTarget.value;
}
// 文字サイズ変更
function numberchange2(e) {
  console.log(e.currentTarget.value);
  txt2.style.fontSize = e.currentTarget.value + "px";
  keep[1][1] = e.currentTarget.value;
}
// 文字サイズ変更
function numberchange3(e) {
  console.log(e.currentTarget.value);
  txt3.style.fontSize = e.currentTarget.value + "px";
  keep[2][1] = e.currentTarget.value;
}

// dropduwn
function fontchange1(e) {
  console.log(e.currentTarget.value);
  txt1.style.fontFamily = e.currentTarget.value;
  keep[0][2] = e.currentTarget.value;
}
// dropduwn
function fontchange2(e) {
  console.log(e.currentTarget.value);
  txt2.style.fontFamily = e.currentTarget.value;
  keep[1][2] = e.currentTarget.value;
}
// dropduwn
function fontchange3(e) {
  console.log(e.currentTarget.value);
  txt3.style.fontFamily = e.currentTarget.value;
  keep[2][2] = e.currentTarget.value;
}

// 文字色変更
function fontcolor1(e) {
  console.log(e.currentTarget.value);
  txt1.style.color = e.currentTarget.value;
  keep[0][3] = e.currentTarget.value;
}
// 文字色変更
function fontcolor2(e) {
  console.log(e.currentTarget.value);
  txt2.style.color = e.currentTarget.value;
  keep[1][3] = e.currentTarget.value;
}
// 文字色変更
function fontcolor3(e) {
  console.log(e.currentTarget.value);
  txt3.style.color = e.currentTarget.value;
  keep[2][3] = e.currentTarget.value;
}

document.addEventListener('click' , (e) => {
  if(e.target.closest("#text1")) {
    txt1.classList.add("txtborder");
    // view.addEventListener('mousemove', txt_rotate);
    number.addEventListener("change", numberchange1);
    font_style.addEventListener("change", fontchange1);
    color.addEventListener("change", fontcolor1);
  }else if(e.target.closest('#view')) {
    txt1.classList.remove("txtborder");
    view.removeEventListener('mousemove', txt_rotate);
    number.removeEventListener("change", numberchange1);
    font_style.removeEventListener("change", fontchange1);
    color.removeEventListener("change", fontcolor1);
  }
  if(e.target.closest("#text2")) {
    // // テキストがクリックされたとき
    txt2.classList.add("txtborder"); 
    // view.addEventListener('mousemove', txt_rotate);
    number.addEventListener("change", numberchange2);
    font_style.addEventListener("change", fontchange2);
    color.addEventListener("change", fontcolor2);
  }else if(e.target.closest('#view')) {
    // エリアがクリックされたとき
    txt2.classList.remove("txtborder");
    view.removeEventListener('mousemove', txt_rotate);
    number.removeEventListener("change", numberchange2);
    font_style.removeEventListener("change", fontchange2);
    color.removeEventListener("change", fontcolor2);
  }
  if(e.target.closest("#text3")) {
    // // テキストがクリックされたとき
    txt3.classList.add("txtborder");
    // view.addEventListener('mousemove', txt_rotate);
    number.addEventListener("change", numberchange3);
    font_style.addEventListener("change", fontchange3);
    color.addEventListener("change", fontcolor3);
  }else if(e.target.closest('#view')) {
    // エリアがクリックされたとき
    txt3.classList.remove("txtborder");
    // view.removeEventListener('mousemove', txt_rotate);
    number.removeEventListener("change", numberchange3);
    font_style.removeEventListener("change", fontchange3);
    color.removeEventListener("change", fontcolor3);
  }
});

// グリッド
gridbtn.addEventListener("click", function() {
  view.classList.toggle("grid");
});

// ファイル選択ボタン, ドラッグ＆ドロップ領域のクリックでファイル選択ダイアログ
document.querySelectorAll('#file-select-button, #drag-and-drop-area').forEach((ele) => {
ele.addEventListener('click', () => {
  document.getElementById('file-select-input').click();
});
});

// ファイル選択後
document.getElementById('file-select-input').addEventListener('change', (event) => {
const files = event.target.files;
if (files.length > 0) {
  previewAndInsert(files);
}
event.target.files = null;
event.target.value = null;
});

const dragAndDropArea = document.getElementById('drag-and-drop-area');

// ドラッグ中
dragAndDropArea.addEventListener('dragover', (event) => {
dragAndDropArea.classList.add('active');
event.preventDefault();
event.dataTransfer.dropEffect = 'copy';
});

// マウスがドラッグ＆ドロップ領域外に出たとき
dragAndDropArea.addEventListener('dragleave', (event) => {
dragAndDropArea.classList.remove('active');
});

// ドロップ時
dragAndDropArea.addEventListener('drop', (event) => {
event.preventDefault();
dragAndDropArea.classList.remove('active');
const files = event.dataTransfer.files;
if (files.length === 0) {
  return;
}

// 画像ファイルのみ OK
if (!files[0].type.match(/image\/*/)) {
  return;
}

previewAndInsert(files);
});

// 画像プレビューと input 追加
const previewAndInsert = (files) => {
const file = files[0];

const wrapper = document.createElement('div');

const input = document.createElement('input');
input.type = 'file';
input.classList.add('hidden');
if (files.length > 1 && typeof DataTransfer !== 'undefined') {
  const dt = new DataTransfer();
  dt.items.add(files[0]);
  input.files = dt.files;
} else {
  input.files = files;
}
wrapper.appendChild(input);

const img = document.createElement('img');
const reader = new FileReader();
reader.onload = (event) => {
  img.src = event.target.result;
  updateHTMLCode();
}
reader.readAsDataURL(file);
wrapper.appendChild(img);

document.getElementById('previews').appendChild(wrapper);
}