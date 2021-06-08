/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isFunction, isEmptyObject, isEmptyArray, isNumber, isBoolean } from '/@/utils/is'

const isToString = (value: any): false | string | number => {
  if (value) {
    if (isFunction(value)) {
      return `"${value}"`
    } else if (isNumber(value)) {
      return value
    }
    const result = String(value).replace(/(^\s+)|(\s+$)/g, '')
    return result ? `"${value}"` : false
  }
  return false
}

export const stringify = (value: any): false | string | number => {
  const type = typeof value
  if (type !== 'object' || type === null) {
    return isToString(value)
  } else if (isEmptyArray(value)) {
    let json = '['
    for (let i = 0; i < value.length; i++) {
      const result = stringify(value[i])
      if (!isBoolean(result)) {
        json += (i ? ',' : '') + result
      }
    }
    json += ']'
    return json === '[]' ? false : json
  } else if (isEmptyObject(value)) {
    const json = []
    for (const k in value) {
      const result = stringify(value[k])
      if (!isBoolean(result)) {
        json.push(stringify(k) + ':' + stringify(value[k]))
      }
    }
    return json.length ? '{' + json.join(',') + '}' : false
  }
  return false
}
