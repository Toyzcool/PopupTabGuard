const toggle = document.getElementById('enabled-toggle');
const statusLine = document.getElementById('status-line');
const toggleSub = document.getElementById('toggle-sub');
const footerText = document.getElementById('footer-text');

const render = (enabled) => {
  toggle.checked = enabled;
  document.body.classList.toggle('is-off', !enabled);
  statusLine.textContent = enabled ? 'Active on this site' : 'Paused';
  toggleSub.textContent = enabled ? 'Blocking popup tabs' : 'Popups allowed';
  footerText.textContent = enabled
    ? 'v1.1.0 · Guarding selected sites'
    : 'v1.1.0 · Protection disabled';
};

chrome.storage.local.get({ enabled: true }, (data) => {
  render(!!data.enabled);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ enabled });
  render(enabled);
});
