import CryptoJS from "crypto-js"
import useUserStore from '@/store/user.js'

export function handleTree(data, id, parentId, children) {
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children'
	};

	var childrenListMap = {};
	var nodeIds = {};
	var tree = [];

	for (let d of data) {
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]];
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}

export function mergeRecursive(source, target) {
	for (var p in target) {
		try {
			if (target[p].constructor == Object) {
				source[p] = mergeRecursive(source[p], target[p]);
			} else {
				source[p] = target[p];
			}
		} catch (e) {
			source[p] = target[p];
		}
	}
	return source;
};

export function selectDictLabel(datas, value, label = "LABEL", val = "VALUE") {
	if (value === undefined) {
		return "";
	}
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key][val] == ('' + value)) {
			actions.push(datas[key][label]);
			return true;
		}
	})
	if (actions.length === 0) actions.push(value);
	return actions.join('');
}

export function selectDictLabels(datas, value, separator, label = "LABEL", vals = "VALUE") {
	if (value === undefined) {
		return "";
	}
	var actions = [];
	var currentSeparator = undefined === separator ? "," : separator;
	var temp = value.split(currentSeparator);
	Object.keys(value.split(currentSeparator)).some((val) => {
		var match = false;
		Object.keys(datas).some((key) => {
			if (datas[key][vals] == ('' + temp[val])) {
				actions.push(datas[key][label] + currentSeparator);
				match = true;
			}
		})
		if (!match) {
			actions.push(temp[val] + currentSeparator);
		}
	})
	return actions.join('').substring(0, actions.join('').length - 1);
}

export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

export function aesJmEncrypt(text) {
	let aseKey = "430T934M148S45E9";
	let encrypt = CryptoJS.DES.encrypt(text, CryptoJS.enc.Utf8.parse(aseKey), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	}).toString();
	return encrypt;
}

export function recursion(list, Pinfo = {}, arr = []) {
	list.forEach(item => {
		let pinfo = Pinfo.id ? Pinfo : {
			id: item.ModuleId,
			name: item.FullName
		}
		if (item.Childrens && item.Childrens.length > 0) {
			recursion(item.Childrens, pinfo, arr)
		} else {
			let {
				id,
				name
			} = Pinfo
			arr.push({
				value: id,
				label: name,
				...item
			})
		}
	});
	return [...arr]
}

export function deepClone(source) {
	if (!source && typeof source !== "object") {
		throw new Error("error arguments", "deepClone");
	}
	const targetObj = source.constructor === Array ? [] : {};
	Object.keys(source).forEach((keys) => {
		if (source[keys] && typeof source[keys] === "object") {
			targetObj[keys] = deepClone(source[keys]);
		} else {
			targetObj[keys] = source[keys];
		}
	});
	return targetObj;
}

export function formatDate(cellValue, type = "datetime") {
	if (cellValue == null || cellValue == "") return "";
	var date = new Date(cellValue);
	var year = date.getFullYear();
	var month = date.getMonth() + 1 < 10 ?
		"0" + (date.getMonth() + 1) :
		date.getMonth() + 1;
	var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	if (type == 'datetime') {
		return (year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);
	} else {
		return (year + "-" + month + "-" + day)
	}
}

export function GetDateAfter(AddDayCount = 0, dateType = "date") {
	var AddDayCount2 = parseInt(AddDayCount);
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount2);
	var y = dd.getFullYear();
	var mon = dd.getMonth() + 1;
	var d = dd.getDate();
	var h = dd.getHours();
	var min = dd.getMinutes()
	var ss = dd.getSeconds()

	function checkT(s) {
		return s < 10 ? "0" + s : s;
	}
	if (dateType == 'year') return String(y)
	if (dateType == 'month') return String(checkT(mon))
	if (dateType == 'datetime') return `${y}-${checkT(mon)}-${checkT(d)} ${checkT(h)}:${checkT(min)}:${checkT(ss)}`
	return String(y + "-" + checkT(mon) + "-" + checkT(d))
}

export function dict2name(OTHER, value) {
	let arr = stringToArray(OTHER);
	let a = {
		name: "",
		color: "",
	};
	if (Array.isArray(value)) {
		value.forEach((item) => {
			arr.forEach((items) => {
				if (items.VALUE == item) {
					a.name = a.name + "," + items.LABEL;
				}
			});
		});
		a.name = a.name.replace(",", "");
	} else {
		arr.forEach((item) => {
			if (item.VALUE == value) {
				a.name = item.LABEL;
				a.color = item.COLOR;
				return;
			}
		});
	}
	return a;
}

export function setSuffix(data, cf, needvalue = true) {
	let value = data[cf.FIELD] + " ";
	if (cf.SUFFIX.indexOf("|") < 0) {
		if (cf.SUFFIX.indexOf("@") < 0) return needvalue? value + [cf.SUFFIX] : cf.SUFFIX ;
		let suffixID = cf.SUFFIX.replace("@", "");
		return needvalue ? value + data[suffixID] : data[suffixID];
	}
	let arr = cf.SUFFIX.split("|"),
		unit = "";
	arr.forEach((item, index) => {
		if (item.indexOf("@") < 0) {
			unit = unit + (index == 0 ? "" : "/") + item;
		} else {
			unit = unit + (index == 0 ? "" : "/") + data[item.replace("@", "")];
		}
	});
	return needvalue ? value + unit : unit;
}

export function getShowCFG(data) {
	if (!Array.isArray(data)) return [];
	data = data.filter((item) => {
		return item.ISSHOW > 0;
	});
	return data;
}

export function getUrlParams(url) {
	let reg = /([^&?=]+)=([^&?=]+)/g,
		obj = {};
	url.replace(reg, function() {
		obj[arguments[1]] = arguments[2];
	});
	return obj;
}

export function toPage(url) {
	uni.navigateTo({ url })
}

export const evilFn = (row, fn) => {
	const Data = JSON.parse(JSON.stringify(row)) || Object.create(null);
	const M$ = Data.M$ || {}
	let Fn = new Function('Data', 'M$', `return ${fn}`)
	const dataProxy = new Proxy(Data, {
		has(target, key) {
			return true;
		}
	});
	const M$Proxy = new Proxy(M$, {
		has(target, key) {
			return true;
		}
	})
	return Fn(dataProxy, M$Proxy)
};


export const hideMobile = (mobile) => {
	return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}

export function trimAll(ele) {
	if (typeof ele === 'string') {
		return ele.split(/[\t\r\f\n\s]*/g).join('');
	} else {
		console.error(`${typeof ele} is not the expected type, but the string type is expected`)
	}
}
export function goPage(menu) {
	let isReal = menu.VCODE == 'REALUSER' ? 1 : 0
	const APPTYPE = getApp().globalData.appType
	if (menu.VCODE != 'REALUSER' && useUserStore().userInfo.CERTIFICATIONSTATUS != 1 && APPTYPE != 0) {
		uni.showToast({
			icon: 'none',
			title: '您还未认证成功，请立即完成认证'
		})
		setTimeout(() => {
			uni.switchTab({
				url: '/pages/tab05/tab05'
			})
		}, 1500)
		return;
	}
	console.log('goPage', menu);
	getApp().globalData.activeMenuID = {
		"MODULEID": menu.BILLNO,
		"PAGEID": menu.ACTION,
	}
	if (menu.COMPONENT == 'VTable') {
		uni.navigateTo({
			url: '/pages/common/list/list?title=' + menu.NAME
		})
	} else if (menu.COMPONENT == 'VForm') {
		uni.navigateTo({
			url: '/pages/common/form/form?title=' + menu.NAME + '&isReal=' + isReal
		})
	} else if (menu.COMPONENT == '999') {
		uni.navigateTo({
			url: (menu.APPLETURL?menu.APPLETURL: menu.VURL) + "?title=" + menu.NAME
		})
	} else if (menu.COMPONENT == 'Link') {
		getApp().globalData.linkMenu = menu
		uni.navigateTo({
			url: '/pages_sj/tab05/webview'
		})
	}
}
export function getMyMenu(menu, type) {
	let newData = menu.filter(i => {
		return i.VCODE == type
	})
	return newData;
}

export function handleUpdate(isTip = 0) {
	let version = plus ? plus.runtime.version : '0';
	let dcType = plus.os.name == 'iOS' ? 2 : 1;
	let URL = '/sys/app/version/getDataByType';
	let query = {
		"VTYPE": dcType,
		"BILLFROM": getApp().globalData.appType ,
		"SORTNAME": "CREATIONTIME",
		"REVERSE": "desc",
		"MODULEID": "1",
		"PAGEID": "2",
	}
	axios(URL, query).then(res => {
		if (!res.RESULT) return;
		let newData = res.RESULT
		let {
			VERSIONCODE,
			UPDATEDESC,
			DOWNLOADURL,
			ISUPDATE
		} = newData;
		if (vsVersion(version, VERSIONCODE)) {
			updateAppTTT(DOWNLOADURL, UPDATEDESC, '版本更新', ISUPDATE)
		} else {
			if (isTip) {
				return uni.showToast({
					title: '您已经是最新版本',
					icon: 'none'
				})
			}
		}
	}).catch(err => {
		console.log(444, err);
	})
}
