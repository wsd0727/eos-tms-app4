import { defineStore } from 'pinia';
// import { getGlobalConfig } from "@/api/common"

const useGlobalStore = defineStore('global', {
  unistorage: true,
  state: () => ({
    config: {
    },
  }),
  actions: {
    getConfig() {
      // getGlobalConfig().then(res => {
      //   this.config = res.Result.Config
      //   getApp().globalData.CarConfig = res.Result.Config.CarPrefix
      //   this.funs = res.Result.Functions
      // })
    },
  }
})

export default useGlobalStore