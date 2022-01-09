import { isUndefined, isNull } from '/@/utils/is';

interface ConfigProvide {
  transformCellText: ({ text }: { text: string }) => string;
}

export function useConfigProvider(): ConfigProvide {
  function transformCellText({ text }: { text: string }) {
    if (isNull(text) || isUndefined(text)) {
      return '-';
    }
    return text;
  }
  return {
    transformCellText
  };
}
