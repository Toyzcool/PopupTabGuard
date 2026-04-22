const TAG = '[PopupTabGuard:bg]';

const GUARDED_HOST_PATTERN = /(^|\.)missav(\.com|\.ws|\.ai|\.tv|123\.com)$/i;

const recentOpenerTimestamps = new Map();

chrome.tabs.onCreated.addListener(async (tab) => {
  try {
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
