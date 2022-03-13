import type { Component } from 'vue';
import type { PointInfo } from '../../../../../lib/interface/Activity';
import { usePinYin } from '/@/hooks/web/usePinYin';
import { isArray, isUndefined } from '/@/utils/is';

interface PointConfigs {
  label: Recordable<string | Recordable<string>>;

  icon: Recordable<string>;

  pinyin: Recordable<string>;

  visible: Recordable<boolean>;

  trigger: Recordable<'click' | 'drag'>;
}

// 视图内容
const moduleViewSource = import.meta.globEager('./**/index.vue');
// 模型工具
const schemaTools = import.meta.globEager('./**/schema.ts');
// 操作
const moduleActionSource = import.meta.globEager('./**/template.vue');
// 操作 扩展
const moduleActionExtendSource = import.meta.globEager('./**/template/**.vue');

// 模块集合
export const moduleMuster: Recordable<string[]> = {};
// 模块列表
export const moduleView: Recordable<Component> = {};
// 模型工具
export const moduleSchema: Indexable<Required<PointInfo>> = {};
// 操作数据
export const moduleAction: Recordable<Component> = {};
// 操作数据扩展
export const moduleActionExtend: Recordable<{ template: Component; name: string }[]> = {};

// 分类 中文 和 图标
export const baseConfigs: PointConfigs = {
  label: {
    base: '基础控件',
    form: '页面配置',
    media: '媒体控件',
    chart: '图表控件',
    subsidiary: '辅助控件',
    entry: '输入控件',
    attr: '属性',
    config: '配置'
  },
  icon: {
    base: 'ant-design:appstore-outlined',
    media: 'cil:media-play',
    chart: 'ant-design:pie-chart-outlined',
    subsidiary: 'ant-design:tool-outlined',
    entry: 'ant-design:form-outlined'
  },
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

Object.keys(moduleActionSource).forEach((key) => {
  // 读取文件名称
  const [group, belong] = key.replace(/\.\/|.template\.vue/g, '').split('/');
  // 唯一值
  const only = `${group}-${belong}`;
  // 添加模型
  moduleAction[only] = moduleActionSource[key].default;
});

Object.keys(moduleActionExtendSource).forEach((key) => {
  // 读取文件名称
  const [group, belong, , name] = key.replace(/\.\/|\.vue/g, '').split('/');
  // 唯一值
  const only = `${group}-${belong}`;

  if (isUndefined(moduleActionExtend[only])) {
    moduleActionExtend[only] = [];
  }

  moduleActionExtend[only].push({ template: moduleActionExtendSource[key].default, name });
});
