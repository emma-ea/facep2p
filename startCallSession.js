let config = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};
// const signaler = new SignalingChannel();
let rtcPeer;
let ice;

let peerSetup = false;

const initPeersConnection = async (e) => {
  if (!stream) {
    alert("No stream available");
    return;
  }

  rtcPeer = new RTCPeerConnection(config);

  callLineEl.innerHTML = `${crypto.randomUUID().replaceAll("-", "")}`;
  stream.getTracks().forEach((track) => {
    rtcPeer.addTrack(track, stream);
  });

  rtcPeer.ontrack = (ev) => {
    if (otherVideoEl.srcObject) {
      return;
    }
    const inbound = new MediaStream(ev.track);
    otherVideoEl.srcObject = inbound;
  };

  rtcPeer.onnegotiationneeded = async (ev) => {
    const offer = await rtcPeer.createOffer();
    await rtcPeer.setRemoteDescription(offer);
    const sdp = await rtcPeer.setLocalDescription(offer);
    console.log("negotiation completed with sdp: ", sdp);
    console.log("negotiation completed with offer: ", offer);
  };

  rtcPeer.onicecandidate = (ev) => {
    if (ev.candidate) {
      if (rtcPeer.iceGatheringState === "complete") {
        ice = ev.candidate;
        console.log("ice", ice);
      }
      ice = ev.candidate;
      console.log("icee: ", JSON.stringify(ice));
    } else {
      console.log("No cds");
    }
  };

  peerSetup = true;

  //   signaler.onmessage = async ({}) => {};
};

const callPeer = (e) => {
  if (!peerSetup) {
    alert("No peers available");
    return;
  }
  const ice = document.querySelector("#recipient-sdp").value;
  console.log(JSON.parse(ice));
  const remoteCandidate = new RTCIceCandidate(JSON.parse(ice));
  rtcPeer
    .addIceCandidate(remoteCandidate)
    .then(() => console.log("Added remote candidate"))
    .catch((e) => console.error("Error handling candidate", e));
};

const endCall = (e) => {};
