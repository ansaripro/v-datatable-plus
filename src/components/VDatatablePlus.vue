<script setup lang="ts">
import { ref, reactive, computed, watch, useSlots, type PropType } from 'vue';
import { FilterType, FilterMode, type FilterTypeValue } from '../types/index';
import type { GroupByItem, DataTableHeader, ItemsPerPageOption, RowItem } from '../types/datatable';
import type { VDatatablePlusProps, VDatatablePlusEmits } from '../types/components';
import ResizeableSplitter from './ResizeableSplitter.vue';

const props = defineProps({
    // custom
    hideTitleBar: {
        type: Boolean,
        default: false,
    },
    hideColumnMenu: {
        type: Boolean,
        default: false,
    },
    showRightPanel: {
        type: Boolean,
        default: false,
    },
    hideFilterRow: {
        type: Boolean,
        default: false,
    },
    hideFooter: {
        type: Boolean,
        default: false,
    },
    selectOnRow: {
      type: Boolean,
      default: false,
    },
    highlightRow: {
        type: Boolean,
        default: false,
    },
    rightPanelFixed: {
        type: Boolean,
        default: true,
    },
    rightPanelWidth: {
        type: Number,
        default: 20,
    },
    dragMenuHeight: {
        type: Number,
        default: 250,
    },
    tableHeight: {
        type: [String, Number],
        default: '50vh',
    },
    selectedRow: {
        type: [Object, String, Number, Boolean],
        default: null
    },
    columnMenuZIndex: [String, Number],
    filterMenuZIndex: [String, Number],
    title: String,
    rowHighlightClass: String,
    headerTextSize: String,
    headerIconSize: String,
    headerCellClass: {
        type: [String, Array, Object],
        default: undefined,
    },
    headerCellStyle: {
        type: [String, Array, Object],
        default: undefined,
    },
    tableClass: {
        type: [String, Array, Object],
        default: undefined,
    },
    tableStyle: {
        type: [String, Array, Object],
        default: undefined,
    },
    rightPanelClass: {
        type: [String, Array, Object],
        default: undefined,
    },
    rightPanelStyle: {
        type: [String, Array, Object],
        default: undefined,
    },
    dataTableProps: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
    },
    // vuetify
    itemValue: String,
    color: String,
    search: String,
    customFilter: Function,
    valueComparator: Function,
    returnObject: {
        type: Boolean,
        default: false,
    },
    hideNoData: {
        type: Boolean,
        default: false,
    },
    showExpand: {
        type: Boolean,
        default: false,
    },
    showSelect: {
        type: Boolean,
        default: false,
    },
    disableSort: {
        type: Boolean,
        default: false,
    },
    expandOnClick: {
        type: Boolean,
        default: false,
    },
    mobile: {
        type: Boolean,
        default: false,
    },
    multiSort: {
        type: Boolean,
        default: false,
    },
    mustSort: {
        type: Boolean,
        default: false,
    },
    sticky: {
        type: Boolean,
        default: false,
    },
    hover: {
        type: Boolean,
        default: true,
    },
    expanded: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    groupBy: {
        type: Array as PropType<GroupByItem[]>,
        default: () => [],
    },
    modelValue: {
        type: Array as PropType<any[]>,
        default: () => [],
    },
    theme: {
        type:  String,
        default: undefined,
    },
    filterKeys: {
        type:  [String, Array],
        default: undefined,
    },
    customKeyFilter: {
        type:  [String, Number, Boolean, Object, Function],
        default: undefined,
    },
    customKeySort: {
        type:  [String, Number, Boolean, Object, Function],
        default: undefined,
    },
    mobileBreakpoint: {
        type:  [Number, String],
        default: undefined,
    },
    itemSelectable: {
        type: [Object, String, Number, Boolean],
        default: null
    },
    rowProps: {
        type: [Object, Function],
    },
    cellProps: {
        type: [Object, Function],
    },
    loading: {
        type: [String, Boolean],
        default: false,
    },
    sortBy: {
        type: Array as PropType<Array<Record<string, any>>>,
        default: () => [],
    },
    items: {
        type: Array as PropType<RowItem[]>,
        default: () => [],
    },
    headers: {
        required: true,
        type: Array as PropType<DataTableHeader[]>,
        default: () => [],
    },
    page: {
        type: [String, Number],
        default: 1,
    },
    itemsPerPage: {
        type: [String, Number],
        default: 10,
    },
    itemsPerPageOptions: {
        type: Array as PropType<ItemsPerPageOption[]>,
        default: () => [
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: -1, title: 'All' },
        ],
    },
    noDataText: {
        type: String,
        default: '$vuetify.noDataText',
    },
    loadingText: {
        type: String,
        default: '$vuetify.dataIterator.loadingText',
    },
    filterMode: {
        type: String,
        default: 'intersection',
    },
    density: {
        type: String,
        default: 'compact',
    },
    selectStrategy: {
        type: String,
        default: 'page',
    },
    sortAscIcon: {
        type: String,
        default: '$sortAsc',
    },
    sortDescIcon: {
        type: String,
        default: '$sortDesc',
    },
    firstIcon: {
        type: String,
        default: '$first',
    },
    lastIcon: {
        type: String,
        default: '$last',
    },
    nextIcon: {
        type: String,
        default: '$next',
    },
    prevIcon: {
        type: String,
        default: '$prev',
    },
    // custom
    dragMenuIcon: {
        type: String,
        default: '$menu',
    },
    dragItemIcon: {
        type: String,
        default: 'mdi-drag-vertical',
    },
    dragItemFreezeIcon: {
        type: String,
        default: 'mdi-table-lock',
    },
    dragItemUnFreezeIcon: {
        type: String,
        default: 'mdi-table',
    },
    filterIcon: {
        type: String,
        default: 'mdi-filter',
    },
    groupByIcon: {
        type: String,
        default: 'mdi-table-plus',
    },
    groupSortAscIcon: {
        type: String,
        default: 'mdi-sort-ascending',
    },
    groupSortDescIcon: {
        type: String,
        default: 'mdi-sort-descending',
    },
}) as VDatatablePlusProps;

const emit = defineEmits<VDatatablePlusEmits>();

// Template refs
const customDataTable = ref<{ headers: DataTableHeader[] } | null>(null);

// Data properties
const lastSelectedRowNode = ref<HTMLElement | null>(null);
const itemsLength = ref(0);
const filterTypes = reactive([
    { title: 'Contains', value: FilterType.Contains },
    { title: 'Does not contain', value: FilterType.NotContains },
    { title: 'Is equal to', value: FilterType.IsEqualTo },
    { title: 'Is not equal to', value: FilterType.IsNotEqualTo },
    { title: 'Starts with', value: FilterType.StartWith },
    { title: 'Ends with', value: FilterType.EndWith },
]);
// Helper Properties
const slots = useSlots();
const currentPage = ref(props.page);
const curentItemPerPage = ref(props.itemsPerPage);
const currentSortBy = ref(props.sortBy);
const currentGroupBy = ref(props.groupBy);
const draggedColumnIndex = ref<number | null>(null);

function toNumber(value: number | string | null | undefined, fallback = 0): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function onColumnDragStart($event: DragEvent, index: number, element: DataTableHeader) {
    if (element.draggable === false) return;
    draggedColumnIndex.value = index;
    if ($event.dataTransfer) {
        $event.dataTransfer.effectAllowed = 'move';
        $event.dataTransfer.setData('text/plain', String(index));
    }
}

function onColumnDragEnd() {
    draggedColumnIndex.value = null;
}

function onColumnDrop(targetIndex: number, targetElement: DataTableHeader) {
    if (targetElement.draggable === false) {
        draggedColumnIndex.value = null;
        return;
    }
    const sourceIndex = draggedColumnIndex.value;
    draggedColumnIndex.value = null;
    if (sourceIndex == null || sourceIndex === targetIndex) return;

    const sourceElement = localHeaders.value[sourceIndex];
    if (!sourceElement || sourceElement.draggable === false) return;

    const updatedHeaders = [...localHeaders.value];
    const [movedElement] = updatedHeaders.splice(sourceIndex, 1);
    if (!movedElement) return;
    updatedHeaders.splice(targetIndex, 0, movedElement);
    localHeaders.value = updatedHeaders;
    emit('columnMenuDragChange', {
        moved: {
            element: movedElement,
            oldIndex: sourceIndex,
            newIndex: targetIndex,
        },
    });
}


// Computed
const dtModel = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
    }
});
const dtSortBy = computed({
    get() {
        return currentSortBy.value;
    },
    set(newValue) {
        currentSortBy.value = newValue;
        emit('update:sortBy', newValue);
    }
});
const dtPage = computed({
    get() {
        return currentPage.value;
    },
    set(newValue) {
        currentPage.value = newValue;
        emit('update:page', newValue);
    }
});
const dtItemsPerPage = computed({
    get() {
        return curentItemPerPage.value;
    },
    set(newValue) {
        curentItemPerPage.value = newValue;
        emit('update:itemsPerPage', newValue);
    }
});
const dtGroupBy = computed({
    get() {
        return currentGroupBy.value;
    },
    set(newValue) {
        currentGroupBy.value = newValue;
        emit('update:groupBy', newValue);
    }
});
const dtExpanded = computed({
    get() {
        return props.expanded;
    },
    set(newValue) {
        emit('update:expanded', newValue);
    }
});
const localSelectedRow = computed({
    get() {
        return props.selectedRow;
    },
    set(newValue) {
        emit('update:selectedRow', newValue);
    }
});
const localHeaders = computed({
    get() {
        return props.headers;
    },
    set(newValue) {
        emit('update:headers', newValue);
    }
});
const tableHeaders = computed(() => {
    return localHeaders.value.filter((x: DataTableHeader) => x.isShow);
});
const pages = computed(() => {
    let pages = 1;
    const itemPerPage = toNumber(dtItemsPerPage.value, 0);
    if (itemPerPage <= 0 || itemsLength.value <= 0) return pages;
    pages = Math.ceil(itemsLength.value / itemPerPage);
    return pages > 0 ? pages : 1;
});
const pageDetail = computed(() => {
    const itemPerPage = toNumber(dtItemsPerPage.value, 0);
    const page = toNumber(dtPage.value, 1);
    if (itemsLength.value <= 0) return `${itemsLength.value} items`;
    if (itemPerPage <= 0 || itemPerPage > itemsLength.value) return `1 - ${itemsLength.value} items`;

    const startPage = (page - 1) * itemPerPage + 1;
    let endPage = page * itemPerPage;
    if (endPage > itemsLength.value) endPage = itemsLength.value;
    return `${startPage} - ${endPage} of ${itemsLength.value} items`;
});
const filteredItems = computed(() => {
    let list = props.items;
    if (
        props.items?.length > 0
        && customDataTable.value?.headers.length > 0
    ) {
        list = props.items.filter((o) => {
            let flag = true;
            customDataTable.value.headers.forEach((c: DataTableHeader) => {
                if (flag) {
                    const value = typeof c.value === 'function' ? c.value(o) : o[c.key];
                    
                    if (c.filterMode === FilterMode.Selection) {
                        flag = c.filterValue === c.allFilterValue ? true : value === c.filterValue;
                    } else if (c.filterValue) {
                        flag = matchFilter(c.filterType, value, c.filterValue);
                    }
                }
            });
            return flag;
        });
    }
    itemsLength.value = list ? list.length : 0;
    return list;
});

const localHeaderTextSize = computed(() => {
    if (props.headerTextSize?.length > 0) return { fontSize: props.headerTextSize };
});

const localHeaderIconSize = computed(() => {
    if (props.headerIconSize?.length > 0) return { fontSize: props.headerIconSize };
    else return { fontSize: '12px' };
});

//Watches
watch(() => props.page, (newValue) => {
    currentPage.value = newValue;
});
watch(() => props.itemsPerPage, (newValue) => {
    curentItemPerPage.value = newValue;
});
watch(() => props.sortBy, (newValue) => {
    currentSortBy.value = newValue;
}, { deep: true });
watch(() => props.groupBy, (newValue) => {
    currentGroupBy.value = newValue;
}, { deep: true });

// methods
function getHeaders(columns: any[] | undefined) {
    if (columns && columns.length > 0) {
        return columns.map((c: any) => {
            const h = localHeaders.value.find((x: any) => x.key === c.key);
            if (h) {
                h.align = c.align;
                h.width = c.width;
                h.fixed = c.fixed;
                h.fixedOffset = c.fixedOffset;
                h.lastFixed = c.lastFixed;
                return h;
            }
            c.filterable = false;
            return c;
        });
    }
    return columns;
}
function getHeaderProps(props: Record<string, any>, column: any) {
    const hProps: Record<string, any> = { ...props, column: column };
    delete hProps.headers;
    delete hProps.columns;
    return hProps;
}
function onChangeItemPerPage() {
    dtPage.value = 1
}
function checkIsSortable(column: any) {
    return column.sortable && !(column.children && column.children.length > 0);
}
function checkIsGroupable(column: any) {
    return column.groupable === true && !(column.children && column.children.length > 0);
}
function getSelectAllIcon(props: Record<string, any>) {
    if (props.allSelected && props.someSelected) return '$checkboxOn';
    else if (props.someSelected && !props.allSelected) return '$checkboxIndeterminate';
    return '$checkboxOff';
}
function onSelectAll(props: Record<string, any>) {
    if (props.allSelected && props.someSelected) props.selectAll(false);
    else props.selectAll(true);
}
function onGroupBy(key: string) {
    const groupByColumn = (dtGroupBy.value || []) as GroupByItem[];
    if (groupByColumn.findIndex((g) => g.key === key) === -1) {
        groupByColumn.push({ key: key, order: 'asc' });
        dtGroupBy.value = groupByColumn;
    }
}
function onRemoveGroupBy(key: string) {
    const groupByColumn = (dtGroupBy.value || []) as GroupByItem[];
    const indx = groupByColumn.findIndex((g) => g.key === key);
    if (indx !== -1) {
        groupByColumn.splice(indx, 1);
        dtGroupBy.value = groupByColumn;
    }
}
function sortByGroup(key: string) {
    const groupByColumn = dtGroupBy.value as GroupByItem[];
    const obj = groupByColumn?.find((g) => g.key === key);
    if (!obj) return;
    obj.order = obj.order === 'asc' ? 'desc' : 'asc';
    dtGroupBy.value = groupByColumn;
}
function getGroupSortIcon(key: string) {
    const obj = (dtGroupBy.value as GroupByItem[] | undefined)?.find((g) => g.key === key);
    if (obj) return obj.order === 'asc' ? props.groupSortAscIcon : props.groupSortDescIcon;
    else return props.groupSortAscIcon;
}
function checkIsGroupBy(key: string) {
    return (dtGroupBy.value as GroupByItem[] | undefined)?.findIndex((g) => g.key === key) !== -1;
}
function groupHeaderDisplayText(gr: Record<string, any>, columns: any[]) {
    let text = '';
    const column = columns.find((x: any) => x.key === gr.key);
    if (column) {
        const val = typeof column.value === 'function' ? column.value({[gr.key]: gr.value}) : gr.value;
        text = `${column.title}: ${val}`;
    }
    text = `${text} (Count: ${gr.items.length})`;
    return text;
}
function getGroupProps(props: Record<string, any>) {
    return {...props, onRemoveGroupBy: onRemoveGroupBy};
}
function headerStyle(column: any) {
    const obj: Record<string, string | number> = {};
    if (column) {
        obj['textAlign'] = column.align;
        const width = column.width;
        if ((typeof width === 'number' && width > 0) || (typeof width === 'string' && width.length > 0)) {
            obj['width'] = `${width}px`;
            obj['minWidth'] = `${width}px`;
        }
        if (column.fixed && column.fixedOffset >= 0) {
            obj['position'] = 'sticky';
            obj['left'] = `${column.fixedOffset}px`;
            obj['z-index'] = 2;
        }
    }
    return obj;
}
function updateCurrentItems(obj: any) {
    emit('update:currentItems', obj);
}
function updateOptions(obj: any) {
    emit('update:options', obj);
}
function rowClick($event: any, param: any) {
    if (props.highlightRow) {
        if (props.rowHighlightClass) lastSelectedRowNode.value?.classList.remove(props.rowHighlightClass);
        // Click same row again
        if (lastSelectedRowNode.value === $event.currentTarget) {
            if (props.selectOnRow && param.isSelected(param.internalItem)) param.toggleSelect(param.internalItem);
            lastSelectedRowNode.value = null;
            localSelectedRow.value = null;
            emit('click:row', { $event, param });
            return;
        }        
        lastSelectedRowNode.value = $event.currentTarget;
        if (props.rowHighlightClass) lastSelectedRowNode.value?.classList.add(props.rowHighlightClass);
        if (props.selectOnRow && !param.isSelected(param.internalItem)) param.toggleSelect(param.internalItem);
    } else if (props.selectOnRow) {
        param.toggleSelect(param.internalItem);
    }

    if (props.returnObject) localSelectedRow.value = param.item;
    if (props.itemValue?.length > 0) localSelectedRow.value = param.item?.[props.itemValue] ?? null;
    emit('click:row', { $event, param });
}
function matchFilter(type: FilterTypeValue | string, value: any, searchVal: any) {
    let flag = true;
    if (!searchVal) return flag;

    switch (type) {
        case FilterType.IsEqualTo:
            flag = value === searchVal
                || (value
                    && String(value).toLowerCase() === String(searchVal).toLowerCase());
            break;
        case FilterType.IsNotEqualTo:
            flag = value !== searchVal
                || (value
                    && String(value).toLowerCase() !== String(searchVal).toLowerCase());
            break;
        case FilterType.StartWith:
            flag = value
                && String(value)
                    .toLowerCase()
                    .startsWith(String(searchVal).toLowerCase());
            break;
        case FilterType.EndWith:
            flag = value
                && String(value)
                    .toLowerCase()
                    .endsWith(String(searchVal).toLowerCase());
            break;
        case FilterType.NotContains:
            flag = value
                && !String(value)
                    .toLowerCase()
                    .includes(String(searchVal).toLowerCase());
            break;
        case FilterType.Contains:
        default:
            flag = value
                && String(value)
                    .toLowerCase()
                    .includes(String(searchVal).toLowerCase());
            break;
    }
    return flag;
}
function print() {
    if (
        !tableHeaders.value
        || tableHeaders.value.length === 0
        || !props.items
        || props.items.length === 0
    ) return;
    const columns = tableHeaders.value.filter((c) => c.isExclude !== true);
    if (!columns || columns.length === 0) return;
    let colTags = '';
    let thTags = '';
    columns.forEach((c) => {
        colTags += '<col>';
        thTags += `<th scope="col" role="columnheader" rowspan="1" class="header"><a class="link" href="#">${c.title ? c.title : c.key
            }</a></th>`;
    });
    let tbody = '';
    props.items.forEach((r) => {
        tbody += '<tr role="row">';
        columns.forEach((c) => {
            tbody += '<td role="gridcell">';
            const val = typeof c.value === 'function' ? c.value(r) : r[c.key];
            tbody += val && val !== 'null' ? val : '';
            tbody += '</td>';
        });
        tbody += '</tr>';
    });
    const htmlString = `
      <!DOCTYPE html><html><head><meta charset="utf-8"/><title>Print</title>
      <style>html { font: 11pt sans-serif; }.grid { border-top-width: 1px; text-align:left; }.grid, .grid-content { height: auto !important; }
      .grid-content { overflow: visible !important; }div.grid table { table-layout: auto; width: 100% !important; border-spacing:0;border-collapse:collapse;}
      td { border-width: 1px 0; border-style:solid; border-color:#b9b9b9}.grid .grid-header th{border-width:0 0 2px;border-style:solid;}
      .grid .grid-header th a{text-decoration:none;color:#000;}.grouping-header, .grid-toolbar, .grid-pager > .link,.command-cell{ display: none; }</style>
      </head>
      <body>
      <div class="grid widget display-block editable"><div class="grid-content auto-scrollable">
      <table role="grid"><colgroup>${colTags}</colgroup><thead role="rowgroup" class="grid-header"><tr role="row">${thTags}</tr></thead>
      <tbody role="rowgroup">${tbody}</tbody>
      </table>
      </div></div>
      </body>
      </html>`;
    const objWin = window.open(
        '',
        '',
        'width= 800, height = 500, resizable = 1, scrollbars = 1',
    );
    objWin?.document.write(htmlString);
    objWin?.document.close();
    objWin?.focus();
    objWin?.print();
}
</script>

<template>
    <v-card variant="outlined" :color="color" :theme="theme">
        <v-toolbar v-if="!hideTitleBar" density="compact" :theme="theme">
            <v-menu v-if="!hideColumnMenu"
                :z-index="columnMenuZIndex"
                :theme="theme"
                :close-on-content-click="false"
                @update:modelValue="$emit('columnMenuOpened', $event)">
                <template #activator="{ props }">
                    <v-btn size="small" :color="color" :icon="dragMenuIcon" v-bind="props" />
                </template>
                <v-list density="compact" lines="one" :theme="theme" :max-height="dragMenuHeight">
                    <v-list-item
                        v-for="(element, index) in localHeaders"
                        :key="element.key"
                        density="compact"
                        @dragenter.prevent
                        @dragover.prevent
                        @drop.prevent="onColumnDrop(index, element)">
                        <template #prepend>
                            <v-list-item-action start>
                                <v-checkbox-btn density="compact"
                                    :color="color"
                                    v-model="element.isShow"
                                    @change="$emit('columnMenuChecked', { element, $event })" />
                            </v-list-item-action>
                        </template>
                        {{ element.title }}
                        <template #append>
                            <v-checkbox-btn density="compact" v-if="element.fixable"
                                :true-icon="dragItemFreezeIcon"
                                :false-icon="dragItemUnFreezeIcon"
                                :color="color"
                                v-model="element.fixed"
                                @change="$emit('columnMenuFixed', { element, $event })" />
                            <v-icon size="small"
                                density="compact"
                                class="cursor-move"
                                :icon="dragItemIcon"
                                v-if="element.draggable !== false"
                                draggable="true"
                                @dragstart="onColumnDragStart($event, index, element)"
                                @dragend="onColumnDragEnd" />
                        </template>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-toolbar-title>
                <slot name="title">{{ title }}</slot>
            </v-toolbar-title>
            <slot name="header-commands" :print="print"/>
        </v-toolbar>
        <slot name="header-expand-section" />
        <resizeable-splitter
            :splitter-position="100 - (rightPanelWidth > 100 ? 80 : rightPanelWidth)"
            :show-splitter="showRightPanel"
            :is-fixed="rightPanelFixed">
            <template #left-panel>
                <v-data-table fixed-header ref="customDataTable" :class="['border-s', tableClass as any]" :style="tableStyle as any"
                    v-bind="dataTableProps as any"
                    :height="tableHeight"
                    :density="density as any"
                    :sticky="sticky"
                    :theme="theme"
                    :color="color"
                    :hover="hover"
                    :mobile="mobile"
                    :mobile-breakpoint="mobileBreakpoint as any"
                    :loading="loading"
                    :loading-text="loadingText"
                    :hide-no-data="hideNoData"
                    :no-data-text="noDataText"
                    :sort-asc-icon="sortAscIcon"
                    :sort-desc-icon="sortDescIcon"
                    :row-props="rowProps"
                    :cell-props="cellProps"
                    :show-expand="showExpand"
                    :show-select="showSelect"
                    :headers="tableHeaders as any"
                    :items="filteredItems"
                    :select-strategy="selectStrategy as any"
                    :item-selectable="itemSelectable as any"
                    :item-value="itemValue"
                    :return-object="returnObject"
                    :custom-key-sort="customKeySort as any"
                    :disable-sort="disableSort"
                    :multi-sort="multiSort"
                    :must-sort="mustSort"
                    :expand-on-click="expandOnClick"
                    :custom-filter="customFilter as any"
                    :custom-key-filter="customKeyFilter as any"
                    :filter-keys="filterKeys as any"
                    :filter-mode="filterMode as any"
                    :value-comparator="valueComparator as any"
                    :search="search"
                    v-model="dtModel"
                    v-model:page="dtPage as any"
                    v-model:items-per-page="dtItemsPerPage as any"
                    v-model:sort-by="dtSortBy as any"
                    v-model:group-by="dtGroupBy as any"
                    v-model:expanded="dtExpanded"
                    @click:row="rowClick"
                    @update:currentItems="updateCurrentItems"
                    @update:options="updateOptions">

                    <template v-if="slots.body" #body="props">
                        <slot name="body" v-bind="props"/>
                    </template>
                    <template v-if="slots['body.prepend']" #[`body.prepend`]="props">
                        <slot name="body.prepend" v-bind="props"/>
                    </template>
                    <template v-if="slots['body.append']" #[`body.append`]="props">
                        <slot name="body.append" v-bind="props"/>
                    </template>
                    <template v-if="slots.top" #top="props">
                        <slot name="top" v-bind="props"/>
                    </template>
                    <template v-if="slots['expanded-row']" #expanded-row="props">
                        <slot name="expanded-row" v-bind="props"/>
                    </template>
                    <template v-if="slots.colgroup" #colgroup="props">
                        <slot name="colgroup" v-bind="props"/>
                    </template>
                    <template v-if="slots.default" #default="props">
                        <slot name="default" v-bind="props"/>
                    </template>
                    <template v-if="slots.item" #item="props">
                        <slot name="item" v-bind="props"/>
                    </template>
                    <template v-if="slots['item.data-table-expand']" #[`item.data-table-expand`]="props">
                        <slot name="item.data-table-expand" v-bind="props"/>
                    </template>
                    <template v-if="slots['item.data-table-select']" #[`item.data-table-select`]="props">
                        <slot name="item.data-table-select" v-bind="props"/>
                    </template>
                    <template v-if="slots.loader" #loader="props">
                        <slot name="loader" v-bind="props"/>
                    </template>
                    <template v-if="slots.loading" #loading>
                        <slot name="loading" />
                    </template>
                    <template v-if="slots['no-data']" #no-data>
                        <slot name="no-data" />
                    </template>
                    <template v-if="slots.tbody" #tbody="props">
                        <slot name="tbody" v-bind="props"/>
                    </template>
                    <template v-if="slots.tfoot" #tfoot="props">
                        <slot name="tfoot" v-bind="props"/>
                    </template>
                    <template v-if="slots.thead" #thead="props">
                        <slot name="thead" v-bind="props"/>
                    </template>
                    

                    <template #headers="props">
                        <slot name="headers" v-bind="props">
                            <template v-for="(header, hIndex) in props.headers" :key="hIndex">
                                <tr>
                                    <template v-for="column in header" :key="column.key">
                                        <th class="vdtp-header-cell border-s"
                                            :class="headerCellClass as any"
                                            :style="[headerStyle(column), headerCellStyle as any]"
                                            :rowspan="column.rowspan" :colspan="column.colspan">
                                            <slot :name="`header.${column.key}`" v-bind="getHeaderProps(props, column)">
                                                <v-icon v-if="column.key === 'data-table-select'" v-show="selectStrategy !== 'single'"
                                                    :icon="getSelectAllIcon(props)"
                                                    @click="onSelectAll(props)"/>
                                                <span v-else-if="checkIsSortable(column)"
                                                    class="mr-2 cursor-pointer"
                                                    :style="localHeaderTextSize"
                                                    @click="() => props.toggleSort(column)">
                                                    {{column.title }}
                                                </span>
                                                <span v-else :style="localHeaderTextSize">{{ column.title }}</span>                                                
                                                <template v-if="props.isSorted(column)">
                                                    <v-icon :style="localHeaderIconSize" :icon="props.getSortIcon(column)"/>
                                                </template>
                                                <template v-if="checkIsGroupable(column)">
                                                    <v-icon v-if="checkIsGroupBy(column.key)"
                                                        class="cursor-pointer"
                                                        :style="localHeaderIconSize"
                                                        :icon="getGroupSortIcon(column.key)"
                                                        @click="sortByGroup(column.key)"/>
                                                    <v-icon v-else
                                                        class="cursor-pointer"
                                                        :style="localHeaderIconSize"
                                                        :icon="groupByIcon"
                                                        @click="onGroupBy(column.key)"/>
                                                </template>
                                            </slot>
                                        </th>
                                    </template>
                                </tr>
                            </template>
                        </slot>
                        <tr v-if="!hideFilterRow">
                            <th v-for="(column, index) in getHeaders(props.columns)"
                                class="vdtp-header-cell border-s"
                                :class="headerCellClass as any"
                                :style="[headerStyle(column), headerCellStyle as any]"
                                :key="index">
                                <template v-if="column.filterable !== false">
                                    <v-select hide-details center-affix
                                        v-if="column.filterMode === FilterMode.Selection"
                                        variant="plain"
                                        density="compact"
                                        item-title="title"
                                        item-value="value"
                                        :theme="theme"
                                        :color="color"
                                        :items="column.filterItems" 
                                        :list-props="{
                                            lines: false,
                                            density: 'compact'
                                        }"
                                        v-model="column.filterValue"/>
                                    <v-text-field hide-details center-affix v-else
                                        variant="plain"
                                        density="compact"
                                        placeholder="Search"
                                        :theme="theme"
                                        v-model="column.filterValue">
                                        <template #append>
                                            <v-menu :z-index="filterMenuZIndex" :theme="theme">
                                                <template #activator="{ props }">
                                                    <v-btn
                                                        variant="text"
                                                        size="x-small"
                                                        :color="color"
                                                        :icon="filterIcon"
                                                        v-bind="props"/>
                                                </template>
                                                <v-list density="compact" :lines="false" :color="color" :theme="theme">
                                                    <v-list-item v-for="filter in filterTypes" :key="filter.value"
                                                        :title="filter.title"
                                                        :active="column.filterType === filter.value"
                                                        @click="column.filterType = filter.value" />
                                                </v-list>
                                            </v-menu>
                                        </template>
                                    </v-text-field>
                                </template>
                            </th>
                        </tr>
                    </template>
                    <template #group-header="props">
                        <slot name="group-header" v-bind="getGroupProps(props)">
                            <tr>
                                <td :colspan="props.columns.length">
                                    <v-icon
                                        :class="`ml-${props.item.depth * 3}`" size="small"
                                        :icon="props.isGroupOpen(props.item) ? '$expand' : '$next'"
                                        @click="props.toggleGroup(props.item)"/>
                                    <span>{{ groupHeaderDisplayText(props.item, props.columns) }}</span>
                                    <v-icon
                                        size="small"
                                        class="ml-4"
                                        icon="$delete"
                                        @click="onRemoveGroupBy(props.item.key)"/>
                                </td>
                            </tr>
                        </slot>
                    </template>
                    <template v-for="header in tableHeaders" #[`item.${header.key}`]="props">
                        <slot :name="`item.${header.key}`" v-bind="props">{{ props.value }}</slot>
                    </template>
                    <template #bottom="props">
                        <slot name="bottom" v-bind="props">
                            <v-toolbar v-if="!hideFooter" density="comfortable" :theme="theme">
                                <span class="text-caption mx-1">Items per page</span>
                                <div style="width: 100px;">
                                    <v-select hide-details
                                        density="compact"
                                        variant="outlined"
                                        item-title="title"
                                        item-value="value"
                                        :theme="theme"
                                        v-model="dtItemsPerPage"
                                        :items="itemsPerPageOptions"
                                        @update:model-value="onChangeItemPerPage"/>
                                </div>
                                <v-pagination
                                    class="ml-2"
                                    density="comfortable"
                                    rounded="circle"
                                    total-visible="7"
                                    :active-color="color"
                                    :first-icon="firstIcon"
                                    :last-icon="lastIcon"
                                    :next-icon="nextIcon"
                                    :prev-icon="prevIcon"
                                    v-model="dtPage as any"
                                    :length="pages"/>
                                <v-spacer />
                                <span class="pr-2">{{ pageDetail }}</span>
                                <slot name="footer-append"/>
                            </v-toolbar>
                        </slot>
                    </template>
                </v-data-table>
            </template>
            <template #right-panel>
                <div :class="rightPanelClass as any" :style="rightPanelStyle as any">
                    <slot name="right-panel" />
                </div>
            </template>
        </resizeable-splitter>
        <slot name="bottom-area" />
    </v-card>
</template>