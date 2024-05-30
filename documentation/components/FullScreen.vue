<!-- docs/components/FullScreenDemo.vue -->
<template>
    <div ref="demoContainer" class="demo-container">
      <v-btn @click="toggleFullscreen">{{ fullScreenLable }}</v-btn>
      <div class="demo-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const demoContainer = ref(null);
  const fullScreenLable = ref('Enter Fullscreen');
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      demoContainer.value.requestFullscreen().then(() => {
        fullScreenLable.value = 'Exit Fullscreen';
      });
    } else {
      document.exitFullscreen().then(() => {
        fullScreenLable.value = 'Enter Fullscreen';
      });
    }
  };
  </script>
  
  <style scoped>
  .demo-container {
    position: relative;
    border: 1px solid #ccc;
    padding: 16px;
  }
  
  .demo-content {
    margin-top: 40px; /* To ensure content doesn't overlap with the button */
  }
  </style>
  