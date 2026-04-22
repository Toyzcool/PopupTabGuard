# Popup Tab Guard

A lightweight Chrome extension (MV3) that blocks the ad popup tabs which open the moment you click the play button on certain video streaming sites. Playback stays in the current tab.

---

## 📦 Download & Install / 下载安装

**Latest release:** [**Download popup-tab-guard.zip**](https://github.com/Toyzcool/PopupTabGuard/releases/latest) — click the `.zip` file under "Assets".

Then follow the 5-step guide below (English / 中文) — no Git, no command line needed.

> Coming soon: one-click install from the Chrome Web Store (under review).
> 即将上线：Chrome 应用商店一键安装（审核中）。

---

## English

### What it does

On the supported sites listed below, every time you click the play button the page tries to open an unrelated ad tab in the background. Popup Tab Guard cancels that ad tab the instant it is triggered, so your video plays normally and your browser stays clean.

### Supported sites

- `missav.com`
- `missav.ws`
- `missav.ai`
- `missav.tv`
- `missav123.com`

Subdomains of each are also covered. The extension does **nothing** on any other website.

### How to install (recommended — from GitHub Releases)

1. Go to the [**latest release**](https://github.com/Toyzcool/PopupTabGuard/releases/latest) and download the `.zip` file from the "Assets" section.
2. Unzip it anywhere (your Desktop is fine).
3. Open Chrome and type `chrome://extensions` in the address bar, then press Enter.
4. Turn on **Developer mode** (the toggle in the top-right corner of the page).
5. Click **Load unpacked** and select the unzipped folder.

Done. Visit any supported site, click play, and no more ad tabs.

### Turning it on / off

1. Click the Popup Tab Guard icon in the Chrome toolbar.
2. Toggle the single switch in the popup — green means protection is active, gray means paused.
3. Your choice is remembered locally.

### Alternative: install from the Chrome Web Store

Coming soon once the store review is complete. A link will appear here.

### Privacy

- No accounts, no sign-in, no cloud.
- No analytics, no telemetry, no network requests.
- The only stored value is a single on/off boolean, kept locally via `chrome.storage.local`.

Full privacy policy: [`PRIVACY.md`](./PRIVACY.md)

---

## 中文

### 这个插件做什么

在下方列出的视频站点上，每次你点击播放按钮，页面都会在后台偷偷打开一个无关的广告新标签页。Popup Tab Guard 会在广告标签页被触发的瞬间把它拦下，视频照常播放，浏览器标签页不再被塞满。

### 生效的网站

- `missav.com`
- `missav.ws`
- `missav.ai`
- `missav.tv`
- `missav123.com`

以及上述域名的所有子域。其他任何网站都**不会**触发这个插件。

### 如何安装（推荐 —— 从 GitHub Releases）

1. 进入[**最新 Release**](https://github.com/Toyzcool/PopupTabGuard/releases/latest)，在 "Assets" 区域下载 `.zip` 文件。
2. 解压到任意位置（桌面即可）。
3. 打开 Chrome，地址栏输入 `chrome://extensions` 回车。
4. 打开页面右上角的 **开发者模式**。
5. 点击 **加载已解压的扩展程序**，选择刚才解压出来的文件夹。

完成。访问支持的网站点击播放，广告标签页不再出现。

### 开启 / 关闭

1. 点击浏览器右上角工具栏的 Popup Tab Guard 图标。
2. 弹出面板里的开关 —— 绿色表示保护开启，灰色表示暂停。
3. 状态会本地保存。

### 备选：从 Chrome 应用商店安装

审核通过后开放。届时这里会放上商店链接。

### 隐私

- 无账户、无登录、无云端。
- 无统计、无遥测、无任何网络请求。
- 只在本地保存一个"开关"布尔值（通过 `chrome.storage.local`），其他什么都不存。

完整隐私政策见 [`PRIVACY.md`](./PRIVACY.md)。
