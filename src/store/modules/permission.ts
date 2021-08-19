import store from '/@/store/index';
import { VuexModule, Mutation, Module, getModule } from 'vuex-module-decorators';
import { Menu } from '/@/router/types';

const NAME = 'permission';

/**
 * dynamic: true: 动态创建动态模块,即new Vuex.Store({})里面不用注册的,
 * store,当前模块注册到store上.也可以写在getModule上,即 getModule(PassengerStore,store)
 * namespaced: true, name: 'passenger' 命名空间
 */
@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class Permission extends VuexModule {
  // 菜单列表
  private backMenuListState: Menu[] = [];

  // 是否获取列表
  private isDynamicAddedRouteState = false;

  get getBackMenuListState(): Menu[] {
    return this.backMenuListState;
  }

  get getIsDynamicAddedRouteState(): boolean {
    return this.isDynamicAddedRouteState;
  }

  @Mutation
  commitBackMenuListState(list: Menu[]): void {
    this.backMenuListState = list;
  }

  @Mutation
  commitDynamicAddedRouteState(state: boolean): void {
    this.isDynamicAddedRouteState = state;
  }

  // @Action
  // async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {

  // }
}

export { Permission };
export const permissionStore = getModule<Permission>(Permission);
