import type { PointInfo } from '/@/lib/interface/Form';
import store from '/@/store/index';
import { VuexModule, Mutation, Module, getModule } from 'vuex-module-decorators';
import { FormManage } from '/@/api/page-manage/form-page';
import { cloneDeep } from 'lodash-es';

const NAME = 'form';

type TabState = 'muster' | 'structure';

@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class Point extends VuexModule {
  // 组件数据
  private pointDataState: PointInfo[] = [];

  // 页面配置
  private pageOptionsState: FormManage = {};
  private pageOptionsCache: FormManage = {};

  // 标签状态
  private tabState: TabState = 'muster';

  // 获取 标签类型
  get getTabState(): TabState {
    return this.tabState;
  }

  // 获取页面配置
  get getPageOptionsState(): FormManage {
    return this.pageOptionsState;
  }

  // 获取页面缓存配置
  get getPageOptionsCache(): FormManage {
    return this.pageOptionsCache;
  }

  // 获取组件数据
  get getPointDataState(): Required<PointInfo>[] {
    return this.pointDataState;
  }

  // 设置页面配置
  @Mutation
  commitSetPageOptionsState(options: FormManage): void {
    this.pageOptionsState = cloneDeep(options);
    this.pageOptionsCache = cloneDeep(options);
  }

  // 修改状态
  @Mutation
  commitTabState(state: TabState): void {
    this.tabState = state;
  }

  @Mutation
  commitAddPointData(data: Required<PointInfo>): void {
    this.pointDataState.push(data);
  }

  @Mutation
  commitUpdatePointData(data: Required<PointInfo>[]): void {
    this.pointDataState = data;
  }
}

export { Point };
export const pointStore = getModule<Point>(Point);
