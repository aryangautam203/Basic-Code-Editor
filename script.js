function run() {
  let htmlCode = document.getElementById("html").value;
  let cssCode = document.getElementById("css").value;
  let jsCode = document.getElementById("js").value;
  let output = document.getElementById("output");

  output.contentDocument.body.innerHTML =
    htmlCode + "<style>" + cssCode + "</style>";
  output.contentWindow.eval(jsCode);
}

function copyToClipboard(elementId) {
  let textarea = document.getElementById(elementId);

  let range = document.createRange();
  range.selectNode(textarea);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);

  document.execCommand("copy");

  window.getSelection().removeAllRanges();
  alert("Copied to clipboard: " + elementId);
}

function saveCode() {

  let htmlCode = document.getElementById("html").value;
  let cssCode = document.getElementById("css").value;
  let jsCode = document.getElementById("js").value;

  let combinedCode = `<!doctype html>
<html>
<head>
    <style>${cssCode}</style>
</head>
<body>
    ${htmlCode}
    <script>${jsCode}</script>
</body>
</html>`;

  let blob = new Blob([combinedCode], { type: "text/html" });

  let url = window.URL.createObjectURL(blob);

  let a = document.createElement("a");
  a.href = url;
  a.download = "code.html";

  a.click();

  window.URL.revokeObjectURL(url);
}

function toggleCodeEditing() {
    let textareas = document.querySelectorAll("textarea");
    let lockUnlockButton = document.getElementById("lockUnlockButton");
    let lockUnlockIcon = document.getElementById("lockUnlockIcon");
    let lockUnlockText = document.getElementById("lockUnlockText");

    // Loop through each textarea and toggle the "disabled" attribute
    for (let textarea of textareas) {
        textarea.disabled = !textarea.disabled;
    }

    // Update the icon and text based on the current state
    if (textareas[0].disabled) {
        lockUnlockIcon.classList.remove("fa-lock");
        lockUnlockIcon.classList.add("fa-unlock");
        lockUnlockText.textContent = " unLock";
    } else {
        lockUnlockIcon.classList.remove("fa-unlock");
        lockUnlockIcon.classList.add("fa-lock");
        lockUnlockText.textContent = " lock";
    }

    // Update the content using innerHTML
    let lockUnlockContent = document.getElementById("lockUnlockContent");
    lockUnlockContent.innerHTML = lockUnlockIcon.outerHTML + lockUnlockText.outerHTML;
}


