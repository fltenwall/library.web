<template>
  <div class="borrow-wrap">
    <div class="borrow-header">
      <div>
        <div class="borrow-header-title">借书量</div>
        <div class="borrow-header-content">0</div>
      </div>
      <div>
        <a-tag color="#faad14" class="index-no-margin"> 周 </a-tag>
      </div>
    </div>
    <div class="borrow-main index-middle">
      <div>
        日同比
        <span class="ml-1 mr-1">0%</span>
        <CaretUpOutlined style="color: #f5222d;" />
      </div>
      <div>
        周同比
        <span class="ml-1 mr-1">0%</span>
        <CaretDownOutlined style="color: #52c41a;" />
      </div>
    </div>
    <div class="borrow-footer">
      <span>总借书量</span>
      <span class="ml-1"> 0 </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: { CaretUpOutlined, CaretDownOutlined },
  setup() {
    return {};
  }
});
</script>

<style lang="less" scoped>
.borrow-wrap {
  overflow: hidden;
  background: var(--color-background-override);
}

.borrow {
  &-header {
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

  &-main {
    height: 60px;
    padding: 0 20px;

    & > :not(:first-of-type) {
      margin: 0 0 0 10px;
    }
  }

  &-footer {
    padding: 5px 0 0 0;
    margin: 0 20px 10px;
    border-top: 1px solid #f0f0f0;
  }
}
</style>
