<template lang="html">
	<div class="wrap">
		<v-header title="查询明细"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="sf-tag">
					<span v-for="(item, index) in items" :class="{active: item.isAction}" @click="toggleTab(item.name, index)">
						{{item.text}}
					</span>
        </div>
				<sevenday :is="currentView"></sevenday>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
import Vheader from '../../header/header.vue'
import sevenDay from './detailed/sevenDay.vue'
import oneMonth from './detailed/oneMonth.vue'
import twoMonth from './detailed/twoMonth.vue'
import threeMonth from './detailed/three.vue'
export default {
	data() {
		return {
			currentView: 'sevenday',
			items: [
        {
          text: '7天',
          name: 'sevenday',
          isAction: true
				},
        {
          text: '1个月',
          name: 'onemonth',
          isAction: false
        },
				{
					text: '2个月',
					name: 'twomonth',
					isAction: false
				},
				{
					text: '3个月',
					name: 'threemonth',
					isAction: false
				}
      ],
			// time: '',
			// seven: '',
			// now: null,
			// sevenDay: null,
			// timeEnd: '2012, 1, 1',
			// timeStart: '',
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	mounted() {
		this.$nextTick(function() {
			this.$refs.scroll.scroll.scrollTo(0,0);
			// let data = new Date()
			// this.now = data.setHours(0,0,0,0); //获取当前零点
			// this.sevenDay = data.getTime() - 7*24*60*60*1000
			// // 当前的时间
			// this.formatDate(this.now);
			// // 七天前的时间
			// this.formatDateSeven(this.sevenDay)
			// //初始化选择器
			// this.datePickerLeft = this.$createDatePicker({
		  //     title: '',
		  //     min: new Date(2010, 1, 1),
		  //     max: new Date(this.now),
		  //     value: new Date(this.sevenDay),
		  //     onSelect: this.selectHandleLeft,
		  //     // onCancel: this.cancelHandleLeft
		  //   })
			//
			// 	this.datePickerRight= this.$createDatePicker({
			// 			title: '',
			// 			min: new Date(this.timeEnd),
			// 			max: new Date(this.now),
			// 			value: new Date(),
			// 			onSelect: this.selectHandleRight,
			// 			// onCancel: this.cancelHandleRight
			// 		})
		})
	},
	methods: {
		toggleTab(textContent, index) {
			this.items.map(function(v, i) {
				i == index ? v.isAction = true : v.isAction = false
			})
			this.currentView = textContent;
		}
		// formatDate(time) {
		// 	let data = new Date(time);
		// 	this.time = formatDate(data, 'yyyy/MM/dd');
		// },
		// formatDateSeven(time) {
		// 	let data = new Date(time);
		// 	this.seven = formatDate(data, 'yyyy/MM/dd');
		// },
		// selectHandleLeft(date,selectedVal,selectedText) {
		// 	console.log('左边'+Date.parse(date));
		// 	this.datePickerRight.$updateProps({
		// 		min: new Date(Date.parse(date))
		// 	})
		// 	this.sevenDay = Date.parse(date);
		// 	 if(selectedVal[1].toString().length < 2) {
		// 		 selectedVal[1] = '0'+ selectedVal[1]
		// 	 }
		// 	 if(selectedVal[2].toString().length < 2) {
		// 		 selectedVal[2] = '0'+ selectedVal[2]
		// 	 }
		// 	this.seven = selectedVal.join('/');
		// },
		// selectHandleRight(date,selectedVal,selectedText) {
		// 	console.log('右边'+Date.parse(date));
		// 	this.now = Date.parse(date);
		// 	if(selectedVal[1].toString().length < 2) {
		// 		selectedVal[1] = '0'+ selectedVal[1]
		// 	}
		// 	if(selectedVal[2].toString().length < 2) {
		// 		selectedVal[2] = '0'+ selectedVal[2]
		// 	}
		// 	this.time = selectedVal.join('/');
		// },
		// clickLeft() {
		// 	this.datePickerLeft.show()
		// },
		// clickRight() {
		// 	this.datePickerRight.show()
		// },
		// subit() {
		// 	if(this.sevenDay > this.now) {
		// 		this.$createToast({
		// 			type: 'error',
		// 			txt: '开始日期不能大于结束日期',
		// 			time: 2000
		// 		}).show()
		// 		return
		// 	}
		//
		// 	// 开始ajax请求

	//	}
	},
	components: {
		'v-header': Vheader,
		'sevenday': sevenDay,
		'onemonth': oneMonth,
		'twomonth': twoMonth,
		'threemonth': threeMonth
	}
}
</script>

<style lang="css" scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.main {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0;
}
.cube-input {
	flex: 2;
}
.sf-tag{
  display: flex;
  background-color: #fff;
}
.sf-tag span{
  flex: 0 0 25%;
  padding: 15px 0;
  text-align: center;
  font-size: 16px;
  color: #333;
}
.sf-tag span.active{
  border-bottom: 2px solid #f95e30;
  font-weight: bold;
  color: #f95e30;
}
.query-diy{
  display: flex;
  padding: 10px 15px;
	justify-content: center;
	align-items: center;
	height: 30px;
	font-size: 14px;
}
.query-diy span {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.query-diy .input-left,
.query-diy .input-right{
	flex: 4;
	background-color: #fff;
	border: 1px solid #ccc;
	box-sizing: border-box;
}
.query-diy .heng {
	flex: 1;
}
.query-diy .btn-ok {
	flex: 2;
	margin-left: 10px;
}
.btn-ok{
  display: inline-block;
  background-color: #f95e30;
  font-size: 14px;
}
.query-li{
  padding: 0 15px;
}
.query-li li{
  padding: 15px 0;
  border-bottom: 1px solid #e8e8e8;
  overflow: hidden;
}
.query-li li:last-child{
  border:0;
}
</style>
