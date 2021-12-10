window.addEventListener('DOMContentLoaded', function(){
  const txt1 = document.getElementById("text1");
  const txt2 = document.getElementById("text2");
  const txt3 = document.getElementById("text3");
  const view = document.getElementById( "view" );
  const number = document.getElementById("number");
  const font_style = document.getElementById("font_style");
  const color = document.getElementById("color");
  const gridbtn = document.getElementById("gridbtn");

  function txt_rotate(e) {
    //座標を取得する
    const mX = e.pageX;  //X座標
    const mY = e.pageY;  //Y座標
    var angle = 0;
    // 要素の位置座標を取得
    var clientRect = txt1.getBoundingClientRect() ;
    // 画面の左端から、要素の左端までの距離
    var Xs = clientRect.left ;
    // 画面の上端から、要素の上端までの距離
    var Ys = clientRect.top ;
    angle = Math.atan( (Ys-mY) / -(mX-Xs)  );
    angle *= 50;
    txt1.style.transform = "rotateZ("+angle+"deg)";
  };

  // 文字サイズ変更
  function numberchange1(e) {
    console.log(e.currentTarget.value);
    txt1.style.fontSize = e.currentTarget.value + "px";
  }

  // dropduwn
  function fontchange1(e) {
    console.log(e.currentTarget.value);
    txt1.style.fontFamily = e.currentTarget.value;
  }

  // 文字色変更
  function fontcolor(e) {
    console.log(e.currentTarget.value);
    txt1.style.color = e.currentTarget.value;
  }

  // 文字サイズ変更
  function numberchange2(e) {
    console.log(e.currentTarget.value);
    txt2.style.fontSize = e.currentTarget.value + "px";
  }

  // dropduwn
  function fontchange2(e) {
    console.log(e.currentTarget.value);
    txt2.style.fontFamily = e.currentTarget.value;
  }

  // 文字サイズ変更
  function numberchange3(e) {
    console.log(e.currentTarget.value);
    txt3.style.fontSize = e.currentTarget.value + "px";
  }

  // dropduwn
  function fontchange3(e) {
    console.log(e.currentTarget.value);
    txt3.style.fontFamily = e.currentTarget.value;
  }

  document.addEventListener('click' , (e) => {
    if(e.target.closest("#text1")) {
      // // テキストがクリックされたとき
      txt1.style.border = "solid 1px blue";
      view.addEventListener('mousemove', txt_rotate);
      number.addEventListener("change", (numberchange1));
      font_style.addEventListener("change", (fontchange1));
      color.addEventListener("change",fontcolor);
    }else if(e.target.closest('#view')) {
      // エリアがクリックされたとき
      txt1.style.border = "solid 1px #fff";
      view.removeEventListener('mousemove', txt_rotate);
      number.removeEventListener("change", numberchange1);
      font_style.removeEventListener("change", fontchange1);
      color.removeEventListener("change",fontcolor);
    }
    if(e.target.closest("#text2")) {
      // // テキストがクリックされたとき
      txt2.style.border = "solid 1px blue";
      // view.addEventListener('mousemove', txt_rotate);
      number.addEventListener("change", (numberchange2));
      font_style.addEventListener("change", (fontchange2));
    }else if(e.target.closest('#view')) {
      // エリアがクリックされたとき
      txt2.style.border = "solid 1px #fff";
      view.removeEventListener('mousemove', txt_rotate);
      number.removeEventListener("change", numberchange2);
      font_style.removeEventListener("change", fontchange2);
    }
    if(e.target.closest("#text3")) {
      // // テキストがクリックされたとき
      txt3.style.border = "solid 1px blue";
      // view.addEventListener('mousemove', txt_rotate);
      number.addEventListener("change", numberchange3);
      font_style.addEventListener("change", fontchange3);
    }else if(e.target.closest('#view')) {
      // エリアがクリックされたとき
      txt3.style.border = "solid 1px #fff";
      // view.removeEventListener('mousemove', txt_rotate);
      number.removeEventListener("change", numberchange3);
      font_style.removeEventListener("change", fontchange3);
      txt3.removeEventListener('mouseup',txt_rotate);
    }
  });

  // グリッド
  var notr = 0;
  gridbtn.addEventListener("click", function() {
    if(notr % 2 != 0){
      view.style.backgroundImage = "linear-gradient(0deg, transparent 31px, #333 32px),linear-gradient(90deg,  transparent 31px, #333 32px)";
      view.style.backgroundColor = "#ddd";
      view.style.backgroundSize = "32px 32px";
      view.style.zIndex = 999;
    }else{
      view.style.backgroundImage = "none";
      view.style.backgroundColor = "transparent";
    }
    notr++;
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
});