const templateTools = import.meta.globEager('./**/template.vue');

export const templateList: { [prop: string]: unknown } = {};

Object.keys(templateTools).forEach((key) => {
  // 读取文件名称
  const [, name] = key.replace(/\.\/|.schema.vue/g, '').split('/');
  // 添加模型
  templateList[`${name}-point`] = templateTools[key].default;
});
