function getTypeVersion() {
  const userAgent = navigator.userAgent.toLowerCase()

  const browserTypes = {
    IE: /(?:msie|trident.*rv).([\d.]+)/,
    Edge: /edge.([\d.]+)/,
    Chrome: /chrome.([\d.]+)/,
    Firefox: /firefox.([\d.]+)/,
    Opera: /opera.([\d.]+)/,
    Safari: /(?:safari|version).([\d.]+)/
  }

  type BrowserKeys = keyof typeof browserTypes

  /** browser 信息 */
  let type!: BrowserKeys | null

  /** browser 版本 */
  let version!: string | null | Array<string>

  for (type in browserTypes) {
    if ((version = browserTypes[type as BrowserKeys].exec(userAgent))) {
      version = version[1]
      break
    }
  }

  if (!version) {
    type = version = null
  }

  return { type, version }
}

const { type, version } = getTypeVersion()

export function getVersion(): string | null | Array<string> {
  return version
}

export function isIeFn(): boolean {
  return type === 'IE'
}

export function isChromeFn(): boolean {
  return type === 'Chrome'
}

export function isEdgeFn(): boolean {
  return type === 'Edge'
}

export function isSafariFn(): boolean {
  return type === 'Safari'
}

export function isFirefoxFn(): boolean {
  return type === 'Firefox'
}

export function isOperaFn(): boolean {
  return type === 'Opera'
}
