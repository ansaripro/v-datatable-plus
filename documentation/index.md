# Introduction

`v-datatable-plus` provides enhanced wrappers for Vuetify `VDataTable` and `VDataTableServer`.

### Highlights

- Header row filtering (type/selection filter modes)
- Column show/hide and freeze/unfreeze controls
- Native column drag-and-drop reordering (no external drag library)
- Right panel layout with `ResizeableSplitter`
- Compatible with both JavaScript and TypeScript projects

### Dependencies

- Vue 3
- Vuetify 3

No extra dependency is required for column drag behavior.

### Migration Notes (TypeScript + Native Drag)

- Internal source is now TypeScript-based.
- `vuedraggable` has been removed and replaced with native drag-and-drop.
- Component names and primary events remain the same (`VDatatablePlus`, `VDatatableServerPlus`).

### Breaking Changes

- If your project explicitly installed `vuedraggable` only for this package, it is no longer required.
- If your project depended on `vuedraggable` internals (for example, importing or typing against `vuedraggable`-specific structures directly from your own code), update that code to rely on this package events/props instead.
- If you used non-public deep imports from this package internals, switch to public exports from `v-datatable-plus`.

For step-by-step upgrade instructions, see [Getting Started](/getting-started).


## License

Copyright (c) 2024 AnsariPro  
Licensed under the [MIT license](https://github.com/ansaripro/v-datatable-plus/blob/main/LICENSE.md).


## Legal

Vuetify and the Vuetify logo are trademarks of Vuetify. This component was not created or endorsed by Vuetify.