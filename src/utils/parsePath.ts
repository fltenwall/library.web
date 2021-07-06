/* eslint-disable @typescript-eslint/no-explicit-any */

// 解析路径

const bailRE = /[^\w.$]/

export default function (path: string): void | ((obj: any) => void) {
  if (bailRE.test(path)) return
  const segments = path.split('.')
  return (target: any) => {
    for (let i = 0; i < segments.length; i++) {
      if (!target) return
      target = target[segments[i]]
    }
    return target
  }
}
