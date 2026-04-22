# Popup Tab Guard

A lightweight Chrome extension (MV3) that blocks the ad popup tabs which open the moment you click the play button on certain video streaming sites. Playback stays in the current tab.

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

### How to use (from the Chrome Web Store)

1. Install the extension from the Chrome Web Store (link will be added once approved).
2. Visit any of the supported sites listed above.
3. Click the play button. The video plays; no ad tab opens.

That's it. Protection is enabled by default.

### Turning it on / off

1. Click the Popup Tab Guard icon in the Chrome toolbar.
2. Toggle the single switch in the popup — green means protection is active, gray means paused.
3. Your choice is remembered locally.

### How to use (manual install, developer mode)

1. Download this repository (or clone it).
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top-right corner).
4. Click **Load unpacked** and select the repository folder.
5. Visit one of the supported sites and click play.

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

### 如何使用（从 Chrome 应用商店安装）

1. 从 Chrome 应用商店安装本插件（通过审核后会补上链接）。
2. 打开上面列出的任意一个网站。
3. 点击播放按钮，视频正常播放，不再冒出广告标签页。

就这么简单。默认是开启状态。

### 开启 / 关闭

1. 点击浏览器右上角工具栏的 Popup Tab Guard 图标。
2. 弹出面板里的开关 —— 绿色表示保护开启，灰色表示暂停。
3. 状态会本地保存。

### 如何使用（手动安装，开发者模式）

1. 下载或克隆这个仓库到本地。
2. 在 Chrome 打开 `chrome://extensions`。
3. 打开右上角的 **开发者模式**。
4. 点击 **加载已解压的扩展程序**，选择这个仓库的文件夹。
5. 访问上面列出的任一网站，点击播放按钮。

### 隐私

- 无账户、无登录、无云端。
- 无统计、无遥测、无任何网络请求。
- 只在本地保存一个"开关"布尔值（通过 `chrome.storage.local`），其他什么都不存。

完整隐私政策见 [`PRIVACY.md`](./PRIVACY.md)。
