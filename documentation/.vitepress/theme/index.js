import DefaultTheme from 'vitepress/theme';
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { useData } from 'vitepress'
import { watchEffect } from 'vue'
import VDataTalePlusPlugin from 'v-datatable-plus'
import "vuetify/styles";
import 'v-datatable-plus/dist/style.css'
import './custom.css'

import DataTableSimple from '../../components/DataTableSimple.vue';
import DataTableFull from '../../components/DataTableFull.vue';
import ServerDataTable from '../../components/ServerDataTable.vue';

const vuetify = createVuetify({
  components,
  theme: {
    defaultTheme: 'light',
  },
  defaults: {
      VTextField: {
        style: '--v-disabled-opacity: 0.7',
      },
  },
  icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
  },
});
export default {
  ...DefaultTheme,
  setup() {
    const { isDark } = useData()
    watchEffect(() => {
      vuetify.theme.global.name.value = isDark.value ? 'dark' : 'light'
    })
  },
  enhanceApp({ app }) {
    app.use(vuetify);
    app.use(VDataTalePlusPlugin);
    // app.component('FullScreen', FullScreen);
    app.component('DataTableSimple', DataTableSimple);
    app.component('DataTableFull', DataTableFull);
    app.component('ServerDataTable', ServerDataTable);
  }
};