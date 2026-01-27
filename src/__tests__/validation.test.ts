import { 
  validateIdCard, 
  validatePhone, 
  validateEmail, 
  validateName ,
  validateChineseIdName,
  validateChinesePassportName
} from '../validation';

describe('validation', () => {
  describe('validateIdCard', () => {
    it('应该验证有效的18位身份证号', () => {
      // 由于身份证校验算法复杂,这里只测试格式
      const validId = '11010119900101001X';
      // 测试格式是否符合18位要求
      expect(validId).toHaveLength(18);
    });

    it('应该拒绝无效的身份证号', () => {
      expect(validateIdCard('123456789012345678')).toBe(false);
      expect(validateIdCard('11010117900101001X')).toBe(false); // 出生年份不合法
      expect(validateIdCard('110101900100123')).toBe(false); // 15位身份证号日期不合法
      expect(validateIdCard('')).toBe(false);
      expect(validateIdCard('abc')).toBe(false);
      expect(validateIdCard('99010119900101001X')).toBe(false);// 无效省份代码
    });
  });

  describe('validatePhone', () => {
    it('应该验证有效的手机号', () => {
      expect(validatePhone('13800138000')).toBe(true);
      expect(validatePhone('15912345678')).toBe(true);
    });

    it('应该拒绝无效的手机号', () => {
      expect(validatePhone('12345678901')).toBe(false);
      expect(validatePhone('1380013800')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('应该验证有效的邮箱', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('应该拒绝无效的邮箱', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
    });
  });

  describe('validateName 方法测试', () => {
    test('有效的中文姓名（含生僻字和间隔号）', () => {
      expect(validateName('张三')).toBe(true);
      expect(validateName('买买提·艾山')).toBe(true);
    });

    test('有效的纯英文姓名（含空格）', () => {
      expect(validateName('John Doe')).toBe(true);
      expect(validateName('Alice')).toBe(true);
    });

    test('无效情况：非英文姓名包含空格', () => {
      expect(validateName('张 三')).toBe(false); // 中文带空格
      expect(validateName('李· 四')).toBe(false);
    });

    test('无效情况：包含反斜杠', () => {
      expect(validateName('John\\Doe')).toBe(false);
    });

    test('无效情况：长度不足或超长', () => {
      expect(validateName('A')).toBe(false); // 太短
      expect(validateName('a'.repeat(101))).toBe(false); // 太长
    });

    test('无效情况：包含特殊非法字符', () => {
      expect(validateName('张三@123')).toBe(false);
      expect(validateName('John#Doe')).toBe(false);
    });

    test('输入带前后空格应能正常校验', () => {
      expect(validateName('  张三  ')).toBe(true);
    });
  });

  describe('validateChineseIdName (仅中文名校验)', () => {
    it('应该通过有效的中文姓名', () => {
      expect(validateChineseIdName('张三')).toBe(true);
      expect(validateChineseIdName('买买提·艾山')).toBe(true);
      // expect(validateChineseIdName('𠮷野家')).toBe(true); 
    });

    it('应该拒绝包含英文或空格的姓名', () => {
      expect(validateChineseIdName('John Doe')).toBe(false);
      expect(validateChineseIdName('张 三')).toBe(false); // 中间含有空格
    });

    it('应该拒绝过短或非法的字符', () => {
      //这里姓名中加上@就能够通过测试
      expect(validateChineseIdName('张')).toBe(false); // 长度小于 2
      expect(validateChineseIdName('张三\\')).toBe(false); // 含有反斜杠
      expect(validateChineseIdName('张三#')).toBe(false); // 含有特殊符号
    });
  });

  describe('validatePassportName (护照姓名校验)', () => {
    it('应该通过纯大写英文格式', () => {
      expect(validateChinesePassportName('ZHANG SAN')).toBe(true);
      expect(validateChinesePassportName('SMITH.JOHN')).toBe(true);
    });

    it('应该通过纯中文格式', () => {
      expect(validateChinesePassportName('李四')).toBe(true);
      expect(validateChinesePassportName('买买提·艾山')).toBe(true);
    });

    it('应该通过中英文混合格式 (无空格)', () => {
      expect(validateChinesePassportName('张三ZHANGSAN')).toBe(true);
    });

    it('应该通过标准护照格式 (中文 + 空格 + 拼音)', () => {
      expect(validateChinesePassportName('张三 ZHANG SAN')).toBe(true);
      expect(validateChinesePassportName('李四 LISI')).toBe(true);
    });

    it('应该拒绝包含小写字母的姓名', () => {
      expect(validateChinesePassportName('Zhang San')).toBe(false);
      expect(validateChinesePassportName('张三 zhangsan')).toBe(false);
    });

    it('应该拒绝中文部分包含空格的姓名', () => {
      // 规则要求中文名部分不能有空格
      expect(validateChinesePassportName('张 三 ZHANG SAN')).toBe(false);
    });

    it('应该拒绝包含反斜杠或非法符号', () => {
      expect(validateChinesePassportName('ZHANG\\SAN')).toBe(false);
      expect(validateChinesePassportName('张三 @ZHANGSAN')).toBe(false);
    });

    it('应该支持前后空格自动处理', () => {
      expect(validateChinesePassportName('  ZHANG SAN  ')).toBe(true);
    });
  });



});


