<script setup>
import { ref } from 'vue';

// Props
const propsSearch = ref(null);
const propsHeaders = ref([
    { title: 'Name', key: 'name' },
    { title: 'Type', key: 'type' },
    { title: 'Default', key: 'default' },
]);
const propsItems = ref([
    {
        name: 'show-splitter',
        type: 'boolean',
        default: false,
        detail: 'Show splitter between panel for drag.'
    },
    {
        name: 'is-fixed',
        type: 'boolean',
        default: false,
        detail: 'Set true if you want splitter moveable'
    },
    {
        name: 'splitter-position',
        type: 'number',
        default: '100',
        detail: 'Set splitter position in number which will be use as percertage i.e. 20 means 20% from the left.'
    },
]);

// Slots
const slotsSearch = ref(null);
const slotsHeaders = ref([
    { title: 'Name', key: 'name' },
]);
const slotsItems = ref([
    {
        name: 'right-panel',
        detail: 'Right panel slot'
    },
    {
        name: 'left-panel',
        detail: 'Left panel slot'
    },
]);
</script>

# ResizeableSplitter API

## Component
[ResizeableSplitter](/componentdocs/resizeablesplitter)

## Props
::: raw
<client-only>
    <v-data-table hide-default-footer
        :items-per-page="-1"
        :items-per-page-options="-1"
        :search="propsSearch"
        :headers="propsHeaders"
        :items="propsItems">
        <template #body.prepend>
            <tr>
                <td colspan="3" class="bg-grey-lighten-3">
                    <v-text-field hide-details 
                        variant="flat"
                        prepend-inner-icon="search"
                        placeholder="Search"
                        v-model="propsSearch"/>
                </td>
            </tr>
        </template>
        <template #item="{item}">
            <tr rowspan="2">
                <td class="font-weight-bold text-blue">{{item.name}}</td>
                <td class="text-green" v-html="item.type"/>
                <td>
                    <span v-if="item.default === true || item.default === false" class="text-purple">{{item.default}}</span>
                    <span v-else-if="item.default === 'null' || item.default === 'undefined'" class="text-blue">{{item.default}}</span>
                    <span v-else class="text-green">{{item.default}}</span>
                </td>
            </tr>
            <tr>
                <td colspan="3">{{item.detail}}</td>
            </tr>
        </template>
    </v-data-table>
</client-only>
:::

## Slots
::: raw
<client-only>
    <v-data-table hide-default-footer
        :items-per-page="-1"
        :items-per-page-options="-1"
        :search="slotsSearch"
        :headers="slotsHeaders"
        :items="slotsItems">
        <template #body.prepend>
            <tr>
                <td colspan="3" class="bg-grey-lighten-3">
                    <v-text-field hide-details 
                        variant="flat"
                        prepend-inner-icon="search"
                        placeholder="Search"
                        v-model="eventsSearch"/>
                </td>
            </tr>
        </template>
        <template #item="{item}">
            <tr rowspan="2">
                <td class="font-weight-bold text-blue">{{item.name}}</td>
            </tr>
            <tr>
                <td>{{item.detail}}</td>
            </tr>
        </template>
    </v-data-table>
</client-only>
:::