# TMS-V4 APP 基础框架

## 配置相关

1. 包名：eos.cn.tmsv4
2. 高德： 安卓 21a19bfe82e3e4e209232e8ad416e63e  苹果  41d4327253915f04c21302c065abc98b
3. 极光：f29613fbf7d073a26c365633
4. [SVN](https://47.94.202.228:8443/21.TMS_ITEM/99.TMS4/05.APP 
https://47.94.202.228:8443/21.TMS_ITEM/99.TMS4/06.WEBPC)

## 目录结构 

```
├── common          # 公共资源
│   ├── areadata    #区域数据
│   ├── axios		#数据请求工具
│   ├── form		#表单中常用工具类
│   ├── https.api	#常用接口工具库
│   ├── index		#常用函数库
│   ├── md5			#MD5 数据加密工具类
│   ├── reg 		#数据数据校验正则库
│   ├── uqrcode 	#生成二维码工具
│   └── util		#其它常用工具
├── components
│   ├── Form		#表单组件
│   ├── MasterForm  #主子表组件
│   ├── noData		#暂无数据组件
│   ├── Plate       #车牌号组件
│   ├── table       #列表组件
│   └── Upload	#上传组件
├── js_sdk   
├── pages		# 主包
│   └── common
│       │—— detail  #详情组件
│       │—— form    #表单页面组件
│       │—— list    #列表组件
│       │—— select  #下拉选择组件
│       └── webView #外部链接组件
│   ├── index  		#入口文件 /登录
│   ├── tab01		#首页
│   ├── tab02		#委托/运单
│   ├── tab03		#运单
│   ├── tab04		#暂无
│   └── tab05		#个人中心
├── pages-tab05  # 个人中心子包  /注册/找回密码等
├── pages-jdwl  # 金德项目子包
├── static			#静态资源文件
├── store			#状态管理机
├── uni_modules     #第三方插件库
├── unpackage		#打包后的生产文件
├── App.vue			#入口文件
├── main.js			#入口文件
├── manifest.json	#APP配置文件
├── pages.json		#全部APP的所以文件路径
└── uni.scss		#全局样式

```

## 公共统一的接口请求案例
### 菜单配置

> 注：所有获取菜单或者按钮下的页面配置必须通过该接口进行获取，因为本地缓存需要统一在该函数内处理，优先读取本地缓存，缓存不存在时再去请求接口获取配置
```
uni.$eos.api.getConifg().then(res => {
	uni.hideLoading()
	const {
		COLUMNS,
		BUTTON,
		SLOTCFG,
		QUERY,
		MAINTABLE,
		SUBTABLE,
		PAGES,
		VCODE
	} = res.RESULT
})
```

### 个人信息
> 注：登录和个人中心2个地方，会实时获取账户信息 , 该方法会把用户信息存储到状态机里面

```
const getUserInfo = () => {
	uni.$eos.api.getUserInfo().then(res => {
		userStore.setUserinfo(res.RESULT)
	})
}
```

### 统一的数据交互案例

```
const {
	appContext: {
		config: {
			globalProperties: global
		}
	}
} = getCurrentInstance();

const getAxiosData = () => {
	const url = '/oms/app/bidProject/getRushOrderCount'
	global.$axios(url, {}, 'POST').then(res => {
		const { RESULT } = res 
		console.log( res );
	}).catch(err => {})
}
```