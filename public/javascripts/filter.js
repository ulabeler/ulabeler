

    $('#btn-grayscale').on('click', function () {
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            data[i] = data[i + 1] = data[i + 2] = v;
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-sepia').on('click', function () {
        //グレースケール化した画像をセピア化する
        //セピア化は茶褐色に見えるRGBの重みをオリジナルのRGBに掛け合わせる
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            data[i] = data[i + 1] = data[i + 2] = v;
            data[i] = data[i] * 0.393 + data[i + 1] * 0.769 + data[i + 2] * 0.189;
            data[i + 1] = data[i + 1] * 0.349 + data[i + 2] * 0.686 + data[i] * 0.168;
            data[i + 2] = data[i + 2] * 0.272 + data[i] * 0.534 + data[i + 1] * 0.131;
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-invert').on('click', function () {
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-blur').on('click', function () {
        //画像にぼかし効果を与える
        //周辺のピクセルの色との平均を利用する
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        const _data = data.slice();
        const avgColor = (color, i) => {
            const prevLine = i - (imgData.width * 4);
            const nextLine = i + (imgData.width * 4);

            const sumPrevLineColor = _data[prevLine - 4 + color] + _data[prevLine + color] + _data[prevLine + 4 + color];
            const sumCurrLineColor = _data[i - 4 + color] + _data[i + color] + _data[i + 4 + color];
            const sumNextLineColor = _data[nextLine - 4 + color] + _data[nextLine + color] + _data[nextLine + 4 + color];

            return (sumPrevLineColor + sumCurrLineColor + sumNextLineColor) / 9
        };

        // 2行目〜n-1行目
        for (let i = imgData.width * 4; i < data.length - (imgData.width * 4); i += 4) {
            // 2列目〜n-1列目
            if (i % (imgData.width * 4) === 0 || i % ((imgData.width * 4) + 300) === 0) {
                // nop
            } else {
                data[i] = avgColor(0, i);
                data[i + 1] = avgColor(1, i);
                data[i + 2] = avgColor(2, i);
            }
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-brightness').on('click', function () {
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = data[i] + 100;
            data[i + 1] = data[i + 1] + 100;
            data[i + 2] = data[i + 2] + 100;
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-contrast').on('click', function () {
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = data[i] * 1.5;
            data[i + 1] = data[i + 1] * 1.5;
            data[i + 2] = data[i + 2] * 1.5;
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-emboss').on('click', function () {
        //エンボス化
        //周辺のピクセルの色との平均を利用する
        //斜めに係数をかけ、その値に255/2を足す必要
        //色の変化は、色の変化が少ないピクセルと大きなピクセルの間で変化する
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        const _data = data.slice();
        const embossColor = (color, i) => {
            const prevLine = i - (imgData.width * 4);
            return ((_data[prevLine - 4 + color] * -1) + _data[i + color]) + (255 / 2);
        };

        for (let i = imgData.width * 4; i < data.length - (imgData.width * 4); i += 4) {
            if (i % (imgData.width * 4) === 0 || i % ((imgData.width * 4) + 300) === 0) {
                continue;
            } else {
                data[i] = embossColor(0, i);
                data[i + 1] = embossColor(1, i);
                data[i + 2] = embossColor(2, i);
            }
        }
        ctx.putImageData(imgData, 0, 0);
    });

    $('#btn-sharpen').on('click', function () {
        //輪郭を強調する
        //1つのピクセルの色を10倍し、周囲8ピクセルの色を-1倍し、すべての合計を2で割った値を中央のピクセルに適用する
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        const _data = data.slice();
        const sharpedColor = (color, i) => {
            // 係数
            const sub = -1;
            const main = 10;

            const prevLine = i - (imgData.width * 4);
            const nextLine = i + (imgData.width * 4);

            const sumPrevLineColor = (_data[prevLine - 4 + color] * sub) + (_data[prevLine + color] * sub) + (_data[prevLine + 4 + color] * sub);
            const sumCurrLineColor = (_data[i - 4 + color] * sub) + (_data[i + color] * main) + (_data[i + 4 + color] * sub);
            const sumNextLineColor = (_data[nextLine - 4 + color] * sub) + (_data[nextLine + color] * sub) + (_data[nextLine + 4 + color] * sub);

            return (sumPrevLineColor + sumCurrLineColor + sumNextLineColor) / 2
        };

        // 2行目〜n-1行目
        for (let i = imgData.width * 4; i < data.length - (imgData.width * 4); i += 4) {
            // 2列目〜n-1列目
            if (i % (imgData.width * 4) === 0 || i % ((imgData.width * 4) + 300) === 0) {
                // nop
            } else {
                data[i] = sharpedColor(0, i);
                data[i + 1] = sharpedColor(1, i);
                data[i + 2] = sharpedColor(2, i);
            }
        }
        ctx.putImageData(imgData, 0, 0);
    });

    $('#btn-gamma_increase').on('click', function () {
        //ガンマ値を10%上げる
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = data[i] + 100;
            data[i + 1] = data[i + 1] + 100;
            data[i + 2] = data[i + 2] + 100;
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-gamma_decrease').on('click', function () {
        //ガンマ値を下げる
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i] = data[i] - 100;
            data[i + 1] = data[i + 1] - 100;
            data[i + 2] = data[i + 2] - 100;
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-opacity').on('click', function () {
        //画像の不透明度を半減させる
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            data[i + 3] = data[i + 3] * 0.5;
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-pixelate').on('click', function () {
        //画像にモザイクをかける
        //ピクセルを縮小してそれらを結合する
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        var width = canvas.width;
        var height = canvas.height;
        var px = 16;
        for (var x = 0; x < width; x += px) {
            for (var y = 0; y < height; y += px) {
                var i = (y * width + x) * 4;
                var r = data[i];
                var g = data[i + 1];
                var b = data[i + 2];
                var a = data[i + 3];
                for (var ix = 0; ix < px; ix++) {
                    for (var iy = 0; iy < px; iy++) {
                        var p = (y + iy) * width + x + ix;
                        data[p * 4] = r;
                        data[p * 4 + 1] = g;
                        data[p * 4 + 2] = b;
                        data[p * 4 + 3] = a;
                    }
                }
            }
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-binarization').on('click', function () {
        //画像を2値化する
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            if (v > 128) {
                data[i] = data[i + 1] = data[i + 2] = 255;
            } else {
                data[i] = data[i + 1] = data[i + 2] = 0;
            }
        }
        ctx.putImageData(imgData, 0, 0);
    });
    $('#btn-reset').on('click', function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });