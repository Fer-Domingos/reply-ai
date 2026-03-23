const messageInput = document.getElementById('messageInput');
const generateBtn = document.getElementById('generateBtn');
const statusText = document.getElementById('statusText');

const outputs = {
  professional: document.getElementById('professionalOutput'),
  friendly: document.getElementById('friendlyOutput'),
  direct: document.getElementById('directOutput'),
};

const templates = {
  professional: (message) =>
    `Hi,\n\nThank you for your message. Regarding "${message}", I can help with that and will follow up with the requested information shortly. Please let me know if there are any additional details you'd like me to include.\n\nBest regards,`,
  friendly: (message) =>
    `Hey,\n\nThanks for reaching out about "${message}". Happy to help — I'll take care of it and circle back soon with everything you need. If there's anything else you'd like me to cover, just let me know!\n\nThanks,`,
  direct: (message) =>
    `Got it. Re: "${message}", I'll handle it and send you an update shortly. Let me know if you need anything else.`,
};

function updateStatus(text, tone = 'default') {
  statusText.textContent = text;
  statusText.style.color = tone === 'success' ? 'var(--success)' : 'var(--muted)';
}

function generateReplies() {
  const message = messageInput.value.trim();

  if (!message) {
    updateStatus('Please enter a message before generating replies.');
    messageInput.focus();
    return;
  }

  Object.entries(outputs).forEach(([tone, element]) => {
    element.textContent = templates[tone](message);
  });

  updateStatus('Replies generated. You can copy any response below.', 'success');
}

async function copyReply(tone, button) {
  const text = outputs[tone].textContent;

  if (!text || text.includes('will appear here')) {
    updateStatus('Generate replies first so there is something to copy.');
    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    const originalLabel = button.textContent;
    button.textContent = 'Copied!';
    updateStatus(`${tone.charAt(0).toUpperCase() + tone.slice(1)} reply copied to clipboard.`, 'success');
    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1500);
  } catch (error) {
    updateStatus('Copy failed in this browser. Please copy the text manually.');
  }
}

generateBtn.addEventListener('click', generateReplies);
messageInput.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    generateReplies();
  }
});

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', () => copyReply(button.dataset.tone, button));
});
