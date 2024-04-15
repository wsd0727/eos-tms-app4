/**
 * url 接口地址，如果存在 http时则不拼接基地址，否则都会拼接基地址 
 * data 接口参数
 * method 请求方式  POST GET
 * isAes 是否使用加密包裹数据
 * isLoading 是否显示加载中
 * tipsTime 接口返回错误时，提示的时间
 * allRes  是否返回完整的接口数据 {"IsSuccess": true,"Message": "", "Result"：""} , 默认返回接口中的  Result
 * 杜财旺 2023-6-18 15:50   如果需要使用到后面的参数，前面参数不可缺省
 */

const AesData = {
	"APPID": "",
	"DATA": null,
	"KEY": "",
	"MODULEID": "",
	"PAGEID": "",
	"PARENTPAGE": "",
	"VERSION": ""
}

export default function axios(url, data = {}, method = 'POST', isAes = true, isLoading = false, tipsTime = 3000,
	allRes = false) {
	let Token = null;
	try {
		Token = uni.getStorageSync('token_key');
	} catch (e) {
		console.error('未获取到token');
	}

	if (!url) return uni.showToast({
		title: '请求地址无效，请联系管理员',
		icon: 'none'
	});
	if (isLoading) {
		uni.showLoading({
			title: '加载中...',
			mask: true
		})
	}
	
	if(url.charAt(0)!='/'){
		url = '/'+url
	}
	
	// #ifdef H5
	url = '/eos-api' + url
	// #endif
	
	// #ifndef H5
	url = getApp().globalData.BaseURL + '/eos-api' + url
	// #endif
	console.log('axiosURL=', url );
	let savedata = JSON.parse(JSON.stringify(data)),
		newAesData = savedata,
		copyAesData = JSON.parse(JSON.stringify(AesData));
	if (isAes) {
		let activeMenuID = getApp().globalData.activeMenuID
		copyAesData.DATA = savedata
		newAesData = copyAesData
		newAesData.PAGEID = savedata.PAGEID ? savedata.PAGEID : (activeMenuID?.PAGEID || '')
		newAesData.PARENTPAGE = activeMenuID?.PARENTPAGE || ''
		newAesData.MODULEID = savedata.MODULEID ? savedata.MODULEID : (activeMenuID?.MODULEID || '')
	}
	newAesData.BILLFROM = '1'
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: newAesData,
			header: {
				Authorization: 'Bearer ' + Token
			},
			success: (res) => {
				uni.hideLoading()
				if (res.statusCode == 401) {
					uni.showToast({
						title: '权限已失效，请重新登录。',
						icon: 'none'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/index/login'
						})
					}, 1500)
					return;
				} else if (res.statusCode == 405) {
					uni.showToast({
						title: '请求失败：状态码' + res.statusCode + '->错误原因=' + res.data.Message,
						icon: 'none',
						duration: 3000
					})
					return reject(405);
				} else if (res.statusCode != 200) {
					uni.showToast({
						title: '请求失败：网络异常请稍后重试～',
						icon: 'none',
						duration: 3000
					})
					return reject(res.statusCode);
				} else if (!res.data.SUCCESS) {
					let resData = res.data;
					if(resData.STATUS ==401 ){
						uni.showToast({
							title: '权限已失效，请重新登录。',
							icon: 'none'
						})
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/login'
							})
						}, 1500)
						return;
					}

					if (typeof resData == 'string') {
						uni.showModal({
							title: '提示',
							content: resData,
							showCancel: false,
							confirmText: '我知道了'
						})
						return
					}
					if (resData?.MESSAGE.length < 20) {
						uni.showToast({
							title: '请求失败：' + resData.MESSAGE,
							icon: 'none',
							duration: tipsTime
						})
					} else {
						uni.showModal({
							title: '提示',
							content: resData.MESSAGE.replace(/<br\/>/g, "\n"),
							showCancel: false,
							confirmText: '我知道了'
						})
					}
					reject(res.data);
					return;
				}
				if (!res.data.MESSAGE) res.data.MESSAGE = '';
				if (allRes) return resolve(res.data)
				return resolve(res.data)
			},
			fail: (err) => {
				console.error('axios报错', err);
				uni.hideLoading()
				uni.showToast({
					title: '网络服务异常：' + err.errMsg,
					icon: 'none'
				})
				return reject(err);
			}
		})
	})
}