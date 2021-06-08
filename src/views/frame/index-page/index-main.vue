<template>
  <main class="main">
    <div class="index-center-middle">
      <div class="main-title">
        {{ MixinConfig.title }}
      </div>
    </div>
    <div class="main-search-wrap">
      <input-search class="main-search" @on-enter="handleEnter" />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PageEnum } from '/@/enums/pageEnum'
import { useGo } from '/@/hooks/web/usePage'
import { InputSearch } from '/@/lib/UI/'

export default defineComponent({
  components: { InputSearch },
  setup() {
    const go = useGo()

    // 处理用户按下 enter
    function handleEnter(val: string) {
      val && go({ name: PageEnum.SEARCH_PAGE, query: { q: val } })
    }

    return {
      handleEnter
    }
  }
})
</script>

<style lang="less" scoped>
.main {
  padding: 120px 0 0;
  color: #000;

  &-title {
    font-family: cursive;
    font-size: 30px;
  }

  &-search-wrap {
    width: 584px;
    margin: 24px auto 0;

    .main-search {
      width: 100%;
    }
  }
}
</style>
