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
