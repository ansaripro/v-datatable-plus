<script setup>
import { ref, reactive, computed } from 'vue';
import { FILTER_TYPE, FILTER_MODE } from '../types/index';
import Draggable from 'vuedraggable';
import ResizableSplitter from './ResizableSplitter.vue';

const props = defineProps({
    hideColumnMenu: {
        type: Boolean,
        default: false,
    },
    showPrint: {
        type: Boolean,
        default: false,
    },
    showRightPane: {
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
    hideRefereshButton: {
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
    returnObject: {
        type: Boolean,
        default: false,
    },
    highlightRow: {
        type: Boolean,
        default: false,
    },
    rightPaneFixed: {
        type: Boolean,
        default: true,
    },
    rightPaneWidth: {
        type: Number,
        default: 20,
    },
    dragMenuHeight: {
        type: Number,
        default: 250,
    },
    itemsPerPage: {
        type: Number,
        default: 10,
    },
    tableHeight: {
        type: [String, Number],
        default: '50vh',
    },
    loading: {
        type: [String, Boolean],
        default: false,
    },
    title: String,
    color: String,
    itemValue: String,
    headerTextSize: String,
    headerIconSize: String,
    fileName: String,
    sortByColumn: String,
    modelValue: {
        type: Array,
        default: [],
    },
    selectedRow: {
        type: Object,
        default: {}
    },
    rowProps: {
        type: [Object, Function],
    },
    items: {
        type: Array,
        default: [],
    },
    headers: {
        required: true,
        type: Array,
        default: [],
    },
    itemsPerPageOptions: {
        type: Array,
        default: [
            { value: 10, title: '10' },
            { value: 25, title: '25' },
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: -1, title: 'All' },
        ],
    },
    density: {
        type: String,
        default: 'compact',
    },
    selectStrategy: {
        type: String,
        default: 'page',
    },
    printIcon: {
        type: String,
        default: 'mdi-printer',
    },
    dragMenuIcon: {
        type: String,
        default: '$menu',
    },
    dragItemIcon: {
        type: String,
        default: 'mdi-drag-vertical',
    },
    refreshIcon: {
        type: String,
        default: '$loading',
    },
    filterIcon: {
        type: String,
        default: 'mdi-filter',
    },
    sortAscIcon: {
        type: String,
        default: '$sortAsc',
    },
    sortDescIcon: {
        type: String,
        default: '$sortDesc',
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
});

const emit = defineEmits([
    'update:modelValue',
    'update:headers',
    'update:selectedRow',
    'columnMenuOpened',
    'columnMenuDragChange',
    'columnMenuChecked',
    'refreshClick',
    'row'
]);

// Template refs
const customDataTable = ref(null);

// Data properties
const groupByColumn = ref([]);
const lastSelectedRowNode = ref(null);
const pagination = reactive({
    page: 1,
    itemsPerPage: props.itemsPerPage,
    totalItems: 0,
});
const filterTypes = reactive([
    { title: 'Contains', value: FILTER_TYPE.CONTAINS },
    { title: 'Does not contain', value: FILTER_TYPE.NOT_CONTAINS },
    { title: 'Is equal to', value: FILTER_TYPE.IS_EQUAL_TO },
    { title: 'Is not equal to', value: FILTER_TYPE.IS_NOT_EQUAL_TO },
    { title: 'Starts with', value: FILTER_TYPE.START_WITH },
    { title: 'Ends with', value: FILTER_TYPE.END_WITH },
]);

// Computed
const dtModel = computed({
    get() {
        return props.modelValue;
    },
    set(newValue) {
        emit('update:modelValue', newValue);
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
    return localHeaders.value.filter(x => x.isShow);
});
const pages = computed(() => {
    let pages = 1;
    if (pagination.itemsPerPage == null || pagination.totalItems == null) return pages;
    pages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);
    return pages > 0 ? pages : 1;
});
const pageDetail = computed(() => {
    if (pagination.totalItems <= 0) return `${pagination.totalItems} items`;
    if (pagination.itemsPerPage <= 0 || pagination.itemsPerPage > pagination.totalItems) return `1 - ${pagination.totalItems} items`;

    const startPage = (pagination.page - 1) * pagination.itemsPerPage + 1;
    let endPage = pagination.page * pagination.itemsPerPage;
    if (endPage > pagination.totalItems) endPage = pagination.totalItems;
    return `${startPage} - ${endPage} of ${pagination.totalItems} items`;
});
const filteredItems = computed(() => {
    let list = props.items;
    if (
        props.items?.length > 0
        && customDataTable.value?.headers.length > 0
    ) {
        list = props.items.filter((o) => {
            let flag = true;
            customDataTable.value.headers.forEach((c) => {
                if (flag) {
                    if (c.filterMode === FILTER_MODE.SELECTION) {
                        flag = c.filterValue === c.allFilterValue ? true : o[c.key] === c.filterValue;
                    } else if (c.filterValue) {
                        if (typeof c.formatCellValue === 'function') {
                            const value = c.formatCellValue(o[c.key], c.formatParameter);
                            flag = matchFilter(c.filterType, value, c.filterValue);
                        } else {
                            flag = matchFilter(
                                c.filterType,
                                o[c.key],
                                c.filterValue,
                            );
                        }
                    }
                }
            });
            return flag;
        });
    }
    pagination.totalItems = list ? list.length : 0;
    return list;
});

const localHeaderTextSize = computed(() => {
    if (props.headerTextSize?.length > 0) return { fontSize: props.headerTextSize };
});

const localHeaderIconSize = computed(() => {
    if (props.headerIconSize?.length > 0) return { fontSize: props.headerIconSize };
    else return { fontSize: '12px' };
});

// methods
function getHeaders(columns) {
    if (columns && columns.length > 0) {
        return columns.map((c) => {
            const h = localHeaders.value.find(x => x.key === c.key);
            if (h) return h;
            c.filterable = false;
            return c;
        });
    }
    return columns;
}
function checkIsSortable(column) {
    return column.sortable && !(column.children && column.children.length > 0);
}
function checkIsGroupable(column) {
    return column.groupable === true && !(column.children && column.children.length > 0);
}
function getSelectAllIcon(props) {
    if (props.allSelected && props.someSelected) return '$checkboxOn';
    else if (props.someSelected && !props.allSelected) return '$checkboxIndeterminate';
    return '$checkboxOff';
}
function onSelectAll(props) {
    if (props.allSelected && props.someSelected) props.selectAll(false);
    else props.selectAll(true);
}
function onGroupBy(key) {
    if (groupByColumn.value?.findIndex((g) => g.key === key) === -1) {
        groupByColumn.value?.push({ key: key, order: 'asc' });
    }
}
function onRemoveGroupBy(key) {
    const indx = groupByColumn.value?.findIndex((g) => g.key === key);
    if (indx !== -1) {
        groupByColumn.value?.splice(indx, 1);
    }
}
function sortByGroup(key) {
    const obj = groupByColumn.value?.find((g) => g.key === key);
    obj.order = obj.order === 'asc' ? 'desc' : 'asc';
}
function getGroupSortIcon(key) {
    const obj = groupByColumn.value?.find((g) => g.key === key);
    if (obj) return obj.order === 'asc' ? props.groupSortAscIcon : props.groupSortDescIcon;
    else return props.groupSortAscIcon;
}
function checkIsGroupBy(key) {
    return groupByColumn.value?.findIndex((g) => g.key === key) !== -1;
}
function gropHeaderDisplayText(gr, columns) {
    const column = columns.find((x) => x.key === gr.key);
    if (column) return `${column.title} : ${(typeof column.formatCellValue === 'function') ? column.formatCellValue(gr.value, column.formatParameter) : gr.value} (${gr.items.length})`;
    return `${gr.value} (${gr.items.length})`;
}
function headerStyle(column) {
    if (column) {
        const width = column.width;
        if (width > 0 || (typeof width === 'string' && width.length > 0)) {
            return {
                width: `${width}px`,
                minWidth: `${width}px`,
                textAlign: column.align,
            };
        }
    }
    return {};
}
function rowClick($event, param) {
    emit('row', { $event, param });
    if (props.highlightRow) lastSelectedRowNode.value?.classList.remove('dt-row-highlight');
    // Click same row again
    if (lastSelectedRowNode.value === $event.currentTarget) {
        if (param.isSelected(param.internalItem)) param.toggleSelect(param.internalItem);
        lastSelectedRowNode.value = null;
        localSelectedRow.value = null;
        return;
    }
    lastSelectedRowNode.value = $event.currentTarget;

    if (!param.isSelected(param.internalItem)) param.toggleSelect(param.internalItem);
    if (props.returnObject) localSelectedRow.value = param.item;
    if (props.itemValue?.length > 0) localSelectedRow.value = param.item?.[props.itemValue] ?? null;
    if (props.highlightRow) lastSelectedRowNode.value?.classList.add('dt-row-highlight');
}
function matchFilter(type, value, searchVal) {
    let flag = true;
    if (!searchVal) return flag;

    switch (type) {
        case FILTER_TYPE.IS_EQUAL_TO:
            flag = value === searchVal
                || (value
                    && String(value).toLowerCase() === String(searchVal).toLowerCase());
            break;
        case FILTER_TYPE.IS_NOT_EQUAL_TO:
            flag = value !== searchVal
                || (value
                    && String(value).toLowerCase() !== String(searchVal).toLowerCase());
            break;
        case FILTER_TYPE.START_WITH:
            flag = value
                && String(value)
                    .toLowerCase()
                    .startsWith(String(searchVal).toLowerCase());
            break;
        case FILTER_TYPE.END_WITH:
            flag = value
                && String(value)
                    .toLowerCase()
                    .endsWith(String(searchVal).toLowerCase());
            break;
        case FILTER_TYPE.NOT_CONTAINS:
            flag = value
                && !String(value)
                    .toLowerCase()
                    .includes(String(searchVal).toLowerCase());
            break;
        case FILTER_TYPE.CONTAINS:
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
            if (typeof c.formatCellValue === 'function') tbody += c.formatCellValue(r[c.key], c.formatParameter);
            else {
                tbody += `${!r[c.key] || r[c.key] === 'null' ? '' : r[c.key]
                    }`;
            }
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
    <v-card variant="outlined" :color="color">
        <v-toolbar density="compact">
            <v-menu v-if="!hideColumnMenu" :close-on-content-click="false"
                @update:modelValue="$emit('columnMenuOpened', $event)">
                <template v-slot:activator="{ props }">
                    <v-btn size="small" :color="color" :icon="dragMenuIcon" v-bind="props" />
                </template>
                <v-list density="compact" lines="one" :max-height="dragMenuHeight">
                    <Draggable v-model="localHeaders" item-key="key" handle=".cursor-move"
                        @change="$emit('columnMenuDragChange', $event)">
                        <template v-slot:item="{ element }">
                            <v-list-item>
                                <template v-slot:prepend>
                                    <v-list-item-action start>
                                        <v-checkbox-btn :color="color" v-model="element.isShow"
                                            @change="$emit('columnMenuChecked', { element, $event })" />
                                    </v-list-item-action>
                                </template>
                                {{ element.title }}
                                <template v-slot:append>
                                    <v-icon size="small" density="compact" class="cursor-move" :icon="dragItemIcon" />
                                </template>
                            </v-list-item>
                        </template>
                    </Draggable>
                </v-list>
            </v-menu>
            <v-toolbar-title>
                <slot name="title">{{ title }}</slot>
            </v-toolbar-title>
            <slot name="pre-header-commands" />
            <v-btn v-if="showPrint" @click="print" :prepend-icon="printIcon">PRINT</v-btn>
            <slot name="post-header-commands" />
        </v-toolbar>
        <slot name="header-expand-section" />
        <resizable-splitter :splitter-position="100 - (rightPaneWidth > 100 ? 80 : rightPaneWidth)"
            :show-splitter="showRightPane" :is-fixed="rightPaneFixed">
            <template v-slot:left-pane>
                <v-data-table fixed-header hover ref="customDataTable" class="dt-header-border" :height="tableHeight"
                    :density="density" :headers="tableHeaders" :items="filteredItems" :group-by="groupByColumn"
                    :show-expand="showExpand" :show-select="showSelect" :select-strategy="selectStrategy"
                    :return-object="returnObject" :item-value="itemValue" :items-per-page="pagination.itemsPerPage"
                    :row-props="rowProps" :sort-asc-icon="sortAscIcon" :sort-desc-icon="sortDescIcon" :loading="loading" :color="color"
                    v-model:page="pagination.page" v-model="dtModel" @click:row="rowClick">
                    <template v-slot:top="props">
                        <slot v-bind="props" name="top"/>
                    </template>
                    <template v-slot:headers="props">
                        <slot v-bind="props" name="headers">
                            <template v-for="(header, hIndex) in props.headers" :key="hIndex">
                                <tr>
                                    <template v-for="column in header" :key="column.key">
                                        <slot v-bind="header" :name="`header.${column.key}`">
                                            <th class="bg-grey-lighten-4 dt-header-border" :style="[headerStyle(column)]"
                                                :rowspan="column.rowspan" :colspan="column.colspan"
                                                v-if="column.key !== 'data-table-select'">
                                                <span v-if="checkIsSortable(column)" class="mr-2 cursor-pointer"
                                                    :style="localHeaderTextSize" @click="() => props.toggleSort(column)">{{
                                                        column.title }}</span>
                                                <span v-else :style="localHeaderTextSize">{{ column.title }}</span>
                                                <template v-if="props.isSorted(column)">
                                                    <v-icon :style="localHeaderIconSize" :icon="props.getSortIcon(column)"/>
                                                </template>
                                                <template v-if="checkIsGroupable(column)">
                                                    <v-icon v-if="checkIsGroupBy(column.key)" class="cursor-pointer"
                                                        :style="localHeaderIconSize"
                                                        :icon="getGroupSortIcon(column.key)"
                                                        @click="sortByGroup(column.key)"/>
                                                    <v-icon v-else :style="localHeaderIconSize" class="cursor-pointer" :icon="groupByIcon"
                                                        @click="onGroupBy(column.key)" />
                                                </template>
                                            </th>
                                            <th class="bg-grey-lighten-4 dt-header-border" :rowspan="column.rowspan"
                                                :colspan="column.colspan" v-else>
                                                <v-icon v-show="selectStrategy !== 'single'" :icon="getSelectAllIcon(props)"
                                                    @click="onSelectAll(props)" />
                                            </th>
                                        </slot>
                                    </template>
                                </tr>
                            </template>
                        </slot>
                        <tr v-if="!hideFilterRow">
                            <th class="bg-grey-lighten-4 dt-header-border"
                                v-for="(column, index) in getHeaders(props.columns)" :key="index">
                                <template v-if="column.filterable !== false">
                                    <v-select hide-details center-affix v-if="column.filterMode === FILTER_MODE.SELECTION"
                                        variant="plain" density="compact" :color="color" item-value="value"
                                        item-title="title" :items="column.filterItems" v-model="column.filterValue"
                                        :list-props="{
                                            lines: false,
                                            density: 'compact'
                                        }" />
                                    <v-text-field hide-details center-affix v-else variant="plain" density="compact"
                                        placeholder="Search" v-model="column.filterValue">
                                        <template v-slot:append>
                                            <v-menu>
                                                <template v-slot:activator="{ props }">
                                                    <v-btn :color="color" variant="text" size="x-small" :icon="filterIcon"
                                                        v-bind="props" />
                                                </template>
                                                <v-list density="compact" :lines="false" :color="color">
                                                    <v-list-item v-for="filter in filterTypes" :key="filter.value"
                                                        :title="filter.title" :active="column.filterType === filter.value"
                                                        @click="column.filterType = filter.value" />
                                                </v-list>
                                            </v-menu>
                                        </template>
                                    </v-text-field>
                                </template>
                            </th>
                        </tr>
                    </template>
                    <template v-slot:group-header="props">
                        <slot v-bind="props" name="group-header">
                            <tr>
                                <td :colspan="props.columns.length">
                                    <v-icon :class="`ml-${props.item.depth * 3}`" size="small"
                                        @click="props.toggleGroup(props.item)"
                                        :icon="props.isGroupOpen(props.item) ? '$expand' : '$next'" />
                                    <span>{{ gropHeaderDisplayText(props.item, props.columns) }}</span>
                                    <v-icon size="small" class="ml-4" @click="onRemoveGroupBy(props.item.key)"
                                        icon="$delete" />
                                </td>
                            </tr>
                        </slot>
                    </template>
                    <template v-for="header in tableHeaders" v-slot:[`item.${header.key}`]="props">
                        <slot v-bind="props" :name="`item.${header.key}`">
                            <template v-if="typeof header.formatCellValue === 'function'">
                                {{ header.formatCellValue(props.value) }}
                            </template>
                            <template v-else>
                                {{ props.value }}
                            </template>
                        </slot>
                    </template>
                    <template v-slot:expanded-row="props">
                        <slot v-bind="props" name="expanded-row" />
                    </template>
                    <template v-slot:no-data>
                        <slot name="no-data">No data available</slot>
                    </template>
                    <template v-slot:bottom>
                        <v-toolbar v-if="!hideFooter" density="comfortable">
                            <span class="text-caption mx-1">Items per page</span>
                            <div style="width: 100px;">
                                <v-select hide-details density="compact" variant="outlined"
                                    v-model="pagination.itemsPerPage" item-title="title" item-value="value"
                                    :items="itemsPerPageOptions" @update:model-value="pagination.page = 1" />
                            </div>
                            <v-pagination class="ml-2" density="comfortable" rounded="circle" :active-color="color"
                                total-visible="7" :first-icon="firstIcon" :last-icon="lastIcon" :next-icon="nextIcon" :prev-icon="prevIcon"
                                v-model="pagination.page" :length="pages" />
                            <v-spacer />
                            <span class="pr-2">{{ pageDetail }}</span>
                            <v-btn v-if="!hideRefereshButton" variant="text" :icon="refreshIcon" size="small"
                                @click="$emit('refreshClick')" />
                        </v-toolbar>
                    </template>
                </v-data-table>
            </template>
            <template v-slot:right-pane>
                <slot name="right-area" />
            </template>
        </resizable-splitter>
        <slot name="bottom-area" />
    </v-card>
</template>

<style>
.dt-header-border {
    border-right: solid 1px rgba(0, 0, 0, 0.12);
}

.dt-row-highlight {
    background: rgba(0, 0, 0, 0.06) !important;
}
</style>