// Canvas要素の作成
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

// 描画するための2Dコンテキスト
const ctx = canvas.getContext('2d');

// 画像ファイルの読み込み
const img = new Image();
img.src = './images/4.jpg';//画像ファイル名
// img.onload = () => {
//   canvas.width = img.width;
//   canvas.height = img.height;

//   // Canvasに画像を描画する
//   ctx.drawImage(img, 0, 0);
// };

// 略
img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    
    // 画像情報の取得（offsetX, offsetY, 幅、高さ）
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log('zsb')
    // imageData.dataが1pxごとのRGBAが含まれる
    let data = imageData.data;
    console.log(data.length)
    // ここでimageData.dataに対して画像処理を行う
    for (let i = 0; i < data.length; i += 4) {
        // 255-(r|g|b)
        data[i]   = 255 - data[i]  ;
        data[i+1] = 255 - data[i+1];
        data[i+2] = 255 - data[i+2];
      }


    // 画像情報からCanvasに書き戻す
    ctx.putImageData(imageData, 0, 0);
  };