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

const emit = defineEmits(['update:visible', 'clickDragAway']);

defineExpose({ props });

let startClick: MouseEvent;

const visible = computed({
  set: (val) => emit('update:visible', val),
  get: () => props.visible
});

let popperJS: Popper;

onMounted(() => {
  updatePopper();

  document.addEventListener('mouseup', handleMuseUp);

  document.addEventListener('mousedown', handleMuseDown);
});

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', handleMuseUp);

  document.removeEventListener('mousedown', handleMuseDown);

  popperJS && popperJS.destroy();
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
function handleMuseUp(e: MouseEvent) {
  const upTarget = e.target as Node;
  const downTarget = startClick.target as Node;

  const isContainedByPopper = popper.value?.contains(upTarget) || popper.value?.contains(downTarget);

  // 内部点击
  if (isContainedByPopper || container.value?.contains(upTarget)) return;

  visible.value && emit('clickDragAway');

  visible.value && (visible.value = false);
}

// 处理鼠标按下
function handleMuseDown(e: MouseEvent) {
  startClick = e;
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
