import { isArray } from '/@/utils/is'

interface ViewList {
  [prop: string]: string[]
}

interface PointList {
  [prop: string]: unknown
}

interface PointConfigs {
  name: { [prop: string]: string }

  icon: { [prop: string]: string }
}

// 视图工具
const viewTools = import.meta.globEager('./**/index.vue')

// 模型工具
const schemaTools = import.meta.globEager('./**/schema.ts')

// 工具列表
export const viewList: ViewList = {}

// 模块列表
export const pointList: PointList = {}

// 分类 中文 和 图标
export const pointConfigs: PointConfigs = {
  name: {
    base: '基础',
    form: '表单配置'
  },
  icon: {
    base: 'ant-design:highlight-outlined'
  }
}

Object.keys(viewTools).forEach((key) => {
  // 读取文件名称
  const [classify, name] = key.replace(/\.\/|.index.vue/g, '').split('/')
  // 设置数组
  !isArray(viewList[classify]) && (viewList[classify] = [])
  // 添加模块
  pointList[`${name}-point`] = viewTools[key].default
  // 添加数据
  viewList[classify].push(name)
})

Object.keys(schemaTools).forEach((key) => {
  // 读取文件名称
  const [, name] = key.replace(/\.\/|.schema.ts/g, '').split('/')
  // 添加名称
  pointConfigs.name[name] = schemaTools[key].name as string

  // 添加名称
  pointConfigs.icon[name] = schemaTools[key].icon as string
})
