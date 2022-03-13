import type { Component } from 'vue';
import type { PointInfo } from '../../../../../lib/interface/Activity';
import { usePinYin } from '/@/hooks/web/usePinYin';
import { isArray, isUndefined } from '/@/utils/is';
// 视图内容
const moduleViewSource = import.meta.globEager('./**/index.vue');
// 模型工具
const schemaTools = import.meta.globEager('./**/schema.ts');

interface PointConfigs {
  label: Recordable<string | Recordable<string>>;

  icon: Recordable<string>;

  pinyin: Recordable<string>;

  visible: Recordable<boolean>;

  trigger: Recordable<'click' | 'drag'>;
}

// 模块列表
export const moduleView: Recordable<Component> = {};
// 模块集合
export const moduleMuster: Recordable<string[]> = {};
// 模型工具
export const moduleSchema: Indexable<Required<PointInfo>> = {};

// 分类 中文 和 图标
export const baseConfigs: PointConfigs = {
  label: {
    base: '基础',
    layout: '布局'
  },
  icon: {},
  pinyin: {},
  visible: {},
  trigger: {}
};

Object.keys(moduleViewSource).forEach((key) => {
  // 读取文件名称
  const [group, belong] = key.replace(/\.\/|.index.vue/g, '').split('/');
  // 唯一值
  const only = `${group}-${belong}`;
  // 设置数组
  !isArray(moduleMuster[group]) && (moduleMuster[group] = []);
  // 添加模块
  moduleView[only] = moduleViewSource[key].default;
  // 添加数据
  moduleMuster[group].push(only);
});

Object.keys(schemaTools).forEach((key) => {
  // 读取文件名称
  const [group, belong] = key.replace(/\.\/|\.schema\.ts/g, '').split('/');
  // 判断为空跳过
  if (isUndefined(belong)) return;
  // 唯一值
  const only = `${group}-${belong}`;
  // 关键字
  const label = schemaTools[key].label;
  // 可见
  const visible = schemaTools[key].visible;
  // 方式
  const trigger = schemaTools[key].trigger;
  // 添加名称
  baseConfigs.label[only] = label;
  // 添加名称
  baseConfigs.icon[only] = schemaTools[key].icon;
  // 添加拼音
  baseConfigs.pinyin[only] = usePinYin(label);
  // 是否可见
  baseConfigs.visible[only] = isUndefined(visible) || visible ? true : false;
  // 触发方式
  baseConfigs.trigger[only] = (isUndefined(trigger) && 'drag') || trigger;
  // 模块数据信息
  moduleSchema[only] = schemaTools[key].schema;
});
