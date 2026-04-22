(() => {
  const TAG = '[PopupTabGuard]';
  const BRIDGE_TOKEN = '__PopupTabGuard_bridge__';

  let enabled = true;

  window.addEventListener('message', (event) => {
    if (event.source !== window) return;
    const data = event.data;
    if (!data || data.source !== BRIDGE_TOKEN) return;
    enabled = !!data.enabled;
    console.debug(TAG, 'enabled =', enabled);
  });

  const originalOpen = window.open;
  window.open = function (...args) {
    if (!enabled) return originalOpen.apply(this, args);
    console.debug(TAG, 'blocked window.open', args[0]);
    return null;
  };

  const isLikelyAd = (href) => {
    if (!href) return true;
    if (href.startsWith('javascript:')) return true;
    try {
      const url = new URL(href, location.href);
      if (url.hostname === location.hostname) return false;
      if (/missav/i.test(url.hostname)) return false;
      return true;
    } catch {
      return true;
    }
  };

  const blockIfBlankTarget = (event) => {
    if (!enabled) return;
    const path = event.composedPath ? event.composedPath() : [];
    for (const node of path) {
      if (!(node instanceof HTMLElement)) continue;
      if (node.tagName === 'A') {
        const target = node.getAttribute('target');
        if (target === '_blank') {
          const href = node.getAttribute('href') || '';
          if (isLikelyAd(href)) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
            console.debug(TAG, 'blocked click ->', href);
            return;
          }
        }
      }
    }
  };

  ['click', 'mousedown', 'auxclick'].forEach((type) => {
    document.addEventListener(type, blockIfBlankTarget, true);
  });

  console.debug(TAG, 'active on', location.hostname);
})();
