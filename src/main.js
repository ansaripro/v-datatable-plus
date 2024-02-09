import { createApp } from 'vue'
import './style.css'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import App from './App.vue'

const vuetify = createVuetify();

createApp(App).use(vuetify).mount('#app')
