<template>
    <resizeable-splitter :show-splitter="true" :is-fixed="false" :splitter-position="20">
        <template #left-panel>
            <v-sheet color="primary" height="400px"/>
        </template>
        <template #right-panel>
            <v-sheet color="secondary" height="400px"/>
        </template>
    </resizeable-splitter>
</template>