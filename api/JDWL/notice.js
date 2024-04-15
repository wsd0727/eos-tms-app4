import request from "@/common/axios"

/** 获取通知大类 */
export function getNoticeTypes(data) {
  return request("/sys/app/notice/type",
    data
  )
}

/** 获取通知小类 */
export function getNoticeTypesDTL(data) {
  return request("/sys/app/notice/typeDtl",
    data
  )
}

/** 获取通知数据 */
export function getNoticeList(data) {
  return request("/sys/app/notice/getPageList",
    data
  )
}

/** 获取未读消息数量 */
export function getNoticeUnReadNum() {
  return request("/sys/app/notice/noRead",
    {})
}