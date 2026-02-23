<script setup>
const propsColumns = [
  { key: 'name', label: 'Name' },
  { key: 'type', label: 'Type', code: true },
  { key: 'default', label: 'Default', code: true },
  { key: 'detail', label: 'Details' },
]

const propsRows = [
  {
    name: 'show-splitter',
    type: 'boolean',
    default: 'false',
    detail: 'Show splitter and right panel area.',
  },
  {
    name: 'is-fixed',
    type: 'boolean',
    default: 'true',
    detail: 'Disable dragging when true, allow dragging when false.',
  },
  {
    name: 'splitter-position',
    type: 'number',
    default: '100',
    detail: 'Initial splitter position in percent from the left side.',
  },
]

const slotsColumns = [
  { key: 'name', label: 'Name' },
  { key: 'slotProps', label: 'Slot Props', code: true },
  { key: 'detail', label: 'Details' },
]

const slotsRows = [
  { name: 'left-panel', slotProps: '-', detail: 'Left side panel content.' },
  { name: 'right-panel', slotProps: '-', detail: 'Right side panel content.' },
]
</script>

# ResizeableSplitter API

## Component
[ResizeableSplitter](/componentdocs/resizeablesplitter)

## Props
<ApiReferenceTable :columns="propsColumns" :rows="propsRows" search-placeholder="Search props" />

## Slots
<ApiReferenceTable :columns="slotsColumns" :rows="slotsRows" search-placeholder="Search slots" />
