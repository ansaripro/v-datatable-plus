import './style.css';
import { FilterType, FilterMode } from './types/index';
import VDatatablePlus from './components/VDatatablePlus.vue';
import VDatatableServerPlus from './components/VDatatableServerPlus.vue';
import ResizeableSplitter from './components/ResizeableSplitter.vue';
import type { App, Plugin } from 'vue';

const VDatatablePlusPlugin: Plugin = {
  install(app: App) {
    app.component('VDatatablePlus', VDatatablePlus);
    app.component('VDatatableServerPlus', VDatatableServerPlus);
    app.component('ResizeableSplitter', ResizeableSplitter);
  }
};

export default VDatatablePlusPlugin;

export { VDatatablePlus, VDatatableServerPlus, ResizeableSplitter, FilterType, FilterMode };
export type {
  FilterTypeValue,
  FilterModeValue,
  RowItem,
  SortDirection,
  GroupByItem,
  ItemsPerPageOption,
  SelectedRowValue,
  DataTableHeader,
  ColumnMenuEventPayload,
  RowClickEventPayload,
  ResizeableSplitterProps,
  VDatatablePlusProps,
  VDatatableServerPlusProps,
  VDatatablePlusEmits,
  VDatatableServerPlusEmits,
} from './types/index';
