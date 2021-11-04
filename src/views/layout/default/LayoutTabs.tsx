/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppRouteRecordRaw } from '/@/router/types';
import { defineComponent, computed, unref, watch, ref, onUnmounted, onMounted } from 'vue';
import { useGo } from '/@/hooks/web/usePage';
import { tabStore, TabItem } from '/@/store/modules/tab';
import { Tabs, Dropdown, Menu } from 'ant-design-vue';
import { closeTab, useCacheTabs, useTabDropdown } from '/@/hooks/web/useTab';
import { getActions } from './tab.data';
import { getAllParentPath, getFlatMenus } from '/@/utils/helper/menu';
import Icon from '/@/components/Icon';
import { useAuthorities } from '/@/hooks/web/useAuthorities';

export default defineComponent({
  setup() {
    let isAddAffix = false;
    // 路由
    const routeSet = new Set();
    // 当前激活标签
    const activeKey = ref<string>('');
    // 页面跳转
    const go = useGo();

    // 当前tab列表;
    const getTabsState = computed(() => {
      return tabStore.getTabsState;
    });

    // 使用缓存
    const { addCacheListener, readCacheTabs, removeCacheListener } = useCacheTabs();

    // 使用下拉菜单
    const { handelMenuClick } = useTabDropdown(activeKey);

    // 监听路由变化
    watch(
      () => tabStore.getLastChangeRouteState,
      (value) => {
        if (!isAddAffix) {
          addRouteSet();
          addAffixTabs();
          isAddAffix = true;
        }

        let route: any = unref(value);
        const flatItems = getFlatMenus(false);
        if (route.meta?.hideInTab) {
          const parentPath = getAllParentPath(flatItems, value.name as string).reverse();
          route = parentPath.find((el) => !el.meta?.hideInTab);
        }

        activeKey.value = route.name as string;
        const result = validateRoute(route);
        result && tabStore.commitAddTab(route);
      },
      { immediate: true }
    );

    // 添加监听
    onMounted(() => addCacheListener());
    // 移除监听
    onUnmounted(() => removeCacheListener());

    // 添加过滤固定标签
    function filterAffixTabs(routes: AppRouteRecordRaw[]) {
      return routes.filter((route) => route.meta.affix);
    }

    /**
     * @description: 设置固定tabs
     */
    function addAffixTabs(): void {
      const affixTabs = filterAffixTabs(getFlatMenus(false) as unknown as AppRouteRecordRaw[]);
      const cacheTabs = readCacheTabs();
      tabStore.commitResetTabsState();
      if (cacheTabs) {
        for (const tab of cacheTabs) {
          const result = validateRoute(tab);
          result && tabStore.commitAddTab(tab);
        }
      }
      for (const tab of affixTabs) {
        tabStore.commitAddTab(tab);
      }
    }

    // 获取全部路由设置 防止不存在路由添加 也只有菜单路由添加进去
    function addRouteSet() {
      const routes = getFlatMenus(false);
      routes.forEach((item) => routeSet.add(item.name));
    }

    // 检测路由是否存在
    function validateRoute(route: TabItem): boolean {
      const { name, meta: { auth } = { auth: [] } } = route;
      return routeSet.has(name) && useAuthorities(auth);
    }

    // 查找数据
    function findItem(key: string): TabItem | undefined {
      return unref(getTabsState).find((item: TabItem) => item.name === key);
    }

    // 切换面板的回调
    function handleChange(key: string) {
      activeKey.value = key;
      const item = findItem(key);
      if (item) {
        go(item as any, false);
      }
    }

    // 删除页签的回调
    function handleEdit(key: string) {
      const item = findItem(key);
      if (item) {
        closeTab(item);
      }
    }

    // 渲染标签
    function renderTabs() {
      return unref(getTabsState).map((item: TabItem) => {
        const key = item.name as string;
        return (
          <Tabs.TabPane key={key} closable={!item.meta!.affix}>
            {{
              tab: () => item.meta!.title
            }}
          </Tabs.TabPane>
        );
      });
    }

    // 渲染菜单
    function renderMenu() {
      return getActions().map((el) => {
        return (
          <Menu.Item key={el.event}>
            {() => (
              <div class="p-1 index-middle">
                <Icon icon={el.icon!} />
                <span class="pl-3">{el.text}</span>
              </div>
            )}
          </Menu.Item>
        );
      });
    }

    // 渲染下拉菜单
    function readerDropdown() {
      return (
        <Dropdown>
          {{
            default: () => (
              <Icon icon="radix-icons:caret-down" class="default-dropdown-icon" size="20" />
            ),
            overlay: () => <Menu onClick={handelMenuClick}>{() => renderMenu()}</Menu>
          }}
        </Dropdown>
      );
    }

    return () => (
      <div class="default-tabs">
        <Tabs
          type="editable-card"
          size="small"
          hideAdd={true}
          tabBarGutter={6}
          activeKey={unref(activeKey)}
          onChange={handleChange}
          onEdit={handleEdit}
        >
          {{ default: () => renderTabs(), rightExtra: () => readerDropdown() }}
        </Tabs>
      </div>
    );
  }
});
