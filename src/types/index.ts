export const FilterType = {
  IsEqualTo: 'eq',
  IsNotEqualTo: 'neq',
  StartWith: 'starts',
  Contains: 'contains',
  NotContains: 'notcontains',
  EndWith: 'ends',
  GreaterThan: 'gt',
  LessThan: 'lt',
  GreaterThanOrEqual: 'gte',
  LessThanOrEqual: 'lte',
} as const;

export const FilterMode = {
  Selection: 'selection',
  String: 'string',
  Number: 'number',
  DateTime: 'datetime',
} as const;

export type FilterTypeValue = (typeof FilterType)[keyof typeof FilterType];
export type FilterModeValue = (typeof FilterMode)[keyof typeof FilterMode];

export type {
  RowItem,
  SortDirection,
  GroupByItem,
  ItemsPerPageOption,
  SelectedRowValue,
  DataTableHeader,
  ColumnMenuEventPayload,
  RowClickEventPayload,
} from './datatable';

export type {
  ResizeableSplitterProps,
  VDatatablePlusProps,
  VDatatableServerPlusProps,
  VDatatablePlusEmits,
  VDatatableServerPlusEmits,
} from './components';
