<template>
  <footer class="footer index-middle pl-10 pr-10">
    <div>
      <span><a href="https://github.com/PBOVE" target="_blank">pbove</a></span>
      <span><a href="https://github.com/Abouerp" target="_blank">abouerp</a></span>
      <span><router-link :to="{ name: 'help' }">帮助中心</router-link></span>
      <!-- <span><a href="https://tibis.top" target="_blank">微享文档</a></span> -->
    </div>
    <div>
      <span>©2021 毕业设计</span>
    </div>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({});
</script>

<style lang="less" scoped>
.footer {
  position: fixed;
  justify-content: space-between;
  bottom: 0;
  width: 100%;
  height: 40px;
  font-size: 12px;
  background: #fbfbfb;

  span:not(:last-of-type) {
    margin: 0 15px 0 0;
  }
}
</style>
