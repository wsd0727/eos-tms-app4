
import { defineStore } from 'pinia';
const subscriptionSourceStore = defineStore('subscriptionSource', {
  state: () => ({
    confirmOrderData:{},
	confirmOrderSelectedData:{},
	editLine:{}
  }),
  actions: {
    setConfirmOrderData(data) {
      this.confirmOrderData = data
    },
	setconfirmOrderSelectedData(data){
		this.confirmOrderSelectedData = data
	},
	setEditLine(data){
		this.editLine = data
	}
  }
})

export default subscriptionSourceStore
