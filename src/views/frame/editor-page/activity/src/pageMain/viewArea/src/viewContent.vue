<template>
  <div class="view-content" @click.stop @contextmenu.prevent="onContextmenu">
    <component :is="moduleView[record.name]" v-bind="record" />
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { BaseSchema } from '/@/lib/interface/Activity';
import { defineComponent } from 'vue';
import { moduleView } from '../../../../tools/index';
import { pointStore } from '/@/store/modules/activity';

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
      const { clientX, clientY } = event as unknown as { clientX: number; clientY: number };

      const options = { x: clientX + 5, y: clientY + 5 };
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
  overflow: hidden;

  img {
    pointer-events: none;
  }
}
</style>
