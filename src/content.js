(() => {
  const TAG = '[PopupTabGuard]';

  const originalOpen = window.open;
  window.open = function (...args) {
    console.debug(TAG, 'blocked window.open', args[0]);
    return null;
  };

  const blockIfBlankTarget = (event) => {
    const path = event.composedPath ? event.composedPath() : [];
    for (const node of path) {
      if (!(node instanceof HTMLElement)) continue;
      if (node.tagName === 'A') {
        const target = node.getAttribute('target');
        if (target === '_blank') {
          const href = node.getAttribute('href') || '';
          if (isLikelyAd(href, node)) {
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

  const isLikelyAd = (href, node) => {
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

  ['click', 'mousedown', 'auxclick'].forEach((type) => {
    document.addEventListener(type, blockIfBlankTarget, true);
  });

  const originalAssign = Location.prototype.assign;
  // noop — reserved for future navigation-trap defenses.

  console.debug(TAG, 'active on', location.hostname);
})();
