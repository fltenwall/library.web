import { defineComponent } from 'vue'
import config from '/@/config/'
import { PageEnum } from '/@/enums/pageEnum'
import { useGo } from '/@/hooks/web/usePage'

export default defineComponent({
  props: {
    mainClass: {
      type: String,
      default: ''
    }
  },
  setup(props, { attrs }) {
    const go = useGo()

    const onTitleClick = () => go({ name: PageEnum.INDEX_PAGE })

    return () => (
      <header class={[attrs.class, 'index-middle', 'pbulic-header']}>
        <div class={['pbulic-header-main', 'index-middle', props.mainClass]}>
          <img src={config.logo} />
          <div onClick={onTitleClick} class="pbulic-header-title index-theme">
            {config.title}
          </div>
        </div>
      </header>
    )
  }
})
