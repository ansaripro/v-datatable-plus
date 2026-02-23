import type { FilterModeValue, FilterTypeValue } from './index';

export type RowItem = Record<string, any>;

export type SortDirection = 'asc' | 'desc' | string;

export interface GroupByItem {
  key: string;
  order: SortDirection;
}

export interface ItemsPerPageOption {
  value: string | number;
  title: string;
}

export type SelectedRowValue = RowItem | string | number | boolean | null;

export interface DataTableHeader {
  key: string;
  title?: string;
  value?: any;
  align?: any;
  width?: number | string;
  fixed?: boolean;
  fixedOffset?: number;
  lastFixed?: boolean;
  rowSpan?: number;
  colSpan?: number;
  rowspan?: number;
  colspan?: number;
  children?: any[];
  sortable?: boolean;
  groupable?: boolean;
  filterable?: boolean;
  filterMode?: FilterModeValue | string;
  filterType?: FilterTypeValue | string;
  filterValue?: any;
  allFilterValue?: any;
  filterItems?: Array<{ title: string; value: any }>;
  isShow?: boolean;
  isExclude?: boolean;
  fixable?: boolean;
  draggable?: boolean;
  [key: string]: any;
}

export interface ColumnMenuEventPayload {
  element: DataTableHeader;
  $event: any;
}

export interface RowClickEventPayload {
  $event: any;
  param: any;
}
