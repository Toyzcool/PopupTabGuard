const TAG = '[PopupTabGuard:bg]';

const GUARDED_HOST_PATTERN = /(^|\.)missav(\.com|\.ws|\.ai|\.tv|123\.com)$/i;

let enabled = true;

chrome.storage.local.get({ enabled: true }, (data) => {
  enabled = !!data.enabled;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if ('enabled' in changes) {
    enabled = !!changes.enabled.newValue;
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get({ enabled: true }, (data) => {
    chrome.storage.local.set({ enabled: data.enabled });
  });
});

chrome.tabs.onCreated.addListener(async (tab) => {
  try {
    if (!enabled) return;
    const openerId = tab.openerTabId;
    if (!openerId) return;

    const opener = await chrome.tabs.get(openerId).catch(() => null);
    if (!opener || !opener.url) return;

    let openerHost = '';
    try {
      openerHost = new URL(opener.url).hostname;
    } catch {
      return;
    }
    if (!GUARDED_HOST_PATTERN.test(openerHost)) return;

    const newUrl = tab.pendingUrl || tab.url || '';
    let newHost = '';
    try {
      newHost = new URL(newUrl).hostname;
    } catch {
      newHost = '';
    }

    if (newHost && GUARDED_HOST_PATTERN.test(newHost)) return;

    console.debug(TAG, 'closing popup tab', { newUrl, openerHost });
    chrome.tabs.remove(tab.id).catch(() => {});
  } catch (err) {
    console.debug(TAG, 'onCreated handler error', err);
  }
});
