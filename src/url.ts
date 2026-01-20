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
 * 获取地址栏里所有参数的键值对
 */
export const formatUrl = (urlStr?: string): Record<string, string> => {
  if (!(typeof urlStr === 'string' && urlStr.length)) urlStr = window.location.href;
  const data: Record<string, string> = {};

  // 尝试使用 URL API 解析（适用于标准 URL）
  try {
    const urlObj = new URL(urlStr);

    // 主查询参数
    urlObj.searchParams.forEach((value, key) => {
      // 处理 '+' 代表空格的情况，再解码
      data[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
    });

    // hash 中可能包含查询参数，形如 #/path?x=1&y=2 或 #x=1&y=2
    const hash = urlObj.hash ? urlObj.hash.slice(1) : '';
    if (hash) {
      const qIndex = hash.indexOf('?');
      const hashQuery = qIndex >= 0 ? hash.slice(qIndex + 1) : hash;
      if (hashQuery) {
        const params = new URLSearchParams(hashQuery);
        params.forEach((value, key) => {
          data[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
        });
      }
    }

    return data;
  } catch (e) {
    // 回退到正则解析，支持非完整 URL 或简单查询字符串
    const reg = /(?:^|[?&]+)([^&=]+)(?:=([^&]*))?/g;
    let match: RegExpExecArray | null;
    while ((match = reg.exec(urlStr)) !== null) {
      const key = decodeURIComponent(match[1]);
      const value = match[2] !== undefined ? decodeURIComponent(match[2].replace(/\+/g, ' ')) : '';
      data[key] = value;
    }
    return data;
  }
};

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
