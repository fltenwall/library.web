export interface GlobEnvConfig {
  // 路由
  BASE_URL: string;

  // 权限
  VITE_AUTH: string;

  // 标题
  VITE_GLOB_APP_TITLE: string;

  // 短标题
  VITE_GLOB_APP_SHORT_TITLE: string;
}

export interface GlobConfig {
  // 标题
  title: string;

  // 路由
  publicPath: string;

  // 短标题
  shortTitle: string;

  // 权限
  auth: boolean;
}
