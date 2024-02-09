<script setup>
import { ref } from 'vue';
import DataTable from './components/DataTable.vue';
import { VChip } from 'vuetify/components';
import { FILTER_TYPE, FILTER_MODE } from './types/index';

const selected = ref([]);
const selectedRow = ref([]);
const headers = [
    {
      isShow: true,
      title: 'Dessert (100g serving)',
      align: 'start',
      key: 'name', 
      filterType: FILTER_TYPE.CONTAINS,
    },
    { isShow: true, title: 'Calories', align: 'end', key: 'calories',  groupable: true, filterType: FILTER_TYPE.CONTAINS },
    { isShow: true, title: 'Fat (g)', align: 'end', key: 'fat', filterType: FILTER_TYPE.CONTAINS },
    { isShow: true, title: 'Carbs (g)', align: 'end', key: 'carbs', filterType: FILTER_TYPE.CONTAINS },
    { isShow: true, title: 'Protein (g)', align: 'end', key: 'protein', filterType: FILTER_TYPE.CONTAINS },
    { isShow: true, title: 'Iron (%)', align: 'end', key: 'iron', filterType: FILTER_TYPE.CONTAINS },
  ]
  const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
      iron: 1,
      selectable: false,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
      iron: 1,
      selectable: true,
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16,
      carbs: 23,
      protein: 6,
      iron: 7,
      selectable: true,
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: 8,
      selectable: false,
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16,
      carbs: 49,
      protein: 3.9,
      iron: 16,
      selectable: true,
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0,
      carbs: 94,
      protein: 0,
      iron: 0,
      selectable: true,
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: 2,
      selectable: true,
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: 45,
      selectable: false,
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25,
      carbs: 51,
      protein: 4.9,
      iron: 22,
      selectable: true,
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26,
      carbs: 65,
      protein: 7,
      iron: 6,
      selectable: true,
    },
  ]
</script>

<template>
  <DataTable show-print show-select highlight-row
      title="Test"
      item-value="name"
      color="primary"
      v-model="selected"
      v-model:headers="headers"
      v-model:selected-row="selectedRow"
      :items="desserts"
      :itemsPerPage="5"
      :itemsPerPageOptions="[
        { value: 5, title: '5' },
        { value: 10, title: '10' },
        { value: 100, title: '100' },
        { value: -1, title: 'All' },
      ]">
      <template v-slot:item.calories="{ value }">
        <v-chip color="primary">
          {{ value }}
        </v-chip>
      </template>
    </DataTable>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
