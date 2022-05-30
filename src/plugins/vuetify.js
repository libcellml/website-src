// Styles
import colors from 'vuetify/lib/util/colors'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      themes: {
        light: {
          colors: {
            primary: colors.grey.base,
            secondary: colors.indigo.base,
            tertiary: colors.pink.base,
            accent: '#005CAF',
            error: '#b71c1c',
          },
          // primary: colors.grey,
          // secondary: colors.indigo,
          // accent: '#8c9eff',
          // error: '#b71c1c',
          // All keys will generate theme styles,
          // Here we add a custom `tertiary` color
          // tertiary: colors.pink.base,
        },
        dark: {
          primary: colors.grey,
        },
      },
    },
  }
)
