interface RulesOptions {
  // 枚举类型
  enum?: string;

  // 字段长度
  len?: number;

  // 最大长度
  max?: number;

  // 	校验文案
  message?: string;

  // 	最小长度
  min?: number;

  // 正则表达式校验
  pattern?: RegExp;

  // 是否必选
  required?: boolean;

  // 校验前转换字段值
  transform?: (value: unknown) => unknown;

  // 内建校验类型
  type?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'method'
    | 'regexp'
    | 'integer'
    | 'float'
    | 'object'
    | 'enum'
    | 'date'
    | 'url'
    | 'hex'
    | 'email';

  // 自定义校验（注意，callback 必须被调用）
  validator?: (rule: unknown, value: unknown, callback: (error?: string) => void) => Promise<void>;

  // 必选时，空格是否会被视为错误
  whitespace?: boolean;

  trigger?: 'blur' | 'change';
}

export interface FromRules {
  [key: string]: RulesOptions[];
}
