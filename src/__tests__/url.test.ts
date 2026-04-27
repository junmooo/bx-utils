import { getUrlParams, setUrlParams, removeUrlParams, parseUrl, formatUrl } from '../url';

describe('url', () => {
  describe('getUrlParams', () => {
    it('应该获取URL参数', () => {
      const params = getUrlParams('https://example.com?id=1&name=test');
      expect(params).toEqual({ id: '1', name: 'test' });
    });

    it('应该处理空参数', () => {
      const params = getUrlParams('https://example.com');
      expect(params).toEqual({});
    });

    it('应该处理中文参数', () => {
      const params = getUrlParams('https://example.com?name=%E6%B5%8B%E8%AF%95');
      expect(params.name).toBe('测试');
    });
  });

  describe('setUrlParams', () => {
    it('应该设置URL参数', () => {
      const url = setUrlParams('https://example.com', { id: '1', name: 'test' });
      expect(url).toContain('id=1');
      expect(url).toContain('name=test');
    });

    it('应该覆盖已存在的参数', () => {
      const url = setUrlParams('https://example.com?id=1', { id: '2' });
      expect(url).toContain('id=2');
      expect(url).not.toContain('id=1');
    });
  });

  describe('removeUrlParams', () => {
    it('应该移除指定的参数', () => {
      const url = removeUrlParams('https://example.com?id=1&name=test', ['name']);
      expect(url).toContain('id=1');
      expect(url).not.toContain('name');
    });

    it('应该移除多个参数', () => {
      const url = removeUrlParams('https://example.com?id=1&name=test&age=20', ['name', 'age']);
      expect(url).toContain('id=1');
      expect(url).not.toContain('name');
      expect(url).not.toContain('age');
    });
  });

  describe('parseUrl', () => {
    it('应该解析URL各部分', () => {
      const parsed = parseUrl('https://example.com:8080/path?id=1#hash');
      expect(parsed.protocol).toBe('https:');
      expect(parsed.hostname).toBe('example.com');
      expect(parsed.port).toBe('8080');
      expect(parsed.pathname).toBe('/path');
      expect(parsed.search).toBe('?id=1');
      expect(parsed.hash).toBe('#hash');
      expect(parsed.params).toEqual({ id: '1' });
    });
  });

  describe('formatUrl', () => {
    it('解析查询和 hash 中的参数', () => {
      const url = 'https://example.com/path?x=1&y=2#h=3';
      const res = formatUrl(url);
      expect(res).toEqual({ x: '1', y: '2', h: '3' });
    });

    it('解码编码和 + 为空格', () => {
      const url = 'https://example.com/?a=hello%20world&b=hello+world';
      const res = formatUrl(url);
      expect(res).toEqual({ a: 'hello world', b: 'hello world' });
    });

    it('支持无值参数', () => {
      const url = 'https://example.com/?a&b=2';
      const res = formatUrl(url);
      expect(res).toEqual({ a: '', b: '2' });
    });

    it('解析 hash 中的查询字符串', () => {
      const url = 'https://example.com/#/path?a=1&b=2';
      const res = formatUrl(url);
      expect(res).toEqual({ a: '1', b: '2' });
    });

    it('回退到正则解析非 URL 字符串', () => {
      const str = 'a=1&b=2';
      const res = formatUrl(str as any);
      expect(res).toEqual({ a: '1', b: '2' });
    });
  });
});
