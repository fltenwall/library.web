<template>
  <div class="form-wrap" :style="wrapStyle">
    <!-- 表单 -->
    <div
      v-for="(item, index) in point.list"
      :key="index"
      :style="widgetStyle"
      :class="`widget-row widget-${point.layout}`"
    >
      <div v-if="item.label" class="widget-row-label" :style="labelStyle">{{ item.label }}</div>
      <div class="widget-row-content" :style="entryStyle">
        <input v-if="item.type === 'input'" :placeholder="item.placeholder" />
      </div>
    </div>
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
    borderRadius: point.borderRadius.replace(/(\d+)/g, '$1px')
  })
);

const widgetStyle = computed(
  (): CSSProperties => ({
    width: `calc(${100 / point.showCol}% - ${point.widgetMarginLeft}px)`,
    height: `${point.widgetHeight}px`,
    marginTop: `${point.widgetMarginTop}px`,
    marginLeft: `${point.widgetMarginLeft}px`,
    borderRadius: point.widgetRadius.replace(/(\d+)/g, '$1px'),
    backgroundColor: point.widgetbgColor,
    borderColor: point.widgetBorderColor,
    borderWidth: point.widgetBorderWidth.replace(/(\d+)/g, '$1px')
  })
);

const labelStyle = computed(
  (): CSSProperties => ({
    width: `${point.labelWidth}px`,
    marginRight: `${point.labelMarginRight}px`,
    marginBottom: `${point.labelMarginBottom}px`,
    marginLeft: `${point.labelMarginLeft}px`,
    color: point.labelColor,
    fontSize: `${point.labelSize}px`,
    fontWeight: point.labelWeight * 100,
    textAlign: point.labelAlign,
    backgroundColor: point.widgetbgColor
  })
);

const entryStyle = computed(
  (): CSSProperties => ({
    paddingRight: `${point.entryPaddingRight}px`,
    paddingLeft: `${point.entryPaddingLeft}px`,
    marginRight: `${point.entryMarginRight}px`,
    marginLeft: `${point.entryMarginLeft}px`,
    color: point.entryColor,
    fontSize: `${point.entrySize}px`,
    backgroundColor: point.widgetbgColor,
    borderRadius: point.entryRadius.replace(/(\d+)/g, '$1px'),
    borderColor: point.entryBorderColor,
    borderWidth: point.entryBorderWidth.replace(/(\d+)/g, '$1px')
  })
);
</script>

<style lang="less" scoped>
.form {
  &-wrap {
    width: 100%;
    height: 100%;

    input {
      width: 100%;
      height: 100%;
      outline: none;
    }
  }
}

.widget {
  &-row {
    display: inline-flex;
    overflow: hidden;

    &-content {
      flex: 1;
      overflow: hidden;
    }
  }

  &-horizontal {
    flex-direction: row;
    align-items: center;

    .widget-row-content {
      height: 100%;
    }
  }

  &-vertical {
    flex-direction: column;
  }
}
</style>
