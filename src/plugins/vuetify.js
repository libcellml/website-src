// Styles
import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
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
