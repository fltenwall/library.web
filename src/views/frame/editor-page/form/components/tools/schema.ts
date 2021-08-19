import type { PointInfo } from '/@/lib/interface/PointInfo';

// 模型工具
const schemaTools = import.meta.globEager('./**/schema.ts');

export const schemaList: { [prop: string]: PointInfo } = {};

Object.keys(schemaTools).forEach((key) => {
  // 读取文件名称
  const [, name] = key.replace(/\.\/|.schema.ts/g, '').split('/');
  // 添加模型
  schemaList[name] = schemaTools[key].schema;
});
