<script setup>
const propsColumns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type', html: true },
  { key: 'default', label: 'Default', code: true },
  { key: 'detail', label: 'Details' },
]

const propsRows = [
  {
    name: 'headers',
    type: `All default VDataTable header properties plus:<br/>isShow, filterable, filterType, filterMode, allFilterValue, filterValue, filterItems, draggable, fixable`,
    default: 'required',
    detail: 'Header model used by the column menu, filter row, and grouping UI.',
  },
  { name: 'title', type: 'string', default: 'undefined', detail: 'Title text in the toolbar.' },
  { name: 'hide-title-bar', type: 'boolean', default: 'false', detail: 'Hide toolbar including title and header commands.' },
  { name: 'hide-column-menu', type: 'boolean', default: 'false', detail: 'Hide column menu button and popup.' },
  { name: 'drag-menu-height', type: 'number', default: '250', detail: 'Max height for column menu popup list.' },
  { name: 'column-menu-z-index', type: 'string | number', default: 'undefined', detail: 'Custom z-index for column menu.' },
  { name: 'drag-menu-icon', type: 'string', default: '$menu', detail: 'Column menu activator icon.' },
  { name: 'drag-item-icon', type: 'string', default: 'mdi-drag-vertical', detail: 'Drag icon in column menu rows.' },
  { name: 'drag-item-freeze-icon', type: 'string', default: 'mdi-table-lock', detail: 'Freeze icon in column menu rows.' },
  { name: 'drag-item-un-freeze-icon', type: 'string', default: 'mdi-table', detail: 'Unfreeze icon in column menu rows.' },
  { name: 'hide-filter-row', type: 'boolean', default: 'false', detail: 'Hide column-level filter row.' },
  { name: 'filter-icon', type: 'string', default: 'mdi-filter', detail: 'Filter type menu icon.' },
  { name: 'filter-menu-z-index', type: 'string | number', default: 'undefined', detail: 'Custom z-index for filter menu.' },
  { name: 'hide-footer', type: 'boolean', default: 'false', detail: 'Hide pagination footer.' },
  { name: 'show-right-panel', type: 'boolean', default: 'false', detail: 'Enable splitter and show right panel slot.' },
  { name: 'right-panel-fixed', type: 'boolean', default: 'true', detail: 'Disable/enable splitter dragging.' },
  { name: 'right-panel-width', type: 'number', default: '20', detail: 'Initial right panel width in percent.' },
  { name: 'table-height', type: 'string | number', default: '50vh', detail: 'Main table height.' },
  { name: 'select-on-row', type: 'boolean', default: 'false', detail: 'Toggle row selection on row click.' },
  { name: 'highlight-row', type: 'boolean', default: 'false', detail: 'Enable selected row highlight behavior.' },
  { name: 'row-highlight-class', type: 'string', default: 'undefined', detail: 'Class used when row highlight is enabled.' },
  { name: 'selected-row', type: 'string | number | boolean | object', default: 'null', detail: 'Selected row model (`v-model:selected-row`).' },
  { name: 'header-text-size', type: 'string', default: 'undefined', detail: 'Header text font size.' },
  { name: 'header-icon-size', type: 'string', default: 'undefined', detail: 'Header icon font size.' },
  { name: 'header-cell-class', type: 'string | object | array', default: 'undefined', detail: 'Custom class for both header and filter-row cells.' },
  { name: 'header-cell-style', type: 'string | object | array', default: 'undefined', detail: 'Custom inline style for both header and filter-row cells.' },
  { name: 'table-class', type: 'string | object | array', default: 'undefined', detail: 'Custom class for internal `v-data-table` root.' },
  { name: 'table-style', type: 'string | object | array', default: 'undefined', detail: 'Custom style for internal `v-data-table` root.' },
  { name: 'right-panel-class', type: 'string | object | array', default: 'undefined', detail: 'Custom class for right panel container.' },
  { name: 'right-panel-style', type: 'string | object | array', default: 'undefined', detail: 'Custom style for right panel container.' },
  { name: 'data-table-props', type: 'Record<string, any>', default: '{}', detail: 'Pass-through props spread to internal `v-data-table`.' },
  { name: 'group-by-icon', type: 'string', default: 'mdi-table-plus', detail: 'Group-by toggle icon.' },
  { name: 'group-sort-asc-icon', type: 'string', default: 'mdi-sort-ascending', detail: 'Group sort ascending icon.' },
  { name: 'group-sort-desc-icon', type: 'string', default: 'mdi-sort-descending', detail: 'Group sort descending icon.' },
]

const eventsColumns = [
  { key: 'name', label: 'Name' },
  { key: 'payload', label: 'Payload', code: true },
  { key: 'detail', label: 'Details' },
]

const eventsRows = [
  { name: 'update:selectedRow', payload: 'any', detail: 'Emits when `selected-row` changes.' },
  { name: 'click:row', payload: '{ $event, param }', detail: 'Fires on row click.' },
  { name: 'columnMenuOpened', payload: 'boolean', detail: 'Column menu open state changed.' },
  { name: 'columnMenuDragChange', payload: '{ moved: { element, oldIndex, newIndex } }', detail: 'Column reordered from drag-and-drop.' },
  { name: 'columnMenuChecked', payload: '{ element, $event }', detail: 'Column show/hide checkbox changed.' },
  { name: 'columnMenuFixed', payload: '{ element, $event }', detail: 'Column freeze/unfreeze toggled.' },
]

const slotsColumns = [
  { key: 'name', label: 'Name' },
  { key: 'slotProps', label: 'Slot Props', code: true },
  { key: 'detail', label: 'Details' },
]

const slotsRows = [
  { name: 'title', slotProps: '-', detail: 'Toolbar title area.' },
  { name: 'header-commands', slotProps: '{ print }', detail: 'Right side of toolbar actions.' },
  { name: 'header-expand-section', slotProps: '-', detail: 'Area between toolbar and table.' },
  { name: 'footer-append', slotProps: '-', detail: 'Footer append area after pagination text.' },
  { name: 'right-panel', slotProps: '-', detail: 'Right panel content when splitter is enabled.' },
  { name: 'bottom-area', slotProps: '-', detail: 'Bottom area below table/splitter.' },
]
</script>

# VDatatablePlus API

All base [VDataTable](https://vuetifyjs.com/en/api/v-data-table) props/events/slots are supported. Use `table-height` instead of `height`.

## Component
[VDatatablePlus](/componentdocs/vdatatableplus)

## Props
<ApiReferenceTable :columns="propsColumns" :rows="propsRows" search-placeholder="Search props" />

## Events
<ApiReferenceTable :columns="eventsColumns" :rows="eventsRows" search-placeholder="Search events" />

## Slots
<ApiReferenceTable :columns="slotsColumns" :rows="slotsRows" search-placeholder="Search slots" />
