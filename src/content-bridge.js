const BRIDGE_TOKEN = '__PopupTabGuard_bridge__';

const postState = (enabled) => {
  window.postMessage({ source: BRIDGE_TOKEN, enabled: !!enabled }, '*');
};

chrome.storage.local.get({ enabled: true }, (data) => {
  postState(data.enabled);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (!('enabled' in changes)) return;
  postState(changes.enabled.newValue);
});
