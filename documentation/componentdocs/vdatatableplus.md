<script setup>
import DataTableSimple from '../components/DataTableSimple.vue'
import DataTableFull from '../components/DataTableFull.vue'
</script>

# VDatatablePlus

## Simple Usage

::: code-group
```vue  [template]
<template>
  <v-datatable-plus hide-refresh-button
      title="Title"
      color="primary"
      drag-menu-icon="list"
      drag-item-icon="drag_indicator"
      group-by-icon="category"
      group-sort-asc-icon="file_upload"
      group-sort-desc-icon="file_download"
      print-icon="print"
      filter-icon="filter_alt"
      :items="items"
      v-model:headers="headers"/>
</template>
```

```vue [script]
<script setup>
import 'v-datatable-plus/dist/style.css'
import { ref } from 'vue'
import { VDatatablePlus, FilterType } from 'v-datatable-plus'

const headers = ref([
  {
    isShow: true,
    align: 'start',
    key: 'name',
    title: 'Boat Type',
    filterType: FilterType.Contains,
  },
  { 
    isShow: true,
    key: 'speed',
    title: 'Speed (knots)',
    filterType: FilterType.Contains,
    groupable: true
  },
  {
    isShow: true,
    key: 'length',
    title: 'Length (m)',
    filterType: FilterType.Contains,
  },
  { 
    isShow: true,
    key: 'price',
    title: 'Price ($)',
    filterType: FilterType.Contains,
  },
  {
    isShow: true,
    key: 'created',
    title: 'Year',
    filterType: FilterType.Contains,
  },
])
const items = ref([
    {
      name: 'Speedster',
      speed: 35,
      length: 22,
      price: 300000,
      created: '2021-10-05',
    },
    {
      name: 'OceanMaster',
      speed: 25,
      length: 35,
      price: 500000,
      created: '2020-06-14',
    },
    {
      name: 'Voyager',
      speed: 20,
      length: 45,
      price: 700000,
      created: '2019-01-23',
    },
    {
      name: 'WaveRunner',
      speed: 40,
      length: 19,
      price: 250000,
      created: '2022-11-02',
    },
    {
      name: 'SeaBreeze',
      speed: 28,
      length: 31,
      price: 450000,
      created: '2018-08-18',
    },
    {
      name: 'HarborGuard',
      speed: 18,
      length: 50,
      price: 800000,
      created: '2017-06-14',
    },
    {
      name: 'SlickFin',
      speed: 33,
      length: 24,
      price: 350000,
      created: '2021-02-18',
    },
    {
      name: 'StormBreaker',
      speed: 22,
      length: 38,
      price: 600000,
      created: '2020-01-28',
    },
    {
      name: 'WindSail',
      speed: 15,
      length: 55,
      price: 900000,
      created: '2019-05-25',
    },
    {
      name: 'FastTide',
      speed: 37,
      length: 20,
      price: 280000,
      created: '2022-12-02',
    },
  ]);
</script>
```
:::

## Simple Preview
::: raw
<ClientOnly>
  <DataTableSimple />
</ClientOnly>
:::



## All Features Usage

::: code-group
```vue [template]
<template>
  <v-datatable-plus show-print select-on-row highlight-row return-object
      color="primary"
      drag-menu-icon="list"
      drag-item-icon="drag_indicator"
      group-by-icon="category"
      group-sort-asc-icon="file_upload"
      group-sort-desc-icon="file_download"
      print-icon="print"
      filter-icon="filter_alt"
      row-highlight-class="text-red"
      :right-panel-width="40"
      :right-panel-fixed="rightPanelFixed"
      :show-right-panel="showRightPanel"
      :items="items"
      v-model:headers="headers"
      v-model:selected-row="selectedRow"
      @click:refresh="addBoats"
      @click:row="rowClick">
      <template #title>
        Title Slot
      </template>
      <template #pre-header-commands>
        <v-chip color="primary">Pre Commands</v-chip>
      </template>
      <template #post-header-commands>
        <v-btn
          :prepend-icon="showRightPanel ? 'visibility_off' : 'visibility'"
          @click="()=> showRightPanel = !showRightPanel">
          {{showRightPanel ? 'Hide' : 'Show'}} Right Pane
        </v-btn>
      </template>
      <template #header-expand-section>
        <div class="pa-4 bg-secondary">Header expand section</div>
      </template>
      <template #right-panel>
        <div class="pa-2 h-auto bg-secondary">
          <p>Selected value: {{selectedRow?.name}}</p>
        </div>
        <v-btn block color="primary"
          @click="()=> rightPanelFixed = !rightPanelFixed">
          {{rightPanelFixed ? 'Adjustable' : 'Fixed'}} Splitter
        </v-btn>
      </template>
      <template #bottom-area>
        <div class="pa-4 bg-secondary">Bottom Area</div>
      </template>
    </v-datatable-plus>
</template>
```
```vue [script]
<script setup>
import 'v-datatable-plus/dist/style.css'
import { ref, onMounted } from 'vue'
import { VDatatablePlus, FilterType, FilterMode } from 'v-datatable-plus'

const showRightPanel = ref(false);
const rightPanelFixed = ref(false);
const selectedRow = ref(null);
const headers = ref([
  {
    isShow: true,
    align: 'start',
    key: 'name',
    title: 'Boat Type',
    filterType: FilterType.Contains,
  },
  { 
    isShow: true,
    key: 'speed',
    title: 'Speed (knots)',
    filterType: FilterType.Contains,
    groupable: true
  },
  {
    isShow: true,
    key: 'length',
    title: 'Length (m)',
    filterType: FilterType.Contains,
  },
  { 
    isShow: true,
    key: 'price',
    title: 'Price ($)',
    filterType: FilterType.Contains,
  },
  {
    isShow: true,
    key: 'created',
    title: 'Year',
    filterType: FilterType.Contains,
    filterMode: FilterMode.Selection,
    allFilterValue: -1,
    filterValue: -1,
    filterItems: [
      { title: 'All', value: -1 },
      { title: '2018', value: 2018 },
      { title: '2019', value: 2019 },
      { title: '2020', value: 2020 },
      { title: '2021', value: 2021 },
      { title: '2022', value: 2022 },
      { title: '2023', value: 2023 },
      { title: '2024', value: 2024 },
    ],
    value: (item) => (new Date(item.created)?.getFullYear())
  },
])
const boats = ref([
    {
      name: 'Speedster',
      speed: 35,
      length: 22,
      price: 300000,
      created: '2021-10-05',
    },
    {
      name: 'OceanMaster',
      speed: 25,
      length: 35,
      price: 500000,
      created: '2020-06-14',
    },
    {
      name: 'Voyager',
      speed: 20,
      length: 45,
      price: 700000,
      created: '2019-01-23',
    },
    {
      name: 'WaveRunner',
      speed: 40,
      length: 19,
      price: 250000,
      created: '2022-11-02',
    },
    {
      name: 'SeaBreeze',
      speed: 28,
      length: 31,
      price: 450000,
      created: '2018-08-18',
    },
    {
      name: 'HarborGuard',
      speed: 18,
      length: 50,
      price: 800000,
      created: '2017-06-14',
    },
    {
      name: 'SlickFin',
      speed: 33,
      length: 24,
      price: 350000,
      created: '2021-02-18',
    },
    {
      name: 'StormBreaker',
      speed: 22,
      length: 38,
      price: 600000,
      created: '2020-01-28',
    },
    {
      name: 'WindSail',
      speed: 15,
      length: 55,
      price: 900000,
      created: '2019-05-25',
    },
    {
      name: 'FastTide',
      speed: 37,
      length: 20,
      price: 280000,
      created: '2022-12-02',
    },
  ]);

const items = ref([]);

function addBoats() {
  const arr = [...Array(10).keys()].map(i => {
    const boat = { ...boats.value[i % 10] }
    boat.name = `${boat.name} #${i}`
    return boat
  });
  items.value = arr.concat(items.value);
}

function rowClick() {
  if (selectedRow.value?.name) {
    showRightPanel.value = true;
  } else {
    showRightPanel.value = false;
  }
}

onMounted(() => {
  addBoats();
});
</script>
```
:::

## All Features Preview
::: raw
<ClientOnly>
  <DataTableFull />
</ClientOnly>
:::