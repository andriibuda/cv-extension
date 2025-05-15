const mountButton = () => {
  const targetFlexRow = document.querySelector('.mt4 > .display-flex');
  if (!targetFlexRow || targetFlexRow.querySelector('[data-resume-button]')) return;
  const button = document.createElement('button');
  button.setAttribute('data-resume-button', 'true');
  button.textContent = 'Generate Resume';
  button.className = 'jobs-save-button artdeco-button artdeco-button--2 artdeco-button--secondary artdeco-button--3';
  button.style.marginLeft = '10px';
  button.onclick = async() => {
    const res = await fetch("http://localhost:3001/api/generate-cv", {
      method: "POST",
      headers: {
        "Content-Type": "text/html",
        "Accept": "text/html"
      },
      body: document.querySelector("#job-details")?.textContent 
  })}
  targetFlexRow.appendChild(button);
};

setTimeout(mountButton, 500);

const observer = new MutationObserver(() => {
  mountButton();
});
observer.observe(document.body, { childList: true, subtree: true });
