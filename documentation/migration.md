# Migration Guide

This page helps you upgrade to the latest `v-datatable-plus` version after the TypeScript migration and native drag implementation.

## What changed

- Internal source moved to TypeScript.
- Column drag-and-drop now uses native drag events.
- `vuedraggable` has been removed.

## Upgrade checklist

1. Update package:

```bash
npm install v-datatable-plus@latest
```

2. Remove `vuedraggable` if no longer used elsewhere:

```bash
npm uninstall vuedraggable
```

3. Keep the same component names:

- `VDatatablePlus`
- `VDatatableServerPlus`
- `ResizeableSplitter`

4. Keep using the same events:

- `columnMenuDragChange`
- `columnMenuChecked`
- `columnMenuFixed`

`columnMenuDragChange` payload includes drag movement in `moved`:

- `element`
- `oldIndex`
- `newIndex`

## Breaking changes

- `vuedraggable` dependency removed.
- Any app code using `vuedraggable` internals specifically for this package should migrate to this package public API.
- Deep/internal imports are not guaranteed.

## Non-breaking changes

- JavaScript usage remains the same.
- TypeScript users get improved type exports.
- Existing component names remain unchanged.

## Vuetify auto-import

If your app uses Vuetify auto-import/tree-shaking, explicitly register required Vuetify components in `createVuetify`.

See [Getting Started](/getting-started) for the full setup example.
