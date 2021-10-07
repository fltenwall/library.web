import type { Component } from 'vue';
import { isArray, isUnDef } from '/@/utils/is';
import PinYin from 'pinyin';

interface ViewList {
  [prop: string]: string[];
}

interface PointList {
  [prop: string]: Component;
}

interface PointConfigs {
  label: { [prop: string]: string };

  icon: { [prop: string]: string };

  pinyin: { [prop: string]: string };
}

// 视图工具
const viewTools = import.meta.globEager('./**/index.vue');

// 模型工具
const schemaTools = import.meta.globEager('./**/schema.ts');
// 拼音
export const pinyin = (text: string): string => {
  return PinYin(text, { style: PinYin.STYLE_NORMAL }).flat().join('');
};

// 工具列表
export const viewList: ViewList = {};

// 模块列表
export const pointList: PointList = {};

// 分类 中文 和 图标
export const pointConfigs: PointConfigs = {
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
  pinyin: {}
};

Object.keys(viewTools).forEach((key) => {
  // 读取文件名称
  const [classify, name] = key.replace(/\.\/|.index.vue/g, '').split('/');
  // 设置数组
  !isArray(viewList[classify]) && (viewList[classify] = []);
  // 添加模块
  pointList[`${name}-point`] = viewTools[key].default;
  // 添加数据
  viewList[classify].push(name);
});

Object.keys(schemaTools).forEach((key) => {
  // 读取文件名称
  const [, name] = key.replace(/\.\/|.schema.ts/g, '').split('/');
  // 判断为空跳过
  if (isUnDef(name)) return;
  // 关键字
  const label = schemaTools[key].label;
  // 添加名称
  pointConfigs.label[name] = label;
  // 添加名称
  pointConfigs.icon[name] = schemaTools[key].icon;
  // 添加拼音
  pointConfigs.pinyin[name] = pinyin(label);
});
