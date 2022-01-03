//content script
let container;

document.addEventListener(
  "contextmenu",
  function (event) {
    let clickedEl = event.target;
    container = clickedEl.parentElement;
  },
  true,
);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request == "getClickedEl") {
    // let video = container.querySelector("video");
    // if(video) downloadVideo(video.poster);
    let image = container.querySelector("img");
    if (image) {
      downloadImage(image.src);
      sendResponse({ value: image.src });
    }
  }
});

async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  let nameArr = imageSrc.split("/");
  let name = nameArr[nameArr.length - 1];
  link.download = name.split("?")[0];
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadVideo(videoSrc) {
  const link = document.createElement("a");
  link.href = videoSrc;
  link.download = "something";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
