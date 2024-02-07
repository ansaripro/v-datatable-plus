<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  isFixed: {
    type: Boolean,
    default: true,
  },
  showSplitter: {
    type: Boolean,
    default: false,
  },
  splitterPosition: {
    type: Number,
    default: 100,
  },
});

const position = ref(100);

const leftPaneStyle = computed(() => {
  if (props.showSplitter) {
    return [{
      width: `${position.value}%`,
    }];
  } else return [{ width: '100%' }];
});
const rightPaneStyle = computed(() => {
  if (props.showSplitter) {
    return [{
      width: `${100 - position.value}%`,
    }];
  } else return [{ display: 'none' }];
});
const splitterStyle = computed(() => {
  if (props.showSplitter) {
    if (props.isFixed) {
      return [{
        left: `${position.value}%`,
      }];
    } else {
      return [{
        left: `${position.value}%`,
        cursor: 'ew-resize',
      }];
    }
  } else return [{ display: 'none' }];
});

function handleDragging(ev) {
  const percentage = (ev.pageX / window.innerWidth) * 100

  if (percentage >= 10 && percentage <= 90) {
    position.value = Number(percentage.toFixed(2));
  }
}
function startDragging() {
  if (props.isFixed) return;
  console.log('draag')
  document.addEventListener('mousemove', handleDragging);
  document.addEventListener('mouseup', endDragging);
}
function endDragging() {
  document.removeEventListener('mousemove', handleDragging);
  document.removeEventListener('mouseup', endDragging);
}
</script>

<template>
  <div class="rs-parent-box">
    <div class="rs-border" :style="leftPaneStyle">
      <slot name="left-pane" />
    </div>
    <div class="rs-splitter-base" :style="splitterStyle" @mousedown="startDragging" />
    <div class="rs-border" :style="rightPaneStyle">
      <slot name="right-pane" />
    </div>
  </div>
</template>

<style scoped>
.rs-parent-box {
  display: flex;
  position: relative;
  height: 100%;
}

.rs-border {
  border: '1px solid rgba(0,0,0,0.12)';
}

.rs-splitter-base {
  position: 'absolute';
  top: '0';
  height: '100%';
  width: '4px';
  background: 'rgba(0,0,0,0.12)';
  transform: 'translateX(-2px)';
  z-index: '1';
}
</style>