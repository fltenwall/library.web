import { defineComponent, computed } from 'vue';
import { BAR_MAP, renderThumbStyle } from './util';

export default defineComponent({
  props: {
    vertical: Boolean,
    size: {
      type: String,
      default: ''
    },
    move: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const bar = computed(() => {
      return BAR_MAP[props.vertical ? 'vertical' : 'horizontal'];
    });

    return () => (
      <div class={['scrollbar-bar', 'is-' + bar.value.key]}>
        <div
          class="scrollbar-thumb"
          style={renderThumbStyle({ move: props.move, size: props.size, bar: bar.value })}
        />
      </div>
    );
  }
});
