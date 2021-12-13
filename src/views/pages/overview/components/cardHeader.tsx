import { defineComponent } from 'vue';

export default defineComponent({
  setup(_props, { slots }) {
    return () => (
      <div class="index-middle index-space-between pr5 pl4 h12 fs4 border-bottom-f0">
        <div>{slots.left && slots.left()}</div>
        <div>{slots.right && slots.right()}</div>
      </div>
    );
  }
});
