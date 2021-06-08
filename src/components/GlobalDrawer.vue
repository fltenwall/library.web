<template>
  <div ref="wrapRef" class="global-drawer-wrap" :style="wrapStyle">
    <slot />
    <div :class="['hide-panel index-center-middle', `hide-panel-${placement}`]" @click="handleSwitchHide">
      <Icon color="#A1A6B3" class="hide-panel-icon" :icon="`ant-design:caret-${visible ? 'right' : 'left'}-outlined`" />
    </div>
  </div>
</template>

<script lang="ts">
import { CSSProperties, defineComponent, PropType, reactive, ref, watch } from 'vue'

export default defineComponent({
  props: {
    placement: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
      validator: (v: string): boolean => ['left', 'right'].includes(v)
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const wrapRef = ref<HTMLElement | null>(null)

    const wrapStyle = reactive<CSSProperties>({})

    const visible = ref<boolean>(false)

    const stateMap = { left: '-', right: '' }

    // 切换隐藏面板
    function handleSwitchHide() {
      visible.value = !visible.value
      emit('update:value', visible.value)
    }

    watch(
      () => props.value,
      (val) => {
        // 设置数据
        visible.value = val
        // 面板切换
        if (visible.value) {
          wrapStyle.transform = `translateX(${stateMap[props.placement]}100%)`
        } else {
          wrapStyle.transform = ''
        }
      },
      { immediate: true }
    )

    return { wrapRef, visible, wrapStyle, handleSwitchHide }
  }
})
</script>

<style lang="less" scoped>
.global-drawer {
  &-wrap {
    position: absolute;
    width: 100%;
    min-height: 100%;
    background: #fff;
    box-shadow: 0 2px 8px 0 #dbdbdb99;
    transition: all 0.3s;
  }
}

.hide-panel {
  position: absolute;
  top: 50%;
  z-index: 10;
  width: 18px;
  height: 88px;
  cursor: pointer;

  &:hover::before {
    background: #dadde6;
  }

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #e6e9f2;
    border-radius: 0 4px 4px 0;
    content: '';
    transform: perspective(50px) rotateY(30deg);
    transition: all 0.3s;
  }

  &-left {
    right: -18px;
    transform: translateY(-50%);
  }

  &-right {
    left: -18px;
    transform: translateY(-50%) rotate(180deg);
  }

  &-icon {
    position: absolute;
  }
}
</style>
