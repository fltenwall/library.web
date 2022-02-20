import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  layout: string;

  bgColor: string;

  paddingTop: number;

  paddingLeft: number;

  paddingRight: number;

  borderRadius: string;

  widgetMarginTop: number;

  widgetRadius: string;

  widgetBorderColor: string;

  widgetBorderWidth: string;

  widgetbgColor: string;

  widgetHeight: number;

  labelColor: string;

  labelMarginRight: number;

  labelMarginLeft: number;

  labelMarginBottom: number;

  labelSize: number;

  labelWeight: number;

  labelWidth: number;

  labelAlign: 'left' | 'right' | 'center';

  entryColor: string;

  entrySize: number;

  entryRadius: string;

  entryMarginLeft: number;

  entryMarginRight: number;

  entryPaddingLeft: number;

  entryPaddingRight: number;

  entryBorderColor: string;

  entryBorderWidth: string;

  list: { type: string; key: string; label: string; placeholder: string }[];
}

export const schema: Schema = {
  height: 80,

  width: 375,

  layout: 'horizontal',

  bgColor: '#fff',

  paddingTop: 0,

  paddingLeft: 0,

  paddingRight: 0,

  borderRadius: '0',

  widgetMarginTop: 0,

  widgetRadius: '0',

  widgetBorderColor: '#000',

  widgetBorderWidth: '',

  widgetbgColor: '#fff',

  widgetHeight: 32,

  labelColor: '#000',

  labelMarginRight: 0,

  labelMarginLeft: 0,

  labelMarginBottom: 0,

  labelSize: 12,

  labelWeight: 5,

  labelWidth: 50,

  labelAlign: 'left',

  entryColor: '#000',

  entrySize: 12,

  entryRadius: '',

  entryMarginLeft: 0,

  entryMarginRight: 0,

  entryPaddingLeft: 0,

  entryPaddingRight: 0,

  entryBorderColor: '',

  entryBorderWidth: '',

  list: []
};

export const label = { template: '表单', button: '按钮' };

export const icon = 'ant-design:form-outlined';
