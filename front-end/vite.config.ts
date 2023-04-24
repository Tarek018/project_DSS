import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'Project SDD',
    short_name: 'SDD',
    theme_color: '#ffffff',
    icons: [
      {
        "src": "windows10/SmallTile.scale-100.png",
        "sizes": "71x71"
      },
      {
        "src": "windows10/SmallTile.scale-125.png",
        "sizes": "89x89"
      },
      {
        "src": "windows10/SmallTile.scale-150.png",
        "sizes": "107x107"
      },
      {
        "src": "windows10/SmallTile.scale-200.png",
        "sizes": "142x142"
      },
      {
        "src": "windows10/SmallTile.scale-400.png",
        "sizes": "284x284"
      },
      {
        "src": "windows10/Square150x150Logo.scale-100.png",
        "sizes": "150x150"
      },
      {
        "src": "windows10/Square150x150Logo.scale-125.png",
        "sizes": "188x188"
      },
      {
        "src": "windows10/Square150x150Logo.scale-150.png",
        "sizes": "225x225"
      },
      {
        "src": "windows10/Square150x150Logo.scale-200.png",
        "sizes": "300x300"
      },
      {
        "src": "windows10/Square150x150Logo.scale-400.png",
        "sizes": "600x600"
      },
      {
        "src": "windows10/Wide310x150Logo.scale-100.png",
        "sizes": "310x150"
      },
      {
        "src": "windows10/Wide310x150Logo.scale-125.png",
        "sizes": "388x188"
      },
      {
        "src": "windows10/Wide310x150Logo.scale-150.png",
        "sizes": "465x225"
      },
      {
        "src": "windows10/Wide310x150Logo.scale-200.png",
        "sizes": "620x300"
      },
      {
        "src": "windows10/Wide310x150Logo.scale-400.png",
        "sizes": "1240x600"
      },
      {
        "src": "windows10/LargeTile.scale-100.png",
        "sizes": "310x310"
      },
      {
        "src": "windows10/LargeTile.scale-125.png",
        "sizes": "388x388"
      },
      {
        "src": "windows10/LargeTile.scale-150.png",
        "sizes": "465x465"
      },
      {
        "src": "windows10/LargeTile.scale-200.png",
        "sizes": "620x620"
      },
      {
        "src": "windows10/LargeTile.scale-400.png",
        "sizes": "1240x1240"
      },
      {
        "src": "windows10/Square44x44Logo.scale-100.png",
        "sizes": "44x44"
      },
      {
        "src": "windows10/Square44x44Logo.scale-125.png",
        "sizes": "55x55"
      },
      {
        "src": "windows10/Square44x44Logo.scale-150.png",
        "sizes": "66x66"
      },
      {
        "src": "windows10/Square44x44Logo.scale-200.png",
        "sizes": "88x88"
      },
      {
        "src": "windows10/Square44x44Logo.scale-400.png",
        "sizes": "176x176"
      },
      {
        "src": "windows10/StoreLogo.scale-100.png",
        "sizes": "50x50"
      },
      {
        "src": "windows10/StoreLogo.scale-125.png",
        "sizes": "63x63"
      },
      {
        "src": "windows10/StoreLogo.scale-150.png",
        "sizes": "75x75"
      },
      {
        "src": "windows10/StoreLogo.scale-200.png",
        "sizes": "100x100"
      },
      {
        "src": "windows10/StoreLogo.scale-400.png",
        "sizes": "200x200"
      },
      {
        "src": "windows10/SplashScreen.scale-100.png",
        "sizes": "620x300"
      },
      {
        "src": "windows10/SplashScreen.scale-125.png",
        "sizes": "775x375"
      },
      {
        "src": "windows10/SplashScreen.scale-150.png",
        "sizes": "930x450"
      },
      {
        "src": "windows10/SplashScreen.scale-200.png",
        "sizes": "1240x600"
      },
      {
        "src": "windows10/SplashScreen.scale-400.png",
        "sizes": "2480x1200"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-16.png",
        "sizes": "16x16"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-20.png",
        "sizes": "20x20"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-24.png",
        "sizes": "24x24"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-30.png",
        "sizes": "30x30"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-32.png",
        "sizes": "32x32"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-36.png",
        "sizes": "36x36"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-40.png",
        "sizes": "40x40"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-44.png",
        "sizes": "44x44"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-48.png",
        "sizes": "48x48"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-60.png",
        "sizes": "60x60"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-64.png",
        "sizes": "64x64"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-72.png",
        "sizes": "72x72"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-80.png",
        "sizes": "80x80"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-96.png",
        "sizes": "96x96"
      },
      {
        "src": "windows10/Square44x44Logo.targetsize-256.png",
        "sizes": "256x256"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-16.png",
        "sizes": "16x16"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-20.png",
        "sizes": "20x20"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-24.png",
        "sizes": "24x24"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-30.png",
        "sizes": "30x30"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-32.png",
        "sizes": "32x32"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-36.png",
        "sizes": "36x36"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-40.png",
        "sizes": "40x40"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-44.png",
        "sizes": "44x44"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-48.png",
        "sizes": "48x48"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-60.png",
        "sizes": "60x60"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-64.png",
        "sizes": "64x64"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-72.png",
        "sizes": "72x72"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-80.png",
        "sizes": "80x80"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-96.png",
        "sizes": "96x96"
      },
      {
        "src": "windows10/Square44x44Logo.altform-unplated_targetsize-256.png",
        "sizes": "256x256"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-16.png",
        "sizes": "16x16"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-20.png",
        "sizes": "20x20"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-24.png",
        "sizes": "24x24"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-30.png",
        "sizes": "30x30"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-32.png",
        "sizes": "32x32"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-36.png",
        "sizes": "36x36"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-40.png",
        "sizes": "40x40"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-44.png",
        "sizes": "44x44"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-48.png",
        "sizes": "48x48"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-60.png",
        "sizes": "60x60"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-64.png",
        "sizes": "64x64"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-72.png",
        "sizes": "72x72"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-80.png",
        "sizes": "80x80"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-96.png",
        "sizes": "96x96"
      },
      {
        "src": "windows10/Square44x44Logo.altform-lightunplated_targetsize-256.png",
        "sizes": "256x256"
      },
      {
        "src": "android/android-launchericon-512-512.png",
        "sizes": "512x512"
      },
      {
        "src": "android/android-launchericon-192-192.png",
        "sizes": "192x192"
      },
      {
        "src": "android/android-launchericon-144-144.png",
        "sizes": "144x144"
      },
      {
        "src": "android/android-launchericon-96-96.png",
        "sizes": "96x96"
      },
      {
        "src": "android/android-launchericon-72-72.png",
        "sizes": "72x72"
      },
      {
        "src": "android/android-launchericon-48-48.png",
        "sizes": "48x48"
      },
      
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
}

const replaceOptions = { __DATE__: new Date().toISOString() }
const claims = process.env.CLAIMS === 'true'
const reload = process.env.RELOAD_SW === 'true'
const selfDestroying = process.env.SW_DESTROY === 'true'

if (process.env.SW === 'true') {
  pwaOptions.srcDir = 'src'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts'
  pwaOptions.strategies = 'injectManifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).name = 'PWA Inject Manifest'
  ;(pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

if (claims)
  pwaOptions.registerType = 'autoUpdate'

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = 'true'
}

if (selfDestroying)
  pwaOptions.selfDestroying = selfDestroying

export default defineConfig({
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  plugins: [
    solidPlugin(),
    VitePWA(pwaOptions),
    replace(replaceOptions),
  ],
})
