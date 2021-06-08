<template>
  <div ref="wrap" class="visits-wrap">
    <div class="visits-header">
      <div>
        <div class="visits-header-title">
          访问量
        </div>
        <div class="visits-header-content">
          10
        </div>
      </div>
      <div>
        <a-tag color="#f5222d" class="index-no-margin">
          日
        </a-tag>
      </div>
    </div>
    <div ref="containerRef" />
    <div class="visits-footer">
      <span>总访问量</span>
      <span class="ml-1"> 126 </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { triggerResize } from '/@/utils/triggerResize'
import { menuStore } from '/@/store/modules/menu'
import { Chart } from '@antv/g2'

export default defineComponent({
  setup() {
    const wrap = ref<HTMLElement | null>(null)

    const containerRef = ref<HTMLElement | null>(null)

    const data = [
      { time: '2020-02-27', count: 5 },
      { time: '2020-02-28', count: 15 },
      { time: '2020-03-01', count: 2 },
      { time: '2020-03-02', count: 12 },
      { time: '2020-03-03', count: 6 },
      { time: '2020-03-04', count: 4 },
      { time: '2020-03-05', count: 20 }
    ]

    // 监听菜单折叠
    watch(
      () => menuStore.getCollapsedState,
      () => triggerResize()
    )

    //
    onMounted(() => chartInit())

    // 数据初始化
    function chartInit() {
      const chart = new Chart({
        container: containerRef.value!,
        height: 60,
        autoFit: true,
        padding: [5, 0, 20, 0]
      })

      chart.data(data)

      chart.scale('time', {
        type: 'timeCat'
      })

      chart.scale('count', {
        nice: true
      })

      chart.axis(false)

      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<div class="g2-tooltip-list-item"><span class="g2-tooltip-name">{time}</span><span class="g2-tooltip-value">{count}</span></div>'
      })

      chart
        .area()
        .position('time*count')
        .style({ fill: '#9254de', fillOpacity: 1 })
        .shape('smooth')
        .tooltip('time*count', (time: string, count: number) => ({ time, count }))

      chart.render()

      triggerResize()
    }

    return { wrap, containerRef }
  }
})
</script>

<style lang="less" scoped>
.visits-wrap {
  overflow: hidden;
  background: var(--color-background-override);
}

.visits-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 0;

  &-title {
    height: 22px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
  }

  &-content {
    height: 38px;
    font-size: 30px;
    line-height: 38px;
    color: rgba(0, 0, 0, 0.85);
  }
}

.visits-footer {
  padding: 5px 0 0 0;
  margin: 0 20px 10px;
  border-top: 1px solid #f0f0f0;
}
</style>
