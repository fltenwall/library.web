<template>
  <config-provider :locale="zhCN" :transform-cell-text="transformCellText">
    <router-view />
  </config-provider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { useConfigProvider } from '/@/hooks/web/useApp';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import '/@/hooks/web/useLocale';
import './utils/browser';

const { transformCellText } = useConfigProvider();
</script>
