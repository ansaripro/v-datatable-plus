<script setup>
import { ref, reactive, computed, watch, useSlots } from 'vue';
import { FilterType, FilterMode } from '../types/index';
import Draggable from 'vuedraggable';
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
    hideRefreshButton: {
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
    // vuetify
    color: String,
    itemValue: String,
    itemsLength: Number,
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
        type: Array,
        default: [],
    },
    groupBy: {
        type: Array,
        default: [],
    },
    modelValue: {
        type: Array,
        default: [],
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
        type: Array,
        default: [],
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
    page: {
        type: [String, Number],
        default: 1,
    },
    itemsPerPage: {
        type: Number,
        default: 50,
    },
    itemsPerPageOptions: {
        type: Array,
        default: [
            { value: 50, title: '50' },
            { value: 100, title: '100' },
            { value: 200, title: '200' },
            { value: 300, title: '300' },
            { value: 500, title: '500' },
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
    removeSearchIcon: {
        type: String,
        default: 'mdi-magnify-minus',
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
});

const emit = defineEmits([
    'update:currentItems',
    'update:expanded',
    'update:groupBy',
    'update:itemsPerPage',
    'update:modelValue',
    'update:options',
    'update:page',
    'update:sortBy',
    'update:headers',
    'update:selectedRow',
    'click:refresh',
    'click:row',
    'columnMenuOpened',
    'columnMenuDragChange',
    'columnMenuChecked'
]);

// Data properties
const filterSearch = ref('');
const lastSelectedRowNode = ref(null);
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
const currentPage = ref(1);
const curentItemPerPage = ref(10);
const currentSortBy = ref([]);
const currentGroupBy = ref([]);

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
const dtSearchModel = computed({
    get() {
        return props.search || filterSearch.value;
    },
    set(newValue) {
        filterSearch.value = newValue;
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
    if (dtItemsPerPage.value == null || props.itemsLength <= 0) return pages;
    pages = Math.ceil(props.itemsLength / dtItemsPerPage.value);
    return pages > 0 ? pages : 1;
});
const pageDetail = computed(() => {
    if (props.itemsLength <= 0) return `${props.itemsLength} items`;
    if (dtItemsPerPage.value <= 0 || dtItemsPerPage.value > props.itemsLength) return `1 - ${props.itemsLength} items`;

    const startPage = (dtPage.value - 1) * dtItemsPerPage.value + 1;
    let endPage = dtPage.value * dtItemsPerPage.value;
    if (endPage > props.itemsLength) endPage = props.itemsLength;
    return `${startPage} - ${endPage} of ${props.itemsLength} items`;
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
function onChangeItemPerPage() {
    dtPage.value = 1
}
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
function getHeaderProps(props, column) {
    let hProps = {...props, column: column};
    delete hProps.headers;
    delete hProps.columns;
    return hProps;
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
    const groupByColumn = dtGroupBy.value || [];
    if (groupByColumn.findIndex((g) => g.key === key) === -1) {
        groupByColumn.push({ key: key, order: 'asc' });
        dtGroupBy.value = groupByColumn;
    }
}
function onRemoveGroupBy(key) {
    const groupByColumn = dtGroupBy.value || [];
    const indx = groupByColumn.findIndex((g) => g.key === key);
    if (indx !== -1) {
        groupByColumn.splice(indx, 1);
        dtGroupBy.value = groupByColumn;
    }
}
function sortByGroup(key) {
    const groupByColumn = dtGroupBy.value;
    const obj = groupByColumn?.find((g) => g.key === key);
    obj.order = obj.order === 'asc' ? 'desc' : 'asc';
    dtGroupBy.value = groupByColumn;
}
function getGroupSortIcon(key) {
    const obj = dtGroupBy.value?.find((g) => g.key === key);
    if (obj) return obj.order === 'asc' ? props.groupSortAscIcon : props.groupSortDescIcon;
    else return props.groupSortAscIcon;
}
function checkIsGroupBy(key) {
    return dtGroupBy.value?.findIndex((g) => g.key === key) !== -1;
}
function groupHeaderDisplayText(gr, columns) {
    let text = '';
    const column = columns.find((x) => x.key === gr.key);
    if (column) {
        const val = typeof column.value === 'function' ? column.value({[gr.key]: gr.value}) : gr.value;
        text = `${column.title}: ${val}`;
    }
    text = `${text} (Count: ${gr.items.length})`;
    return text;
}
function getGroupProps(props) {
    return {...props, onRemoveGroupBy: onRemoveGroupBy};
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
function onFilterTypeClick(column, filter) {
    column.filterType = filter.value;
    if (column.filterValue?.length > 0) {
        dtSearchModel.value = `!${dtSearchModel.value}`;
    }
}
function updateSearch(value) {
    dtSearchModel.value = value;
}
function resetFilter() {
    tableHeaders.value.forEach(c => {
        c.filterValue = c.filterMode === FilterMode.Selection ? c.allFilterValue : null;
    });
    dtSearchModel.value = '';
}
function updateCurrentItems(obj) {
    emit('update:currentItems', obj);
}
function updateOptions(val) {
    emit('update:options', val);
}
function rowClick($event, param) {
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
                    <Draggable v-model="localHeaders" item-key="key" handle=".cursor-move"
                        @change="$emit('columnMenuDragChange', $event)">
                        <template #item="{ element }">
                            <v-list-item>
                                <template #prepend>
                                    <v-list-item-action start>
                                        <v-checkbox-btn :color="color" v-model="element.isShow"
                                            @change="$emit('columnMenuChecked', { element, $event })" />
                                    </v-list-item-action>
                                </template>
                                {{ element.title }}
                                <template #append>
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
            <v-btn v-if="!hideFilterRow" @click="resetFilter" :prepend-icon="removeSearchIcon">REMOVE SEARCH</v-btn>
            <slot name="post-header-commands" />
        </v-toolbar>
        <slot name="header-expand-section" />
        <resizeable-splitter :splitter-position="100 - (rightPanelWidth > 100 ? 80 : rightPanelWidth)"
            :show-splitter="showRightPanel" :is-fixed="rightPanelFixed">
            <template #left-panel>
                <v-data-table-server fixed-header class="border-s"
                    :height="tableHeight"
                    :density="density"
                    :sticky="sticky"
                    :theme="theme"
                    :color="color"
                    :hover="hover"
                    :mobile="mobile"
                    :mobile-breakpoint="mobileBreakpoint"
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
                    :headers="tableHeaders"
                    :items="items"
                    :select-strategy="selectStrategy"
                    :item-selectable="itemSelectable"
                    :item-value="itemValue"
                    :return-object="returnObject"
                    :custom-key-sort="customKeySort"
                    :disable-sort="disableSort"
                    :multi-sort="multiSort"
                    :must-sort="mustSort"
                    :expand-on-click="expandOnClick"
                    :custom-filter="customFilter"
                    :custom-key-filter="customKeyFilter"
                    :filter-keys="filterKeys"
                    :filter-mode="filterMode"
                    :value-comparator="valueComparator"
                    :search="dtSearchModel"
                    :items-length="itemsLength"
                    v-model="dtModel"
                    v-model:page="dtPage"
                    v-model:items-per-page="dtItemsPerPage"
                    v-model:sort-by="dtSortBy"
                    v-model:group-by="dtGroupBy"
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
                                        <slot :name="`header.${column.key}`" v-bind="getHeaderProps(props, column)">
                                            <th class="bg-grey-lighten-4 border-s" :style="[headerStyle(column)]"
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
                                            <th class="bg-grey-lighten-4 border-s" :rowspan="column.rowspan"
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
                            <th class="bg-grey-lighten-4 border-s"
                                v-for="(column, index) in getHeaders(props.columns)" :key="index">
                                <template v-if="column.filterable !== false">
                                    <v-select hide-details center-affix
                                        v-if="column.filterMode === FilterMode.Selection"
                                        variant="plain"
                                        density="compact"
                                        item-value="value"
                                        item-title="title"
                                        :color="color"
                                        :theme="theme"
                                        :items="column.filterItems"
                                        :list-props="{
                                            lines: false,
                                            density: 'compact'
                                        }"
                                        v-model="column.filterValue"
                                        @update:model-value="updateSearch(column.filterValue)"/>
                                    <v-text-field hide-details center-affix v-else
                                        variant="plain"
                                        density="compact"
                                        placeholder="Search"
                                        :theme="theme"
                                        v-model="column.filterValue"
                                        @update:model-value="updateSearch(column.filterValue)">
                                        <template #append>
                                            <v-menu :z-index="filterMenuZIndex" :theme="theme">
                                                <template #activator="{ props }">
                                                    <v-btn :color="color" variant="text" size="x-small" :icon="filterIcon"
                                                        v-bind="props" />
                                                </template>
                                                <v-list density="compact" :lines="false" :color="color" :theme="theme">
                                                    <v-list-item v-for="filter in filterTypes" :key="filter.value"
                                                        :title="filter.title"
                                                        :active="column.filterType === filter.value"
                                                        @click="onFilterTypeClick(column, filter)"/>
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
                                    <v-icon :class="`ml-${props.item.depth * 3}`" size="small"
                                        @click="props.toggleGroup(props.item)"
                                        :icon="props.isGroupOpen(props.item) ? '$expand' : '$next'" />
                                    <span>{{ groupHeaderDisplayText(props.item, props.columns) }}</span>
                                    <v-icon size="small" class="ml-4" @click="onRemoveGroupBy(props.item.key)" icon="$delete" />
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
                                        @update:model-value="onChangeItemPerPage" />
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
                                    :length="pages"
                                    v-model="dtPage"/>
                                <v-spacer/>
                                <span class="pr-2">{{ pageDetail }}</span>
                                <v-btn v-if="!hideRefreshButton" variant="text" :icon="refreshIcon" size="small" @click="$emit('click:refresh')" />
                            </v-toolbar>
                        </slot>
                    </template>
                </v-data-table-server>
            </template>
            <template #right-panel>
                <slot name="right-panel" />
            </template>
        </resizeable-splitter>
        <slot name="bottom-area" />
    </v-card>
</template>