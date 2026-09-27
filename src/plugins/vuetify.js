// Styles
import colors from 'vuetify/lib/util/colors'
import 'vuetify/styles'
import { aliases, mdi } from './icons'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: colors.grey.base,
          secondary: colors.indigo.base,
          tertiary: colors.pink.base,
          accent: '#005CAF',
          error: '#b71c1c',
          background: '#ffffff',
          surface: '#ffffff',
        },
        variables: {
          // Vuetify's light default (0.60) leaves field labels and other
          // secondary text below WCAG AA contrast; 0.70 matches the dark theme.
          'medium-emphasis-opacity': 0.7,
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.grey.lighten1,
          secondary: colors.indigo.lighten2,
          tertiary: colors.pink.lighten2,
          accent: '#4d9ee6',
          error: '#ef5350',
          background: '#121212',
          surface: '#1e1e1e',
        },
      },
    },
  },
})
