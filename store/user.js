import { defineStore } from 'pinia';
const useUserStore = defineStore('user', {
  unistorage: true,
  state: () => ({
    userInfo: {},
	globalConfig:null
  }),
  actions: {
    setUserinfo(data) {
      this.userInfo = data
    },
	setGlobalConfig(data) {
	console.log('99,', data);
	  this.globalConfig = data
	},
    loginOut() {
      return new Promise(resolve => {
       uni.setStorageSync('token_key', '');
        resolve(true)
        this.userInfo = null
      })
    }
  }
})

export default useUserStore