import request from "@/common/axios"

export function getDicts(dictType) {
  return request(
    `/sys/dictDtl/queryDictInfoByCode/${dictType}`,
    {}
  )
}

export function getDictsTree(dictType) {
  return request(
    "/sys/dictDtl/getTreeList",
    {
      DICTCODE: dictType
    }
  )
}

// 获取字典选择框列表
export function optionselect() {
  return request(
    '/system/dict/type/optionselect',
    {},
    'get'
  )
}