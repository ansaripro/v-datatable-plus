<script setup>
import { ref } from 'vue';
import axios from 'axios';
import DataTable from './components/DataTable.vue';
import { VBtn } from 'vuetify/components';
import { FILTER_TYPE, FILTER_MODE } from './types/index';

const subscribers = ref([]);
const selected = ref([]);
const selectedRow = ref([]);
const headersSubscribers = ref([
  {
    isShow: true,
    title: 'TenantCode',
    key: 'TenantCode',
    width: 200,
    groupable: true,
    filterType: FILTER_TYPE.CONTAINS,
  },
  {
    isShow: true,
    title: 'Status',
    key: 'IsActive',
    width: 150,
    align: 'center',
    filterMode: FILTER_MODE.SELECTION,
    filterItems: [
      { value: null, title: 'All' },
      { value: true, title: 'Active' },
      { value: false, title: 'In Active' },
    ],
    allFilterValue: null,
    filterValue: null,
    formatCellValue: (status) => (status ? 'Active' : 'In Active'),
  },
  {
    isShow: true,
    title: 'Description',
    key: 'Description',
    filterType: FILTER_TYPE.CONTAINS,
  },
  {
    isShow: true,
    title: 'Action',
    key: 'Action',
    width: 370,
    isExclude: true,
    sortable: false,
    filterable: false,
  },
]);

function loadSubscribers() {
    const url = 'https://gateway.solentraglobal.com/SolentraGateway/RESTCommandWebService/ExecuteServerCommand/Public/Tenants';
    axios.get(url).then((res) => {
      subscribers.value = res.data;
    });
}
</script>

<template>
  <DataTable show-print show-select highlight-row
      title="Test"
      item-value="TenantCode"
      v-model="selected"
      v-model:headers="headersSubscribers"
      v-model:selected-row="selectedRow"
      :items="subscribers"
      :itemsPerPage="13"
      :itemsPerPageOptions="[
        { value: 13, title: '13' },
        { value: 50, title: '50' },
        { value: 100, title: '100' },
        { value: -1, title: 'All' },
      ]"
      @refreshClick="loadSubscribers">
      <template v-slot:pre-header-commands>
        <v-btn prepend-icon="fas fa-plus">ADD</v-btn>
        <v-btn prepend-icon="fas fa-history" >AGRIS PLUGIN LOGS</v-btn>
      </template>
      <template v-slot:Action>
        <v-btn variant="text" density="compact" icon="md:edit" color="primary"/>
        <v-btn rounded variant="tonal" size="small" color="teal" prepend-icon="fas fa-history">Request Log</v-btn>
        <v-btn rounded variant="tonal" size="small" color="purple-lighten-2" prepend-icon="md:cancel">Retry Request(s)</v-btn>
      </template>>
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
