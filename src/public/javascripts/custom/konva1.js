var width = document.getElementById('view').clientWidth;
var height = document.getElementById('view').clientHeight;
// width = 190;
// height = 460;
const view = document.getElementById("view");
const colorElement = document.getElementById("color");
const numberElement = document.getElementById("number");
const familyElement = document.getElementById("font_style");
const gridbtn = document.getElementById("gridbtn");
const deletebtn = document.getElementById("deletebtn")
const selecterp = document.getElementById("selecterp");

// サニタイジング
function h(str){
    return String(str).replace(/&/g,"&amp;")
      .replace(/"/g,"&quot;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
}

let textNode1;
let textNode2;
let textNode3;
function colorchange1(e) {
    textNode1.fill(e.target.value);
}
function sizechange1(e){
    textNode1.fontSize(e.target.value);
}
function familychange1(e) {
    textNode1.fontFamily(e.target.value);
}
function colorchange2(e) {
    textNode2.fill(e.target.value);
}
function sizechange2(e){
    textNode2.fontSize(e.target.value);
}
function familychange2(e) {
    textNode2.fontFamily(e.target.value);
}
function colorchange3(e) {
    textNode3.fill(e.target.value);
}
function sizechange3(e){
    textNode3.fontSize(e.target.value);
}
function familychange3(e) {
    textNode3.fontFamily(e.target.value);
}

let cnthide = 0;
var tr = "";
function common(textNode) {
    textNode.on('dblclick dbltap', (event) => {
        tr = new Konva.Transformer({
            node: textNode,
            enabledAnchors: ['middle-left', 'middle-right'],
            // set minimum width of text
            boundBoxFunc: function (oldBox, newBox) {
                newBox.width = Math.max(30, newBox.width);
                return newBox;
            }
        });

        textNode.on('transform', function () {
            // reset scale, so only with is changing by transformer
            textNode.setAttrs({
                width: textNode.width() * textNode.scaleX(),
                scaleX: 1,
            });
        });

        layer.add(tr);

        // hide text node and transformer:
        textNode.hide();
        // tr.hide();

        // create textarea over canvas with absolute position
        // first we need to find position for textarea
        // how to find it?

        // at first lets find position of text node relative to the stage:
        var textPosition = textNode.absolutePosition();


        var rect = view.getBoundingClientRect();
        var elemtop = rect.top + window.pageYOffset;
        var elemleft = rect.left + window.pageXOffset;
        // so position of textarea will be the sum of positions above:
        var areaPosition = {
            x: stage.container().offsetLeft + textPosition.x + elemleft*1.2 ,
            y: stage.container().offsetTop + textPosition.y + elemtop,
        };

        // create textarea and style it
        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = textNode.text();
        textarea.minLength = 1;
        textarea.maxLength = 15;
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = "none";
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            tr.hide();
            tr.forceUpdate();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
            document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function (e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(h(textarea.value));
                removeTextarea();
            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
        });

        textarea.addEventListener('keydown', function (e) {
            scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.scrollHeight + textNode.fontSize() + 'px';
        });

        function handleOutsideClick(e) {
            if (e.target !== textarea) {
            textNode.text(h(textarea.value));
            removeTextarea();
            }
        }

        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });
}

// グリッド
gridbtn.addEventListener("click", function() {
    view.classList.toggle("grid");
});

// リロードさせない
function form1submit() {
    return false;
}

// キャンバス作成
const cookies = document.cookie;
const cookie  = cookies.indexOf("color=");
console.log(cookie);
const stage = new Konva.Stage({
    container: 'container',
    // width と height を写真のサイズに変更
    width: 512,
    height: 512,
});
const layer = new Konva.Layer();
stage.add(layer);
// 土台
// 連想配列に格納
function getCookieArray(){
    var arr = new Array();
    if(document.cookie != ''){
        var tmp = document.cookie.split('; ');
        for(var i=0;i<tmp.length;i++){
            var data = tmp[i].split('=');
            arr[data[0]] = decodeURIComponent(data[1]);
        }
    }
    return arr;
}
var arr = getCookieArray();
var value = arr['object_name'];
console.log(value);

const objectarray = [
    {"name" : "iPhone11", "path" : "iphone11.png"},
    {"name" : "iPhone11 Pro", "path" : "iphone11 pro.png"}, 
    {"name" : "iPhone12", "path" : "iphone12.png"},
    {"name" : "iPhone12 mini", "path" : "iphone12 mini.png"},
    {"name" : "iPhone12 Pro", "path" : "iphone12 pro.png"},
    {"name" : "iPhone12 Pro Max", "path" : "iphone11 promax.png"},
    {"name" : "iPhone13 mini", "path" : "iphone13 mini.png"},
    {"name" : "iPhone13 Pro", "path" : "iphone13 pro.png"},
    {"name" : "iPhone13 Pro Max", "path" : "iphone13 promax.png"},
    {"name" : "iPhone13", "path" : "iphone13.png"},
    {"name" : "ペットボトル", "path" : "pet500.png"},
    {"name" : "皿", "path" : "saucer2.png"},
    {"name" : "腕時計", "path" : "watch.png"},
    {"name" : "チロルチョコ", "path" : "tirol.png"}
];
console.log(objectarray);
let objectpath;
for (let i = 0; i < objectarray.length; i++) {
    if(value == objectarray[i]["name"]) {
        console.log(objectarray[i]["name"]);
        objectpath = objectarray[i]["path"];
    }
}

Konva.Image.fromURL(`/images/object/${objectpath}`,
    (img) => {
        img.setAttrs({
            // 本体のサイズ挿入
            width: 512,
            height: 512,
            name: 'image',
        });
        layer.add(img);
    }
);

var x = document.getElementsByClassName("konvajs-content");
x[0].style.margin = "50px auto";

let cnt1 = 0;
const textarray = ["","",""];
function form2submit() {
    const messageElement = document.getElementsByName("message");
    let message = messageElement[0].value.trim();
    if(message != "") {
        if(textarray[0] == "") {
            textarray[0] = message;
            textNode1 = new Konva.Text({
                text: textarray[0],
                x:stage.width() / 2,
                y:stage.height() / 2,
                draggable: true,
            });
            layer.add(textNode1);
            textNode1.on("click", function() {
                if(cnt1 % 2 == 0) {
                    selecterp.innerHTML = `${h(textNode1.text())}を選択中`;
                    colorElement.value = textNode1.fill();
                    numberElement.value = textNode1.fontSize();
                    familyElement.value = textNode1.fontFamily();
                    colorElement.addEventListener("change", colorchange1);
                    numberElement.addEventListener("change", sizechange1);
                    familyElement.addEventListener("change", familychange1);            
                    colorElement.removeEventListener("change", colorchange2);
                    numberElement.removeEventListener("change", sizechange2);
                    familyElement.removeEventListener("change", familychange2);
                    colorElement.removeEventListener("change", colorchange3);
                    numberElement.removeEventListener("change", sizechange3);
                    familyElement.removeEventListener("change", familychange3);
                }else {
                    selecterp.innerHTML = "";
                    colorElement.removeEventListener("change", colorchange1);
                    numberElement.removeEventListener("change", sizechange1);
                    familyElement.removeEventListener("change", familychange1);
                }
            cnt1++;
            });
            textNode1.on('dragstart', function () {
                this.moveToTop();
            });
            function deletetext() {
                textNode1.destroy();
                textarray[0] = "";
            }
            textNode1.on("click", function() {
                deletebtn.addEventListener("click", deletetext);
                window.setTimeout(function(){
                    deletebtn.removeEventListener("click", deletetext);
                }, 3000);
            })
            common(textNode1);
        }else if(textarray[1] == ""){
            textarray[1] = message;
            textNode2 = new Konva.Text({
                text: textarray[1],
                x:stage.width() / 2,
                y:stage.height() / 2,
                draggable: true,
            });
            layer.add(textNode2);
            textNode2.on("click", function() {
                if(cnt1 % 2 == 0) {
                    selecterp.innerHTML = `${h(textNode2.text())}を選択中`;
                    colorElement.value = textNode2.fill();
                    numberElement.value = textNode2.fontSize();
                    familyElement.value = textNode2.fontFamily();
                    colorElement.addEventListener("change", colorchange2);
                    numberElement.addEventListener("change", sizechange2);
                    familyElement.addEventListener("change", familychange2);
                    colorElement.removeEventListener("change", colorchange1);
                    numberElement.removeEventListener("change", sizechange1);
                    familyElement.removeEventListener("change", familychange1);
                    colorElement.removeEventListener("change", colorchange3);
                    numberElement.removeEventListener("change", sizechange3);
                    familyElement.removeEventListener("change", familychange3);
                }else {
                    selecterp.innerHTML = "";
                    colorElement.removeEventListener("change", colorchange2);
                    numberElement.removeEventListener("change", sizechange2);
                    familyElement.removeEventListener("change", familychange2);
                }
            cnt1++;
            });
            textNode2.on('dragstart', function () {
                this.moveToTop();
            });
            function deletetext() {
                textNode2.destroy();
                textarray[1] = "";
            }
            textNode2.on("click", function() {
                deletebtn.addEventListener("click", deletetext);
                window.setTimeout(function(){
                    deletebtn.removeEventListener("click", deletetext);
                }, 3000);
            })
            common(textNode2);
        }else if(textarray[2] == ""){
            textarray[2] = message;
            textNode3 = new Konva.Text({
                text: textarray[2],
                x:stage.width() / 2,
                y:stage.height() / 2,
                draggable: true,
            });
            layer.add(textNode3);
            textNode3.on("click", function() {
                if(cnt1 % 2 == 0) {
                    selecterp.innerHTML = `${h(textNode3.text())}を選択中`;
                    colorElement.value = textNode3.fill();
                    numberElement.value = textNode3.fontSize();
                    familyElement.value = textNode3.fontFamily();
                    colorElement.addEventListener("change", colorchange3);
                    numberElement.addEventListener("change", sizechange3);
                    familyElement.addEventListener("change", familychange3);
                    colorElement.removeEventListener("change", colorchange1);
                    numberElement.removeEventListener("change", sizechange1);
                    familyElement.removeEventListener("change", familychange1);
                    colorElement.removeEventListener("change", colorchange2);
                    numberElement.removeEventListener("change", sizechange2);
                    familyElement.removeEventListener("change", familychange2);
                }else {
                    selecterp.innerHTML = "";
                    colorElement.removeEventListener("change", colorchange3);
                    numberElement.removeEventListener("change", sizechange3);
                    familyElement.removeEventListener("change", familychange3);
                }
            cnt1++;
            });
            textNode3.on('dragstart', function () {
                this.moveToTop();
            });
            function deletetext() {
                textNode3.destroy();
                textarray[2] = "";
            }
            textNode3.on("click", function() {
                deletebtn.addEventListener("click", deletetext);
                window.setTimeout(function(){
                    deletebtn.removeEventListener("click", deletetext);
                }, 3000);
            })
            common(textNode3);
        }else {
            alert("３つ以上は追加出来ません。");
        }
    }else {
        alert("入力してください。")
    }
    return false;
}


// スタンプ
// function to apply crop
function applyCrop(pos) {
    const img = layer.findOne('.image');
    img.setAttr('lastCropUsed', pos);
}
function drowimg(num) {
    Konva.Image.fromURL(`/images/system/stamp/stamp${num}.png`,
        (img) => {
            img.setAttrs({
            width: 90,
            height: 90,
            x:stage.width() / 2,
            name: 'image',
            draggable: true,
    });
    img.on("dragstart", function() {
        this.moveToTop();
    });
    layer.add(img);
    let stptr = "";
    let stpcnt = 0;
    img.on("click", function() {
        if(stpcnt == 0) {
            stptr = new Konva.Transformer({
                nodes: [img],
                keepRatio: false,
                boundBoxFunc: (oldBox, newBox) => {
                  if (newBox.width < 10 || newBox.height < 10) {
                    return oldBox;
                  }
                  return newBox;
                },
            })
            layer.add(stptr);
            stpcnt = 1;
        }else {
            stptr.hide();
            stpcnt = 0;
        }
    })
    // apply default left-top crop
    applyCrop('center-middle');
    }
    );
}
document.addEventListener('click' , (e) => {
    for(let i = 10; i <= 65; i++) {
      if(e.target.closest("#stp" + i)) {
        drowimg(i);
      }
    }
});

// スタンプここまで

// what is url of dragging element?
// var itemURL = '';
// document
// .getElementById('drag-items')
// .addEventListener('dragstart', function (e) {
//     itemURL = e.target.src;
// });

// var con = stage.container();
//     con.addEventListener('dragover', function (e) {
//     e.preventDefault(); // !important
// });

// con.addEventListener('drop', function (e) {
// e.preventDefault();
// // now we need to find pointer position
// // we can't use stage.getPointerPosition() here, because that event
// // is not registered by Konva.Stage
// // we can register it manually:
// stage.setPointersPositions(e);

// Konva.Image.fromURL(itemURL, function (image) {
//     layer.add(image);
//     image.position(stage.getPointerPosition());
//     image.draggable(true);
//     image.on("dblclick", function() {
//         this.moveToTop();
//     });
// });
// });

// 送信
const btnsend = () =>{
    // tr.hide();
    const base = stage.toDataURL().replace(/^data:\w+\/\w+;base64,/, '');
    const input = document.createElement("input");
    input.type = "hidden";
    input.value = base;
    input.name = "base";
    document.getElementById("finish").append(input);
}

document.getElementById('save').addEventListener('click', function () {
    var pdf = new jsPDF('l', 'px', [700, 700]);
    pdf.setTextColor('#000000');
    // first add texts
    stage.find('Text').forEach((text) => {
      const size = text.fontSize() / 0.75; // convert pixels to points
      pdf.setFontSize(size);
      pdf.text(text.text(), text.x(), text.y(), {
        baseline: 'top',
        angle: -text.getAbsoluteRotation(),
      });
    });

    // then put image on top of texts (so texts are not visible)
    pdf.addImage(
      stage.toDataURL({ pixelRatio: 2 }),
      0,
      0,
      512,
      512
    );

    pdf.save('canvas.pdf');
});