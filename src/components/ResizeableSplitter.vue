<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import type { ResizeableSplitterProps } from '../types/components';

const props = withDefaults(defineProps<ResizeableSplitterProps>(), {
  isFixed: true,
  showSplitter: false,
  splitterPosition: 100,
});

const parentRef = ref<HTMLElement | null>(null);
const minPosition = 10;
const maxPosition = 90;

function clampPosition(percentage: number) {
  return Math.min(maxPosition, Math.max(minPosition, percentage));
}

const position = ref(clampPosition(props.splitterPosition));

watch(() => props.splitterPosition, (nextPosition) => {
  position.value = clampPosition(nextPosition);
});

const leftPaneStyle = computed(() => {
  if (props.showSplitter) {
    return {
      width: `${position.value}%`,
    };
  } else return { width: '100%' };
});
const rightPaneStyle = computed(() => {
  if (props.showSplitter) {
    return {
      width: `${100 - position.value}%`,
    };
  } else return { display: 'none' };
});
const splitterStyle = computed(() => {
  if (props.showSplitter) {
    if (props.isFixed) {
      return {
        left: `${position.value}%`,
      };
    } else {
      return {
        left: `${position.value}%`,
        cursor: 'ew-resize',
      };
    }
  } else return { display: 'none' };
});

function getPointerPercentage(clientX: number) {
  if (!parentRef.value) return null;
  const rect = parentRef.value.getBoundingClientRect();
  if (rect.width <= 0) return null;

  const percentage = ((clientX - rect.left) / rect.width) * 100;
  return clampPosition(percentage);
}

function handleDragging(ev: MouseEvent) {
  const percentage = getPointerPercentage(ev.clientX);
  if (percentage === null) return;
  position.value = Number(percentage.toFixed(2));
}

function startDragging(ev: MouseEvent) {
  if (props.isFixed || !props.showSplitter) return;

  ev.preventDefault();
  handleDragging(ev);
  document.body.style.userSelect = 'none';

  document.addEventListener('mousemove', handleDragging);
  document.addEventListener('mouseup', endDragging);
}

function endDragging() {
  document.removeEventListener('mousemove', handleDragging);
  document.removeEventListener('mouseup', endDragging);
  document.body.style.userSelect = '';
}

onBeforeUnmount(endDragging);
</script>

<template>
  <div ref="parentRef" class="rs-parent-box">
    <div class="rs-border" :style="leftPaneStyle">
      <slot name="left-panel" />
    </div>
    <div class="rs-splitter-base" :style="splitterStyle" @mousedown="startDragging" />
    <div class="rs-border" :style="rightPaneStyle">
      <slot name="right-panel" />
    </div>
  </div>
</template>
