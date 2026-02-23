import type {
  ColumnMenuEventPayload,
  DataTableHeader,
  GroupByItem,
  ItemsPerPageOption,
  RowClickEventPayload,
  RowItem,
  SelectedRowValue,
} from './datatable';

type AnyFn = (...args: any[]) => any;
type CssLike = string | Record<string, any> | Array<string | Record<string, any>>;

interface BaseDatatableProps {
  hideTitleBar?: boolean;
  hideColumnMenu?: boolean;
  showRightPanel?: boolean;
  hideFilterRow?: boolean;
  hideFooter?: boolean;
  selectOnRow?: boolean;
  highlightRow?: boolean;
  rightPanelFixed?: boolean;
  rightPanelWidth?: number;
  dragMenuHeight?: number;
  tableHeight?: string | number;
  selectedRow?: SelectedRowValue;
  columnMenuZIndex?: string | number;
  filterMenuZIndex?: string | number;
  title?: string;
  rowHighlightClass?: string;
  headerTextSize?: string;
  headerIconSize?: string;
  headerCellClass?: CssLike;
  headerCellStyle?: CssLike;
  tableClass?: CssLike;
  tableStyle?: CssLike;
  rightPanelClass?: CssLike;
  rightPanelStyle?: CssLike;
  dataTableProps?: Record<string, any>;
  color?: string;
  itemValue?: string;
  search?: string;
  customFilter?: AnyFn;
  valueComparator?: AnyFn;
  returnObject?: boolean;
  hideNoData?: boolean;
  showExpand?: boolean;
  showSelect?: boolean;
  disableSort?: boolean;
  expandOnClick?: boolean;
  mobile?: boolean;
  multiSort?: boolean;
  mustSort?: boolean;
  sticky?: boolean;
  hover?: boolean;
  expanded?: any[];
  groupBy?: GroupByItem[];
  modelValue?: any[];
  theme?: string;
  filterKeys?: string | string[];
  customKeyFilter?: string | number | boolean | Record<string, any> | AnyFn;
  customKeySort?: string | number | boolean | Record<string, any> | AnyFn;
  mobileBreakpoint?: number | string;
  itemSelectable?: string | Record<string, any> | AnyFn;
  rowProps?: Record<string, any> | AnyFn;
  cellProps?: Record<string, any> | AnyFn;
  loading?: string | boolean;
  sortBy?: Array<Record<string, any>>;
  items?: RowItem[];
  headers?: DataTableHeader[];
  page?: string | number;
  itemsPerPageOptions?: ItemsPerPageOption[];
  noDataText?: string;
  loadingText?: string;
  filterMode?: string;
  density?: string;
  selectStrategy?: string;
  sortAscIcon?: string;
  sortDescIcon?: string;
  firstIcon?: string;
  lastIcon?: string;
  nextIcon?: string;
  prevIcon?: string;
  dragMenuIcon?: string;
  dragItemIcon?: string;
  dragItemFreezeIcon?: string;
  dragItemUnFreezeIcon?: string;
  filterIcon?: string;
  groupByIcon?: string;
  groupSortAscIcon?: string;
  groupSortDescIcon?: string;
}

export interface VDatatablePlusProps extends BaseDatatableProps {
  itemsPerPage?: string | number;
}

export interface VDatatableServerPlusProps extends BaseDatatableProps {
  itemsLength?: number;
  itemsPerPage?: number;
}

export interface ResizeableSplitterProps {
  isFixed?: boolean;
  showSplitter?: boolean;
  splitterPosition?: number;
}

export interface VDatatablePlusEmits {
  (e: 'update:currentItems', value: any): void;
  (e: 'update:expanded', value: any[]): void;
  (e: 'update:groupBy', value: GroupByItem[]): void;
  (e: 'update:itemsPerPage', value: string | number): void;
  (e: 'update:modelValue', value: any[]): void;
  (e: 'update:options', value: any): void;
  (e: 'update:page', value: string | number): void;
  (e: 'update:sortBy', value: Array<Record<string, any>>): void;
  (e: 'update:headers', value: DataTableHeader[]): void;
  (e: 'update:selectedRow', value: SelectedRowValue): void;
  (e: 'click:row', value: RowClickEventPayload): void;
  (e: 'columnMenuOpened', value: boolean): void;
  (e: 'columnMenuDragChange', value: any): void;
  (e: 'columnMenuChecked', value: ColumnMenuEventPayload): void;
  (e: 'columnMenuFixed', value: ColumnMenuEventPayload): void;
}

export interface VDatatableServerPlusEmits {
  (e: 'update:currentItems', value: any): void;
  (e: 'update:expanded', value: any[]): void;
  (e: 'update:groupBy', value: GroupByItem[]): void;
  (e: 'update:itemsPerPage', value: number): void;
  (e: 'update:modelValue', value: any[]): void;
  (e: 'update:options', value: any): void;
  (e: 'update:page', value: string | number): void;
  (e: 'update:sortBy', value: Array<Record<string, any>>): void;
  (e: 'update:headers', value: DataTableHeader[]): void;
  (e: 'update:selectedRow', value: SelectedRowValue): void;
  (e: 'click:row', value: RowClickEventPayload): void;
  (e: 'columnMenuOpened', value: boolean): void;
  (e: 'columnMenuDragChange', value: any): void;
  (e: 'columnMenuChecked', value: ColumnMenuEventPayload): void;
  (e: 'columnMenuFixed', value: ColumnMenuEventPayload): void;
}
