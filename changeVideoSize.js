const mediaConstraints = navigator.mediaDevices.getSupportedConstraints();
console.log(mediaConstraints);

const resizeVideo = (e) => {
  const vwidth = document.querySelector("#vid-width").value;
  const vheight = document.querySelector("#vid-height").value;

  console.log(vwidth, vheight);

  const videoTrack = stream.getVideoTracks()[0];
  videoTrack.applyConstraints({
    width: vwidth,
    height: vheight,
  });

  stream.getVideoTracks().forEach((track) => {
    const caps = track.getCapabilities();
    console.log(caps);
  });
};
