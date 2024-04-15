import request from "@/common/axios"

/** 获取网货协议地址 */
export function getSignUrl(data) {
  return request("/tms/tmsTransportOpen/agreement", data)
}