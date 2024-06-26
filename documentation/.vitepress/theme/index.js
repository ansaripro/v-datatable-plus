import DefaultTheme from 'vitepress/theme';
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import VDataTalePlusPlugin from 'v-datatable-plus'
import "vuetify/styles";
import 'v-datatable-plus/dist/style.css'

import DataTableSimple from '../../components/DataTableSimple.vue';
import DataTableFull from '../../components/DataTableFull.vue';
import ServerDataTable from '../../components/ServerDataTable.vue';

const vuetify = createVuetify({
  components,
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
  enhanceApp({ app }) {
    app.use(vuetify);
    app.use(VDataTalePlusPlugin);
    // app.component('FullScreen', FullScreen);
    app.component('DataTableSimple', DataTableSimple);
    app.component('DataTableFull', DataTableFull);
    app.component('ServerDataTable', ServerDataTable);
  }
};