let imageURL;
function onUpload() {
  console.log("BUTTON CLICKED");
  const fileInput = document.getElementById("file");
  const image = fileInput.files[0];
  const api_key = "AkLbaateGn3aqNrujvzA3p1Q";

  const formData = new FormData();
  formData.append("image_file", image);
  formData.append("size", "auto");

  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = "";

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": api_key,
    },
    body: formData,
  })
    .then(function (response) {
      return response.blob();
    })
    .then(function (blobReceived) {
      console.log(blobReceived);
      const url = URL.createObjectURL(blobReceived);
      imageURL = url;
      const img = document.createElement("img");
      img.src = url;
      img.alt = "image";
      img.style.width = "35%";
      img.style.marginRight = "5%";
      imageContainer.appendChild(img); // Append image to the container
      //document.body.appendChild(img);

      const downloadBtn = document.createElement("button");
      downloadBtn.classList.add("btn", "Downloadbutton2");
      downloadBtn.addEventListener("click", onDownload);
      downloadBtn.style.height = "25%";
      imageContainer.appendChild(downloadBtn);
    })
    .catch();
}

function onDownload() {
  var anchorElement = document.createElement("a");
  anchorElement.href = imageURL;
  anchorElement.download = "no-bg.png";
  document.body.appendChild(anchorElement);
  anchorElement.click();
  document.body.removeChild(anchorElement);
}

document.querySelector(".ChooseButton").addEventListener("click", function () {
  document.getElementById("file").click();
});

document.getElementById("file").addEventListener("change", function () {
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  const fileName = this.files[0].name;
  fileNameDisplay.textContent = fileName;
  onUpload();
});
