# Privacy Policy — Popup Tab Guard

**Last updated:** 2026-04-22

Popup Tab Guard is a Chrome extension whose sole purpose is to prevent unwanted popup tabs from opening when the user clicks on supported video streaming websites. This document describes what the extension does and does not do with user data.

## What data the extension stores

The extension stores exactly **one** piece of data on the user's own device, via `chrome.storage.local`:

- `enabled` — a boolean (`true` / `false`) reflecting whether protection is currently turned on.

No other data is read, collected, generated, or stored.

## What data the extension transmits

**None.** The extension makes no network requests. It does not contact any server operated by the developer or any third party. There is no analytics, telemetry, error reporting, crash reporting, or remote configuration.

## What data the extension reads from the page

On the supported host list only (see `host_permissions` in `manifest.json`), the extension:

1. Overrides the page's `window.open` function so that programmatic popup requests return `null` instead of opening a new tab.
2. Listens (in the capture phase) to `click`, `mousedown`, and `auxclick` events to detect `<a target="_blank">` links pointing to third-party domains, and cancels those events.
3. Reads the URL of newly created tabs whose opener is a supported host, solely to decide whether the new tab should be closed as an unwanted popup.

The extension does **not** read page text, form input, credentials, media content, or any other page data. It does not inject content into the page.

## Permissions justification

- **`storage`** — store the single `enabled` boolean locally.
- **`tabs`** — read `tab.openerTabId`, `tab.url`, and `tab.pendingUrl` for newly created tabs in order to decide whether they are unwanted popups spawned by a supported host. No browsing history or unrelated tabs are accessed.
- **Host permissions** (hard-coded in `manifest.json`) — limit all of the above behavior to the specific video streaming websites where the popup problem occurs. The extension takes no action on any other website.

## Third-party sharing

The developer does not sell, transfer, or share user data with any third party, because no user data is collected.

## Remote code

The extension does not load, execute, or fetch any remote code. All JavaScript is bundled inside the distributed package.

## Changes

If future versions change data handling, this document will be updated and the "Last updated" date above will be revised.

## Contact

Issues and questions: https://github.com/Toyzcool/PopupTabGuard/issues
