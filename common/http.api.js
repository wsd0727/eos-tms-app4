
import axios from '@/common/axios.js'
let hotSearchUrl = '/ebapi/store_api/hot_search';
let indexUrl = '/auth/check/login';
let menuUrl = '/sys/module/getMenuByRoleList'
const configUrl = '/sys/pageConfig/getByPageNo';
const userInfoUrl = '/sys/user/getUserAccountInfo';


uni.$eos = {
	api: {}
}
const install = (Vue, vm) => {
	let getUserToken = (params = {}) => axios(indexUrl, params, 'POST',false);
	let getUserMenu = (params = {}) => axios(menuUrl, params, 'POST');
	let getConifg = (params = {}) => axios(configUrl, params, 'POST' , true );
	// let getGlobalConifg = (params = {}) => axios(globalUrl, globalQuery, 'POST' , false );
	let getUserInfo = (params = {}) => axios(userInfoUrl, {}, 'POST'  );
	uni.$eos.api = {getUserToken, getUserMenu , getConifg  ,getUserInfo};
}

export default {
	install
}