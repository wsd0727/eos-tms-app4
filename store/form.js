import { defineStore } from 'pinia';

const useFormStore = defineStore('form', {
  unistorage: true,
  state: () => ({
    config: {},
    detail:null,
	carQueryData:{},
  }),
  actions: {
    setConfig(data) {
      console.log("Pinia:form:config", data);
      return new Promise(resolve => {
        this.config = data
        resolve()
      })
    },
    setDetail(data) {
      this.detail = data
    },
	setCarQueryData(data) {
      this.carQueryData = data
    },
  }
})

export default useFormStore