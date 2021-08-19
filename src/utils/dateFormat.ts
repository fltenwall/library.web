import moment from 'moment';

//  xxxx年x月x日 xx:xx
export function useFromatlll(date: string): string {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

export function useMoment(date: string, value = 'YYYY年MM月DD日 HH:mm'): string {
  return moment(date).format(value);
}

export function useBlessing(): string {
  const curTime = Math.floor(Number(moment().format('H')) / 6) as 0 | 1 | 2 | 3;
  const timeMap = {
    0: '夜已深，要注意休息哦！',
    1: '早上好，美好的一天开始啦~',
    2: '中午好, 放松一下心情吧~',
    3: '祝你开心每一天！'
  };
  return timeMap[curTime];
}
