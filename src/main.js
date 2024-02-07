import { createApp } from 'vue'
import './style.css'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import App from './App.vue'

const customLightTheme = {
    dark: false,
    colors: {
      primary: '#008345',
      secondary: '#c9d653',
    },
  }
const vuetify = createVuetify({
    theme: {
      defaultTheme: 'customLightTheme',
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 4,
        darken: 4,
      },
      themes: {
        customLightTheme,
      },
    },
  });

createApp(App).use(vuetify).mount('#app')
