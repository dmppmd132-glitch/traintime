# 台鐵時刻查詢 — iOS PWA patch

這個 repository 保存 `https://traintime.jsy.tw/` 的 iOS PWA 強化套件：manifest identity、Apple-specific head tags、iOS Home Screen icons 與整合說明。

## 內容

- `public/manifest.json`：補上 `id`、`scope`、語系與穩定的 app identity，並將一般與 maskable icon 分開。
- `public/images/icons/apple-touch-icon-*.png`：152、167、180px 的 iOS Home Screen icons。
- `public/images/icons/pwa-icon-*.png`：192、512px 的 PWA icons，以及位於 maskable safe zone 內的 192px icon。
- `src/pwa/IosPwaHead.tsx`：可直接放入 Next.js Pages Router `_app.tsx` 或共用 layout 的 Head 元件。
- `src/pwa/registerServiceWorker.ts`：只有宿主程式尚未註冊 `/sw.js` 時才使用的 helper。
- `docs/ios-pwa.md`：部署、合併與 iOS 驗證步驟。
- `scripts/prepare_ios_icons.py`：從 `public/images/logos/logo-512.png` 重建 icon 的腳本。

## 重要說明

線上站目前已經有 Workbox service worker 與基本 PWA / iOS meta；本次 patch 主要修正 iOS icon 尺寸與 manifest identity，避免使用 32px 或同一張 192px 圖片冒充所有 Apple 尺寸。repository 原本是空的，因此此處是可合併的 PWA patch，而不是線上 Next.js 應用程式的完整原始碼。請依 [`docs/ios-pwa.md`](docs/ios-pwa.md) 合併後再部署到 `traintime.jsy.tw`。
