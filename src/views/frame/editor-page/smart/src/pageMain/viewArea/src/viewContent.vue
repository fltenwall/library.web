<template>
  <div class="view-content" @contextmenu.prevent.stop="onContextmenu">
    <component :is="`${name}-point`" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { pointList } from '../../../../tools/index';
import { pointStore } from '/@/store/modules/point';

export default defineComponent({
  components: { ...pointList },
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  emits: ['on-contextmenu', 'on-right-select'],
  setup(_props, { attrs, emit }) {
    // 处理点击右键
    function onContextmenu(event: MouseEvent) {
      const { layerX, layerY } = event as unknown as { layerX: number; layerY: number };

      const options = { x: layerX + 5, y: layerY + 5 };

      // 非当前选中的弹出
      if (attrs.uuid !== pointStore.getPointUUIDState) {
        emit('on-right-select', attrs.uuid);
      }

      emit('on-contextmenu', options);
    }

    return { onContextmenu };
  }
});
</script>

<style lang="less">
.view-content {
  width: 100%;
  height: 100%;
}
</style>
