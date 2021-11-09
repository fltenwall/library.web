/* eslint-disable @typescript-eslint/no-explicit-any */
declare type Indexable<T = unknown> = {
  [key: string]: T;
};

declare type Recordable<T = any> = Record<string, T>;

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

declare function MixinUseMoment(date: string, value?: string) {};

declare const MixinPageMode: { error: -1; view: 0; edit: 1; new: 2 };

declare const MixinPageEnum: { BASE_LOGIN: string };
