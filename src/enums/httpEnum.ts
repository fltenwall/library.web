export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',

  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded',

  // form-data  upload
  FORM_DATA = 'multipart/form-data'
}

export enum ResultEnum {
  // 成功状态码
  SUCCESS = 200,

  // 成功状态信息
  SUCCESSMSG = 'OK',

  // 登录过期
  OVERDUECODE = 4002
}
