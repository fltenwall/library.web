import { getGlobEnvConfig } from '/@/utils/globEnvConfig'
import { GlobConfig } from '/@/types/config'

const { BASE_URL, VITE_AUTH, VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_TITLE } = getGlobEnvConfig()

export function useSetting(): GlobConfig {
  return {
    auth: JSON.parse(VITE_AUTH),
    title: VITE_GLOB_APP_TITLE,
    shortTitle: VITE_GLOB_APP_SHORT_TITLE,
    publicPath: BASE_URL
  }
}
