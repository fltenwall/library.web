import { notification } from 'ant-design-vue';
import { ArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';

export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(args: ArgsProps): void;
  close(key: string): void;
  config(options: ConfigProps): void;
  destroy(): void;
}

export const useMessage = (): { notification: NotifyApi } => {
  return {
    notification: notification as NotifyApi
  };
};
