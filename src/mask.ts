/**
 * 数据掩码工具类
 */

/**
 * 中文姓名保留姓，其余打掩码显示
 * 张三 -> 张*
 * 张小三 -> 张**
 */
export function maskChineseName(name: string): string {
  if (!name) return '-'
  if (name.length <= 1) return name
  return name.charAt(0) + '*'.repeat(name.length - 1)
}

/**
 * 英文姓名保留首字母，其余掩码显示
 * ZHANGSAN -> Z*******
 */
export function maskEnglishName(name: string): string {
  if (!name) return '-'
  if (name.length <= 1) return name
  return name.charAt(0) + '*'.repeat(name.length - 1)
}

/**
 * 智能姓名掩码（根据中英文判断）
 */
export function maskName(name: string): string {
  if (!name) return '-'
  // 简单判断是否包含中文字符
  const isChinese = /[\u4e00-\u9fa5]/.test(name)
  if (isChinese) {
    return maskChineseName(name)
  }
  return maskEnglishName(name)
}

/**
 * 公司名称保留第一个字，其余掩码显示
 */
export function maskCompanyName(name: string): string {
  if (!name) return '-'
  if (name.length <= 1) return name
  return name.charAt(0) + '*'.repeat(name.length - 1)
}

/**
 * 证件号码：前3后2, 中间掩码
 * 370*************43
 */
export function maskIdCard(idCard: string): string {
  if (!idCard) return '-'
  if (idCard.length <= 5) return idCard
  const len = idCard.length
  return idCard.substring(0, 3) + '*'.repeat(len - 5) + idCard.substring(len - 2)
}

/**
 * 电话前3后3明文，中间掩码
 * 15862518411 -> 158*****411
 */
export function maskPhone(phone: string): string {
  if (!phone) return '-'
  if (phone.length <= 6) return phone
  const len = phone.length
  return phone.substring(0, 3) + '*'.repeat(len - 6) + phone.substring(len - 3)
}

/**
 * 通用掩码方法
 * 参数说明：
 * str: 需要掩码的字符串
 * frontLen: 前面保留的字符数，默认保留前面3位
 * endLen: 后面保留的字符数，默认保留后面2位
 */
export function maskGeneric(str: string, frontLen: number = 3, endLen: number = 2): string {
  if (!str) return '-';
  const len = str.length
  if (str.length <= frontLen + endLen) return str.substring(0)+'*'.repeat(len-1)
  return str.substring(0, frontLen) + '*'.repeat(len - frontLen - endLen) + str.substring(len - endLen)
}
