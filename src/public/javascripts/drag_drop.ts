/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable require-jsdoc */
const fileArea = document.getElementById("dragDropArea");
const fileInput = document.getElementById("fileInput");

// @ts-ignore
fileArea.addEventListener("dragover", function (evt) {
  evt.preventDefault();
  // @ts-ignore
  fileArea.classList.add("dragover");
});

// @ts-ignore
fileArea.addEventListener("dragleave", function (evt) {
  evt.preventDefault();
  // @ts-ignore
  fileArea.classList.remove("dragover");
});

// @ts-ignore
fileArea.addEventListener("drop", function (evt) {
  evt.preventDefault();
  // @ts-ignore
  fileArea.classList.remove("dragenter");
  // @ts-ignore
  const files = evt.dataTransfer.files;
  console.log("DRAG & DROP");
  console.table(files);
  // @ts-ignore
  fileInput.files = files;
  // @ts-ignore
  photoPreview("onChange", files[0]);
});

// @ts-ignore
function photoPreview(event, f = null) {
  let file = f;

  if (file === null) {
    file = event.target.files[0];
  }

  const reader = new FileReader();
  const preview = document.getElementById("previewArea");
  const previewImage = document.getElementById("previewIconImage");

  // @ts-ignore
  if (previewImage != null) {
    // @ts-ignore
    preview.removeChild(previewImage);
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reader.onload = function (event) {
    // multipart/form-dataを扱う
    // @ts-ignore
    axios
      .post("/api/media/posticon", {
        file: reader.result,
      })
      // @ts-ignore
      .then(function (response) {
        const img = document.createElement("img");
        // @ts-ignore
        img.setAttribute("src", reader.result);
        img.setAttribute("id", "previewIconImage");
        // @ts-ignore
        preview.appendChild(img);
        console.log(response);
      })
      // @ts-ignore
      .catch(function (error) {
        // status 400が帰ってきたらAlertで表示
        if (error.response.status === 400) {
          alert(error.response.data);
          location.reload();
        } else {
          alert("アイコン画像のアップロードに失敗しました");
          location.reload();
        }
      });
  };

  // @ts-ignore
  reader.readAsDataURL(file);
}
