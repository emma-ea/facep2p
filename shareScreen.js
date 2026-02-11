const screenShareOptions = {
  surfaceSwitching: "include",
  audio: false,
  video: true,
};

const shareScreen = async (e) => {
  changeButtons([
    "green",
    "green",
    "blue",
    "blue",
    "green",
    "green",
    "blue",
    "green",
  ]);

  console.log("sharing screen");

  try {
    const displayMedia =
      await navigator.mediaDevices.getDisplayMedia(screenShareOptions);
    startRecording(e, displayMedia);
  } catch (err) {
    console.error(err);
  }
};
