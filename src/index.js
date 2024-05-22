
import { FILTER_TYPE, FILTER_MODE }  from './types/index';
import VDatatablePlus  from "./components/VDatatablePlus.vue";
import VDatatableServerPlus  from "./components/VDatatableServerPlus.vue";
import ResizeableSplitter from "./components/ResizeableSplitter.vue";

const VDatatablePlusPlugin = {
  install: (app) => {
    app.component('VDatatablePlus', VDatatablePlus);
    app.component('VDatatableServerPlus', VDatatableServerPlus);
    app.component('ResizeableSplitter', ResizeableSplitter);
  }
};

export default VDatatablePlusPlugin;

export { VDatatablePlus, VDatatableServerPlus, ResizeableSplitter, FILTER_TYPE, FILTER_MODE };