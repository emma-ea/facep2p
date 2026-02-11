let mediaRecorder = null;
let chunks = [];

const startRecording = (e, vidStream) => {
  if (!vidStream) {
    alert("No stream available");
    return;
  }

  chunks = [];
  mediaRecorder = new MediaRecorder(vidStream);
  mediaRecorder.ondataavailable = (event) => {
    chunks.push(event.data);
  };
  mediaRecorder.start();
  console.log("started recording");
  changeButtons([
    "blue",
    "green",
    "blue",
    "blue",
    "green",
    "blue",
    "grey",
    "blue",
  ]);
};

const stopRecording = (e) => {
  if (!mediaRecorder) {
    alert("No media recording active");
    return;
  }
  mediaRecorder.stop();
  console.log("stopped recording");
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "blue",
    "blue",
  ]);
};

const playRecording = (e) => {
  console.log("playing record");
  const buffer = new Blob(chunks, { type: "video/ogv; codecs=opus" });
  otherVideoEl.src = window.URL.createObjectURL(buffer);
  // otherVideoEl.controls = true;
  // otherVideoEl.play();
};
