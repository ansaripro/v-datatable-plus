
import { FILTER_TYPE, FILTER_MODE }  from './types/index';
import VDatatablePlus  from "./components/VDatatablePlus.vue";
import ResizeableSplitter from "./components/ResizeableSplitter.vue";

const VDatatablePlusPlugin = {
  install: (app) => {
    app.component('VDatatablePlus', VDatatablePlus);
    app.component('ResizeableSplitter', ResizeableSplitter);
  }
};

export default VDatatablePlus;

export { VDatatablePlusPlugin, ResizeableSplitter, FILTER_TYPE, FILTER_MODE };