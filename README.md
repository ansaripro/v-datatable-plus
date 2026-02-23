## Vuetify Datatable Plus
<p align="center">
  <a href="https://www.npmjs.com/package/v-datatable-plus">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/v-datatable-plus">
  </a>
  <a href="https://www.npmjs.com/package/v-datatable-plus">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/v-datatable-plus">
  </a>
  <br>
  <a href="https://github.com/ansaripro/v-datatable-plus/blob/main/LICENSE.md">
    <img alt="GitHub License" src="https://img.shields.io/github/license/ansaripro/v-datatable-plus">
  </a>
  <a href="https://www.npmjs.com/package/v-datatable-plus">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/v-datatable-plus">
  </a>
</p>

`v-datatable-plus` provides enhanced wrappers around Vuetify `VDataTable` and `VDataTableServer`.

### Highlights

- Header row filtering with typed filter modes (`FilterType`, `FilterMode`)
- Column menu for show/hide, freeze/unfreeze, and reorder
- Native column drag-and-drop (no external drag dependency)
- Optional right panel layout with `ResizeableSplitter`
- Works in both JavaScript and TypeScript projects

### Requirements

- Vue 3
- Vuetify 3

## TypeScript and JavaScript support

This package supports both JavaScript and TypeScript projects.

- JavaScript projects can use the package exactly as before.
- TypeScript projects get declaration files from the package build output.
- Typed constants are exported: `FilterType` and `FilterMode`.

## Installation

```bash
npm install v-datatable-plus
```

## Latest Changes

- Column drag is now built in.
- `vuedraggable` is no longer a dependency.
- `columnMenuDragChange` remains available and emits a `moved` payload with `element`, `oldIndex`, and `newIndex`.

## Migration

- Repository migration guide: [MIGRATION.md](MIGRATION.md)
- Documentation migration page: [Migration](https://ansaripro.github.io/v-datatable-plus/migration)

## Vuetify auto-import note

If your app uses Vuetify auto-import/tree-shaking, components used inside external packages are not always detected automatically.

Register the required Vuetify components in your `createVuetify` setup (for example: `VDataTable`, `VDataTableServer`, `VToolbar`, `VMenu`, `VList`, `VBtn`, `VCard`, `VIcon`, `VCheckboxBtn`, `VSelect`, `VPagination`, `VSpacer`, `VTextField`).

Detailed setup examples are available in [documentation/getting-started.md](documentation/getting-started.md).

## JavaScript usage

```js
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import 'v-datatable-plus/dist/v-datatable-plus.css';
import VDatatablePlusPlugin from 'v-datatable-plus';

import App from './App.vue';

const app = createApp(App);
app.use(createVuetify());
app.use(VDatatablePlusPlugin);
app.mount('#app');
```

## TypeScript usage

```ts
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import 'v-datatable-plus/dist/v-datatable-plus.css';
import VDatatablePlusPlugin, { FilterMode, FilterType } from 'v-datatable-plus';

import App from './App.vue';

const app = createApp(App);
app.use(createVuetify());
app.use(VDatatablePlusPlugin);
app.mount('#app');

const filterType: (typeof FilterType)[keyof typeof FilterType] = FilterType.Contains;
const filterMode: (typeof FilterMode)[keyof typeof FilterMode] = FilterMode.Types;
```

## Public type imports (TypeScript)

```ts
import type {
  DataTableHeader,
  GroupByItem,
  ItemsPerPageOption,
  RowItem,
  RowClickEventPayload,
  ColumnMenuEventPayload,
  SelectedRowValue,
} from 'v-datatable-plus';

const headers: DataTableHeader[] = [
  { key: 'name', title: 'Name', isShow: true, sortable: true },
  { key: 'age', title: 'Age', isShow: true, sortable: true, align: 'end' },
];

const rows: RowItem[] = [
  { id: 1, name: 'Alice', age: 32 },
  { id: 2, name: 'Bob', age: 28 },
];

const groupBy: GroupByItem[] = [{ key: 'name', order: 'asc' }];
const itemsPerPageOptions: ItemsPerPageOption[] = [{ value: 10, title: '10' }];

let selectedRow: SelectedRowValue = null;

function onRowClick(payload: RowClickEventPayload) {
  selectedRow = payload.param?.item ?? null;
}

function onColumnMenuFixed(payload: ColumnMenuEventPayload) {
  console.log(payload.element.key, payload.$event);
}
```

## Typed wrapper component example

```vue
<script setup lang="ts">
import {
  VDatatablePlus,
  type VDatatablePlusProps,
  type VDatatablePlusEmits,
  type RowClickEventPayload,
} from 'v-datatable-plus';

const props = defineProps<VDatatablePlusProps>();
const emit = defineEmits<VDatatablePlusEmits>();

function onClickRow(payload: RowClickEventPayload) {
  emit('click:row', payload);
}
</script>

<template>
  <VDatatablePlus
    v-bind="props"
    @click:row="onClickRow"
    @update:model-value="emit('update:modelValue', $event)"
    @update:page="emit('update:page', $event)"
  />
</template>
```

## Typed server wrapper example

```vue
<script setup lang="ts">
import {
  VDatatableServerPlus,
  type VDatatableServerPlusProps,
  type VDatatableServerPlusEmits,
  type RowClickEventPayload,
} from 'v-datatable-plus';

const props = defineProps<VDatatableServerPlusProps>();
const emit = defineEmits<VDatatableServerPlusEmits>();

function onClickRow(payload: RowClickEventPayload) {
  emit('click:row', payload);
}
</script>

<template>
  <VDatatableServerPlus
    v-bind="props"
    @click:row="onClickRow"
    @update:model-value="emit('update:modelValue', $event)"
    @update:page="emit('update:page', $event)"
    @update:items-per-page="emit('update:itemsPerPage', $event)"
  />
</template>
```

## [Documentation](https://ansaripro.github.io/v-datatable-plus/)

## License

Copyright (c) 2024 AnsariPro  
Licensed under the [MIT license](https://github.com/ansaripro/v-datatable-plus/blob/main/LICENSE.md).


## Legal

Vuetify and the Vuetify logo are trademarks of Vuetify. This component was not created or endorsed by Vuetify.

