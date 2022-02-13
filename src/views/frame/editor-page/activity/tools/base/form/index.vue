<template>
  <div class="form-wrap" :style="wrapStyle">
    <div :style="titleStyle">{{ point.title }}</div>
    <!-- 表单 -->
    <div
      v-for="(item, index) in point.list"
      :key="index"
      :style="widgetStyle"
      :class="`widget-row widget-${point.layout}`"
    >
      <div v-if="item.label" :style="labelStyle">{{ item.label }}</div>
      <input v-if="item.type === 'input'" :style="entryStyle" :placeholder="item.placeholder" />
    </div>

    <!-- 按钮 -->
    <div class="index-center-middle" :style="buttonStyle">{{ point.buttonText }}</div>
  </div>
</template>

<!-- 默认配置项 -->
<script lang="ts">
export default defineComponent({
  inheritAttrs: false
});
</script>

<!-- setup 执行项 -->
<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { Schema } from './schema';

const attrs = useAttrs();

const point = reactive<Schema>(attrs as unknown as Schema);

const wrapStyle = computed(
  (): CSSProperties => ({
    paddingTop: `${point.paddingTop}px`,
    paddingLeft: `${point.paddingLeft}px`,
    paddingRight: `${point.paddingRight}px`,
    backgroundColor: point.bgColor,
    borderRadius: point.borderRadius
  })
);
const titleStyle = computed(
  (): CSSProperties => ({
    color: point.titleColor,
    fontSize: `${point.titleSize}px`,
    fontWeight: point.titleWeight * 100,
    textAlign: point.titleAlign,
    paddingBottom: `${point.titlePaddingBottom}px`
  })
);

const buttonStyle = computed(
  (): CSSProperties => ({
    height: `${point.buttonHeight}px`,
    marginTop: `${point.buttonMarginTop}px`,
    marginRight: `${point.buttonMarginRight}px`,
    marginLeft: `${point.buttonMarginLeft}px`,
    color: point.buttonColor,
    fontSize: `${point.buttonSize}px`,
    fontWeight: point.buttonWeight * 100,
    borderRadius: point.buttonRadius,
    backgroundColor: point.buttonBgColor
  })
);

const widgetStyle = computed(
  (): CSSProperties => ({
    height: `${point.widgetHeight}px`,
    marginTop: `${point.widgetMarginTop}px`,
    borderRadius: point.widgetRadius,
    backgroundColor: point.widgetbgColor,
    borderColor: point.widgetBorderColor,
    borderWidth: `${point.widgetBorderWidth}px`
  })
);

const labelStyle = computed(
  (): CSSProperties => ({
    width: `${point.labelWidth}px`,
    marginRight: `${point.labelMarginRight}px`,
    color: point.labelColor,
    fontSize: `${point.labelSize}px`,
    fontWeight: point.labelWeight * 100,
    textAlign: point.labelAlign,
    backgroundColor: point.widgetbgColor
  })
);

const entryStyle = computed(
  (): CSSProperties => ({
    marginRight: `${point.entryMarginRight}px`,
    marginLeft: `${point.entryMarginLeft}px`,
    color: point.entryColor,
    fontSize: `${point.entrySize}px`,
    backgroundColor: point.widgetbgColor
  })
);
</script>

<style lang="less" scoped>
.form {
  &-wrap {
    width: 100%;
    height: 100%;

    input {
      flex: 1;
      width: 0;
      outline: none;
    }
  }
}

.widget {
  &-row {
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  &-horizontal {
    flex-direction: row;
  }

  &-vertical {
    flex-direction: column;
  }
}
</style>
