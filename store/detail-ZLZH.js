
import { defineStore } from 'pinia';
const SendStore = defineStore('detail', {
  state: () => ({
    showCOLUMNS: {},
	MAINTABLE:[],
	SUBTABLE:[],
	COLUMNS:[]
  }),
  actions: {
    setShowCOLUMNS(data) {
      this.showCOLUMNS = data
    },
	setMAINTABLE(data) {
	  this.MAINTABLE = data
	},
	setSUBTABLE(data) {
	  this.SUBTABLE = data
	},
	setCOLUMNS(data){
		this.COLUMNS = data
	}
  }
})

export default SendStore
