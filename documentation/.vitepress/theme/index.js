import DefaultTheme from 'vitepress/theme';
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import { aliases, md } from 'vuetify/iconsets/md'
import VDataTalePlusPlugin from '../../../dist/v-datatable-plus'
import "vuetify/styles";
import '../../../dist/style.css'
import './custom.css'

// import FullScreen from '../../components/FullScreen.vue';
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
      defaultSet: 'md',
      aliases,
      sets: { md },
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