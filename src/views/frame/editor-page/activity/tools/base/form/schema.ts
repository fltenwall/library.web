import type { PointInfo } from '/@/lib/interface/PointInfo';

export interface Schema extends PointInfo {
  layout: string;

  bgColor: string;

  paddingTop: number;

  paddingLeft: number;

  paddingRight: number;

  borderRadius: string;

  title: string;

  titleColor: string;

  titleSize: number;

  titleWeight: number;

  titleAlign: 'left' | 'right' | 'center';

  titlePaddingBottom: number;

  buttonText: string;

  buttonBgColor: string;

  buttonMarginTop: number;

  buttonMarginLeft: number;

  buttonMarginRight: number;

  buttonHeight: number;

  buttonSize: number;

  buttonWeight: number;

  buttonRadius: number;

  buttonColor: string;

  method: string;

  apiLink: string;

  widgetMarginTop: number;

  widgetRadius: string;

  widgetBorderColor: string;

  widgetBorderWidth: number;

  widgetbgColor: string;

  widgetHeight: number;

  labelColor: string;

  labelMarginRight: number;

  labelSize: number;

  labelWeight: number;

  labelWidth: number;

  labelAlign: 'left' | 'right' | 'center';

  entryColor: string;

  entrySize: number;

  entryMarginLeft: number;

  entryMarginRight: number;

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

  title: '表单',

  titleColor: '#000',

  titleSize: 18,

  titleWeight: 5,

  titleAlign: 'left',

  titlePaddingBottom: 0,

  buttonText: '提交',

  buttonBgColor: '#1628D4',

  buttonMarginTop: 0,

  buttonMarginLeft: 0,

  buttonMarginRight: 0,

  buttonHeight: 32,

  buttonSize: 12,

  buttonWeight: 5,

  buttonRadius: 0,

  buttonColor: '#fff',

  method: 'POST',

  apiLink: '',

  widgetMarginTop: 0,

  widgetRadius: '0',

  widgetBorderColor: '#000',

  widgetBorderWidth: 1,

  widgetbgColor: '#fff',

  widgetHeight: 32,

  labelColor: '#000',

  labelMarginRight: 0,

  labelSize: 12,

  labelWeight: 5,

  labelWidth: 50,

  labelAlign: 'left',

  entryColor: '#000',

  entrySize: 12,

  entryMarginLeft: 0,

  entryMarginRight: 0,

  list: []
};

export const label = { template: '表单', button: '按钮' };

export const icon = 'ant-design:form-outlined';
