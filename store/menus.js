import {
	defineStore
} from 'pinia';

import {
	getMyMenu
} from '@/common'

const useTabStore = defineStore('tabStore', {
  unistorage: true,
	state: () => ({
		alltab: [],
		tab01: null,
		tab02: null,
		tab03: null,
		tab04: null,
		tab05: null,
	}),
	actions: {
		setTabs(data) {
			this.alltab = data
			this.tab01 = getMyMenu(data , 'tab01')[0];
			this.tab02 = getMyMenu(data , 'tab02')[0];
			this.tab03 = getMyMenu(data , 'tab03')[0];
			this.tab04 = getMyMenu(data , 'tab04')[0];
			this.tab05 = getMyMenu(data , 'tab05')[0];
		},
	}
})

export default useTabStore