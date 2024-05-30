# Getting Started

## Pre-Requisite / Dependencies

[Vue 3](https://vuejs.org/)<br/>
[Vuetify V3](https://vuetifyjs.com/en/) version 3.6.7 or latest<br/>
[Vuedraggable](https://github.com/SortableJS/vue.draggable.next) version 4.1.0 or latest (vuedraggable@next)<br/>

Required Vuetify components for VDatatablePlus and VDatatableServerPlus
```js
import {
    VDataTable,
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
```

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