<script setup>
import { ref } from 'vue'
import { FilterType } from '../../dist/v-datatable-plus'

const headers = ref([
  {
    isShow: true,
    title: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    key: 'name',
    filterType: FilterType.Contains,
    groupable: true
  },
  { 
    isShow: true,
    title: 'Calories',
    key: 'calories',
    filterType: FilterType.Contains,
  },
  {
    isShow: true,
    title: 'Fat (g)',
    key: 'fat',
    filterType: FilterType.Contains,
  },
  { 
    isShow: true,
    title: 'Carbs (g)',
    key: 'carbs',
    filterType: FilterType.Contains,
  },
  {
    isShow: true,
    title: 'Protein (g)',
    key: 'protein',
    filterType: FilterType.Contains,
  },
  {
    isShow: true,
    title: 'Iron (%)',
    key: 'iron',
    filterType: FilterType.Contains,
  },
])
const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
      iron: '1',
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0,
      carbs: 94,
      protein: 0,
      iron: '0',
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26,
      carbs: 65,
      protein: 7,
      iron: '6',
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16,
      carbs: 23,
      protein: 6,
      iron: '7',
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16,
      carbs: 49,
      protein: 3.9,
      iron: '16',
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
      iron: '1',
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2',
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8',
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45',
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25,
      carbs: 51,
      protein: 4.9,
      iron: '22',
    },
  ]

const serverItems = ref([]);
const totalItems = ref(0)
const loading = ref(true)
function loadItems ({ page, itemsPerPage, sortBy }) {
  loading.value = true;
  const filters = headers.value
    .filter(x => x.filterValue?.length > 0)
    .map(x => ({ key: x.key, filterType: x.filterType, filterValue: x.filterValue }));

  FakeAPI.fetch({ page, itemsPerPage, sortBy, filters }).then(({ items, total }) => {
    serverItems.value = items
    totalItems.value = total
    loading.value = false
  })
}
function matchFilter(type, value, searchVal) {
    let flag = true;
    if (!searchVal) return flag;

    switch (type) {
        case FilterType.IsEqualTo:
            flag = value === searchVal
                || (value
                    && String(value).toLowerCase() === String(searchVal).toLowerCase());
            break;
        case FilterType.IsNotEqualTo:
            flag = value !== searchVal
                || (value
                    && String(value).toLowerCase() !== String(searchVal).toLowerCase());
            break;
        case FilterType.StartWith:
            flag = value
                && String(value)
                    .toLowerCase()
                    .startsWith(String(searchVal).toLowerCase());
            break;
        case FilterType.EndWith:
            flag = value
                && String(value)
                    .toLowerCase()
                    .endsWith(String(searchVal).toLowerCase());
            break;
        case FilterType.NotContains:
            flag = value
                && !String(value)
                    .toLowerCase()
                    .includes(String(searchVal).toLowerCase());
            break;
        case FilterType.Contains:
        default:
            flag = value
                && String(value)
                    .toLowerCase()
                    .includes(String(searchVal).toLowerCase());
            break;
    }
    return flag;
}
const FakeAPI = {
  async fetch ({ page, itemsPerPage, sortBy, filters }) {
    console.log(filters);
    return new Promise(resolve => {
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage
        const end = start + itemsPerPage
        const items = desserts.filter(item => {
          let flag = true;
          filters.forEach(filter => {
            if (flag) flag = matchFilter(filter.filterType, item[filter.key], filter.filterValue);
            else return;
          })
          return flag;
        });

        if (sortBy.length) {
          const sortKey = sortBy[0].key
          const sortOrder = sortBy[0].order
          items.sort((a, b) => {
            const aValue = a[sortKey]
            const bValue = b[sortKey]
            return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
          })
        }
        const paginated = items.slice(start, end)
        resolve({ items: paginated, total: items.length })
      }, 500)
    })
  },
}
</script>

<template>
  <v-datatable-server-plus hide-refresh-button
      title="Title"
      color="primary"
      drag-menu-icon="list"
      drag-item-icon="drag_indicator"
      group-by-icon="category"
      group-sort-asc-icon="file_upload"
      group-sort-desc-icon="file_download"
      remove-search-icon="zoom_out"
      print-icon="print"
      filter-icon="filter_alt"
      :items-length="totalItems"
      :loading="loading"
      :items="serverItems"
      v-model:headers="headers"
      @update:options="loadItems"/>
</template>
