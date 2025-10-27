import {
  isEmpty,
  capitalize,
  camelToSnake,
  snakeToCamel,
  truncate,
  stripHtml,
  escapeHtml,
  unescapeHtml,
} from '../string';

describe('string', () => {
  describe('isEmpty', () => {
    it('应该判断空字符串', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('  ')).toBe(true);
      expect(isEmpty('\t\n')).toBe(true);
    });

    it('应该判断非空字符串', () => {
      expect(isEmpty('hello')).toBe(false);
      expect(isEmpty(' hello ')).toBe(false);
    });

    it('应该处理 null 和 undefined', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
    });
  });

  describe('capitalize', () => {
    it('应该首字母大写', () => {
      expect(capitalize('hello world')).toBe('Hello world');
      expect(capitalize('HELLO')).toBe('Hello');
    });

    it('应该处理空字符串', () => {
      expect(capitalize('')).toBe('');
    });
  });

  describe('camelToSnake', () => {
    it('应该驼峰转下划线', () => {
      expect(camelToSnake('helloWorld')).toBe('hello_world');
      expect(camelToSnake('getUserInfo')).toBe('get_user_info');
    });
  });

  describe('snakeToCamel', () => {
    it('应该下划线转驼峰', () => {
      expect(snakeToCamel('hello_world')).toBe('helloWorld');
      expect(snakeToCamel('get_user_info')).toBe('getUserInfo');
    });
  });

  describe('truncate', () => {
    it('应该截断字符串', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...');
      expect(truncate('Hello', 10)).toBe('Hello');
    });

    it('应该使用自定义后缀', () => {
      expect(truncate('Hello World', 5, '---')).toBe('Hello---');
    });
  });

  describe('stripHtml', () => {
    it('应该移除HTML标签', () => {
      expect(stripHtml('<p>Hello <b>World</b></p>')).toBe('Hello World');
      expect(stripHtml('<div>Test</div>')).toBe('Test');
    });
  });

  describe('escapeHtml', () => {
    it('应该转义HTML特殊字符', () => {
      expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
      expect(escapeHtml('a & b')).toBe('a &amp; b');
      expect(escapeHtml('"test"')).toBe('&quot;test&quot;');
    });
  });

  describe('unescapeHtml', () => {
    it('应该反转义HTML特殊字符', () => {
      expect(unescapeHtml('&lt;div&gt;')).toBe('<div>');
      expect(unescapeHtml('a &amp; b')).toBe('a & b');
      expect(unescapeHtml('&quot;test&quot;')).toBe('"test"');
    });
  });
});
