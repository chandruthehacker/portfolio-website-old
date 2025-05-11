function copyToClipboard(button) {
    const code = button.previousElementSibling.querySelector('code');
    const text = code.innerText || code.textContent;

    navigator.clipboard.writeText(text).then(() => {
      button.textContent = '✅ Copied!';
      setTimeout(() => {
        button.innerHTML = '<i class="bx bx-copy-alt"></i>';
      }, 1500);
    });
  }