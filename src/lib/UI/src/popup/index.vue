<template>
  <div class="popup-wrap">
    <div ref="container" @click="openOverlay">
      <slot />
    </div>

    <transition name="drop">
      <div v-show="visible" class="popup-overlay">
        <slot name="overlay" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const container = ref<HTMLElement>();

const visible = ref<boolean>(false);

function openOverlay() {
  visible.value = !visible.value;
}
</script>

<style lang="less">
.popup-overlay {
  position: fixed;
  right: 16px;
  z-index: 1000;
  margin: 10px 0 0;
}

.drop-enter-active,
.drop-leave-active {
  transition: all 0.3s ease-in-out;
}

.drop-enter,
.drop-leave-to {
  opacity: 0;
  transform: scale(1, 0);
}
</style>
