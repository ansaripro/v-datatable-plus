# Getting Started

> [!IMPORTANT]
> Upgrading from an older version?
> Check the [Migration Guide](/migration) first for TypeScript migration notes, `vuedraggable` removal details, and breaking-change checklist.

## Pre-Requisite / Dependencies

[Vue 3](https://vuejs.org/)<br/>
[Vuetify V3](https://vuetifyjs.com/en/)<br/>

Required Vuetify components for VDatatablePlus and VDatatableServerPlus [Vuetify Autoimport](#vuetify-autoimport)

## Notes on Latest Changes

- Column drag-and-drop is now built in.
- `vuedraggable` is no longer required.
- Public events such as `columnMenuDragChange` are still available.

## Migration Guide (from older versions)

Use this checklist when upgrading existing projects:

1. Update package:

```bash
npm install v-datatable-plus@latest
```

2. Remove unused drag dependency (if it was only used for this package):

```bash
npm uninstall vuedraggable
```

3. Keep using the same component names:

- `VDatatablePlus`
- `VDatatableServerPlus`
- `ResizeableSplitter`

4. Keep using the same public events, including:

- `columnMenuDragChange`
- `columnMenuChecked`
- `columnMenuFixed`

`columnMenuDragChange` emits drag movement details in `moved` (`element`, `oldIndex`, `newIndex`).

## Breaking Changes

- `vuedraggable` is not a dependency anymore.
- Projects that directly used `vuedraggable`-specific internals just for this package should migrate to this package's public props/events.
- Deep internal imports are not guaranteed; use package public exports from `v-datatable-plus`.

## Non-Breaking Changes

- JavaScript usage remains the same.
- TypeScript users get improved type support from package exports.

## Installation

```
npm i v-datatable-plus
```

## Global Plugin Registration
```vue
<script setup>
import 'vuetify/styles';
import 'v-datatable-plus/dist/style.css'
import { createVuetify } from 'vuetify';
import VDatatablePlusPlugin from 'v-datatable-plus';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App)

app.use(createVuetify({
    // options
}));
app.use(VDatatablePlusPlugin);

app.mount('#app');
</script>
```

## Global Component Registration
```vue
<script setup>
import 'vuetify/styles';
import 'v-datatable-plus/dist/style.css'
import { createVuetify } from 'vuetify';
import { VDatatablePlus, VDatatableServerPlus, ResizeableSplitter } from 'v-datatable-plus';
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App)

app.use(createVuetify({
    // options
}));

// Add only those component(s) which you are going to use it
app.component('VDatatablePlus', VDatatablePlus);
app.component('VDatatableServerPlus', VDatatableServerPlus);
app.component('ResizeableSplitter', ResizeableSplitter);

app.mount('#app');
</script>
```

## Local Registration
```vue
<template>
  <v-datatable-plus
    :headers="headers"
    :items="items"/>
</template>

<script setup>
import { ref } from 'vue'
import 'v-datatable-plus/dist/style.css'
import { VDatatablePlus, FilterType, FilterMode } from  'v-datatable-plus';

const headers = ref([
// ...
]);
const items = ref([
// ...
])
</script>
```

## Vuetify Autoimport
If your app uses Vuetify auto-import/tree-shaking, components inside external packages are not always detected automatically.

For this library, register the required Vuetify components explicitly in your Vuetify setup.

```js
import { createVuetify } from 'vuetify'
import {
    VDataTable,
    VDataTableServer,
    VToolbar,
    VToolbarTitle,
    VSelect,
    VList,
    VListItem,
    VListItemAction,
    VMenu,
    VBtn,
    VCard,
    VIcon,
    VCheckboxBtn,
    VPagination,
    VSpacer,
    VTextField,
} from 'vuetify/components';

export default createVuetify({
    components: {
        VDataTable,
        VDataTableServer,
        VToolbar,
        VToolbarTitle,
        VSelect,
        VList,
        VListItem,
        VListItemAction,
        VMenu,
        VBtn,
        VCard,
        VIcon,
        VCheckboxBtn,
        VPagination,
        VSpacer,
        VTextField,
    },
})
```

You can register only the subset used by your app and selected `v-datatable-plus` components.

::: code-group
```vue [App.vue]
<template>
  <div id="app"/>
</template>

<script setup>
import { VDataTable } from 'vuetify/components';
</script>
```
:::


## FilterType
::: raw
<v-table>
    <thead>
        <tr>
            <th>Types</th>
            <th>String Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>IsEqualTo</td>
            <td>'eq'</td>
        </tr>
        <tr>
            <td>IsNotEqualTo</td>
            <td>'neq'</td>
        </tr>
        <tr>
            <td>StartWith</td>
            <td>'starts'</td>
        </tr>
        <tr>
            <td>Contains</td>
            <td>'contains'</td>
        </tr>
        <tr>
            <td>NotContains</td>
            <td>'notcontains'</td>
        </tr>
        <tr>
            <td>EndWith</td>
            <td>'ends'</td>
        </tr>
    </tbody>
</v-table>
:::

## FilterMode
::: raw
<v-table>
    <thead>
        <tr>
            <th>Modes</th>
            <th>String Value</th>
            <th>Detail</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Selection</td>
            <td>'selection'</td>
            <td>Set when you need dropdown filter and set filter properties against headers props</td>
        </tr>
        <tr>
            <td>Types</td>
            <td>'types'</td>
            <td></td>
        </tr>
    </tbody>
</v-table>
:::