<script setup>
import { ref } from 'vue';
import VDatatablePlus from './components/VDatatablePlus.vue';
import { VChip } from 'vuetify/components';
import { FILTER_TYPE, FILTER_MODE } from './types/index';
import data from './data';
// import {
//     VDataTable,
//     VToolbar,
//     VToolbarTitle,
//     VSelect,
//     VList,
//     VListItem,
//     VListItemAction,
//     VMenu,
//     VBtn,
//     VCard,
//     VIcon,
//     VCheckboxBtn,
//     VPagination,
//     VSpacer,
//     VTextField,
// } from 'vuetify/components';

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
  { isShow: true, title: 'Calories', align: 'end', key: 'calories', groupable: true, filterType: FILTER_TYPE.CONTAINS },
  { isShow: true, title: 'Fat (g)', align: 'end', key: 'fat', filterType: FILTER_TYPE.CONTAINS },
  { isShow: true, title: 'Carbs (g)', align: 'end', key: 'carbs', filterType: FILTER_TYPE.CONTAINS },
  { isShow: true, title: 'Protein (g)', align: 'end', key: 'protein', filterType: FILTER_TYPE.CONTAINS },
  { isShow: true, title: 'Iron (%)', align: 'end', key: 'iron', filterType: FILTER_TYPE.CONTAINS },
]
const desserts = data;
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <v-datatable-plus show-print show-select select-on-row
              title="Test"
              table-height="80vh"
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
            </v-datatable-plus>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
