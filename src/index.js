
import { FILTER_TYPE, FILTER_MODE }  from './types/index';
import { VDatatablePlus, ResizableSplitter } from "./components/index";

const VuetifyDataTablePlusLibrary = {
  install: (app) => {
    app.component('VDatatablePlus', VDatatablePlus);
    app.component('ResizableSplitter', ResizableSplitter);
  }
};

export default VuetifyDataTablePlusLibrary;

export { VDatatablePlus, ResizableSplitter, FILTER_TYPE, FILTER_MODE };