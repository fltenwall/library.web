import PinYin from 'pinyin';

// 拼音
export const usePinYin = (text: string): string => {
  return PinYin(text, { style: PinYin.STYLE_NORMAL }).flat().join('');
};
