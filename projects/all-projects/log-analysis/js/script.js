const video = document.getElementById("video");
let hasUserStarted = false;

video.addEventListener("click", () => {
  if (!hasUserStarted) {
    video.play();
    hasUserStarted = true;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "f" && document.activeElement === video) {
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
});
