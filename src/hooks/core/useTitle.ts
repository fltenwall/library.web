import config from '/@/config/index'

export function useTitle(value: string): string {
  const title = config.title
  const _title = value ? ` ${value} ● ${title} ` : `${title}`

  return _title
}
