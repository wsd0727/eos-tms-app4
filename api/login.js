import request from "@/utils/request"

/** 登录 */
export function login(data) {
  return request({
    // url: "/auth/check/login",
	url: `/auth/check/login`,
    method: "post",
    data,
    encry: true
  })
}

/** 获取用户信息 */
export function getUserInfo() {
  return request({
    url: "/sys/user/getUserAccountInfo",
    method: "post",
    data: {},
    encry: true
  })
}

/**  注册 */
export function register(data) {
  return request({
    url: "/auth/check/register",
    method: "post",
    data
  })
}