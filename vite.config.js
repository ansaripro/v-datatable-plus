import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    exclude: [
      'vuetify',
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "VuetifyDataTablePlus",
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
        globals: {
          vue: "Vue",
          vuedraggable: "Vuedraggable",
          vuetify: "Vuetify"
        },
      },
    },
  },
})
