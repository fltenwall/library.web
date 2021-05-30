import type { PropType } from 'vue'
import { defineComponent, ref, unref, computed, watch, onMounted, nextTick } from 'vue'
import Iconify from '@purge-icons/generated'
import './index.less'

export default defineComponent({
  props: {
    icon: {
      type: String as PropType<string>,
      required: true
    },
    color: {
      type: String as PropType<string>,
      default: ''
    },
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 14
    }
  },
  setup(props, { attrs }) {
    const elRef = ref<HTMLElement | null>(null)

    const update = async () => {
      const el = unref(elRef)
      if (el) {
        await nextTick()
        const { icon } = props
        const svg = Iconify.renderSVG(icon, {})
        if (svg) {
          el.textContent = ''
          el.appendChild(svg)
        } else {
          const span = document.createElement('span')
          span.className = 'iconify'
          span.dataset.icon = icon
          el.textContent = ''
          el.appendChild(span)
        }
      }
    }

    watch(() => props.icon, update)

    const wrapStyleRef = computed(() => {
      const { size, color } = props
      return {
        color,
        'font-size': `${parseInt(size.toString(), 10)}px`,
        display: 'inline-flex'
      }
    })

    onMounted(() => {
      update()
    })

    return () => (
      <div ref={elRef} class={[attrs.class, 'app-iconify']} style={unref(wrapStyleRef)} />
    )
  }
})
