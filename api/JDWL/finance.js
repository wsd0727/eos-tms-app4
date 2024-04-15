import request from "@/common/axios"

/** 获取回单数据 */
export function getBackOrderList(data) {
  return request("/tms/tmsTransportDamage/getPageList", data)
}

/** 司机签字确认 提交 */
export function saveBackOrderSign(data) {
  return request("", data)
}
