# Migration Guide

This guide helps you upgrade to the latest `v-datatable-plus` release after the TypeScript migration and removal of `vuedraggable`.

## Summary

- Internal source moved to TypeScript.
- Column drag-and-drop is now native.
- `vuedraggable` is no longer required.
- Public component names and core events remain compatible.

## Upgrade Steps

1. Update package:

```bash
npm install v-datatable-plus@latest
```

2. Remove `vuedraggable` if it was only used for this package:

```bash
npm uninstall vuedraggable
```

3. Keep using existing components:

- `VDatatablePlus`
- `VDatatableServerPlus`
- `ResizeableSplitter`

4. Keep using existing events:

- `columnMenuDragChange`
- `columnMenuChecked`
- `columnMenuFixed`

`columnMenuDragChange` includes movement details in:

- `moved.element`
- `moved.oldIndex`
- `moved.newIndex`

## Breaking Changes

- `vuedraggable` is removed from dependencies.
- If your app relied on `vuedraggable` internals just for this package, migrate to this package public API.
- Deep/internal imports are not guaranteed; use public exports from `v-datatable-plus`.

## Non-Breaking Changes

- JavaScript usage remains the same.
- TypeScript support is improved through package exports.
- Main component names remain the same.

## Vuetify Auto-Import Reminder

If your app uses Vuetify auto-import/tree-shaking, register required Vuetify components explicitly in `createVuetify` because external package usage is not always auto-detected.

See documentation page for full details:

- https://ansaripro.github.io/v-datatable-plus/getting-started
