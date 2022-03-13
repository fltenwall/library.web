<template>
  <public-header class="editor-form-header" :is-show-user-info="false">
    <template #left>
      <router-link class="index-theme header-left-title index-middle" :to="{ name: PageEnum.BASE_HOME }">
        <span>{{ MixinConfig.shortTitle }}搭建</span>
      </router-link>

      <div class="ml-4 pl-4 border-l">{{ pageOptions.name }}</div>
    </template>

    <template #right>
      <div class="header-right">
        <div class="button preview index-center-middle">预 览</div>
        <div class="button primary index-center-middle">保 存</div>
      </div>
    </template>
  </public-header>
</template>

<script setup lang="ts">
import { PageEnum } from '/@/enums/pageEnum';
import { pointStore } from '/@/store/modules/form';

//
const pageOptions = computed(() => pointStore.getPageOptionsState);
</script>

<style lang="less" scoped>
.header {
  &-left {
    &-title {
      font-size: 18px;
      font-weight: bold;
      color: @primary-color;
    }
  }

  &-right {
    display: flex;
    height: 100%;

    .button {
      width: 145px;
      cursor: pointer;

      &.primary {
        color: #fff;
        background-color: #2c63ff;

        &:hover {
          background-color: #2f3be7;
        }
      }

      &.preview {
        border-left: 1px solid #e6e9ef;

        &:hover {
          color: #2c63ff;
        }
      }
    }
  }
}
</style>
