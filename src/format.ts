/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数
 * @returns 格式化后的字符串，如 '1.5 MB'
 */
export function formatFileSize(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * 格式化数字，添加千分位分隔符
 * @param num 数字
 * @param separator 分隔符，默认为逗号
 * @returns 格式化后的字符串
 */
export function formatNumber(num: number, separator: string = ','): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * 格式化金额
 * @param amount 金额
 * @param decimals 小数位数
 * @param currency 货币符号
 * @returns 格式化后的金额字符串
 */
export function formatCurrency(
  amount: number,
  decimals: number = 2,
  currency: string = '¥'
): string {
  const fixed = amount.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = formatNumber(parseInt(parts[0]));
  return currency + parts.join('.');
}

/**
 * 将数字转换为中文大写
 * @param num 数字
 * @returns 中文大写字符串
 */
export function numberToChinese(num: number): string {
  const digits = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const units = ['', '拾', '佰', '仟'];
  const bigUnits = ['', '万', '亿'];

  if (num === 0) return '零';
  if (num < 0) return '负' + numberToChinese(-num);

  let result = '';
  let unitIndex = 0;

  while (num > 0) {
    const section = num % 10000;
    if (section !== 0) {
      let sectionStr = '';
      let sectionNum = section;
      let zeroFlag = false;

      for (let i = 0; i < 4 && sectionNum > 0; i++) {
        const digit = sectionNum % 10;
        if (digit === 0) {
          // 只有在非首位且后面还有数字时才需要补零
          if (sectionStr !== '') {
            zeroFlag = true;
          }
        } else {
          sectionStr =
            (zeroFlag ? '零' : '') + digits[digit] + units[i] + sectionStr;
          zeroFlag = false;
        }
        sectionNum = Math.floor(sectionNum / 10);
      }

      result = sectionStr + bigUnits[unitIndex] + result;
    } else if (result !== '') {
      result = '零' + result;
    }

    num = Math.floor(num / 10000);
    unitIndex++;
  }

  return result;
}
