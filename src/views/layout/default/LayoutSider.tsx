import type { Menu as MenuType } from "/@/router/types";
import { defineComponent, reactive, unref, computed, watch } from "vue";
import { Layout, Menu } from "ant-design-vue";
import { menuStore } from "/@/store/modules/menu";
import { useRouter } from "vue-router";
import config from "/@/config/";
import { MenuState } from "./type";
import router from "/@/router";
import {
  getMenus,
  getFlatMenus,
  getAllParentPath,
  menuHasChildren,
} from "/@/utils/helper/menu";
import MenuContent from "./MenuContent";

export default defineComponent({
  name: "DefaultLayoutSider",
  setup() {
    const { currentRoute } = useRouter();
    const menuItem: MenuType[] = getMenus();
    const menuState = reactive<Partial<MenuState>>({
      selectedKeys: [],
      mode: "inline",
      isAppMenu: true,
      openKeys: [],
      collapsedOpenKeys: [],
    });

    // 处理点击菜单 -> 导航 跳转
    function handleMenuClick(menu: { key: string }) {
      const { key } = menu;
      menuState.selectedKeys = [key];
      router.push(key);
    }

    // 处理菜单改变
    function handleMenuChange() {
      const flatItems = getFlatMenus();
      const findMenu = flatItems.find(
        (menu) => menu.path === unref(currentRoute).path
      );
      if (findMenu) {
        menuState.openKeys = getAllParentPath(flatItems, findMenu.path!);
        menuState.selectedKeys = [
          findMenu.path.replace(/data-page$/, "list-page"),
        ];
      }
    }

    const getOpenKeys = computed(() => {
      return menuStore.getCollapsedState
        ? menuState.collapsedOpenKeys
        : menuState.openKeys;
    });

    // 处理打开菜单
    function handleOpenChange(openKeys: string[]): void {
      if (!menuStore.getCollapsedState) {
        menuState.openKeys = openKeys;
      } else {
        menuState.collapsedOpenKeys = openKeys;
      }
    }

    // 渲染菜单
    function renderMenuItem(menuList?: MenuType[], index = 1) {
      if (!menuList) return;
      return menuList.map((menu) => {
        const { title, path, hideInMenu, icon } = menu;
        const showTitle = !menuStore.getCollapsedState;
        if (hideInMenu) return;

        if (!menuHasChildren(menu)) {
          return (
            <Menu.Item key={path} title={index === 1 ? title : ""}>
              {() => [
                <MenuContent
                  icon={icon}
                  level={index}
                  title={title}
                  showTitle={showTitle}
                />,
              ]}
            </Menu.Item>
          );
        }
        return (
          <Menu.SubMenu key={path}>
            {{
              title: () => [
                <MenuContent
                  icon={icon}
                  level={index}
                  title={title}
                  showTitle={showTitle}
                />,
              ],
              default: () => renderMenuItem(menu.children, index + 1),
            }}
          </Menu.SubMenu>
        );
      });
    }

    // 处理点击菜单收缩
    function handleCollapseChange(collapsed: boolean) {
      menuStore.commitCollapsedState(collapsed);
    }

    watch(
      () => currentRoute.value.name,
      () => {
        handleMenuChange();
      }
    );

    // 渲染根菜单
    function renderMenu() {
      const { selectedKeys, mode, isAppMenu } = menuState;

      return (
        <Menu
          mode={mode}
          theme={config.theme}
          inlineCollapsed={menuStore.getCollapsedState}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
          forceSubMenuRender={isAppMenu}
          selectedKeys={selectedKeys}
          openKeys={unref(getOpenKeys)}
          class="layout-sider-menu"
        >
          {{ default: () => renderMenuItem(menuItem) }}
        </Menu>
      );
    }

    handleMenuChange();

    return () => {
      const { getCollapsedState, getMenuWidthState } = menuStore;
      return (
        <Layout.Sider
          collapsible
          collapsed={getCollapsedState}
          onCollapse={handleCollapseChange}
          theme={config.theme}
          width={getMenuWidthState}
          class="layout-sider"
        >
          {() => (
            <>
              <div class="layout-sider-header index-center-middle index-hidden-newline">
                <img src={config.logo} class="layout-sider-header-logo" />
                <div
                  class={[
                    "layout-sider-header-title",
                    getCollapsedState && "index-hidden",
                  ]}
                >
                  {config.title}
                </div>
              </div>
              <div>{renderMenu()}</div>
            </>
          )}
        </Layout.Sider>
      );
    };
  },
});
