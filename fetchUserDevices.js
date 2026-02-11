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
