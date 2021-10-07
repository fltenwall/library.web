<template>
  <a-select
    placeholder="搜索"
    :show-search="true"
    :show-arrow="false"
    :filter-option="handleFilterSelect"
    @select="onSelect"
    @blur="onBlur"
  >
    <a-select-option
      v-for="item in flatMenus"
      :key="item.name"
      :value="item.name"
      :title="item.meta.title"
    >
      {{ item.meta.title }}
    </a-select-option>
  </a-select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getFilterIconFlatMenus } from '/@/utils/helper/menu';
import PinYin from 'pinyin';

export default defineComponent({
  emits: ['on-select', 'on-blur'],
  setup(_props, { emit }) {
    const flatMenus = getFilterIconFlatMenus();

    const onSelect = (value: string) => emit('on-select', value);

    const onBlur = () => emit('on-blur');

    // 拼音
    const pinyin = (text: string): string => {
      return PinYin(text, { style: PinYin.STYLE_NORMAL }).flat().join('');
    };

    // 是否根据输入项进行筛选
    function handleFilterSelect(inputValue: string, option: { title: string }) {
      const value = pinyin(inputValue);
      const target = pinyin(option.title);
      return new RegExp(value).test(target);
    }

    return { flatMenus, handleFilterSelect, onSelect, onBlur };
  }
});
</script>
