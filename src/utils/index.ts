/**
 * 获取图片尺寸大小
 * @param file
 * @returns
 */
export const loadImageSize = (src: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    // 加载图片获取图片真实宽度和高度
    const image = new Image();

    image.addEventListener('load', () => resolve({ width: image.width, height: image.height }));

    image.src = src;
  });
};
