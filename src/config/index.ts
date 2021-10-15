import logo from '/@/assets/svg/logo.svg';
import { useSetting } from '/@/hooks/core/useSetting';

const { title, publicPath, shortTitle, auth } = useSetting();

/**
 *  系统配置文件可用于设置使用系统运行的参数
 **/

export interface Config {
  title: string;

  shortTitle: string;

  logo: string;

  publicPath: string;

  theme: 'dark' | 'light' | undefined;

  menuWidth: number;

  collapsed: boolean;

  collapsedWidth: number;

  max: number;

  auth: boolean;

  preview: string;
}

const config: Config = {
  // 系统名称
  title: title,

  // 短系统标题
  shortTitle: shortTitle,

  // logo
  logo: logo,

  // 路由
  publicPath: publicPath,

  // 主题
  theme: 'light',

  // 菜单宽度
  menuWidth: 230,

  // 菜单是否收起状态
  collapsed: false,

  // 收缩宽度
  collapsedWidth: 49,

  // 缓存最大数量
  max: 2,

  // 权限
  auth: auth,

  // 预览前缀
  preview: '/epi/storage/preview/'
};

export default config;
