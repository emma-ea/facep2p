let availableAudioIns = [];
let availableAudioOuts = [];
let availableVideoFeeds = [];

const fetchUserDevices = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  devices.forEach((device) => {
    const option = document.createElement("option");
    option.value = device.deviceId;
    option.text = device.label;

    if (device.kind === "audioinput") {
      availableAudioIns.push(device);
      audioInsSelectorEl.appendChild(option);
    }
    if (device.kind === "audiooutput") {
      availableAudioOuts.push(device);
      audioOutSelectorEl.appendChild(option);
    }
    if (device.kind === "videoinput") {
      availableVideoFeeds.push(device);
      videoFeedsEl.appendChild(option);
    }
  });

  console.log(devices);
};

const changeAudioInput = (e) => {
  const deviceId = e.target.value;

  const newConstraints = {
    audio: { deviceId: { exact: deviceId } },
    video: true,
  };

  try {
    stream = navigator.mediaDevices.getUserMedia(newConstraints);
  } catch (err) {
    console.error(err);
  }
};

const changeAudioOutput = async (e) => {
  await videoEl.setSinkId(e.target.value);
};

const changeVideoInput = async (e) => {
  const deviceId = e.target.value;

  const newConstraints = {
    audio: true,
    video: { deviceId: { exact: deviceId } },
  };

  stream = navigator.mediaDevices.getUserMedia(newConstraints);
};
