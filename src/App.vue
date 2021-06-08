<template>
  <config-provider :locale="zhCN" :transform-cell-text="transformCellText">
    <router-view />
  </config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ConfigProvider } from 'ant-design-vue'
import { useConfigProvider } from '/@/hooks/web/useApp'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import '/@/hooks/web/useLocale'
import './utils/browser'

export default defineComponent({
  components: { ConfigProvider },
  setup() {
    const { transformCellText } = useConfigProvider()

    return {
      zhCN,
      transformCellText
    }
  }
})
</script>
