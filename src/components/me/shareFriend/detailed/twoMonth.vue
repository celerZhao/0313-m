<template lang="html">
  <div class="twoMonth">
    <div class="query-diy">
        <span class="input-left" ref="leftTime" @click="clickLeft">{{seven}}</span>
        <span class="heng">-</span>
        <span class="input-right" ref="rightTime" @click="clickRight">{{time}}</span>
        <span class="btn btn-ok" @click="subit">确定</span>
    </div>
    <div class="bg-white fs-16 c-darkgray">
      <h5 class="p-15 bottom-line bold fs-18">普通会员22</h5>
      <ul class="query-li">
        <li v-for="item in datalist">
          <span class="left">{{item.create_time}}</span>
          <span class="right">{{item.promotion_profit}}元</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vheader from '../../../header/header.vue'
import api from '../../../../fetch/ajax.js'
import {formatDate} from 'src/common/js/formate.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
			datalist:[],
			time: '',
			seven: '',
			now: null,
			sevenDay: null,
			timeEnd: '2012, 1, 1',
			timeStart: ''
		}
	},
	mounted() {
		this.$nextTick(function() {
			// this.$refs.scroll.scroll.scrollTo(0,0);
			let data = new Date()
			this.now = data.setHours(0,0,0,0); //获取当前零点
			this.sevenDay = data.getTime() - 60*24*60*60*1000
			// 当前的时间
			this.formatDate(this.now);
			// 2个月前的时间
			this.formatDateSeven(this.sevenDay)
			//初始化选择器
			this.datePickerLeft = this.$createDatePicker({
		      title: '',
		      min: new Date(2010, 1, 1),
		      max: new Date(this.now),
		      value: new Date(this.sevenDay),
		      onSelect: this.selectHandleLeft,
		      // onCancel: this.cancelHandleLeft
		    })

				this.datePickerRight= this.$createDatePicker({
						title: '',
						min: new Date(this.timeEnd),
						max: new Date(this.now),
						value: new Date(),
						onSelect: this.selectHandleRight,
						// onCancel: this.cancelHandleRight
					})
					this.loaded();
		})
	},
	methods: {
			loaded(){
			
			 api.getCommisDetail({
        ver: '5.2.2',
        start_time : this.seven.replace(/\//g,'-')+' 00:00:00',
        end_time: this.time.replace(/\//g,'-')+' 23:59:59',
        page : 1,
        limit : 10
        }).then(response => {
              let dataNew = response.data.data.dataList
              if(dataNew.length>0) {
                 this.datalist = this.datalist.concat(dataNew)
               }else {
                 this.$refs.scroll.forceUpdate();
                 // this.$refs.scroll.scroll.scrollBy(0, 64, 800)
               }
          // this.$refs.slide.refresh();
        }).catch(error => {
          console.log(error);
        })
		},
		formatDate(time) {
			let data = new Date(time);
			this.time = formatDate(data, 'yyyy/MM/dd');
		},
		formatDateSeven(time) {
			let data = new Date(time);
			this.seven = formatDate(data, 'yyyy/MM/dd');
		},
		selectHandleLeft(date,selectedVal,selectedText) {
			console.log('左边'+Date.parse(date));
			this.datePickerRight.$updateProps({
				min: new Date(Date.parse(date))
			})
			this.sevenDay = Date.parse(date);
			 if(selectedVal[1].toString().length < 2) {
				 selectedVal[1] = '0'+ selectedVal[1]
			 }
			 if(selectedVal[2].toString().length < 2) {
				 selectedVal[2] = '0'+ selectedVal[2]
			 }
			this.seven = selectedVal.join('/');
		},
		selectHandleRight(date,selectedVal,selectedText) {
			console.log('右边'+Date.parse(date));
			this.now = Date.parse(date);
			if(selectedVal[1].toString().length < 2) {
				selectedVal[1] = '0'+ selectedVal[1]
			}
			if(selectedVal[2].toString().length < 2) {
				selectedVal[2] = '0'+ selectedVal[2]
			}
			this.time = selectedVal.join('/');
		},
		clickLeft() {
			this.datePickerLeft.show()
		},
		clickRight() {
			this.datePickerRight.show()
		},
		subit() {
			if(this.sevenDay > this.now) {
				this.$createToast({
					type: 'error',
					txt: '开始日期不能大于结束日期',
					time: 2000
				}).show()
				return
			}

			// 开始ajax请求
			this.loaded();

		}
	},
	components: {
		'v-header': Vheader
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
