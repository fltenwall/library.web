import type { AppRouteRecordRaw } from '/@/router/types';
import type { RouteLocationMatched } from 'vue-router';
import { defineComponent, watch, unref, TransitionGroup, reactive } from 'vue';
import { Breadcrumb, BreadcrumbItem } from '/@/components/Breadcrumb/';
import { parsePageModeFromString } from '/@/utils/helper/breadcrumb';
import { useRouter } from 'vue-router';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';
import { validData } from '/@/utils/regExp';
import router from '/@/router';

interface ItemList {
  value: AppRouteRecordRaw[];
  length: number;
  queryMode: string;
}

export default defineComponent({
  setup() {
    const { currentRoute } = useRouter();
    const go = useGo();
    const itemList = reactive<ItemList>({
      value: [],
      length: 0,
      queryMode: ''
    });

    // 路由发送变换
    function getBreadcrumb() {
      const { matched, query } = unref(currentRoute);
      const matchedList = matched.filter((item) => item.meta && item.meta.title);
      const routerItem = matchedList[1];
      const result = getHomeRoute(routerItem);
      if (result) {
        matchedList.shift();
      }
      itemList.queryMode = query.mode as string;
      itemList.length = matchedList.length - 1;
      itemList.value = matchedList as unknown as AppRouteRecordRaw[];
    }

    // 获取路由
    function getHomeRoute(routerItem: RouteLocationMatched) {
      if (!routerItem || !routerItem.name) return true;
      const routes = router.getRoutes();
      const homeRoute = routes.find((item) => item.name === PageEnum.BASE_HOME);
      if (!homeRoute) return true;
      if (homeRoute.name === routerItem.name) return true;
      return false;
    }

    // 点击标题
    function handleItemClick(item: AppRouteRecordRaw) {
      const { redirect } = item;
      redirect && go(redirect);
    }

    // 监听路由发生变化
    watch(
      () => currentRoute.value,
      () => {
        getBreadcrumb();
      },
      {
        immediate: true
      }
    );

    return () => (
      <Breadcrumb class="index-hidden-newline">
        {() => (
          <TransitionGroup name="breadcrumb">
            {() =>
              itemList.value.map((el, index) => {
                const isLink = !!el.redirect;

                const { length, queryMode } = itemList;

                const isDivider = length !== index;

                let mode = '';

                if (validData('dataPage', el.path)) {
                  const pageMode = parsePageModeFromString(queryMode);
                  mode = `- ${pageMode.modeName}`;
                }

                return (
                  <BreadcrumbItem
                    key={el.path}
                    isLink={isLink}
                    isDivider={isDivider}
                    onClick={handleItemClick.bind(null, el)}
                  >
                    {() => `${el.meta.title} ${mode}`}
                  </BreadcrumbItem>
                );
              })
            }
          </TransitionGroup>
        )}
      </Breadcrumb>
    );
  }
});
