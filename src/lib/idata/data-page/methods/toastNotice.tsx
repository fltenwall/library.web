import { defineComponent } from 'vue';
import { Button } from 'ant-design-vue';
import { InfoCircleFilled } from '@ant-design/icons-vue';

export default defineComponent({
  emits: ['close-toast', 'confirmToast', 'removeItem'],
  setup(_props, { emit }) {
    // 处理 点击取消
    function handleClickCancel() {
      emit('removeItem');
      emit('close-toast');
    }
    // 处理 点击确认
    function handleClickConfirm() {
      emit('confirmToast');
      emit('removeItem');
      emit('close-toast');
    }

    return () => (
      <div class="data-page-notice">
        <div class="data-page-notice-description index-middle">
          <InfoCircleFilled class="data-page-notice-icon" />
          <span>当前存在缓存数据, 是否从缓存中读取数据 ?</span>
        </div>
        <div class="data-page-notice-footer">
          <Button size="small" onClick={handleClickCancel}>
            {() => ' 否 '}
          </Button>
          <Button size="small" type="primary" onClick={handleClickConfirm}>
            {() => ' 是 '}
          </Button>
        </div>
      </div>
    );
  }
});
