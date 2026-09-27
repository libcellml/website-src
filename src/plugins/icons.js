/**
 * plugins/icons.js
 *
 * Material Design Icons as inline SVGs.
 *
 * Only the icons listed below are bundled. This replaces the @mdi/font
 * webfont and stylesheet, which shipped all ~7,400 icons (~330 kB of CSS
 * plus a ~400 kB font) to display around 30 of them.
 *
 * Templates keep using the familiar names, e.g. <v-icon>mdi-home</v-icon> or
 * prepend-icon="mdi-download". To use a new icon, import its path from
 * '@mdi/js' (camelCase, e.g. mdi-file-import -> mdiFileImport) and add it to
 * the `icons` map.
 */
import { h } from 'vue'
import { aliases, mdi as mdiSvg } from 'vuetify/iconsets/mdi-svg'
import {
  mdiAccountBoxMultipleOutline,
  mdiAccountGroup,
  mdiAlertCircle,
  mdiAlertCircleOutline,
  mdiApple,
  mdiArrowUp,
  mdiBookOpenPageVariant,
  mdiBug,
  mdiCheckBold,
  mdiChevronRight,
  mdiCircleMedium,
  mdiClipboardTextPlay,
  mdiCogs,
  mdiDownload,
  mdiFileCheckOutline,
  mdiFileImport,
  mdiHelpCircleOutline,
  mdiHome,
  mdiInformation,
  mdiLightbulbOutline,
  mdiLinux,
  mdiLoading,
  mdiMagnify,
  mdiMagnifyRemoveOutline,
  mdiMicrosoftWindows,
  mdiSchool,
  mdiTranslate,
  mdiWeatherNight,
  mdiWeatherSunny,
} from '@mdi/js'

export const icons = {
  'mdi-account-box-multiple-outline': mdiAccountBoxMultipleOutline,
  'mdi-account-group': mdiAccountGroup,
  'mdi-alert-circle': mdiAlertCircle,
  'mdi-alert-circle-outline': mdiAlertCircleOutline,
  'mdi-apple': mdiApple,
  'mdi-arrow-up': mdiArrowUp,
  'mdi-book-open-page-variant': mdiBookOpenPageVariant,
  'mdi-bug': mdiBug,
  'mdi-check-bold': mdiCheckBold,
  'mdi-chevron-right': mdiChevronRight,
  'mdi-circle-medium': mdiCircleMedium,
  'mdi-clipboard-text-play': mdiClipboardTextPlay,
  'mdi-cogs': mdiCogs,
  'mdi-download': mdiDownload,
  'mdi-file-check-outline': mdiFileCheckOutline,
  'mdi-file-import': mdiFileImport,
  'mdi-help-circle-outline': mdiHelpCircleOutline,
  'mdi-home': mdiHome,
  'mdi-information': mdiInformation,
  'mdi-lightbulb-outline': mdiLightbulbOutline,
  'mdi-linux': mdiLinux,
  'mdi-loading': mdiLoading,
  'mdi-magnify': mdiMagnify,
  'mdi-magnify-remove-outline': mdiMagnifyRemoveOutline,
  'mdi-microsoft-windows': mdiMicrosoftWindows,
  'mdi-school': mdiSchool,
  'mdi-translate': mdiTranslate,
  'mdi-weather-night': mdiWeatherNight,
  'mdi-weather-sunny': mdiWeatherSunny,
}

// Icon set that looks up 'mdi-*' names in the map above and renders them with
// Vuetify's SVG icon component.
const mdi = {
  component: (props) => {
    const path = icons[props.icon]
    if (!path && import.meta.env.DEV) {
      console.warn(
        `[icons] "${props.icon}" is not registered, add it to src/plugins/icons.js.`,
      )
    }
    return h(mdiSvg.component, { ...props, icon: path ?? '' })
  },
}

export { aliases, mdi }
