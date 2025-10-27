/**
 * 获取URL参数
 * @param url URL字符串，默认为当前页面URL
 * @returns 参数对象
 */
export function getUrlParams(url: string = window.location.href): Record<string, string> {
  const params: Record<string, string> = {};
  const urlObj = new URL(url);
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

/**
 * 设置URL参数
 * @param url URL字符串
 * @param params 参数对象
 * @returns 新的URL字符串
 */
export function setUrlParams(url: string, params: Record<string, string>): string {
  const urlObj = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value);
  });
  return urlObj.toString();
}

/**
 * 移除URL参数
 * @param url URL字符串
 * @param keys 要移除的参数键名
 * @returns 新的URL字符串
 */
export function removeUrlParams(url: string, keys: string[]): string {
  const urlObj = new URL(url);
  keys.forEach((key) => {
    urlObj.searchParams.delete(key);
  });
  return urlObj.toString();
}

/**
 * 解析URL
 * @param url URL字符串
 * @returns URL各部分组成的对象
 */
export function parseUrl(url: string) {
  const urlObj = new URL(url);
  return {
    protocol: urlObj.protocol,
    host: urlObj.host,
    hostname: urlObj.hostname,
    port: urlObj.port,
    pathname: urlObj.pathname,
    search: urlObj.search,
    hash: urlObj.hash,
    origin: urlObj.origin,
    params: getUrlParams(url),
  };
}
