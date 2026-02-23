<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  searchPlaceholder: {
    type: String,
    default: 'Search',
  },
})

const query = ref('')
const field = ref('all')

const searchableColumns = computed(() => {
  return (props.columns || []).filter((column) => column.searchable !== false)
})

const filteredRows = computed(() => {
  const text = query.value.trim().toLowerCase()
  if (!text) return props.rows

  const filterKeys = field.value === 'all'
    ? searchableColumns.value.map((column) => column.key)
    : [field.value]

  return props.rows.filter((row) => {
    return filterKeys.some((key) => {
      const value = row?.[key]
      if (value === null || value === undefined) return false
      return String(value).toLowerCase().includes(text)
    })
  })
})

function getColumnLabel(key) {
  const match = props.columns.find((column) => column.key === key)
  return match?.label || key
}
</script>

<template>
  <div class="api-table">
    <div class="api-toolbar">
      <input
        v-model="query"
        class="api-input"
        type="text"
        :placeholder="searchPlaceholder"
      >
      <select v-model="field" class="api-select">
        <option value="all">All Fields</option>
        <option
          v-for="column in searchableColumns"
          :key="column.key"
          :value="column.key"
        >
          {{ getColumnLabel(column.key) }}
        </option>
      </select>
    </div>

    <div class="api-table-wrap">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredRows.length === 0">
            <td :colspan="columns.length" class="api-empty">No results found.</td>
          </tr>
          <tr v-for="(row, index) in filteredRows" :key="`${row.name || row.key || 'row'}-${index}`">
            <td v-for="column in columns" :key="column.key">
              <template v-if="column.html" v-html="row[column.key]" />
              <code v-else-if="column.code">{{ row[column.key] }}</code>
              <template v-else>{{ row[column.key] }}</template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.api-table {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}

.api-toolbar {
  display: flex;
  gap: 8px;
  padding: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.api-input,
.api-select {
  height: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 0 10px;
}

.api-input {
  flex: 1;
  min-width: 180px;
}

.api-select {
  min-width: 140px;
}

.api-table-wrap {
  overflow-x: auto;
}

.api-empty {
  text-align: center;
  color: var(--vp-c-text-2);
}

code {
  white-space: pre-wrap;
}
</style>
