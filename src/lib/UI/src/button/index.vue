<template>
  <button class="ui-button" :class="classes">
    <slot />
  </button>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
export default defineComponent({
  props: {
    type: {
      type: String as PropType<string>,
      default: 'default',
      validator: (v: string): boolean => {
        return ['default', 'primary'].includes(v);
      }
    }
  },
  setup(props) {
    const classes = computed(() => {
      return [`ui-button-${props.type}`];
    });
    return { classes };
  }
});
</script>

<style lang="less">
@color: #333;
@radius: 2px;
@border-color: #d9d9d9;
@h: 30px;
@fontSize: 12px;

.ui-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: @h;
  padding: 0 12px;
  font-size: @fontSize;
  color: @color;
  cursor: pointer;
  border: 1px solid @border-color;
  border-radius: @radius;
  outline: none;

  &.ui-button-primary {
    color: #fff;
    background: @primary-color;
    border-color: transparent;

    &:hover {
      background: @primary-hover-color;
    }
  }

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3), 0 1px 3px 1px rgba(66, 133, 244, 0.15);
  }
}
</style>
