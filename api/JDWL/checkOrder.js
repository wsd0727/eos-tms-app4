import request from "@/common/axios"

/** 获取片区 */
export function getArea() {
  return request(
    "/oms/app/selectionPool/getAreaTab",
    {
      MODULEID: "100"
    }
  )
}

/** 获取单据 */
export function getOrder(data) {
  return request(
    "/oms/app/selectionPool/getOrderByArea",
    {
      MODULEID: "100",
      ...data
    }
  )
}

/** 选单 */
export function saveChekcOrder(data) {
  return request("/oms/app/selectionPool/select", {
    MODULEID: "100",
    ...data
  })
}

/** 过号 */
export function passOrder(data) {
  return request(
    "/oms/app/selectionPool/overNumbered",
    data
  )
}

/** xxx 正在选单 */
export function getCheckMsg(data) {
  return request(
    "/oms/app/selectionPool/selCarNo",
    data
  )
}
/** 选单倒计时 */
export function getCheckTime(data) {
  return request(
    "/oms/app/selectionPool/selCarNoTime",
    data
  )
}

/** 选单池详情 */
export function getCheckOrderDetail(data) {
  return request("/oms/app/selectionPool/selCarNoAll", data)
}