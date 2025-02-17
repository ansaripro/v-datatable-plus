import { defineConfig } from 'vite'
import vuetify from 'vite-plugin-vuetify';
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({
        autoImport: true,
        styles: 'none', // Exclude exporting vuetify styles
    }),
  ],
  css: {
    exclude: [
      'vuetify',
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "v-datatable-plus",
      fileName: "v-datatable-plus",
      formats: ["es", "cjs", "umd"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "vuetify", "vuedraggable"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        exports: "named",
        globals: {
          vue: "Vue",
          vuedraggable: "Vuedraggable",
          vuetify: "Vuetify"
        },
      },
    },
  },
})
