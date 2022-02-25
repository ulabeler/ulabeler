var fileArea = document.getElementById('dragDropArea');
var fileInput = document.getElementById('fileInput');

fileArea.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  fileArea.classList.add('dragover');
});

fileArea.addEventListener('dragleave', function (evt) {
  evt.preventDefault();
  fileArea.classList.remove('dragover');
});

fileArea.addEventListener('drop', function (evt) {
  evt.preventDefault();
  fileArea.classList.remove('dragenter');
  var files = evt.dataTransfer.files;
  console.log("DRAG & DROP");
  console.table(files);
  fileInput.files = files;
  photoPreview('onChenge', files[0]);
});

function photoPreview(event, f = null) {
  var file = f;

  if (file === null) {
    file = event.target.files[0];
  }

  var reader = new FileReader();
  var preview = document.getElementById("previewArea");
  var previewImage = document.getElementById("previewIconImage");

  if (previewImage != null) {
    preview.removeChild(previewImage);
  }

  reader.onload = function (event) {
    // multipart/form-dataを扱う
    axios.post('/api/media/posticon', {
      file: reader.result
    })
    .then(function (response) {
        var img = document.createElement("img");
        img.setAttribute("src", reader.result);
        img.setAttribute("id", "previewIconImage");
        preview.appendChild(img);
        console.log(response);
      })
      .catch(function (error) {
        // status 400が帰ってきたらAlertで表示
        if (error.response.status === 400) {
          alert(error.response.data);
          location.reload();
        }
        else {
          alert('アイコン画像のアップロードに失敗しました');
          location.reload();
        }
      });
  };

  reader.readAsDataURL(file);
}