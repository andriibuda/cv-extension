const mountButton = () => {
  const targetFlexRow = document.querySelector('.mt4 > .display-flex');
  if (!targetFlexRow || targetFlexRow.querySelector('[data-resume-button]')) return;
  const button = document.createElement('button');
  button.setAttribute('data-resume-button', 'true');
  button.textContent = 'Generate Resume';
  button.className = 'jobs-save-button artdeco-button artdeco-button--2 artdeco-button--secondary artdeco-button--3';
  button.style.marginLeft = '8px';
  button.onclick = () => alert('Resume generation started!');
  targetFlexRow.appendChild(button);
};

setTimeout(mountButton, 500);

const observer = new MutationObserver(() => {
  mountButton();
});
observer.observe(document.body, { childList: true, subtree: true });
