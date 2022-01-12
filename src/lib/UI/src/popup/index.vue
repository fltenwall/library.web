<template>
  <div class="popup-wrap">
    <div ref="container" @click="openOverlay">
      <slot />
    </div>

    <teleport to="body">
      <transition name="drop">
        <div v-show="visible" ref="popper" class="popup-overlay">
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

const container = ref<HTMLNULL>(null);

const popper = ref<HTMLNULL>(null);

const props = defineProps(propsOptions);

const emits = defineEmits(['update:visible']);

defineExpose({ props });

const visible = computed({
  set: (val) => emits('update:visible', val),
  get: () => props.visible
});

let popperJS: Popper;

onMounted(() => {
  updatePopper();
  document.addEventListener('mouseup', hanldeClickDragAway);
});

onBeforeUnmount(() => {
  document.addEventListener('mouseup', hanldeClickDragAway);
});

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
function hanldeClickDragAway(e: MouseEvent) {
  const target = e.target as Node;
  // 内部点击
  if (popper.value?.contains(target) || container.value?.contains(target)) return;

  visible.value && (visible.value = false);
}
</script>

<style lang="less">
.popup-wrap {
  display: inline-block;
}

.popup-overlay {
  z-index: 1000;
  margin: 10px 0 0;
}
</style>
