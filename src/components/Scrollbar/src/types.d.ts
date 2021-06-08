export interface BarMap {
  vertical: BarMapItem
  horizontal: BarMapItem
}

export interface BarMapItem {
  offset: string
  scroll: string
  scrollSize: string
  size: 'height' | 'width'
  key: string
  axis: string
  client: string
  direction: string
}
