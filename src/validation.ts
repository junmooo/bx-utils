/**
 * 身份证号码权重因子
 */
const ID_CARD_WEIGHTS = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

/**
 * 身份证号码校验码
 */
const ID_CARD_CODES = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

/**
 * 校验身份证号码
 * @param idCard 身份证号码
 * @returns boolean 是否有效
 */
export function validateIdCard(ocode: string): boolean {
  let code = ocode.replace(/x/g, "X");
  const city: { [key: string]: string } = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  let pass = true;

  if (code && code != '') {
      if (code.length == 15 && !/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/i.test(code)) {
          // tip = "身份证号格式错误";
          pass = false;
      } else if (code.length != 15 && !/^\d{6}(18|19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{3}(\d|X)$/i.test(code)) {
          // tip = "身份证号格式错误";
          pass = false;
      } else if (!city[code.substring(0, 2)]) {
          // tip = "地址编码错误";
          pass = false;
      } else {
          //18位身份证需要验证最后一位校验位
          if (code.length == 18) {
              const codeArr = code.split('');
              //∑(ai×Wi)(mod 11)
              //加权因子
              let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
              //校验位
              let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
              let sum = 0;
              let ai = 0;
              let wi = 0;
              for (let i = 0; i < 17; i++) {
                  ai = parseInt(codeArr[i]);
                  wi = factor[i];
                  sum += ai * wi;
              }
              if (parity[sum % 11] != codeArr[17]) {
                  // tip = "校验位错误";
                  pass = false;
              }
          }
      }
  } else {
       pass = false;
   }

   return pass;
}

/**
 * 校验中国护照号码
 * 普通护照：E + 8位数字 (2012年后)
 * 旧版护照：G + 8位数字 或 14/15/18位数字
 * @param passport 护照号码
 * @returns boolean 是否有效
 */
export function validatePassport(passport: string): boolean {
  if (!passport || typeof passport !== 'string') {
    return false;
  }

  // 新版普通护照
  const newPassport = /^[Ee]\d{8}$/;
  // 旧版护照
  const oldPassport = /^[Gg]\d{8}$/;
  // 更旧版本的护照
  const veryOldPassport = /^\d{14,18}$/;

  return (
    newPassport.test(passport) ||
    oldPassport.test(passport) ||
    veryOldPassport.test(passport)
  );
}

/**
 * 统一社会信用代码权重因子
 */
const CREDIT_CODE_WEIGHTS = [
  1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28,
];

/**
 * 统一社会信用代码字符集
 */
const CREDIT_CODE_CHARS = '0123456789ABCDEFGHJKLMNPQRTUWXY';

/**
 * 校验统一社会信用代码
 * @param creditCode 统一社会信用代码
 * @returns boolean 是否有效
 */
export function validateCreditCode(creditCode: string): boolean {
  if (!creditCode || typeof creditCode !== 'string') {
    return false;
  }

  // 18位统一社会信用代码
  const reg = /^[0-9A-HJ-NPQRTUWXY]{18}$/;

  if (!reg.test(creditCode)) {
    return false;
  }

  const codeArray = creditCode.split('');
  let sum = 0;

  for (let i = 0; i < 17; i++) {
    const charIndex = CREDIT_CODE_CHARS.indexOf(codeArray[i]);
    if (charIndex === -1) {
      return false;
    }
    sum += charIndex * CREDIT_CODE_WEIGHTS[i];
  }

  const mod = 31 - (sum % 31);
  const checkCode = mod === 31 ? '0' : CREDIT_CODE_CHARS[mod];

  return checkCode === codeArray[17];
}

/**
 * 校验手机号码（中国大陆）
 * @param phone 手机号码
 * @returns boolean 是否有效
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }

  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
}

/**
 * 校验邮箱
 * @param email 邮箱地址
 * @returns boolean 是否有效
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return reg.test(email);
}

/**
 * 校验URL
 * @param url URL地址
 * @returns boolean 是否有效
 */
export function validateURL(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 校验IP地址（IPv4）
 * @param ip IP地址
 * @returns boolean 是否有效
 */
export function validateIPv4(ip: string): boolean {
  if (!ip || typeof ip !== 'string') {
    return false;
  }

  const reg =
    /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  return reg.test(ip);
}

/**
 * 校验银行卡号（Luhn算法）
 * @param cardNumber 银行卡号
 * @returns boolean 是否有效
 */
export function validateBankCard(cardNumber: string): boolean {
  if (!cardNumber || typeof cardNumber !== 'string') {
    return false;
  }
  
  const reg = /^\d{16,19}$/;
  if (!reg.test(cardNumber)) {
    return false;
  }
  // Luhn算法校验
  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * 验证姓名,包括中文名和英文名
 * @param {string} val 输入姓名
 * @returns {boolean}  是否有效
 */
export function validateName(val: string): boolean {
  if (!val || typeof val !== 'string') {
    return false;
  }
  val = val.replace(/^\s+|\s+$/g,''); //去掉左右空格
  if (/^[a-zA-Z\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\s·]{2,100}$/u.test(val)) {
      if (val.indexOf('\\') != -1) {
          return false;
      } else if (!/^[A-Za-z\s]+$/.test(val) && /\s/.test(val)) {
          //不全是英文，但有空格
          return false;
      } else {
          return true;
      }
  } else {
      return false;
  }
}

/**
 * 身份证姓名校验：只针对中文姓名
 * @param {string} val 姓名
 * @returns {boolean}  是否有效
 */
export function validateChineseIdName(val: string): boolean {
  if (!val || typeof val !== 'string') {
    return false;
  }
  val = val.replace(/^\s+|\s+$/g,''); //去掉左右空格
  if(/^[\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}·]{2,100}$/u.test(val)){
    if(val.indexOf('\\') != -1){
        return false;
    } else {
        return true;
    }   
  }else{
    return false;
  }
}

/**
 * 中国护照姓名校验：支持中文和英文姓名
 * @param {string} val 姓名
 * @returns {boolean}  是否有效
 */
export function validateChinesePassportName(val: string): boolean {
  if (!val || typeof val !== 'string') {  
    return false;
  }
  val = val.replace(/^\s+|\s+$/g,''); //去掉左右空格
  if (/^[A-Z\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\s·.]{2,100}$/u.test(val)) {
      if (val.indexOf('\\') != -1) {    
          return false;
      }
      if (/^[A-Z.\s]+$/.test(val)) {
        return true;
      }
      if (/^[\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}·]+$/u.test(val) && !/\s/.test(val)) {
        //纯大写英文且姓名中间非连续空格
        return true;
      }
      if (/^[A-Z\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}]+$/u.test(val) && !/\s/.test(val)) {
        //中文加大写英文 中文加大写英文且中文中间无空格
        return true;
      }
      if (/^[\u4e00-\u9fa5\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}]+( [A-Z]+)*$/u.test(val)) {
        // 中文加大写英文且中文中间无空格，中英文中间和英文与英文中间可以有非连续空格、例：张三 ZHANG SAN
        return true;
      }
      return false;
  } else {
      return false;
  }     
}
