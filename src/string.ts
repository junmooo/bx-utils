/**
 * 判断字符串是否为空（包括空白字符）
 * @param str 字符串
 * @returns boolean
 */
export function isEmpty(str: string | null | undefined): boolean {
  return !str || str.trim().length === 0;
}

/**
 * 首字母大写
 * @param str 字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * 驼峰转下划线
 * @param str 驼峰字符串
 * @returns 下划线字符串
 */
export function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 下划线转驼峰
 * @param str 下划线字符串
 * @returns 驼峰字符串
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * 字符串截断
 * @param str 字符串
 * @param length 截断长度
 * @param suffix 后缀，默认为 '...'
 * @returns 截断后的字符串
 */
export function truncate(
  str: string,
  length: number,
  suffix: string = '...'
): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + suffix;
}

/**
 * 移除HTML标签
 * @param html HTML字符串
 * @returns 纯文本字符串
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * 转义HTML特殊字符
 * @param str 字符串
 * @returns 转义后的字符串
 */
export function escapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * 反转义HTML特殊字符
 * @param str 字符串
 * @returns 反转义后的字符串
 */
export function unescapeHtml(str: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return str.replace(/&(amp|lt|gt|quot|#39);/g, (match) => map[match]);
}
