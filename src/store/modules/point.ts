import type { CSSProperties } from 'vue';
import type { PointInfo } from '/@/lib/interface/PointInfo';
import store from '/@/store/index';
import { VuexModule, Mutation, Module, getModule } from 'vuex-module-decorators';
import { isObject } from '/@/utils/is';
import { ActivityManage } from '/@/api/page-manage/activity-page';

const NAME = 'point';

interface UpdatePointState {
  // 唯一值
  id: string;
  // 下标
  key: keyof PointInfo;
  // 值
  value: never;
}

interface UpdatePageOption {
  key: keyof ActivityManage;
  value: ActivityManage[keyof ActivityManage];
}

@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class Point extends VuexModule {
  // 组件数据
  private pointDataState: Required<PointInfo>[] = [];

  // 组件数据样式
  private pointStyleState: Indexable<CSSProperties> = {};

  // 当前选中下标
  private pointidState = '';

  // 页面配置
  private pageOptionsState: ActivityManage = {};

  // 标签状态
  private tabState = 'base';

  // 获取组件数据
  get getPointDataState(): Required<PointInfo>[] {
    return this.pointDataState;
  }

  // 获取组件样式
  get getPointStyleState(): Indexable<CSSProperties> {
    return this.pointStyleState;
  }

  // 获取选中参数
  get getPointidState(): string {
    return this.pointidState;
  }

  // 获取页面配置
  get getPageOptionsState(): ActivityManage {
    return this.pageOptionsState;
  }

  get getTabState(): string {
    return this.tabState;
  }

  // 获取数据
  get getPointInfo(): PointInfo {
    const point = this.pointDataState.find((el) => el.id === this.pointidState);
    return point ?? {};
  }

  // 添加数据
  @Mutation
  commitAddPointData(data: Required<PointInfo>): void {
    this.pointDataState.push(data);
  }

  // 更新数据
  @Mutation
  commitUpdatePointData({ id, key, value }: UpdatePointState): void {
    // 查找数据
    const point = this.pointDataState.find((el) => el.id === id);

    // 更新数据
    point && (point[key] = value);
  }

  // 更新数据样式
  @Mutation
  commitUpdatePointStyle(options: { id: string; key: string; value: string }): void {
    if (!isObject(this.pointStyleState[options.id])) {
      this.pointStyleState[options.id] = {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.pointStyleState[options.id] as any)[options.key] = options.value;
  }

  // 更新选中参数
  @Mutation
  commitUpdatePointidState({ id }: { id: string }): void {
    this.pointidState = id;
  }

  // 更新数据
  @Mutation
  commitUpdatePointDataState(data: Required<PointInfo>[]): void {
    this.pointDataState = data;
  }

  // 设置页面配置
  @Mutation
  commitSetPageOptionsState(options: ActivityManage): void {
    this.pageOptionsState = options;
  }

  // 更新页面配置
  @Mutation
  commitUpdatePageOptionsState({ key, value }: UpdatePageOption): void {
    this.pageOptionsState[key] = value as undefined;
  }

  // 删除数据
  @Mutation
  commitDeletePointData({ id }: { id: string }): void {
    // 查找数据
    const index = this.pointDataState.findIndex((el) => el.id === id);

    // 删除
    index !== -1 && this.pointDataState.splice(index, 1);
  }

  // 清空
  @Mutation
  commitEmptyState(): void {
    this.tabState = 'base';
    this.pointidState = '';
    this.pointDataState = [];
    this.pointStyleState = {};
    this.pageOptionsState = {};
  }

  // 清空数据
  @Mutation
  commitResetData(): void {
    this.pointidState = '';
    this.pointDataState = [];
    this.pointStyleState = {};
  }

  // 修改状态
  @Mutation
  commitTabState(state: string): void {
    this.tabState = state;
  }
}

export { Point };
export const pointStore = getModule<Point>(Point);
