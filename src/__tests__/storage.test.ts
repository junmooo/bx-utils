/**
 * @jest-environment jsdom
 */
import { storage, cookie } from '../storage';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('set', () => {
    it('应该设置值到 localStorage', () => {
      storage.set('key', 'value');
      expect(localStorage.getItem('key')).toBeTruthy();
    });

    it('应该支持设置过期时间', () => {
      storage.set('key', 'value', 1000);
      const item = localStorage.getItem('key');
      expect(item).toBeTruthy();
    });
  });

  describe('get', () => {
    it('应该获取值', () => {
      storage.set('key', 'value');
      expect(storage.get('key')).toBe('value');
    });

    it('应该处理不存在的键', () => {
      expect(storage.get('nonexistent')).toBeNull();
    });

    it('应该处理过期的值', () => {
      storage.set('key', 'value', -1000);
      expect(storage.get('key')).toBeNull();
    });
  });

  describe('remove', () => {
    it('应该删除值', () => {
      storage.set('key', 'value');
      storage.remove('key');
      expect(storage.get('key')).toBeNull();
    });
  });

  describe('clear', () => {
    it('应该清空所有值', () => {
      storage.set('key1', 'value1');
      storage.set('key2', 'value2');
      storage.clear();
      expect(storage.get('key1')).toBeNull();
      expect(storage.get('key2')).toBeNull();
    });
  });
});

describe('cookie', () => {
  beforeEach(() => {
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date(0).toUTCString() + ';path=/');
    });
  });

  describe('set', () => {
    it('应该设置 cookie', () => {
      cookie.set('key', 'value');
      expect(document.cookie).toContain('key=value');
    });
  });

  describe('get', () => {
    it('应该获取 cookie 值', () => {
      cookie.set('key', 'value');
      expect(cookie.get('key')).toBe('value');
    });

    it('应该处理不存在的 cookie', () => {
      expect(cookie.get('nonexistent')).toBeNull();
    });
  });

  describe('remove', () => {
    it('应该删除 cookie', () => {
      cookie.set('key', 'value');
      cookie.remove('key');
      expect(cookie.get('key')).toBeNull();
    });
  });
});
