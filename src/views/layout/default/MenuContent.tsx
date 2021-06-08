import { defineComponent } from 'vue'
import Icon from '/@/components/Icon'

export default defineComponent({
  name: 'MenuContent',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    level: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    function renderIcon(icon: string) {
      return icon ? <Icon icon={icon} size={16} class="menu-content-icon" /> : null
    }

    return () => {
      const { title, icon, showTitle, level } = props
      const show = level === 1 ? showTitle : true
      return [renderIcon(icon), <span class={!show && 'index-hidden'}>{title}</span>]
    }
  }
})
