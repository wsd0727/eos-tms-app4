<template>
	<view class="page" v-if="!isLoading">

		<view class="login-header">
			<view class="title">
				<image src="https://eosine.cn/eos_tms/static/login/login-title-icon.png" mode=""
					class="login-title-icon" @click=" isShowMYIP = !isShowMYIP ">
				</image>
				<view class="big-title">
					您好！
				</view>
				<view class="sub-title">
					欢迎使用{{AppName}}
				</view>
			</view>
		</view>

		<view class="login_content">

			<view v-if="loginForm.LOGINTYPE == 'captcha'">
				<view class="login_input">
					<view class="content">
						<view class="label">
							账户
						</view>
						<input class="Login_content_username" type="text" placeholder="请输入账户"
							v-model="loginForm.USERNAME" />
						<uni-icons class="clear" v-if="loginForm.USERNAME != ''" @click="clearVal" :type="'closeempty'"
							:color="'#333'" :size="18" />
					</view>
				</view>
				<view class="login_input">
					<view class="content">
						<view class="label">
							密码
						</view>
					<!-- 	<input class="Login_content_password" :type="PWDType" placeholder="请输入密码"
							v-model="loginForm.APASSWORD" />
						<uni-icons class="clear" v-if="loginForm.APASSWORD != ''"
							@click="PWDType = PWDType=='password'?'text':'password'"
							:type="PWDType=='password'?'eye-slash':'eye' " :color="'#333'" :size="18" /> -->
							
						<template v-if="PWDType == 'password'">
							<input class="Login_content_password" type="password" placeholder="请输入密码"
								v-model="loginForm.APASSWORD" />
							<uni-icons class="clear" v-if="loginForm.APASSWORD != ''"
								@click="PWDType = PWDType=='password'?'text':'password'"
								type="eye-slash" :color="'#333'" :size="18" />	
						</template>
						<template v-else>
							<input class="Login_content_password" type="text" placeholder="请输入密码"
								v-model="loginForm.APASSWORD" />
							<uni-icons class="clear" v-if="loginForm.APASSWORD != ''"
								@click="PWDType = PWDType=='password'?'text':'password'"
								type="eye" :color="'#333'" :size="18" />
						</template>
							
					</view>
				</view>
			</view>
			<view v-else>
				<view class="login_input">
					<view class="content">
						<view class="label">
							手机号
						</view>
						<input class="Login_content_username" type="text" placeholder="请输入手机号"
							v-model="loginForm.MOBILE" />
						<uni-icons class="clear" v-if="loginForm.MOBILE != ''" @click="loginForm.MOBILE = ''"
							:type="'closeempty'" :color="'#333'" :size="18" />
					</view>
				</view>

				<view class="login_input">
					<view class="content flex">
						<view class="label">
							验证码
						</view>
						<input class="Login_content_password" type="number" placeholder="请输入验证码"
							v-model="loginForm.CODE" />
						<view class="code-box" @click="getCode">
							{{ timeMsg }}
						</view>
					</view>
				</view>
			</view>


			<view class="login_input" v-if="isverify">
				<view class="content flex">
					<view class="label">
						验证码
					</view>
					<input class="Login_content_password" type="text" placeholder="请输入验证码"
						v-model="loginForm.Verifycode" />
					<image class="code-wrap" @click="getVerifycodePhone" :src="safetyUrl" mode=""></image>
				</view>
			</view>


			<view class="login_input" v-if="isShowMYIP">
				<view class="content">
					<view class="label">
						自定义IP
					</view>
					<input class="Login_content_username" type="text" v-model="MYIP" placeholder="请输入自定义IP" />
					<uni-icons class="clear" v-if="MYIP != ''" @click="MYIP = ''" :type="'closeempty'" :color="'#333'"
						:size="18" />
				</view>
			</view>

			<button type="primary" shape="circle" @click="loginEvent"
				class="login-btn">登录</button>


			<view class="dx-wrap disflex justify-sb">
				<view class="" @click="codeLogin" v-if="isCodeLogin">
					<!-- <view class="" @click="openPage('./codeLogin')"> -->
					{{ loginForm.LOGINTYPE == 'captcha' ? '验证码登录':'密码登录' }}
				</view>
				<view v-else></view>
				<view class="">
					<text @click="openPage('/pages_sj/tab05/findpass')">找回密码</text>
					<template v-if="sysCode != 'JDWL'">
						<template v-if="APPTYPE == 1">
							<text class="mlr-20">|</text>
							<text @click="openPage('/pages_sj/tab05/select-role')">快速注册</text>
						</template>
					</template>
				</view>
			</view>

		</view>

		<view class="version">
			<!-- <view class="" @click="callPhone">
				客服热线：400-9966-241
			</view> -->
			<view class="text" @click="clearCach">
				V {{ version }}
			</view>
			<view class="text-bq">

				<!-- <u-icon name="checkmark-circle" color="#666" size="28" v-if="!checkXY"
					@click=" checkXY = !checkXY "></u-icon>
				<u-icon name="checkmark-circle-fill" color="#2979ff" size="28" v-else
					@click=" checkXY = !checkXY "></u-icon> -->
				登录即同意<text class="color-blue" @click="openPage('/pages_sj/tab05/xieyiDetile?TYPE=3')">《用户协议》</text><text
					class="color-blue" @click="openPage('/pages_sj/tab05/xieyiDetile?TYPE=4')">《隐私条款》</text>
			</view>

		</view>


		<!-- <u-modal v-model="showModal" :show-title="false" :show-confirm-button="false" :title-style="{color: 'red'}">
			<view class="slot-content custom-modal">

				<view class="modal-head">
					<text>
						请选择您要登录的角色
					</text>
					<u-icon name="close" class="cloce-icon" @click=" showModal = false "></u-icon>
				</view>

				<view class="role-item" v-for="(item,index) in rolesList " :key="item" @click="chooseRole(item.TYPE)">
					<image :src=" roleTypeIcon[item.TYPE].icon " mode="" class="role-icon"></image>
					<view class="role-title mb-10">
						<text class="role-name"> {{ item.TYPENAME }} </text>
						<view class="role-desc">
							{{ roleTypeIcon[item.TYPE].desc }}
						</view>
					</view>
				</view>
			</view>
		</u-modal> -->

		<!-- <u-verification-code :seconds="seconds" ref="uCode1" @change="codeChange"></u-verification-code> -->
	</view>
</template>

<script setup>
	import {
		onLoad,
		onShow,
		onReady,
		onShareAppMessage,
		onShareTimeline
	} from '@dcloudio/uni-app'
	import { getGlobalConfig } from '/api/common.js'
	import {
		ref,
		reactive,
		computed,
		watch,
		getCurrentInstance
	} from 'vue';
	// import md5Libs from "@/uni_modules/vk-uview-ui/libs/function/md5";
	import useUserStore from '@/store/user.js'
	import useTabStore from '@/store/menus.js'
	
	const userStore = useUserStore()
	const tabStore = useTabStore()

	import {
		goPage,
		getMyMenu
	} from '@/common'


	// #ifdef MP-WEIXIN
	const version = '1.0.2312.01'
	// #endif

	const {
		appContext: {
			config: {
				globalProperties: global
			}
		}
	} = getCurrentInstance();

	const checkXY = ref(false)

	const serverList = ref([])
	const SOBList = ref([])
	const PWDType = ref('password')
	const safetyUrl = ref('')
	const isverify = ref(false)
	const MYIP = ref('')
	const isShowMYIP = ref(false)
	const isLoading = ref(true)

	const sysCode = getApp().globalData.sysCode
	const AppName = getApp().globalData.systemName

	const isCodeLogin = getApp().globalData.isCodeLogin || false

	const whereBy = ref(null)


	const loginForm = reactive({
		USERNAME: "18103428354",
		APASSWORD: "Aa@123456",
		PASSWORD: '',
		REGISTERID: '',
		LOGINTYPE: "captcha",
		TYPE: "APP",
		USERTYPE: "1",
		CLIENTID: "APP",
		MOBILE: '',
		CODE: ''
	})
	const userTypeList = ref([{
			label: '司机登录',
			value: 1
		},
		{
			label: '承运商登录',
			value: 2
		}
	])

	const roleTypeIcon = ref({
		1: {
			icon: 'https://eosine.cn/eos_tms/static/login/rw.png',
			desc: '运输、签到和打卡'
		},
		2: {
			icon: 'https://eosine.cn/eos_tms/static/login/car.png',
			desc: '运单、司机车辆管理'
		},
		4: {
			icon: 'https://eosine.cn/eos_tms/static/login/wh.png',
			desc: '订单管理，全业务'
		}
	})

	const APPTYPE = ref(1)
	const seconds = ref(60)
	const timeMsg = ref('获取验证码')

	import {
		aesJmEncrypt
	} from "@/common"


	const openRole = () => {
		uni.navigateTo({
			url: './select-role'
		})
	}
	
	const getGlobalData = ()=>{
		getGlobalConfig().then(res=>{
			userStore.setGlobalConfig(res.RESULT)
		})
	}

	const getUserInfo = () => {
		uni.$eos.api.getUserInfo().then(res => {
			userStore.setUserinfo(res.RESULT)
		})
	}

	onLoad((p) => {
		getGlobalData()
		APPTYPE.value = getApp().globalData.appType
		uni.getStorage({
			key: 'userInfoCache',
			success: function(res) {
				uni.showLoading({})
				let cacheData = JSON.parse(res.data)
				loginForm.USERNAME = cacheData.userInfo.USERNAME
				loginForm.APASSWORD = cacheData.userInfo.APASSWORD
				loginForm.PASSWORD = cacheData.userInfo.PASSWORD
				loginForm.USERTYPE = APPTYPE.value == 0 ? 0 : cacheData.userInfo.USERTYPE
				getApp().globalData.userType = getApp().globalData.userType
				MYIP.value = cacheData.url
				if (p.by == 5) { 
					uni.hideLoading()
					isLoading.value = false
				} else if (p.by == 0) {
					loginForm.USERTYPE = p.ut
					whereBy.value = p.by
					loginEvent()
				} else {
					loginEvent()
				}
			},
			fail: function(err) {
				uni.hideLoading()
				isLoading.value = false
				if (p.ut && p.tel) {
					loginForm.USERNAME = p.tel
					loginForm.APASSWORD = p.pwd
					loginForm.USERTYPE = p.ut
				}
			}
		})
	})

	const codeLogin = () => {
		loginForm.LOGINTYPE = loginForm.LOGINTYPE == 'sms_code' ? 'captcha' : 'sms_code'
	}

	const getVerifycodePhone = () => {
		let Verify = "/auth/check/sendSmsCode"
		global.$axios(Verify, {
			MOBILE: loginForm.MOBILE
		}, 'POST', false).then((res) => {
			uCode1.value.start();
		});
	}

	const uCode1 = ref(null)

	const codeChange = (text) => {
		timeMsg.value = text
	}

	const getCode = () => {
		if (uCode1.value.canGetCode) {
			uni.showLoading({
				title: '正在获取验证码'
			})
			getVerifycodePhone()
		} else {
			console.log('倒计时结束后再发送');
		}
	}

	const loginEvent = () => {
		if (isShowMYIP.value) {
			getApp().globalData.BaseURL = MYIP.value.includes('http') ? MYIP.value : 'http://' + MYIP.value
		}
		if (!loginForm.USERNAME) {
			return global.$_showToast('请输入账户')
		} else if (!loginForm.APASSWORD) {
			return global.$_showToast('请输入密码')
		}
		let uerLogin = JSON.parse(JSON.stringify(loginForm))
		uerLogin.PASSWORD = 'ce00580d6b3d1e0d7b7b8ec5eab0bc89' // md5Libs.md5(uerLogin.APASSWORD)
		uerLogin.PID = aesJmEncrypt(uerLogin.APASSWORD)
		let newuerLogin = JSON.parse(JSON.stringify(uerLogin))
		delete newuerLogin.APASSWORD
		uni.$eos.api.getUserToken(newuerLogin).then(res => {
			let {
				RESULT
			} = res
			getApp().globalData.Token = RESULT.ACCESS_TOKEN
			getApp().globalData.userInfo = RESULT
			getApp().globalData.userType = RESULT.USERTYPE
			let cacheData = {
				url: getApp().globalData.BaseURL,
				userInfo: uerLogin,
				userToken: RESULT.ACCESS_TOKEN
			}
			try {
				uni.setStorageSync('token_key', RESULT.ACCESS_TOKEN);
			} catch (e) {
				
			}
			uni.setStorage({
				key: 'userInfoCache',
				data: JSON.stringify(cacheData)
			})
			getMenu()
			getUserInfo()

		}).catch(err => {
			uni.hideLoading()
			isLoading.value = false
		})
	}
	
	


	const getMenu = () => {
		uni.$eos.api.getUserMenu({
			"BILLFROM": "1"
		}).then(res => {
			let {
				RESULT
			} = res
			let menus = RESULT.length ? RESULT[0].CHILDREN : []
			getApp().globalData.menuConfig = menus
			tabStore.setTabs(menus)
			// let path = whereBy.value == 0 ? '/pages/tab05/tab05' : '/pages/tab01/tab01'
			let path = '/pages/index/index'
			uni.navigateTo({
				url: path
			})
			// uni.switchTab({
			// 	url: path
			// })
		})
	}

	const clearCach = () => {
		uni.clearStorage();
	}
	const openPage = (path) => {
		if (!path) return global.$_showToast('功能开发中，请耐心等待')
		if (path) {
			if (path == './select-role') {
				uni.clearStorage()
			}
			uni.navigateTo({
				url: path
			})
		}
	}

	const initJGTS = () => {
		if (!jpushModule) return
		jpushModule.addNotificationListener(result => {
			let notificationEventType = result.notificationEventType
			let messageID = result.messageID
			let title = result.title
			let content = result.content
			let extras = result.extras
			if (notificationEventType == 'notificationOpened') {
				jpushModule.setBadge(0)
			}
		})
	}

	const getRegistrationID = () => {
		if (jpushModule) return
		try {
			jpushModule.initJPushService()
			jpushModule.getRegistrationID(result => {
				let registerID = result.registerID
				if (result.code != 0 || registerID == '') {
					getRegistrationID()
				} else {
					loginForm.REGISTERID = registerID
				}
			})
		} catch (e) {
			console.log('getRegistrationID', e);
		}
	}

	function clearVal() {
		console.log(5555);
		loginForm.USERNAME = ''
	}
</script>

<style lang="scss" scoped>
	.page {
		.version {
			width: 100%;
			text-align: center;
			position: absolute;
			bottom: 20rpx;

			.text {
				color: #666;
			}

			.text-bq {
				font-size: 24rpx;
				color: #666;
			}

		}

		.loginTabs {
			margin-bottom: 50rpx;
			font-size: 34rpx;
			font-weight: 400;
			color: #757575;

			.loginTabsAlone {
				margin-right: 40rpx;

				position: relative;
			}

			.active {
				font-weight: 800;
				color: #000;

				.test2 {
					position: absolute;
					left: 0;
					bottom: -20rpx;
					width: 100%;
					height: 18rpx;
					border-radius: 20rpx;
					background-image: linear-gradient(to right,
							#3370ff,
							#7da4f8,
							#97b6f6,
							#b7ccf9,
							#fff);
				}
			}
		}

		.code-box {
			position: absolute;
			right: 18rpx;
			bottom: 20rpx;
		}

		.custom-modal {
			padding: 50rpx;
			background-image: linear-gradient(200deg, #cbe0ff, #fff 80%);

			.modal-head {
				font-size: 30rpx;
				font-weight: bold;
				position: relative;
				text-align: center;
				margin-bottom: 50rpx;

				.cloce-icon {
					position: absolute;
					right: 10rpx;
					top: 10rpx;
				}
			}

		}

		.role-item {
			border: 2rpx solid #aaa;
			margin-top: 20rpx;
			padding: 20rpx;
			border-radius: 30rpx;
			position: relative;
			display: flex;
			align-items: center;

			.role-name {
				font-size: 30rpx;
				font-weight: bold;
			}

			.role-desc {
				color: #999;
				font-size: 20rpx;
			}

			.role-icon {
				height: 120rpx;
				width: 120rpx;
				right: 20rpx;
				bottom: 10rpx;
				margin: 0 20px;
			}
		}
	}
</style>