import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from "@snap/camera-kit";

(async function () {
  const cameraKit = await bootstrapCameraKit({
    apiToken:
      "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjk3MTI0MTMyLCJzdWIiOiJkZDgyOTBhYS1jY2YyLTRjNzEtODIxYy1hNDEzYWQ1OWQ5YTh-UFJPRFVDVElPTn5mZGQxZjY1Yi0yMThjLTQwMWMtYmZkNC1iNDU2MWE5Njg4NjQifQ.8H4gw_GWNU6FPj2o9nTqWkDg0mqwJg2lL6LH5681GnM",
  });
  const session = await cameraKit.createSession();
  document.getElementById("canvas").replaceWith(session.output.live);

  const { lenses } = await cameraKit.lensRepository.loadLensGroups([
    "bf043f2c-d323-4c49-b19d-65b8f6059f95",
  ]);
  session.applyLens(lenses[0]);

  let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

  const source = createMediaStreamSource(mediaStream, {
    // transform: Transform2D.MirrorX,
    cameraType: "back",
  });

  await session.setSource(source);
  session.source.setRenderSize(window.innerWidth, window.innerHeight);

  session.play();
})();
