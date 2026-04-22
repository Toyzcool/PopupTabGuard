# Chrome Web Store Release Playbook — Popup Tab Guard

Single source of truth for publishing **Popup Tab Guard** to the Chrome Web
Store. Every release, read top-to-bottom. When behavior changes, edit this
doc first, then mirror into the Dashboard.

> ⚠️ **Review risk note.** This extension's host permissions target a site
> (`missav.*`) that Google may classify as adult-oriented. Chrome Web Store
> *allows* adult-related utilities, but the listing will be scrutinized. Keep
> all listing copy strictly **functional and neutral** — describe the
> popup-blocking behavior, never describe or promote the target site's
> content. Do **not** write "adult", "AV", "JAV", "porn", or the literal site
> name anywhere in the public listing.

---

## 0. Release Checklist

1. Bump `version` in `manifest.json` and `popup.html` footer (§1)
2. Update §2 (Store listing copy) if behavior changed
3. Update §3 (Permission justifications) if permissions changed
4. Update §6 (Screenshots) if UI changed
5. Update `PRIVACY.md` at repo root if data handling changed
6. Run packaging command in §8
7. Upload zip → fill listing from this doc → submit for review

---

## 1. Version Numbering

| Change size | Example | Bump |
|---|---|---|
| New user-visible feature | Options page added | `1.1 → 1.2` |
| Small UX change / fix | Toggle copy tweak | `1.1 → 1.1.1` |
| Major refactor / breaking | New host list mechanism | `1.x → 2.0` |

Store versions must strictly increase. Internal iterations can skip ahead but never go back.

Current published: pending first submission at `1.1.0`.

---

## 2. Store Listing Copy

### 2.1 Summary (≤132 characters, shown in search results)

**English (default)**
```
Blocks ad popup tabs that open when you click the play button on certain video sites — playback stays in the current tab.
```

**中文 (zh_CN)**
```
拦截特定视频站点"点击播放就弹出"的广告新标签页，让播放留在当前页面。
```

### 2.2 Detailed Description

#### English
```
Popup Tab Guard — Stop the ad popup tabs that hit you the moment you click Play

The problem
You click the play button on a video. Playback starts — but at the same
time, a new tab full of unrelated advertising opens in the background.
Click the player a second time and another ad tab appears. After a few
videos your browser is buried under a stack of junk tabs you never asked
for.

What this extension does
Popup Tab Guard runs only on a small, fixed list of video websites where
this play-click ad behavior is rampant. On those sites — and only those
sites — it cancels the ad-tab popup at the exact moment you press Play:

• Neutralizes the page's programmatic popup calls (the typical trick used
  to spawn ad tabs on a click) so no new tab is opened.
• Intercepts clicks on links whose only purpose is to open a third-party
  ad tab, and stops them before the browser acts on them.
• As a fallback, if an ad tab does manage to open from a covered site and
  immediately navigates to a third-party address, it is closed
  automatically.

The video still plays. Real clicks inside the site — the menu, internal
navigation, legitimate outbound links — are left completely alone. Only
the ad-tab popup triggered by your play-click is blocked.

One-tap control
Click the toolbar icon to open the popup. A single switch turns protection
on or off. The choice is remembered locally. Default: on.

Built to be minimal
• No accounts. No sign-in. No cloud.
• No analytics, no telemetry, no network requests of any kind.
• The only data stored is a single on/off boolean on your own device.
• Open source — inspect every line at the GitHub repo.

Scope
Active on a specific, hard-coded list of video sites where the play-click
ad popup behavior is common. The extension does nothing on any other
website. If you want to propose additional sites, open an issue on the
GitHub repo.
```

#### 中文
```
Popup Tab Guard — 专治"点击播放就弹广告标签页"

痛点
你点击视频的播放按钮，视频正常开始播放——但与此同时，后台静悄悄地打开了一个无关广告的新标签页。再点一次播放，又多一个。看几个视频，浏览器已经被一堆莫名其妙的广告标签页堆满。

这个插件做什么
Popup Tab Guard 只在一小份固定的视频站点名单上生效，这些站点"点击播放就弹广告新标签页"的行为特别猖獗。在这些站点——也仅限这些站点——它会在你按下播放的那一瞬间，拦掉广告弹窗：

• 使页面的程序化弹窗调用失效（就是视频站点常用的、一点击就打开广告新标签的那种套路），直接让它开不了新标签。
• 在浏览器动手之前，拦截那些只用来跳转第三方广告新标签页的链接点击。
• 兜底：如果真有广告标签页侥幸打开了、马上跳去第三方地址，它会被自动关闭。

视频本身照常播放。站内的真实操作——打开菜单、站内跳转、合法的外链——完全不受影响。被拦掉的只有"因为你点击播放"而顺带弹出的那个广告标签页。

一键开关
点击工具栏图标打开面板，一个开关即可启停。状态会本地保存。默认开启。

极简设计
• 无账户、无登录、无云端。
• 无统计、无遥测、无任何网络请求。
• 只在本地保存一个开关布尔值，其他什么都不存。
• 开源，代码全部可在 GitHub 仓库查看。

作用范围
只在一份固定的视频站点名单上生效——这些站点"点击播放即弹广告标签页"的问题最集中。其他任何网站完全不触发。希望新增站点可到 GitHub 仓库提 issue。
```

### 2.3 manifest.json `description` field
Max 132 chars. Mirrors §2.1 summary:
```
Blocks the ad popup tabs that open the moment you click Play on certain video sites, so playback stays in the current tab.
```

---

## 3. Permission Justifications

### Single purpose statement
```
Popup Tab Guard is a single-purpose utility that blocks the ad popup tabs triggered when the user clicks the play button on a specific, hard-coded list of video streaming websites. The extension takes no action on any other site, collects no data, and makes no network requests.
```

### `storage`
```
Used to persist a single boolean flag on the user's own device (chrome.storage.local): whether protection is currently enabled. Nothing else is stored. Nothing is synced or uploaded.
```

### `tabs`
```
Used by the background service worker to read, for each newly opened tab, only its openerTabId and target URL (pendingUrl / url). This allows the extension to detect when a covered video site has spawned a new tab that immediately navigates to an unrelated third-party address — the signature of the popup we're blocking — and close that new tab. No browsing history, no metadata from unrelated tabs, and nothing from non-covered sites is read.
```

### Host permissions (`*://*.missav.com/*`, `*://*.missav.ws/*`, `*://*.missav.ai/*`, `*://*.missav.tv/*`, `*://*.missav123.com/*`)
```
Required to run the two content scripts on exactly the five hosts where the unwanted popup behavior occurs. One content script reads the single boolean enabled flag from chrome.storage and forwards it to the second script, which overrides window.open and cancels click/mousedown/auxclick events on <a target="_blank"> links pointing to third-party domains. The extension reads no page content, no form input, and no credentials. It injects no UI into the page.
```

### Remote code
Answer: **No, I am not using remote code.**
Rationale: all JavaScript ships inside the package. No `eval`, no external `<script src>`, no runtime-fetched modules, no remote configuration.

---

## 4. Data Usage Form

Do **not** check any data collection box. Popup Tab Guard collects, transmits, and stores no user data other than a local boolean on/off flag that is not linked to any identifier.

Confirm all three certifications:
- ✅ I do not sell or transfer user data to third parties, outside of the approved use cases
- ✅ I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- ✅ I do not use or transfer user data to determine creditworthiness or for lending purposes

---

## 5. Privacy Policy

Policy lives at repo root: [`/PRIVACY.md`](./PRIVACY.md).
Public URL for Dashboard (after first push to `main`):

```
https://raw.githubusercontent.com/Toyzcool/PopupTabGuard/main/PRIVACY.md
```

> Note: the GitHub repo is currently **private**. Chrome Web Store requires
> a publicly accessible privacy policy URL. Options:
> 1. Make the repo public before submitting (recommended — also earns
>    reviewer trust for open-source utility extensions).
> 2. Or paste the same content into a public Gist / static page and use
>    that URL instead.

When behavior changes, edit `PRIVACY.md` and bump the "Last updated" date.

---

## 6. Screenshots

Chrome accepts up to 5 screenshots, 1280×800 or 640×400, 24-bit PNG/JPEG,
no alpha. Always use 1280×800.

> ⛔ **Hard rule: never screenshot missav or any covered host.** Any visible
> thumbnail, logo, URL, or page content from those sites will trigger an
> adult-content rejection. Every tile below is designed so no capture from
> the target site is ever needed.

Each tile: top header (bilingual), main visual, bottom signature strip
("Popup Tab Guard" + icon).

### #1 — Landing: the popup storm (tab strip, neutralized)

**Capture strategy**
No missav needed. Two safe ways to stage the tab strip:

- **Option A (preferred).** On any neutral page (e.g. `about:blank` or a
  local HTML file), open DevTools → Elements → edit `<title>` on the fly,
  or run `document.title = "Video Player"` in Console. Duplicate the tab
  3–4 times and rename each: `"Sponsored"`, `"Ad · New"`, `"Special Offer"`.
  Screenshot the full tab strip at the top of the Chrome window.
- **Option B.** Screenshot your current Chrome tab strip, then in Figma /
  Photoshop overwrite each tab's text with neutral placeholder labels
  before exporting.

Take two versions: one with 4 tabs (1 real + 3 "ads"), one with a single
clean tab.

**AI prompt**
```
Create a Chrome Web Store screenshot, canvas exactly 1280×800 pixels,
24-bit PNG (no alpha), pure white background.

Top 80 pixels: bilingual header, centered.
Line 1 (Chinese, bold, ~36pt, #202124): "点击播放 · 广告标签页立刻消失"
— highlight "广告标签页立刻消失" in bright blue #1A73E8.
Line 2 (English, medium, ~22pt, #5F6368): "Click Play — Ad Popup Tabs, Gone"
— highlight "Ad Popup Tabs, Gone" in #1A73E8.

Main area: the two attached tab-strip captures stacked vertically with
a 40px gap, horizontally centered, scaled to about 1100px wide.

- Top image (the cluttered tab strip with 4 tabs — one player tab and
  three unrelated ad-looking tabs). To its LEFT, outside the image,
  place a red pill badge: "默认 · Default" (background #FEE4E2, text
  #B42318, 6px radius, 14pt medium).
- Bottom image (single clean tab). To its LEFT, a green pill:
  "Popup Tab Guard · Protected" (background #D1FADF, text #027A48).

Round image corners to 8px, soft drop shadow (0 6px 20px rgba(0,0,0,0.08)).

Between the two images, centered, add a small downward arrow in #1A73E8
(3px stroke, rounded caps) with the bilingual caption under it in
#5F6368 13pt: "开启保护后 · After enabling".

Bottom 40 pixels: thin horizontal line #E8EAED, centered extension icon
and the text "Popup Tab Guard" in #202124 medium 14pt.

Chinese font: PingFang SC / Source Han Sans.
English font: Inter / SF Pro Display.
Generous whitespace, Material Design feel. No site names or URLs visible
anywhere on either tab strip.
```

### #2 — The popup UI (Liquid Glass)

**Capture strategy**
Completely safe — this is the extension's own UI.

1. Click the toolbar icon so the popup opens.
2. Screenshot the popup in ON state, then toggle and screenshot OFF state.
3. Both captures on a neutral light desktop background (a light gray or
   a soft macOS wallpaper without any app windows visible).

**AI prompt**
```
Create a Chrome Web Store screenshot, canvas exactly 1280×800 pixels,
24-bit PNG (no alpha), pure white background.

Top 80 pixels: bilingual header.
Line 1 (Chinese, bold, ~36pt, #202124): "极简控制，一开一关"
— highlight "一开一关" in bright blue #1A73E8.
Line 2 (English, medium, ~22pt, #5F6368): "Minimal Control, One Switch"
— highlight "One Switch" in #1A73E8.

Main area: two attached screenshots of the extension popup placed side
by side with a 60px gap, vertically centered. Left: switch ON (green).
Right: switch OFF (gray). Round corners 20px, large soft drop shadow
(0 20px 60px rgba(28,28,45,0.18)) to emphasize the glass material.

Under each screenshot, a small label centered in #5F6368 14pt:
- Left: "保护开启 · Protection On"
- Right: "临时关闭 · Paused"

Bottom 40 pixels: extension icon + "Popup Tab Guard" #202124 14pt.
Follow Material Design, generous whitespace.
```

### #3 — Scope transparency (pure text composition — zero risk)

**Capture strategy**
No screenshots. Feed the prompt below directly to an image AI.

> Note: the exact domain names are deliberately omitted from the tile and
> kept to the privacy policy / permission justifications instead — reviewers
> have full transparency there, and the public screenshot avoids printing
> the site names in promotional imagery.

**AI prompt**
```
Create a Chrome Web Store screenshot, canvas exactly 1280×800 pixels,
24-bit PNG (no alpha), pure white background.

Top 80 pixels: bilingual header.
Line 1 (Chinese, bold, ~36pt, #202124): "只在固定站点工作，其他一律不动"
— highlight "固定站点" and "一律不动" in #1A73E8.
Line 2 (English, medium, ~22pt, #5F6368): "Active on a Fixed List — Inactive Everywhere Else"
— highlight "Active" and "Inactive" in #1A73E8.

Main area: two columns separated by a vertical divider (#E8EAED, 1px),
each column ~500px wide, vertically centered.

Left column (centered vertically, centered horizontally within its half):
A very large numeral "5" in #1A73E8, bold, ~180pt, with a subtle
gradient from #1A73E8 at top to #4FC3F7 at bottom.
Directly under the numeral, a label in #202124 bold 22pt:
"个固定的视频站点"
Below that, an English label in #5F6368 medium 16pt:
"hard-coded video hosts"
Below that, a smaller hint in #9AA0A6 regular 13pt, italic:
"完整名单见权限说明与隐私政策 / Full list in the permission notes and privacy policy"
All three text lines centered.

Right column header (~20pt, #202124, bold): "不做什么 · What it won't do"
Below it, a vertical stack of four rows (each row: a small gray outline
circle-with-slash icon + text, 14px gap between rows):
- 不读取页面文字 · Does not read page text
- 不访问网络 · Makes no network requests
- 不收集数据 · Collects no data
- 不在其他网站运行 · Inactive on all other sites
Text: #5F6368 medium 15pt. Icon: #9AA0A6, 18px.

Bottom 40 pixels: extension icon + "Popup Tab Guard".
Follow Material Design, airy layout, large whitespace.
No site names, URLs, or host strings should appear anywhere on the tile.
```

### #4 — Open-source · Local-only · Zero uploads (trust tile)

**Capture strategy**
No screenshots. Pure illustration.

**AI prompt**
```
Create a Chrome Web Store screenshot, canvas exactly 1280×800 pixels,
24-bit PNG (no alpha), pure white background.

Top 80 pixels: bilingual header.
Line 1 (Chinese, bold, ~36pt, #202124): "开源 · 纯本地 · 零上传"
— highlight "开源", "纯本地", "零上传" each in #1A73E8.
Line 2 (English, medium, ~22pt, #5F6368): "Open Source · Local-Only · Zero Uploads"
— highlight "Open Source", "Local-Only", "Zero Uploads" each in #1A73E8.

Main area: three large rounded square tiles in a horizontal row, each
roughly 280×280px, rounded 28px corners, very soft drop shadow
(0 10px 30px rgba(26,115,232,0.10)), subtle gradient background from
#F4F8FF at top-left to #FFFFFF at bottom-right, 1px inner border
rgba(26,115,232,0.08). 40px gap between tiles.

Tile 1 — icon (centered upper area, ~100×100px): a stylized code-bracket
glyph "{ }" in flat #1A73E8.
  Chinese label: "开源"  (20pt #202124 bold)
  English label: "Open Source"  (14pt #5F6368 medium)
  Sub: "代码全部在 GitHub 公开" / "Full source on GitHub"  (12pt #9AA0A6)

Tile 2 — icon: a simple outline home/house in #1A73E8.
  Chinese label: "纯本地"
  English label: "Local-Only"
  Sub: "设置只存在你的设备" / "Settings stay on your device"

Tile 3 — icon: an outline cloud with a diagonal slash through it in #1A73E8.
  Chinese label: "零上传"
  English label: "Zero Uploads"
  Sub: "无任何网络请求" / "No network requests at all"

Bottom 40 pixels: extension icon + "Popup Tab Guard".
Material Design, ample whitespace, symmetric layout.
```

### #5 — How it works (abstract flow diagram)

**Capture strategy**
No screenshots. Abstract vector illustration — feed the prompt to an
image AI.

**AI prompt**
```
Create a Chrome Web Store screenshot, canvas exactly 1280×800 pixels,
24-bit PNG (no alpha), pure white background.

Top 80 pixels: bilingual header.
Line 1 (Chinese, bold, ~36pt, #202124): "按下播放的那一刻 · 广告弹窗被拦下"
— highlight "广告弹窗被拦下" in #1A73E8.
Line 2 (English, medium, ~22pt, #5F6368): "The Moment You Hit Play, the Ad Popup Is Caught"
— highlight "Ad Popup Is Caught" in #1A73E8.

Main area: a horizontal three-stage flow, centered vertically, consisting
of three rounded rectangle cards connected by arrows.

Card 1 (left, ~280×220px, rounded 20px, light gray border #E8EAED,
white fill): a simple outline of a video player with a prominent blue
play-triangle at its center and a small click-ripple on the play button,
all in #1A73E8. Label below (inside card, 16pt bold #202124):
"① 点击播放"  (sub: 14pt #5F6368 "Click the play button")

Arrow 1 (between card 1 and 2): #1A73E8, 3px, rounded caps, small
arrowhead at the right end. Above the arrow, a tiny chip: "页面偷偷打开广告标签页 /
Page tries to sneak open an ad tab" (11pt #9AA0A6 italic).

Card 2 (middle, ~280×220px): a shield icon in #1A73E8 with a gentle
glow halo behind it, intercepting a small browser-tab silhouette (the
ad tab) shown being blocked by the shield. Label (16pt bold #202124):
"② 广告标签页被拦截"  (sub: 14pt #5F6368 "Ad tab blocked"). A small green
checkmark badge in the top-right corner of the card.

Arrow 2 (between card 2 and 3): same style as arrow 1. Above: tiny chip
"新标签页未打开 / No new tab opens" (11pt #9AA0A6 italic).

Card 3 (right, ~280×220px): an illustration of a single clean browser
window (outline with three window-dots) containing a play-triangle with
a soft playback-progress bar beneath it — conveying the video is
playing normally. Label: "③ 视频照常播放"  (sub: "Video keeps playing
right here").

Below the flow, a single-line footnote centered, 13pt #5F6368:
"全程本地完成，不发送任何请求 · All processing is local, no network calls."

Bottom 40 pixels: extension icon + "Popup Tab Guard".
Material Design, clean strokes, generous whitespace.
```

---

## 7. Promo Tiles

### 7.1 Small Promo Tile (440×280)

**AI prompt**
```
A Chrome Web Store small promo tile, canvas size 440×280 pixels, 24-bit
PNG (no alpha). Pure white background decorated with soft blue flowing
curves in the top-left and bottom-right corners (gradient from deep
blue #1A73E8 to light blue #4FC3F7).

Center, horizontally stacked text:

Line 1 (Chinese headline, largest, bold): "点击播放 · 拦截广告标签页"
— dark gray #202124 bold sans-serif, with "拦截广告标签页" in bright blue #1A73E8.

Line 2 (English headline, slightly smaller, bold): "Click Play · Block the Ad Tab"
— dark gray #202124 bold sans-serif, with "Block the Ad Tab" in #1A73E8.

(Spacing ~20px, then)

Line 3 (Chinese subtitle, medium): "播放留在当前页，不再弹出新标签"
— medium gray #5F6368 medium weight.

Line 4 (English subtitle, medium): "Playback stays in the current tab"
— medium gray #5F6368 medium weight.

Chinese font: PingFang SC Bold / Source Han Sans Heavy.
English font: Inter Bold / SF Pro Display Bold.
Rounded canvas corners ~12px. Clean, bright, generous whitespace.
```

### 7.2 Marquee Promo Tile (1400×560)

**AI prompt**
```
A Chrome Web Store Marquee Promo Tile, canvas size 1400×560 pixels,
24-bit PNG (no alpha channel). Solid pure white background with large
flowing blue abstract curves in the top-left and bottom-right corners
(gradient from deep blue #1A73E8 to light blue #4FC3F7), spacious and
dynamic.

Horizontally-centered vertical text stack:

Line 1 (Chinese headline, largest, bold): "点击播放视频 · 广告标签页即刻拦下"
— dark gray #202124 bold sans-serif, with "广告标签页即刻拦下" in bright blue #1A73E8.

Line 2 (English headline, slightly smaller): "Click Play — Ad Popup Tabs Blocked Instantly"
— dark gray #202124 bold sans-serif, with "Ad Popup Tabs Blocked" in #1A73E8.

(Spacing 40–60px, then)

Line 3 (Chinese subtitle, medium): "播放不打断 · 开源 · 纯本地 · 零上传"
— medium gray #5F6368 medium weight, with "开源", "纯本地", "零上传" in #1A73E8.

Line 4 (English subtitle, medium): "Playback uninterrupted · Open Source · Local-Only · Zero Uploads"
— medium gray #5F6368 medium weight, with "Open Source", "Local-Only", "Zero Uploads" in #1A73E8.

Chinese font: PingFang SC Bold / Source Han Sans Heavy.
English font: Inter Bold / SF Pro Display Bold.
Rounded canvas corners ~16px. Clean, modern, Material Design feel.
```

---

## 8. Packaging

Run from repo root. Zip must contain **only runtime files**:

```bash
cd /Users/toyz/Documents/Growth/Package/Project/PopupTabGuard
find . -name ".DS_Store" -delete
rm -f popup-tab-guard-v*.zip
VERSION=$(grep '"version"' manifest.json | head -1 | sed 's/[^0-9.]//g')
zip -r "popup-tab-guard-v${VERSION}.zip" \
  manifest.json \
  src/background.js src/content-bridge.js src/content.js \
  src/popup.html src/popup.css src/popup.js \
  icons/icon16.png icons/icon32.png icons/icon48.png icons/icon128.png
```

Verify contents:
```bash
unzip -l "popup-tab-guard-v${VERSION}.zip"
```

Expected: 10 entries, ~20 KB total. If anything else appears (`.git/`,
`.DS_Store`, `README.md`, `CHROME_STORE.md`, `PRIVACY.md`) remove it and
re-run — never `zip -r *` or `zip -r . src icons manifest.json`.

---

## 9. Other Listing Fields

| Field | Value |
|---|---|
| Category | Productivity |
| Support site | `https://github.com/Toyzcool/PopupTabGuard/issues` |
| Homepage | `https://github.com/Toyzcool/PopupTabGuard` |
| Languages | Default: English. Add Chinese (zh_CN) after first approval unlocks it. |

---

## 10. Post-Submit Notes

- Host permissions on a site Google may flag as adult-adjacent → expect **7–14 business days** of review, possibly longer, possibly a manual-review ping asking for clarification. Keep the single-purpose justification (§3) and privacy policy (§5) ready to paste verbatim into a reply.
- Most likely rejection reasons for this extension:
  1. **Screenshot shows site content** that the reviewer considers adult. Mitigation: §6 screenshots are designed to show tab strip / popup UI / text tiles only. Do not screenshot the actual video site.
  2. **Permission justification too vague.** Paste §3 sections verbatim.
  3. **Single purpose doubts** — reviewer worries the extension does more than claimed. Mitigation: emphasize that host_permissions are limited to a hard-coded list and the extension takes no action elsewhere.
- Listing-text / screenshot updates re-review in <24h. Code updates run full review.
