let stream = null;
let videoEl = document.querySelector("#my-video");
let otherVideoEl = document.querySelector("#other-video");

// feeds
const audioInsSelectorEl = document.querySelector("#audio-input");
const audioOutSelectorEl = document.querySelector("#audio-output");
const videoFeedsEl = document.querySelector("#video-input");

audioInsSelectorEl.addEventListener("change", (e) => changeAudioInput(e));
audioOutSelectorEl.addEventListener("change", (e) => changeAudioOutput(e));
videoFeedsEl.addEventListener("change", (e) => changeVideoInput(e));

const constraints = {
  audio: true,
  video: true,
};

const getMicAndCamera = async (e) => {
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    changeButtons([
      "green",
      "blue",
      "blue",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ]);
    fetchUserDevices();
  } catch (err) {
    console.log(err);
  }
};

const showMyFeed = (e) => {
  if (!stream) {
    alert("Stream is loading");
  }
  videoEl.srcObject = stream;
  changeButtons([
    "blue",
    "green",
    "green",
    "grey",
    "green",
    "grey",
    "grey",
    "green",
  ]);
};

const stopMyFeed = (e) => {
  const tracks = stream.getTracks();
  tracks.forEach((track) => {
    track.stop();
  });
  changeButtons([
    "blue",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
    "grey",
  ]);
};

document
  .querySelector("#share")
  .addEventListener("click", (e) => getMicAndCamera(e));
document
  .querySelector("#show-video")
  .addEventListener("click", (e) => showMyFeed(e));
document
  .querySelector("#stop-video")
  .addEventListener("click", (e) => stopMyFeed(e));
document
  .querySelector("#change-size")
  .addEventListener("click", (e) => resizeVideo(e));
document
  .querySelector("#start-record")
  .addEventListener("click", (e) => startRecording(e, stream));
document
  .querySelector("#stop-record")
  .addEventListener("click", (e) => stopRecording(e));
document
  .querySelector("#play-record")
  .addEventListener("click", (e) => playRecording(e));
document
  .querySelector("#share-screen")
  .addEventListener("click", (e) => shareScreen(e));
