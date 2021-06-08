import { menuEnum } from '/@/enums/menuEnum'

export interface DropMenu {
  to?: string
  icon?: string
  event: string | number
  text: string
  disabled?: boolean
  divider?: boolean
}

export function getActions(): DropMenu[] {
  const CLOSE_LEFT: DropMenu = {
    icon: 'ant-design:pic-left-outlined',
    event: menuEnum.CLOSE_LEFT,
    text: '关闭左侧',
    disabled: false,
    divider: false
  }
  const CLOSE_RIGHT: DropMenu = {
    icon: 'ant-design:pic-right-outlined',
    event: menuEnum.CLOSE_RIGHT,
    text: '关闭右侧',
    disabled: false,
    divider: true
  }
  const CLOSE_OTHER: DropMenu = {
    icon: 'ant-design:pic-center-outlined',
    event: menuEnum.CLOSE_OTHER,
    text: '关闭其他',
    disabled: false
  }
  const CLOSE_ALL: DropMenu = {
    icon: 'ant-design:line-outlined',
    event: menuEnum.CLOSE_ALL,
    text: '关闭全部',
    disabled: false
  }
  return [CLOSE_LEFT, CLOSE_RIGHT, CLOSE_OTHER, CLOSE_ALL]
}
