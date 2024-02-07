
import { FILTER_TYPE, FILTER_MODE }  from './types/index';
import { VDataTablePlus, ResizableSplitter } from "./components/index";

const VuetifyDataTablePlusLibrary = {
  install: (app) => {
    app.component('VDataTablePlus', VDataTablePlus);
    app.component('ResizableSplitter', ResizableSplitter);
  }
};

export default VuetifyDataTablePlusLibrary;

export { VDataTablePlus, ResizableSplitter, FILTER_TYPE, FILTER_MODE };