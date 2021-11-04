<template>
  <div
    v-click-away="handleBlur"
    class="ui-input-search-wrap"
    :class="{
      'query-box-foucs': queryBoxFoucs,
      'query-box-content': tipData.length && queryBoxFoucs
    }"
  >
    <div class="ui-input-search" :style="{ height: `${height}px` }" @click="handleSearchClick">
      <search-outlined v-if="prefix" class="ui-input-prefix mr-4" />
      <input
        ref="inputInstance"
        v-model="inputValue"
        type="text"
        class="ui-input"
        @focus="handleFocus"
        @keydown.enter="handleEnter"
        @input="handleInput"
        @keyup.up.prevent="handleUp"
        @keyup.down.prevent="handleDown"
      />
      <div v-if="suffix" class="ui-input-suffix">搜 索</div>
    </div>
    <div v-show="tipData.length && queryBoxFoucs" class="ui-input-box">
      <div
        v-for="(title, index) in tipData"
        :key="index"
        class="row index-middle"
        :class="{ 'row-select': selectIndex === index }"
        @click="handleBoxClick(title)"
      >
        <search-outlined />
        <span class="row-content index-hidden-newline flex-item">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, unref, watch } from 'vue';
import { debounce } from 'lodash-es';
import { rules } from '/@/utils/regExp';

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    prefix: {
      type: Boolean,
      default: true
    },
    suffix: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 44
    }
  },
  emits: ['on-enter'],
  setup(props, { emit }) {
    const { value: searchValue } = toRefs(props);

    // 输入内容
    const inputValue = ref<string>('');
    const originData = ref<string>('');
    // 按下方向键下标
    const selectIndex = ref<number>(-1);
    // 输入框焦点
    const inputInstance = ref<HTMLElement | null>(null);
    // 获取焦点显示阴影
    const queryBoxFoucs = ref<boolean>(false);
    // 处理输入
    const handleInput = debounce(fetchDataFromServer, 600);
    // 联想数据
    const tipData = ref<string[]>([]);

    // 获取焦点
    function handleFocus() {
      queryBoxFoucs.value = true;
    }
    // 失去焦点
    function handleBlur() {
      queryBoxFoucs.value = false;
    }
    // 处理搜索点击
    function handleSearchClick() {
      inputInstance.value?.focus();
    }
    // 处理按下enter
    function handleEnter() {
      inputInstance.value?.blur();
      queryBoxFoucs.value = false;
      emit('on-enter', unref(inputValue));
    }
    // 处理点击
    function handleBoxClick(title: string) {
      inputValue.value = title;
      originData.value = title;
      queryBoxFoucs.value = false;
      emit('on-enter', unref(inputValue));
    }
    // 从服务器获取数据
    async function fetchDataFromServer() {
      // try {
      // const query = queryData()
      queryData();
      //   if (!query.keyword) return
      //   const { data } = await service.fecthTipList(query)
      //   tipData.value = data
      //   selectIndex.value = -1
      //   originData.value = unref(inputValue)
      // } catch (err) {
      //   message.error(`数据获取失败: ${(err as { msg: string }).msg}`)
      // }
    }

    // 获取搜索数据
    function queryData() {
      const keyword = unref(inputValue).replace(rules.whitespace, '').substr(0, 30);
      return { keyword };
    }

    function handleUp() {
      if (!unref(tipData).length) return;
      selectIndex.value -= 1;
      if (unref(selectIndex) < -1) {
        selectIndex.value = unref(tipData).length - 1;
        inputValue.value = unref(tipData)[unref(selectIndex)];
      } else if (unref(selectIndex) === -1) {
        inputValue.value = unref(originData);
      } else {
        inputValue.value = unref(tipData)[unref(selectIndex)];
      }
    }

    function handleDown() {
      if (!unref(tipData).length) return;
      selectIndex.value += 1;
      if (unref(selectIndex) > unref(tipData).length) {
        selectIndex.value = 0;
        inputValue.value = unref(tipData)[0];
      } else if (unref(selectIndex) === unref(tipData).length) {
        inputValue.value = unref(originData);
      } else {
        inputValue.value = unref(tipData)[unref(selectIndex)];
      }
    }

    watch(
      () => searchValue.value,
      (value) => (inputValue.value = value),
      { immediate: true }
    );

    return {
      tipData,
      inputInstance,
      inputValue,
      selectIndex,
      queryBoxFoucs,
      handleUp,
      handleDown,
      handleBlur,
      handleInput,
      handleEnter,
      handleFocus,
      handleBoxClick,
      handleSearchClick
    };
  }
});
</script>

<style lang="less">
.ui-input-search-wrap {
  position: relative;
  display: inline-block;
  padding: 0;
  border-radius: 24px;
  box-shadow: 0 0 0 1px #dfe1e5;
  box-sizing: border-box;

  .ui-input-search {
    display: inline-flex;
    width: 100%;
    height: 100%;
    padding: 0 0 0 16px;
    align-items: center;
  }

  .ui-input-box {
    position: absolute;
    width: 100%;
    padding: 10px 0;
    background-color: #fff;
    border-top: 1px solid #e8eaed;
    border-radius: 0 0 24px 24px;
    box-shadow: 0 4px 6px rgba(32, 33, 36, 0.28);

    .row {
      padding: 5px 30px 5px 16px;

      &-content {
        margin: 0 0 0 16px;
        cursor: pointer;

        &:hover {
          color: var(--color-select-after);
        }
      }

      &-select {
        color: var(--color-select-after);
      }
    }
  }

  &:hover {
    .query-box-foucs ();
  }

  &.query-box-foucs {
    background-color: #fff;
    border-color: #dfe1e5;
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  }

  &.query-box-content {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .ui-input {
    flex: 1;
    font-size: 16px;
    color: #141414;
    background: transparent;
    border: none;
    outline: none;

    &-suffix {
      padding: 0 0 0 20px;
      margin: 0 20px;
      cursor: pointer;
      border-left: 1px solid #dfe1e5;
    }
  }
}
@media screen and (max-width: 600px) {
  .ui-input-search-wrap {
    width: 80%;
  }
}
</style>
