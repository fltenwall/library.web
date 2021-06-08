import { Register } from '/@/api/security'
import { rules } from '/@/utils/regExp'

type DataContent = (field: keyof Register, type: 'input' | 'blur') => void

type Type = 'input' | 'blur'

export function validDataContent(dataItem: Register, errorTip: Register): DataContent {
  return (field: keyof Register, type: Type) => {
    const mapState = {
      username: () => {
        if (!dataItem.username) {
          errorTip.username = ''
        } else if (!rules.username.test(dataItem.username)) {
          errorTip.username = '您不能使用该账户注册'
        } else {
          errorTip.username = ''
        }
      },
      email: () => {
        if ((type === 'input' && dataItem.email) || !dataItem.email) {
          errorTip.email = ''
        } else if (type === 'blur' && !rules.email.test(dataItem.email)) {
          errorTip.email = '请输入正确的邮箱地址'
        }
      },
      mobile: () => {
        if ((type === 'input' && dataItem.mobile) || !dataItem.mobile) {
          errorTip.mobile = ''
        } else if (type === 'blur' && !rules.telephone.test(dataItem.mobile)) {
          errorTip.mobile = '请输入正确的手机号码'
        }
      },
      password: () => {
        if ((type === 'input' && dataItem.password) || !dataItem.password) {
          errorTip.password = ''
        } else if (type === 'blur' && dataItem.password.length < 6) {
          errorTip.password = '至少包含6个字符'
        } else if (type === 'blur') {
          errorTip.password = ''
          mapState['repeat']()
        }
      },
      repeat: () => {
        if (type === 'input') {
          if (!dataItem.password || !dataItem.repeat) {
            errorTip.repeat = ''
          } else {
            const character = dataItem.repeat.replace(/(\*|\.|\?|\+|\$|\^|\[|\]|\(|\)|\{|\}|\||\\|\/)/g, '\\$1')
            if (!new RegExp(`^${character}.*`).test(dataItem.password)) {
              errorTip.repeat = '两次输入的密码不一致'
            } else {
              errorTip.repeat = ''
            }
          }
        } else if (type === 'blur') {
          if (dataItem.repeat && dataItem.password && dataItem.password !== dataItem.repeat) {
            errorTip.repeat = '两次输入的密码不一致'
          } else {
            errorTip.repeat = ''
          }
        }
      }
    }

    mapState[field]()
  }
}
