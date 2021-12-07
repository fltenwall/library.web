<template>
  <div class="view-content" @click.stop @contextmenu.prevent="onContextmenu">
    <component :is="moduleView[record.name]" v-bind="record" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { BaseSchema } from '/@/lib/interface/PointInfo';
import { defineComponent } from 'vue';
import { moduleView } from '../../../../tools/index';
import { pointStore } from '/@/store/modules/point';

export default defineComponent({
  props: {
    record: {
      type: Object as PropType<BaseSchema>,
      default: () => ({})
    }
  },
  emits: ['on-contextmenu', 'on-right-select'],
  setup(props, { emit }) {
    // 处理点击右键
    function onContextmenu(event: MouseEvent) {
      const { layerX, layerY } = event as unknown as { layerX: number; layerY: number };

      const options = { x: layerX + 5, y: layerY + 5 };
      // 非当前选中的弹出
      if (props.record.id !== pointStore.getPointidState) {
        emit('on-right-select', props.record.id);
      }

      emit('on-contextmenu', options);
    }

    return { onContextmenu, moduleView };
  }
});
</script>

<style lang="less">
.view-content {
  width: 100%;
  height: 100%;
}
</style>
