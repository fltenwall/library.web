import { onMounted, onUnmounted } from 'vue'
import { parsePageModeFromString, PageMode } from '/@/utils/helper/breadcrumb'
import { isString, isStrNum } from '/@/utils/is'
import useToast from '/@/components/Toast'
import { tabStore } from '/@/store/modules/tab'

export interface QueryRoute {
  id?: string

  mode: string
}

/**
 *
 * @param query
 * @param name
 * @description 检查路由是否合法 并返回页面模式, 如果不合法通过 name 字段 删除 缓存标签
 */
export function checkDataRouter(query: QueryRoute, name: string): number {
  const { id, mode } = query

  // 解析路由
  const pageMode = parsePageModeFromString(mode)

  // 设置报错内容
  let description: string | boolean = false

  // 判断 mode , id 是否正确
  if (pageMode.mode === PageMode.error) {
    description = '记录的 MODE 值不合法, 请修改后再次尝试'
  } else if (pageMode.mode !== PageMode.new && !isStrNum(id!)) {
    description = '记录的 ID 值不合法, 请修改后再次尝试'
  }

  // 判断 description 类型 字符串 -> 弹出提示框
  if (isString(description)) {
    onMounted(() => useToast.error(description))
    onUnmounted(() => tabStore.commitCloseTab({ name }))
  }

  return isString(description) ? -1 : pageMode.mode
}
