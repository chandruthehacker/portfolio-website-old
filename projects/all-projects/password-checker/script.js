function copyToClipboard(button) {
  const codeBlock = button.previousElementSibling?.querySelector("code");

  if (!codeBlock) {
    console.error("No <code> element found near this button.");
    return;
  }

  const textToCopy = codeBlock.innerText || codeBlock.textContent;

  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      button.innerHTML = "✅ Copied!";
      button.disabled = true;

      setTimeout(() => {
        button.innerHTML = '<i class="bx bx-copy-alt"></i>';
        button.disabled = false;
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      button.innerHTML = "❌ Failed";
      setTimeout(() => {
        button.innerHTML = '<i class="bx bx-copy-alt"></i>';
      }, 1500);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("demo-video");

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const source = video.querySelector('source');
          if (source && source.dataset.src) {
            source.src = source.dataset.src;
            video.load();
            obs.unobserve(video);
          }
        }
      });
    }, { threshold: 0.25 });

    observer.observe(video);
  } else {
    // Fallback for older browsers
    const source = video.querySelector('source');
    if (source && source.dataset.src) {
      source.src = source.dataset.src;
      video.load();
    }
  }
});
