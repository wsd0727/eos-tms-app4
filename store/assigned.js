
import { defineStore } from 'pinia';
const SendStore = defineStore('assigned', {
  state: () => ({
    showCOLUMNS: [],
	allCOLUMNS:[],
	tableData:[],
	btnList:[],
	sendCarList:[],
	sendCarListFixation:[],
	billsSelectedData:[]
  }),
  actions: {
    setShowCOLUMNS(data) {
      this.showCOLUMNS = data
    },
	setAllCOLUMNS(data) {
	  this.allCOLUMNS = data
	},
	setTableData(data) {
	  this.tableData = data
	},
	setbtnList(data) {
	  this.btnList = data
	},
	setSendCarList(data){
		this.sendCarList = data
	},
	
	setBillsSelectedData(data){
		this.billsSelectedData = data
	},
	setSendCarListFixation(data){
		this.sendCarListFixation = data
	},
  }
})

export default SendStore
