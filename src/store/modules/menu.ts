import store from '/@/store/';
import { VuexModule, Module, getModule, Mutation } from 'vuex-module-decorators';
import config from '/@/config';

const NAME = 'menu';

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Menu extends VuexModule {
  // 菜单宽度
  private menuWidthState: number = config.menuWidth;

  // 默认展开
  private collapsedState: boolean = config.collapsed;

  // 收缩宽度
  private collapsedWidth: number = config.collapsedWidth;

  get getMenuWidthState(): number {
    return this.menuWidthState;
  }

  get getCollapsedState(): boolean {
    return this.collapsedState;
  }

  get getCollapsedWidth(): number {
    return this.collapsedWidth;
  }

  @Mutation
  commitMenuWidthState(menuWidth: number): void {
    this.menuWidthState = menuWidth;
  }

  @Mutation
  commitCollapsedState(collapsed: boolean): void {
    this.collapsedState = collapsed;
  }

  @Mutation
  commitCollapsedWidth(collapsedWidth: number): void {
    this.collapsedWidth = collapsedWidth;
  }
}

export { Menu };
export const menuStore = getModule<Menu>(Menu);
