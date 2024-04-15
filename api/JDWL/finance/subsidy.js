import request from "@/common/axios"

/** 获取补贴表单 */
export function getFormData(data) {
  return request("/tms/subsidy/apply/preInfo", data)
}

/** 补贴表单 提交 */
export function saveForm(data) {
  return request("/tms/subsidy/apply/submit", data)
}

/** 补贴表单配置 */
export const MConfig = [
  { BILLNO: "1", FIELD: "TYPE", LABEL: "类型", COL: 12, CONTROLS: "ExRadio", ISSHOW: 1, DEFAULTVAL: "1", ISDISABLED: "0", ISREQUIRE: "1", OTHER: '[{"LABEL":"两地卸货","VALUE":"1"},{"LABEL":"押车","VALUE":"2"}]' },
  { BILLNO: "2", FIELD: "TRACK_PIC", LABEL: "两地卸货轨迹图片", COL: 12, CONTROLS: "ExUpload", ISSHOW: 2, ISDISABLED: "0", MAXLENGTH: "2", OTHER: '', ISREQUIRE: "1", LINKAGE: '{"ISSHOW":"Data.TYPE==1","ISREQUIRE":"Data.TYPE==1"}' },
  { BILLNO: "3", FIELD: "ARRIVE_DATE", LABEL: "到货日期", COL: 12, CONTROLS: "ExDateTime", ISSHOW: 2, ISDISABLED: "0", OTHER: '', ISREQUIRE: "1", LINKAGE: '{"ISSHOW":"Data.TYPE==2","ISREQUIRE":"Data.TYPE==2"}' },
  { BILLNO: "4", FIELD: "ARRIVE_POST", LABEL: "到货定位", COL: 12, CONTROLS: "ExUpload", ISSHOW: 2, ISDISABLED: "0", MAXLENGTH: "1", OTHER: '', ISREQUIRE: "1", LINKAGE: '{"ISSHOW":"Data.TYPE==2","ISREQUIRE":"Data.TYPE==2"}' },
  { BILLNO: "5", FIELD: "UNLOAD_DATE", LABEL: "卸货日期", COL: 12, CONTROLS: "ExDateTime", ISSHOW: 2, ISDISABLED: "0", OTHER: '', ISREQUIRE: "1", LINKAGE: '{"ISSHOW":"Data.TYPE==2","ISREQUIRE":"Data.TYPE==2"}' },
  { BILLNO: "6", FIELD: "UNLOAD_POST", LABEL: "卸货定位", COL: 12, CONTROLS: "ExUpload", ISSHOW: 2, ISDISABLED: "0", MAXLENGTH: "1", OTHER: '', ISREQUIRE: "1", LINKAGE: '{"ISSHOW":"Data.TYPE==2","ISREQUIRE":"Data.TYPE==2"}' },
]

/** 补贴列表 */
export function getList(data) {
  return request("/tms/subsidy/apply/getAppPageList", data)
}

/** 补贴详情 */
export function getDetail(data) {
  return request("/tms/subsidy/apply/getAppDetail", data)
}