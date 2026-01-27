import {
  maskChineseName,
  maskEnglishName,
  maskName,
  maskCompanyName,
  maskIdCard,
  maskPhone,
  maskGeneric,
} from '../mask';

describe('mask (数据掩码工具类)', () => {
  describe('maskChineseName (中文姓名掩码)', () => {
    it('正常掩码：保留姓，其余打*号', () => {
      expect(maskChineseName('张三')).toBe('张*');
      expect(maskChineseName('张小三')).toBe('张**');
      expect(maskChineseName('欧阳修')).toBe('欧**');
    });

    it('异常情况：空字符串、null、undefined 应该返回 "-"', () => {
      expect(maskChineseName('')).toBe('-');
      expect(maskChineseName(null as any)).toBe('-');
      expect(maskChineseName(undefined as any)).toBe('-');
    });

    it('边界情况：单个字符的姓名不掩码', () => {
      expect(maskChineseName('张')).toBe('张');
    });
  });

  describe('maskEnglishName (英文姓名掩码)', () => {
    it('正常掩码：保留首字母，其余打*号', () => {
      expect(maskEnglishName('Alice')).toBe('A****');
      expect(maskEnglishName('Bob')).toBe('B**');
      expect(maskEnglishName('ZHANGSAN')).toBe('Z*******');
    });

    it('异常情况：空值处理', () => {
      expect(maskEnglishName('')).toBe('-');
      expect(maskEnglishName(null as any)).toBe('-');
    });

    it('边界情况：单个字母不掩码', () => {
      expect(maskEnglishName('A')).toBe('A');
    });
  });

  describe('maskName (智能姓名掩码)', () => {
    it('自动识别中文并掩码', () => {
      expect(maskName('李四')).toBe('李*');
    });

    it('自动识别英文并掩码', () => {
      expect(maskName('John')).toBe('J***');
    });

    it('混合字符处理（优先判断包含中文）', () => {
      // 如果包含中文，按中文逻辑处理 (保留首字符)
      expect(maskName('张John')).toBe('张****');
    });

    it('空值处理', () => {
      expect(maskName('')).toBe('-');
    });
  });

  describe('maskCompanyName (公司名称掩码)', () => {
    it('正常掩码：保留首位字符', () => {
      expect(maskCompanyName('华为技术有限公司')).toBe('华*******');
      expect(maskCompanyName('Apple Inc.')).toBe('A*********');
    });

    it('边界情况：单字符名称', () => {
      expect(maskCompanyName('A')).toBe('A');
      expect(maskCompanyName('中')).toBe('中');
    });

    it('空值处理', () => {
      expect(maskCompanyName('')).toBe('-');
    });
  });

  describe('maskIdCard (证件号码掩码)', () => {
    it('正常掩码：前3后2明文，中间掩码', () => {
      expect(maskIdCard('370101199001011234')).toBe('370*************34');
      expect(maskIdCard('1234567890')).toBe('123*****90');
    });

    it('边界情况：长度小于或等于5位不掩码', () => {
      expect(maskIdCard('12345')).toBe('12345');
      expect(maskIdCard('123')).toBe('123');
    });

    it('空值处理', () => {
      expect(maskIdCard('')).toBe('-');
    });
  });

  describe('maskPhone (手机号掩码)', () => {
    it('正常掩码：前3后3明文，中间掩码', () => {
      expect(maskPhone('13812345678')).toBe('138*****678');
      expect(maskPhone('010-12345')).toBe('010***345');
    });

    it('边界情况：长度小于或等于6位不掩码', () => {
      expect(maskPhone('123456')).toBe('123456');
      expect(maskPhone('1234')).toBe('1234');
    });

    it('空值处理', () => {
      expect(maskPhone('')).toBe('-');
    });
  });

  describe('maskGeneric (通用掩码工具)', () => {
    it('默认参数：前3后2明文 (当前行为：长度不足时返回 原串+掩码)', () => {
      // 注意：当前代码 maskGeneric('abc', 3, 2) 会返回 'abc' + '**' = 'abc**'
      // 因为 3 <= 3 + 2 且代码写的是 str.substring(0) + '*'.repeat(len-1)
      expect(maskGeneric('abcdefg')).toBe('abc**fg');
    });

    it('自定义参数：前1后1', () => {
      expect(maskGeneric('abcdefg', 1, 1)).toBe('a*****g');
    });

    it('自定义参数：只有前缀，无后缀 (endLen=0)', () => {
      expect(maskGeneric('123456', 2, 0)).toBe('12****');
    });

    it('特殊情况：长度不足时的行为验证', () => {
      // 验证当前代码中的特殊补齐逻辑: str.substring(0) + '*'.repeat(len-1)
      expect(maskGeneric('123', 3, 2)).toBe('123**');
    });

    it('空值处理', () => {
      expect(maskGeneric('')).toBe('-');
      expect(maskGeneric(null as any)).toBe('-');
    });
  });
});

