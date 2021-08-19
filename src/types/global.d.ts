/* eslint-disable @typescript-eslint/no-explicit-any */
declare type Indexable<T = unknown> = {
  [key: string]: T;
};

declare type Recordable<T extends any = any> = Record<string, T>;

declare type Callback = () => void;

declare type OnUploadProgress = (event: { loaded: number; total: number }) => void;
