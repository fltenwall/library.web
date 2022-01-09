import { isNull } from './is';
/**
 * 将base64转换为文件对象
 * @param base64 base64格式的编码
 * @param getFile 获得 File 的结果吗
 */
export const base64ToFile = (base64: string, name?: string): File | null => {
  const [typeStr, atobStr] = base64.split(',');
  const matchRst = typeStr.match(/:(.*?);/);
  // 判断正则结果 退出
  if (isNull(matchRst)) return null;

  const mime = matchRst[1];
  const bstr = window.atob(atobStr);
  let n = bstr.length;
  const u8Arr = new Uint8Array(n);
  while (n) {
    n -= 1;
    u8Arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8Arr], `${name || mime.replace('/', '.')}`, { type: mime });
};

/**
 * 将文件对象转换为 base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
}
