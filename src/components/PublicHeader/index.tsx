import { defineComponent } from 'vue';
import HeaderLeft from './HeaderLeft.vue';
import HeaderRight from './HeaderRight.vue';
import HeaderCenter from './HeaderCenter.vue';

export default defineComponent({
  props: {
    isShowUserInfo: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    return () => (
      <header class="index-space-between h12 pr12 pl4">
        <HeaderLeft>{() => slots.left && slots.left()}</HeaderLeft>
        {slots.center && <HeaderCenter>{() => slots.center && slots.center()}</HeaderCenter>}
        <HeaderRight isShowUserInfo={props.isShowUserInfo}>{() => slots.right && slots.right()}</HeaderRight>
      </header>
    );
  }
});
