/* eslint-disable @typescript-eslint/no-explicit-any */
declare type Indexable<T = unknown> = {
  [key: string]: T;
};

declare type Recordable<T extends any = any> = Record<string, T>;

declare type Callback = () => void;

declare type OnUploadProgress = (event: { loaded: number; total: number }) => void;

declare type HTMLNULL = HTMLElement | null;

declare type ValueOf<T> = T[keyof T];

declare interface SystemConfig {
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

declare const MixinConfig: SystemConfig;

declare function MixinShowByAuth(auth: string) {};
