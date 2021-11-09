<template>
  <div ref="wrap" class="search-wrap">
    <div class="search-header">
      <div>
        <div class="search-header-title">搜索量</div>
        <div class="search-header-content">50</div>
      </div>
      <div>
        <a-tag color="#f5222d" class="index-no-margin"> 日 </a-tag>
      </div>
    </div>
    <div ref="containerRef" />
    <div class="search-footer">
      <span>总搜索量</span>
      <span class="ml-1"> 1,259 </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { triggerResize } from '/@/utils/triggerResize';
import { menuStore } from '/@/store/modules/menu';
import { Chart } from '@antv/g2';

export default defineComponent({
  setup() {
    const wrap = ref<HTMLNULL>(null);

    const containerRef = ref<HTMLNULL>(null);

    const data = [
      { time: '2020-02-27', count: 30 },
      { time: '2020-02-28', count: 48 },
      { time: '2020-03-01', count: 50 },
      { time: '2020-03-02', count: 40 },
      { time: '2020-03-03', count: 45 },
      { time: '2020-03-04', count: 60 },
      { time: '2020-03-05', count: 50 }
    ];

    // 监听菜单折叠
    watch(
      () => menuStore.getCollapsedState,
      () => triggerResize()
    );

    //
    onMounted(() => chartInit());

    // 数据初始化
    function chartInit() {
      const chart = new Chart({
        container: containerRef.value!,
        height: 60,
        autoFit: true,
        padding: [5, 10, 20, 10]
      });

      chart.data(data);

      chart.scale('time', {
        type: 'timeCat'
      });

      chart.scale('count', {
        nice: true
      });

      chart.axis(false);

      chart.tooltip({
        showTitle: false,
        itemTpl:
          '<div class="g2-tooltip-list-item"><span class="g2-tooltip-name">{time}</span><span class="g2-tooltip-value">{count}</span></div>'
      });

      chart
        .interval()
        .position('time*count')
        .style({ fill: '#597ef7', fillOpacity: 1 })
        .shape('smooth')
        .tooltip('time*count', (time: string, count: number) => ({ time, count }));

      chart.render();

      triggerResize();
    }

    return { wrap, containerRef };
  }
});
</script>

<style lang="less" scoped>
.search-wrap {
  overflow: hidden;
  background: var(--color-background-override);
}

.search-header {
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

.search-footer {
  padding: 5px 0 0 0;
  margin: 0 20px 10px;
  border-top: 1px solid #f0f0f0;
}
</style>
