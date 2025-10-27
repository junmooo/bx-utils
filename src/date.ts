/**
 * 格式化日期
 * @param date 日期对象或时间戳
 * @param format 格式字符串，如 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: Date | number = new Date(),
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  const d = typeof date === 'number' ? new Date(date) : date;

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  const second = d.getSeconds();

  const formatMap: Record<string, string> = {
    YYYY: year.toString(),
    MM: month.toString().padStart(2, '0'),
    M: month.toString(),
    DD: day.toString().padStart(2, '0'),
    D: day.toString(),
    HH: hour.toString().padStart(2, '0'),
    H: hour.toString(),
    mm: minute.toString().padStart(2, '0'),
    m: minute.toString(),
    ss: second.toString().padStart(2, '0'),
    s: second.toString(),
  };

  return format.replace(/YYYY|MM|M|DD|D|HH|H|mm|m|ss|s/g, (match) => formatMap[match]);
}

/**
 * 相对时间
 * @param date 日期对象或时间戳
 * @returns 相对时间字符串，如 '刚刚'、'5分钟前'
 */
export function timeAgo(date: Date | number): string {
  const d = typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return '刚刚';
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`;
  } else if (diff < month) {
    return `${Math.floor(diff / day)}天前`;
  } else if (diff < year) {
    return `${Math.floor(diff / month)}个月前`;
  } else {
    return `${Math.floor(diff / year)}年前`;
  }
}

/**
 * 计算两个日期之间的天数
 * @param date1 日期1
 * @param date2 日期2
 * @returns 天数
 */
export function daysBetween(date1: Date | number, date2: Date | number): number {
  const d1 = typeof date1 === 'number' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'number' ? new Date(date2) : date2;

  const diff = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diff / (24 * 60 * 60 * 1000));
}
