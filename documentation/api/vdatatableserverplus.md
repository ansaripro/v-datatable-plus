<script setup>
import { ref } from 'vue';

// Props
const propsSearch = ref(null);
const propsHeaders = ref([
    { title: 'Name', key: 'name', width: '30%' },
    { title: 'Type', key: 'type' },
    { title: 'Default', key: 'default', width: '20%' },
]);
const propsItems = ref([
    {
        name: 'headers',
        type: `
            All default headers properties and these:<br/>
            isShow: boolean | false<br/>
            filterable?: boolean | undefined<br/>
            filterType: string | FilterType | 'eq' | 'neq' | 'starts' | 'contains' | 'notcontains' | 'ends' | undefined<br/>
            filterMode?: string | FilterMode | 'selection' | 'types' | undefined<br/>
            allFilterValue?: any | undefined<br/>
            filterValue?: any | undefined<br/>
            filterItems?: [any] | undefined<br/>
            draggable?: boolean | undefined<br/>
            fixable?: boolean | undefined<br/>
        `,
        default: 'undefined',
        detail: 'Other than default headers properties.'
    },
    {
        name: 'title',
        type: 'string',
        default: 'undefined',
        detail: 'Title text on table header.'
    },
    { 
        name: 'hide-title-bar',
        type: 'boolean',
        default: false,
        detail: 'Hide title bar including column menu and header commands.'
    },
    {
        name: 'hide-column-menu',
        type: 'boolean',
        default: false,
        detail: 'Hide column menu.'
    },
    {
        name: 'drag-menu-height',
        type: 'number',
        default: '250',
        detail: 'Set height for column menu popup list to show vertical scrollbar.'
    },
    {
        name: 'column-menu-z-index',
        type: 'string | number',
        default: 'undefined',
        detail: `Set z-index for Column menu by default it's uses vuetify VMenu defualt z-index.`
    },
    {
        name: 'drag-menu-icon',
        type: 'string',
        default: '$menu',
        detail: 'Set icon for column menu.'
    },
    {
        name: 'drag-item-icon',
        type: 'string',
        default: 'mdi-drag-vertical',
        detail: 'Set icon for column menu item drag icon.'
    },
    {
        name: 'drag-item-freeze-icon',
        type: 'string',
        default: 'mdi-table-lock',
        detail: 'Set icon for column menu item fixable freeze icon.'
    },
    {
        name: 'drag-item-un-freeze-icon',
        type: 'string',
        default: 'mdi-table',
        detail: 'Set icon for column menu item fixable unfreeze icon.'
    },
    {
         name: 'hide-filter-row',
         type: 'boolean',
         default: false,
         detail: 'Hide heade filtr row.'
    },
    {
        name: 'filter-icon',
        type: 'string',
        default:' mdi-filter',
        detail: 'Set filter type menu icon'
    },
    {
        name: 'filter-menu-z-index',
        type: 'string | number',
        default: 'undefined',
        detail: `Set z-index for filter type menu by default it's uses vuetify VMenu defualt z-index.`
    },
    {
        name: 'hide-footer',
        type: 'boolean',
        default: false,
        detail: 'Hide footer i.e. pagination.'
    },
    {
        name: 'show-right-panel',
        type: 'boolean',
        default: false,
        detail: 'Enable resize splitter in the table area and show right panel.'
    },
    {
        name: 'right-panel-fixed',
        type: 'boolean',
        default: true,
        detail: 'Set right panel will be fixed or resizeable.'
    },
    {
        name: 'right-panel-width',
        type: 'number',
        default: '20',
        detail: 'Set right panel width in number which will be use as percertage i.e. 20 means 20% width will be set for right panel and 80% width will be avaialable for left panel where VDataTableServer placed.'
    },
    {
        name: 'table-height',
        type: 'string | number',
        default: '250',
        detail: 'Set main table (VDataTableServer) height.'
    },
    {
        name: 'select-on-row',
        type: 'boolean',
        default: false,
        detail: 'Enable row selection, required item-value or return-object=true same like show-select, and also required "v-model:selected-row".'
    },
    {
        name: 'highlight-row',
        type: 'boolean',
        default: false,
        detail: 'Enable to apply "row-highlight-class" on "select-on-row".'
    },
    {
        name: 'row-highlight-class',
        type: 'string',
        default: 'undefined',
        detail: 'Set row highlight class, work with other highlight row props.'
    },
    { 
        name: 'selected-row',
        type: 'string | number | boolean |object',
        default: 'null',
        detail: 'v-model:selected-row is for getting a single selected row on row click work seperately with default selection.'
    },
    {
        name: 'header-text-size',
        type: 'string',
        default: 'undefined',
        detail: 'Set header title font size.'
    },
    {
        name: 'header-icon-size',
        type: 'string',
        default: 'undefined',
        detail: 'Set headers icon size (sort and group by icons).'
    },
    {
        name: 'group-by-icon',
        type: 'string',
        default: 'mdi-table-plus',
        detail: 'Set icon for group by button.'
    },
    { 
        name: 'group-sort-asc-icon',
        type: 'string',
        default: 'mdi-sort-ascending',
        detail: 'Set group sort ascending icon.'
    },
    {
        name: 'group-sort-desc-icon',
        type: 'string',
        default: 'mdi-sort-descending',
        detail: 'Set group sort descending icon.'
    },    
]);

// Events
const eventsSearch = ref(null);
const eventsHeaders = ref([
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
]);
const eventsItems = ref([
    {
        name: 'update:selectedRow',
        type: '[any]',
        detail: 'Emit on "selected-row" change.'
    },
    {
        name: 'click:row',
        type: '[any]',
        detail: 'Trigger on row click.'
    },
    {
        name: 'columnMenuOpened',
        type: '[boolean]',
        detail: 'Emit on column open or closed.'
    },
    {
        name: 'columnMenuDragChange',
        type: '[any]',
        detail: 'VueDraggable drag change event.'
    },
    {
        name: 'columnMenuChecked',
        type: '[any]',
        detail: 'Trigger on column show/hide checkbox click.'
    },
    {
        name: 'columnMenuFixed',
        type: '[any]',
        detail: 'Trigger on column freeze/unfreeze checkbox icon click.'
    },
]);

// Slots
const slotsSearch = ref(null);
const slotsHeaders = ref([
    { title: 'Name', key: 'name' },
]);
const slotsItems = ref([
    {
        name: 'title',
        detail: 'Title slot in Titlebar.'
    },
    {
        name: 'header-commands',
        props: `
            {
                clearSearch: () => void
            }
        `,
        detail: 'Slot in Titlebar on the right side.'
    },
    {
        name: 'header-expand-section',
        detail: 'Slot below the Titlebar and above from VDataTableServer.'
    },
    {
        name: 'footer-append',
        detail: 'Slot in footer after pagination detail.'
    },
    {
        name: 'right-panel',
        detail: 'Right panel slot for ResizeableSplitter.'
    },
    {
        name: 'bottom-area',
        detail: 'Last bottom slot.'
    },
]);
</script>

# VDatatableServerPlus API

All base [VDataTableServer](https://vuetifyjs.com/en/api/v-data-table-server) Props,Events, and Slots should works with this component.<br/>
Note: height prop replace with table-height prop.

## Component
[VDatatableServerPlus](/componentdocs/vdatatableserverplus)


## Props
::: raw
<client-only>
    <v-data-table hide-default-footer
        :items-per-page="-1"
        :items-per-page-options="-1"
        :search="propsSearch"
        :headers="propsHeaders"
        :items="propsItems">
        <template #body.prepend>
            <tr>
                <td colspan="3" class="bg-grey-lighten-3">
                    <v-text-field hide-details 
                        variant="flat"
                        prepend-inner-icon="search"
                        placeholder="Search"
                        v-model="propsSearch"/>
                </td>
            </tr>
        </template>
        <template #item="{item}">
            <tr rowspan="2">
                <td class="font-weight-bold text-blue">{{item.name}}</td>
                <td class="text-green" v-html="item.type"/>
                <td>
                    <span v-if="item.default === true || item.default === false" class="text-purple">{{item.default}}</span>
                    <span v-else-if="item.default === 'null' || item.default === 'undefined'" class="text-blue">{{item.default}}</span>
                    <span v-else class="text-green">{{item.default}}</span>
                </td>
            </tr>
            <tr>
                <td colspan="3">{{item.detail}}</td>
            </tr>
        </template>
    </v-data-table>
</client-only>
:::

## Events
::: raw
<client-only>
    <v-data-table hide-default-footer
        :items-per-page="-1"
        :items-per-page-options="-1"
        :search="eventsSearch"
        :headers="eventsHeaders"
        :items="eventsItems">
        <template #body.prepend>
            <tr>
                <td colspan="3" class="bg-grey-lighten-3">
                    <v-text-field hide-details 
                        variant="flat"
                        prepend-inner-icon="search"
                        placeholder="Search"
                        v-model="eventsSearch"/>
                </td>
            </tr>
        </template>
        <template #item="{item}">
            <tr rowspan="2">
                <td class="font-weight-bold text-blue">{{item.name}}</td>
                <td class="text-green">{{item.type}}</td>
            </tr>
            <tr>
                <td colspan="2">{{item.detail}}</td>
            </tr>
        </template>
    </v-data-table>
</client-only>
:::

## Slots
::: raw
<client-only>
    <v-data-table hide-default-footer
        :items-per-page="-1"
        :items-per-page-options="-1"
        :search="slotsSearch"
        :headers="slotsHeaders"
        :items="slotsItems">
        <template #body.prepend>
            <tr>
                <td colspan="3" class="bg-grey-lighten-3">
                    <v-text-field hide-details 
                        variant="flat"
                        prepend-inner-icon="search"
                        placeholder="Search"
                        v-model="eventsSearch"/>
                </td>
            </tr>
        </template>
        <template #item="{item}">
            <tr>
                <td class="font-weight-bold text-blue">{{item.name}}</td>
            </tr>
            <tr v-if="item.props?.length > 0">
                <td>
                    <code>{{item.props}}</code>
                </td>
            </tr>
            <tr>
                <td>{{item.detail}}</td>
            </tr>
        </template>
    </v-data-table>
</client-only>
:::