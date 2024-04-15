import request from "@/common/axios"

/** 获取车主可以报号的车辆 */
export function getCars(data) {
  return request("/oms/app/reportingNum/getCarList", data)
}

/** 获取车辆可报号片区 */
export function getCarsArea(data) {
  return request("/oms/app/reportingNum/reportNumSelArea", data)
}

/** 报号提交 */
export function saveCheckCar(data) {
  return request("/oms/app/reportingNum/reportNum", data)
}

/** 取消报号 */
export function cancelCheckCar(data) {
  return request("/oms/app/reportingNum/delreportNum", data)
}

/** 详情 */
export function getUpdateNODetail(data) {
  return request("/oms/app/reportingNum/reportNumDetail", data)
}

/** 历史报号 */
export function getUpdateNOHistiry(data) {
  return request("/oms/app/reportingNum/reportNumHistory", data)
}

/** 排号表片区 */
export function getQueueArea() {
  return request("/oms/app/reportingNum/getCarArea", {})
}

/** 排号表 */
export function getBaseQueue(data) {
  return request("/base/carsOrder/selCarOrder", data)
}