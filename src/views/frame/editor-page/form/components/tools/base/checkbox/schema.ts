import type { PointInfo } from '/@/lib/interface/PointInfo'

export interface CheckboxSchema extends PointInfo {
  label: string
}

export const schema: CheckboxSchema = {
  height: 80,

  width: 300,

  label: ''
}

export const name = '多选框'

export const icon = 'ion:checkbox-outline'
