import axios from '@/common/axios.js'

/** 上传文件 */
export const UploadApi = "/sys/file/upload"

const globalUrl = '/sys/config/getList';
const globalQuery = {
	MODULETYPE: "APPCONFIG",
	VTYPE: 'SYSCONFIG'
};


/** 获取全局配置 */
export function getGlobalConfig() {
	return axios(globalUrl, globalQuery, 'POST')
}