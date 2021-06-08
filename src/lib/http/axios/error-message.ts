let httpErrorCodes: Map<number, string> = new Map()
  .set(401, '帐号或密码错误')
  .set(403, '没有权限')
  .set(500, '服务器未知错误')
  .set(404, '找不到请求api接口')
  .set(413, '数据量太大，无法处理')

/**
 * 检查请求是否错误并返回错误说明，如果不是错误则返回null
 */
export function checkRequestErrorMessage(code: number): string | null {
  let message = httpErrorCodes.get(code)

  if (message) return message

  return '服务 API 接口返回未知错误'
}
