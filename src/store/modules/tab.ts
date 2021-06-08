import store from '/@/store/index'
import { toRaw } from 'vue'
import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'
import { RouteMeta } from '/@/router/types'
import { isNumber, isDef } from '/@/utils/is'

export interface TabItem {
  // 路径
  path?: string
  // 参数
  params?: unknown
  // 参数
  query?: unknown
  // 名称
  name?: string | symbol | null | undefined
  // 参数
  meta?: RouteMeta
}

interface SliceCloseParameter {
  // 开始位置
  start: number | TabItem
  // 结束位置
  end?: number | TabItem
  // 开始位置: start + startBase
  startBase?: number
}

const NAME = 'TAB'

@Module({ name: NAME, store, dynamic: true, namespaced: true })
export default class Tab extends VuexModule {
  // 列表
  private tabsState: TabItem[] = []

  // 路由改变
  private lastChangeRouteState: TabItem = {}

  get getTabsState(): TabItem[] {
    return this.tabsState
  }

  get getLastChangeRouteState(): TabItem {
    return this.lastChangeRouteState
  }

  // 添加
  @Mutation
  commitAddTab(route: TabItem): void {
    const { path, name, meta, params, query } = route

    if (meta?.ignoreTab) return
    let updateIndex = -1
    const hasTab = this.tabsState.some((tab, index) => {
      updateIndex = index
      return tab.name === name
    })
    if (hasTab) {
      const curTab = toRaw(this.tabsState)[updateIndex]
      if (!curTab) return
      curTab.params = params || curTab.params
      curTab.query = query || curTab.query
      curTab.meta = meta || curTab.meta
      this.tabsState.splice(updateIndex, 1, curTab)
      return
    }
    this.tabsState.push({ path, name, meta, params, query })
  }

  @Mutation
  commitLastChangeRouteState(route: TabItem): void {
    this.lastChangeRouteState = route
  }

  @Mutation
  commitCloseTab(route: TabItem): void {
    const { name, meta: { affix } = {} } = route
    if (affix) return
    const index = this.tabsState.findIndex((item) => item.name === name)
    index !== -1 && this.tabsState.splice(index, 1)
  }

  @Mutation
  commitSliceCloseTab({ start, end, startBase = 0 }: SliceCloseParameter): void {
    // 将 TabItem  找到下标
    const findIndex = (route: TabItem) => {
      const { name } = route
      return this.tabsState.findIndex((item) => item.name === name)
    }
    // 设置开始下标
    const startIndex = isNumber(start) ? start : findIndex(start)
    // 设置结束下标
    const endIndex = isDef(end) ? (isNumber(end) ? end : findIndex(end)) : undefined
    // 没有找到下标 就跳出
    if (endIndex === -1 || startIndex === -1) {
      return
    }
    // 截取下标
    const tabs = this.tabsState.slice(startIndex + startBase, endIndex)
    // 以 name 为数组列表
    const nameList: string[] = []

    for (const item of tabs) {
      const affix = item.meta ? item.meta.affix : false
      if (!affix) {
        nameList.push(item.name as string)
      }
    }
    this.tabsState = toRaw(this.tabsState).filter((item) => !nameList.includes(item.name as string))
  }

  @Mutation
  commitResetTabsState(): void {
    this.tabsState = []
  }
}

export { Tab }
export const tabStore = getModule<Tab>(Tab)
