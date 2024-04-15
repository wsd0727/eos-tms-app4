<script>
	export default {
		globalData: {
			// BaseURL: "http://120.48.123.183/",  // 我找车
			// BaseURL: "http://120.48.123.183:8886",  // 天山
			// BaseURL: "http://120.48.14.220/",  // 我找车正式环境
			// BaseURL: "http://8.130.143.184:9001/",  // 众联测试
			//BaseURL: "http://124.70.8.81:8001/",  //众联生产
			BaseURL: "https://eosine.cn:85/",
			activeMenuID: {}, // 当前处于激活状态下的菜单id和页面id
			sysCode: 'WZC', // 'WZC' , ''  , 'LAZY' , 
			appType: '1', // 0 货主 ，  1 司机 承运商
			isCodeLogin: false, //验证码登录功能 ，true 是显示
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>