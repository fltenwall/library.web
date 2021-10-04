import { CSSProperties } from 'vue';
import type { PointInfo } from '/@/lib/interface/PointInfo';
import store from '/@/store/index';
import { VuexModule, Mutation, Module, getModule } from 'vuex-module-decorators';
import { isObject } from '/@/utils/is';
import { FormManage } from '/@/api/page-manage/form-page';

const NAME = 'point';

interface UpdatePointState {
  // 唯一值
  uuid: string;
  // 下标
  key: keyof PointInfo;
  // 值
  value: never;
}

@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class Point extends VuexModule {
  // 组件数据
  private pointDataState: Required<PointInfo>[] = [];

  // 组件数据样式
  private pointStyleState: Indexable<CSSProperties> = {};

  // 当前选中下标
  private pointUUIDState = '';

  // 页面配置
  private pageOptionsState: FormManage = {};

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
  get getPointUUIDState(): string {
    return this.pointUUIDState;
  }

  // 获取页面配置
  get getPageOptionsState(): FormManage {
    return this.pageOptionsState;
  }

  get getTabState(): string {
    return this.tabState;
  }

  // 获取数据
  get getPointInfo(): PointInfo {
    const point = this.pointDataState.find((el) => el.uuid === this.pointUUIDState);
    return point ?? {};
  }

  // 添加数据
  @Mutation
  commitAddPointData(data: Required<PointInfo>): void {
    this.pointDataState.push(data);
  }

  // 更新数据
  @Mutation
  commitUpdatePointData({ uuid, key, value }: UpdatePointState): void {
    // 查找数据
    const point = this.pointDataState.find((el) => el.uuid === uuid);

    // 更新数据
    point && (point[key] = value);
  }

  // 更新数据样式
  @Mutation
  commitUpdatePointStyle(options: { uuid: string; key: string; value: string }): void {
    if (!isObject(this.pointStyleState[options.uuid])) {
      this.pointStyleState[options.uuid] = {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.pointStyleState[options.uuid] as any)[options.key] = options.value;
  }

  // 更新选中参数
  @Mutation
  commitUpdatePointUUIDState({ uuid }: { uuid: string }): void {
    this.pointUUIDState = uuid;
  }

  // 更新数据
  @Mutation
  commitUpdatePointDataState(data: Required<PointInfo>[]): void {
    this.pointDataState = data;
  }

  // 设置页面配置
  @Mutation
  commitSetPageOptionsState(options: FormManage): void {
    this.pageOptionsState = options;
  }

  // 更新页面配置
  @Mutation
  commitUpdatePageOptionsState({ key, value }: { key: keyof FormManage; value: unknown }): void {
    this.pageOptionsState[key] = value as undefined;
  }

  // 删除数据
  @Mutation
  commitDeletePointData({ uuid }: { uuid: string }): void {
    // 查找数据
    const index = this.pointDataState.findIndex((el) => el.uuid === uuid);

    // 删除
    index !== -1 && this.pointDataState.splice(index, 1);
  }

  // 清空
  @Mutation
  commitEmptyState(): void {
    this.pointUUIDState = '';
    this.pointDataState = [];
    this.pointStyleState = {};
    this.pageOptionsState = {};
  }

  // 清空数据
  @Mutation
  commitResetData(): void {
    this.pointUUIDState = '';
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
