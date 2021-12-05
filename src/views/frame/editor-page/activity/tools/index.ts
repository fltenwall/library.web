import type { Component } from 'vue';
import type { PointInfo } from '/@/lib/interface/PointInfo';
import { usePinYin } from '/@/hooks/web/usePinYin';
import { isArray, isUnDef } from '/@/utils/is';

interface PointConfigs {
  label: Recordable<string>;

  icon: Recordable<string>;

  pinyin: Recordable<string>;

  visible: Recordable<boolean>;
}

// 视图内容
const moduleViewSource = import.meta.globEager('./**/index.vue');
// 模型工具
const schemaTools = import.meta.globEager('./**/schema.ts');
// 操作
const moduleActionSource = import.meta.globEager('./**/template.vue');

// 模块集合
export const moduleGather: Recordable<string[]> = {};
// 模块列表
export const moduleView: Recordable<Component> = {};
// 模型工具
export const moduleSchema: Indexable<PointInfo> = {};
// 操作数据
export const moduleAction: Recordable<Component> = {};
// 分类 中文 和 图标
export const baseConfigs: PointConfigs = {
  label: {
    base: '基础组件',
    form: '页面配置',
    media: '媒体组件',
    chart: '可视化组件'
  },
  icon: {
    base: 'ant-design:appstore-outlined',
    media: 'cil:media-play',
    chart: 'ant-design:pie-chart-outlined'
  },
  pinyin: {},
  visible: {}
};

Object.keys(moduleViewSource).forEach((key) => {
  // 读取文件名称
  const [classify, name] = key.replace(/\.\/|.index.vue/g, '').split('/');
  // 设置数组
  !isArray(moduleGather[classify]) && (moduleGather[classify] = []);
  // 添加模块
  moduleView[name] = moduleViewSource[key].default;
  // 添加数据
  moduleGather[classify].push(name);
});

Object.keys(schemaTools).forEach((key) => {
  // 读取文件名称
  const [, name] = key.replace(/\.\/|.schema.ts/g, '').split('/');
  // 判断为空跳过
  if (isUnDef(name)) return;
  // 关键字
  const label = schemaTools[key].label;
  // 可见
  const visible = schemaTools[key].visible;
  // 添加名称
  baseConfigs.label[name] = label;
  // 添加名称
  baseConfigs.icon[name] = schemaTools[key].icon;
  // 添加拼音
  baseConfigs.pinyin[name] = usePinYin(label);
  // 是否可见
  baseConfigs.visible[name] = isUnDef(visible) || visible ? true : false;
  // 模块数据信息
  moduleSchema[name] = schemaTools[key].schema;
});

Object.keys(moduleActionSource).forEach((key) => {
  // 读取文件名称
  const [, name] = key.replace(/\.\/|.schema.vue/g, '').split('/');
  // 添加模型
  moduleAction[name] = moduleActionSource[key].default;
});