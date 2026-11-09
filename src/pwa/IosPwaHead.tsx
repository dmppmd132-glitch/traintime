import Head from 'next/head'

export type IosPwaHeadProps = {
  /** Theme colour used by Safari when the app is launched standalone. */
  themeColor?: string
  /** The localized manifest path used by the current page. */
  manifestHref?: string
  /** Label shown below the iOS Home Screen icon. */
  appTitle?: string
}

/**
 * iOS does not use every Web App Manifest field, so keep these explicit
 * Apple-specific tags in the document head as well.
 */
export function IosPwaHead({
  themeColor = '#212529',
  manifestHref = '/manifest.json',
  appTitle = '台鐵時刻查詢',
}: IosPwaHeadProps) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="theme-color" content={themeColor} />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={appTitle} />
      <meta name="apple-touch-fullscreen" content="yes" />
      <link rel="manifest" href={manifestHref} />
      <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-touch-icon-152.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/images/icons/apple-touch-icon-167.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon-180.png" />
    </Head>
  )
}
