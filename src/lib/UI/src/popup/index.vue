<template>
  <div v-click-away="hanldeClickDragAway" class="popup-wrap">
    <div ref="container" @click="openOverlay">
      <slot />
    </div>

    <teleport to="body">
      <transition name="drop">
        <div v-show="visible" ref="popper" class="popup-overlay" @click.stop>
          <slot name="overlay" />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue';
import Popper from './popper';
import propsOptions from './props';

const container = ref<HTMLElement | null>(null);

const popper = ref<HTMLElement | null>(null);

const props = defineProps(propsOptions);

const emits = defineEmits(['update:visible']);

const visible = computed({
  set: (val) => emits('update:visible', val),
  get: () => props.visible
});

let popperJS: Popper;

onMounted(() => updatePopper());

onBeforeUnmount(() => popperJS.destroy());

watch(
  () => visible.value,
  (val) => val && updatePopper()
);

function openOverlay() {
  visible.value = !visible.value;
}

function updatePopper() {
  if (popperJS) {
    popperJS.update();
  } else {
    popperJS = new Popper(container, popper);
  }
}

// 点击以外的地方
function hanldeClickDragAway() {
  visible.value && (visible.value = false);
}
</script>

<style lang="less">
.popup-overlay {
  z-index: 1000;
  margin: 10px 0 0;
}
</style>
