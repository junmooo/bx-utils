/**
 * 本地存储封装
 */
export const storage = {
  /**
   * 设置localStorage
   * @param key 键名
   * @param value 值
   * @param expire 过期时间（毫秒）
   */
  set(key: string, value: any, expire?: number): void {
    const data = {
      value,
      expire: expire ? Date.now() + expire : null,
    };
    localStorage.setItem(key, JSON.stringify(data));
  },

  /**
   * 获取localStorage
   * @param key 键名
   * @returns 值
   */
  get<T = any>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;

    try {
      const data = JSON.parse(item);
      if (data.expire && Date.now() > data.expire) {
        localStorage.removeItem(key);
        return null;
      }
      return data.value;
    } catch {
      return null;
    }
  },

  /**
   * 移除localStorage
   * @param key 键名
   */
  remove(key: string): void {
    localStorage.removeItem(key);
  },

  /**
   * 清空localStorage
   */
  clear(): void {
    localStorage.clear();
  },
};

/**
 * Cookie操作
 */
export const cookie = {
  /**
   * 设置cookie
   * @param name 名称
   * @param value 值
   * @param days 有效天数
   */
  set(name: string, value: string, days?: number): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },

  /**
   * 获取cookie
   * @param name 名称
   * @returns 值
   */
  get(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  /**
   * 删除cookie
   * @param name 名称
   */
  remove(name: string): void {
    document.cookie = name + '=; Max-Age=-99999999;';
  },
};
