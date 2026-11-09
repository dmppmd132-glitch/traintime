# iOS PWA 整合說明

本資料夾是給 `traintime.jsy.tw` 現有 Next.js 應用程式使用的 PWA patch。線上版本目前已經提供 Workbox service worker、manifest 與基本 Apple meta；本次補強會讓 iOS 使用正確尺寸的 Home Screen icon，並補上 Apple 需要的 app title、status bar 與穩定的 manifest identity。

## 套用方式

1. 將 `public/manifest.json` 與 `public/images/` 複製到現有 Next.js 專案的 `public/`。
2. 在現有的 `pages/_app.tsx`（或共用 layout）載入 `IosPwaHead`，並傳入目前語系對應的 manifest path。若既有 `_app` 已產生相同 meta，請以這裡的 icon URL 取代舊的 `logo-32.png` 與以 `logo-192.png` 代替不同尺寸的寫法。
3. 現有站點已經有 Workbox 產生的 `/sw.js`，不要用簡單版 service worker 覆蓋它；只有在宿主程式尚未註冊 worker 時，才使用 `registerServiceWorker`。
4. 重新部署到與使用者造訪相同的 HTTPS origin（`https://traintime.jsy.tw`）。PWA manifest、icon 與 service worker 必須同源，不能只放在 GitHub repository 而期待現有網站自動更新。

## iPhone / iPad 驗證

在 iOS Safari 開啟 `https://traintime.jsy.tw/`，按分享 → **加入主畫面**。開啟主畫面 icon 後，應以 standalone app 顯示，不應出現 Safari URL bar；重新整理或離線測試時，既有 Workbox worker 應繼續提供已快取的 app shell。

可在 Safari Web Inspector 的 Application / Storage 檢查：

- Manifest 的 `id` 為 `/`、`start_url` 為 `/`、`scope` 為 `/`。
- `apple-touch-icon` 存在 152、167、180 三種尺寸。
- `apple-mobile-web-app-capable`、`apple-mobile-web-app-title` 與 `apple-mobile-web-app-status-bar-style` 存在。
- `/sw.js` 回傳 200，且不是 SPA fallback HTML。

## 現有線上版本的注意事項

GitHub repository 在本次工作開始時是空 repository，因此這個 repository 保存的是可直接合併的 PWA patch 與 icon 資產，不是從線上 Next.js build 反編譯出的完整應用程式原始碼。若要讓線上網域真的採用這些 icon 與 manifest，仍需將 `public/` 和 `src/pwa/IosPwaHead.tsx` 合併到目前的部署來源後重新部署。
