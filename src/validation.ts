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
export function validateIdCard(idCard: string): boolean {
  if (!idCard || typeof idCard !== 'string') {
    return false;
  }

  // 18位身份证正则
  const reg18 = /^\d{17}[\dXx]$/;
  // 15位身份证正则
  const reg15 = /^\d{15}$/;

  if (!reg18.test(idCard) && !reg15.test(idCard)) {
    return false;
  }

  // 15位身份证不再发放，但仍然有效
  if (idCard.length === 15) {
    return true;
  }

  // 校验18位身份证
  const idCardArray = idCard.split('');
  let sum = 0;

  for (let i = 0; i < 17; i++) {
    sum += parseInt(idCardArray[i]) * ID_CARD_WEIGHTS[i];
  }

  const mod = sum % 11;
  const checkCode = ID_CARD_CODES[mod];

  return checkCode === idCardArray[17].toUpperCase();
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
