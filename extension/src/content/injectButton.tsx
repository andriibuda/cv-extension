const mountButton = () => {
  // Check if the button already exists to avoid duplicates

  const targetFlexRow = document.querySelector('.mt4 > .display-flex');
  if (!targetFlexRow || targetFlexRow.querySelector('[data-resume-button]')) return;

  // Create the button element

  const button = document.createElement('button');
  button.setAttribute('data-resume-button', 'true');
  button.textContent = 'Generate Resume';

  // Add classes and styles to the button

  button.className = 'jobs-save-button artdeco-button artdeco-button--2 artdeco-button--secondary artdeco-button--3';
  button.style.marginLeft = '10px';

  // Add an event listener to the button to handle the click event

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

// Wait for the page to load and then mount the button

setTimeout(mountButton, 1000);

// Observe changes in the DOM to ensure the button is mounted even if the page updates dynamically

const observer = new MutationObserver(() => {
  mountButton();
});
observer.observe(document.body, { childList: true, subtree: true });
