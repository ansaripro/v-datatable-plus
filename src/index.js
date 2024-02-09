
import { FILTER_TYPE, FILTER_MODE }  from './types/index';
import { default as VDatatablePlus }  from "./components/DataTable.vue";
import { default as ResizableSplitter } from "./components/ResizableSplitter.vue";

const VDatatablePlusPlugin = {
  install: (app) => {
    app.component('VDatatablePlus', VDatatablePlus);
    app.component('ResizableSplitter', ResizableSplitter);
  }
};

export default VDatatablePlus;

export { VDatatablePlusPlugin, ResizableSplitter, FILTER_TYPE, FILTER_MODE };