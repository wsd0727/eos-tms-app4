// stores/index.js
import { defineStore } from 'pinia';

 const indexStore = defineStore('indexStores', {
	state: () => {
		return { sysNoticContent: null };
		return { sysNoticImg: null };
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		setSysNoticContent(data) {
			this.sysNoticContent = data;
		},
		
		setSysNoticImg(data) {
			this.sysNoticImg = data;
		},
		
	},
});

export default indexStore
