<script setup>
import { ref } from 'vue'
import { FilterType } from 'v-datatable-plus'

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
