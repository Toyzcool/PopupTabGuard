# Popup Tab Guard

A lightweight Chrome extension (MV3) that prevents unwanted popup tabs from opening when you click video players on certain adult-oriented streaming sites. Playback stays in the current tab.

## Status

v1.0.0 — initial scaffold. Hard-coded host list; no UI yet.

## How it works

Two layers of defense:

1. **Content script (`src/content.js`)** — runs at `document_start` in the MAIN world on guarded hosts. Overrides `window.open` and intercepts capture-phase `click` / `mousedown` / `auxclick` events on `<a target="_blank">` links pointing to third-party hosts.
2. **Background service worker (`src/background.js`)** — listens to `chrome.tabs.onCreated` as a fallback. If a guarded tab spawns a new tab that navigates off-site, the new tab is closed.

## Guarded hosts (v1)

- `missav.com`
- `missav.ws`
- `missav.ai`
- `missav.tv`
- `missav123.com`

Subdomains of each are also matched.

## Install (dev)

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** → select this folder

## Roadmap

- [ ] Real icons (16 / 48 / 128)
- [ ] User-configurable host list (options page)
- [ ] On/off toggle (popup UI)
- [ ] Counter of blocked popups
- [ ] Chrome Web Store listing
