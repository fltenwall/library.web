import { computed, defineComponent } from 'vue';
import { Layout, Avatar } from 'ant-design-vue';
import LayoutBreadcrumb from './LayoutBreadcrumb';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons-vue';
import { menuStore } from '/@/store/modules/menu';
import DropMenu from '/@/components/PublicHeader/dropMenu.vue';
import { userStore } from '/@/store/modules/user';
import MenuSearch from '/@/components/MenuSearch.vue';
import config from '/@/config';

export default defineComponent({
  name: 'DefaultLayoutHeader',
  setup() {
    // 处理点击折叠
    function handleTriggerClick() {
      if (menuStore.getCollapsedState) {
        menuStore.commitCollapsedState(false);
      } else {
        menuStore.commitCollapsedState(true);
      }
    }

    const userInfo = computed(() => userStore.getUserInfoState);

    return () => (
      <Layout.Header class="layout-header">
        {() => (
          <div class="index-space-between">
            <div class="layout-header-left index-middle">
              <div class="header-trigger" onClick={handleTriggerClick}>
                <MenuFoldOutlined class={[menuStore.getCollapsedState && 'index-hidden']} />
                <MenuUnfoldOutlined class={[!menuStore.getCollapsedState && 'index-hidden']} />
              </div>
              <LayoutBreadcrumb />
            </div>
            <div class="index-middle">
              <MenuSearch />
              <DropMenu placement="bottomCenter">
                {{
                  default: () => (
                    <div class="index-middle layout-header-right-action">
                      <Avatar size={25} src={config.preview + userInfo.value?.portrait}>
                        {{
                          icon: () => <UserOutlined />
                        }}
                      </Avatar>
                      <div class="ml3">{userInfo.value?.username}</div>
                    </div>
                  )
                }}
              </DropMenu>
            </div>
          </div>
        )}
      </Layout.Header>
    );
  }
});
