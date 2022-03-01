const txt = [];
for(var i = 1; i <= 3; i++) {
  txt.push(document.getElementById("text" + i));
}
const box = [];
for(var i = 1; i <= 3; i++) {
  box.push(document.getElementById("box" + i));
}
const stp = [];
for(var i = 1; i <= 8; i++) {
  stp.push(document.getElementById("stp" + i));
}
const view = document.getElementById( "view" );
const number = document.getElementById("number");
const font_style = document.getElementById("font_style");
const color = document.getElementById("color");
const gridbtn = document.getElementById("gridbtn");
const deleteElement = document.getElementById("delete");
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
// 現在の状況を保持
let keep_json = [];

function finish() {
  document.cookie = "keep=" + keep_json;
}

// リロードさせない
function form1submit() {
  return false;
}

const textarray = ["","",""];
function form2submit() {
  const messageElement = document.getElementsByName("message");
  let message = messageElement[0].value;
  let flg = false;
  for(var i = 0; i < 3; i++) {
    if(textarray[i] == "") {
      textarray[i] = message;
      // ctx.fillText(textarray[i]], 50, 50);
      txt[i].innerHTML = textarray[i];
      // keep_json.push([textarray[0],"16","Arial","#000"]);
      flg = false;
      break;
    }else {
      flg = true;
    }
  }
  if(flg) {
    alert("３つ以上は追加できません。");
  }
  return false;
}

function deletetext(num) {
  textarray[num] = "";
  txt[num].innerHTML = textarray[num];
  console.log("Hello");
}

// テキスト回転
function txt_rotate(e) {
  //座標を取得する
  const mX = e.pageX;  //X座標
  const mY = e.pageY;  //Y座標
  let angle = 0;
  // 要素の位置座標を取得
  let clientRect = txt[0].getBoundingClientRect() ;
  // 画面の左端から、要素の左端までの距離
  let Xs = clientRect.left ;
  // 画面の上端から、要素の上端までの距離
  let Ys = clientRect.top ;
  angle = Math.atan( (Ys-mY) / -(mX-Xs)  );
  angle *= 50;
  txt[0].style.transform = "rotateZ("+angle+"deg)";
};

// 文字サイズ変更
function numberchange1(e,) {
  txt[0].style.fontSize = e.currentTarget.value + "px";
  // keep_json[0][1] = e.currentTarget.value;
}
// 文字サイズ変更
function numberchange2(e) {
  txt[1].style.fontSize = e.currentTarget.value + "px";
  // keep_json[1][1] = e.currentTarget.value;
}
// 文字サイズ変更
function numberchange3(e) {
  txt[2].style.fontSize = e.currentTarget.value + "px";
  // keep_json[2][1] = e.currentTarget.value;
}

// dropduwn
function fontchange1(e) {
  txt[0].style.fontFamily = e.currentTarget.value;
  // keep_json[0][2] = e.currentTarget.value;
}
// dropduwn
function fontchange2(e) {
  txt[1].style.fontFamily = e.currentTarget.value;
  // keep_json[1][2] = e.currentTarget.value;
}
// dropduwn
function fontchange3(e) {
  txt[2].style.fontFamily = e.currentTarget.value;
  // keep_json[2][2] = e.currentTarget.value;
}

// 文字色変更
function fontcolor1(e) {
  txt[0].style.color = e.currentTarget.value;
  // keep_json[0][3] = e.currentTarget.value;
}
// 文字色変更
function fontcolor2(e) {
  txt[1].style.color = e.currentTarget.value;
  // keep_json[1][3] = e.currentTarget.value;
}
// 文字色変更
function fontcolor3(e) {
  txt[2].style.color = e.currentTarget.value;
  // keep_json[2][3] = e.currentTarget.value;
}

document.addEventListener('click' , (e) => {
  if(e.target.closest("#text1")) {
    txt[0].classList.add("txtborder");
    view.addEventListener('mousemove', txt_rotate);
    number.addEventListener("change", numberchange1);
    font_style.addEventListener("change", fontchange1);
    color.addEventListener("change", fontcolor1);
  }else if(e.target.closest('#view')) {
    txt[0].classList.remove("txtborder");
    view.removeEventListener('mousemove', txt_rotate);
    number.removeEventListener("change", numberchange1);
    font_style.removeEventListener("change", fontchange1);
    color.removeEventListener("change", fontcolor1);
  }
  if(e.target.closest("#text2")) {
    // // テキストがクリックされたとき
    txt[1].classList.add("txtborder"); 
    // view.addEventListener('mousemove', txt_rotate);
    number.addEventListener("change", numberchange2);
    font_style.addEventListener("change", fontchange2);
    color.addEventListener("change", fontcolor2);
  }else if(e.target.closest('#view')) {
    // エリアがクリックされたとき
    txt[1].classList.remove("txtborder");
    view.removeEventListener('mousemove', txt_rotate);
    number.removeEventListener("change", numberchange2);
    font_style.removeEventListener("change", fontchange2);
    color.removeEventListener("change", fontcolor2);
  }
  if(e.target.closest("#text3")) {
    // // テキストがクリックされたとき
    txt[2].classList.add("txtborder");
    // view.addEventListener('mousemove', txt_rotate);
    number.addEventListener("change", numberchange3);
    font_style.addEventListener("change", fontchange3);
    color.addEventListener("change", fontcolor3);
  }else if(e.target.closest('#view')) {
    // エリアがクリックされたとき
    txt[2].classList.remove("txtborder");
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

let stpprice = 0;
ctx.fillStyle = "rgb( 0, 0, 0)";
ctx.fillRect(0, 0, canvas.width, canvas.height);

document.getElementById("stp").addEventListener('click' , (e) => {
  for(let i = 1; i <= stp.length; i++) {
    if(e.target.closest("#stp" + i)) {
      let img = new Image();
      img.src = "../stamp/stamp" + i + ".png";
      ctx.drawImage(img,i * 50,10,50,38);
      stpprice++;
      break;
    }
  }
});












// ファイル選択ボタン, ドラッグ＆ドロップ領域のクリックでファイル選択ダイアログ
function img() {
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
}
