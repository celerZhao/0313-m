<template lang="html">
	<div class="wrap">
		<v-header title="加油卡充值"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <h5 class="p-15">每月充值金额</h5>
			  <ul class="fuel-li">
			  	<li v-for="(item, index) in amounts" @click="changeTab(item,index)">
						<div :class="{active: item.isActive}">{{item.value}}元</div>
					</li>
			  	<!-- <li><div>200元</div></li>
			  	<li><div>500元</div></li> -->
			  </ul>
			  <h5 class="p-15">选择充值套餐</h5>
			  <ul class="fuel-li">
			  	<li v-for="(each, index) in discounts" @click="changeTab(each,index)">
						<div :class="{active: each.isActive}">{{each.value}}折<p>{{each.desc}}</p></div>
					</li>
			  	<!-- <li><div class="active">9.95折<p>即充即用</p></div></li>
			  	<li><div>9.9折<p>充值2个月</p></div></li>
			  	<li><div>9.8折<p>充值3个月</p></div></li>
			  	<li><div>9.6折<p>充值6个月</p></div></li>
			  	<li><div>9.3折<p>充值12个月</p></div></li> -->
			  </ul>
			  <div class="pb-15 bg-white tc c-darkgray fs-15">
			  	<div class="mb-5">充值1个月,每月自动到账,当天到账第1笔</div>
			  	<div>原价<span class="c-red">{{autoReful.desc.total_amount}}</span>元 折扣价<span class="c-red">{{autoReful.desc.discount_amount}}</span>元
			  		共省<span class="c-red">{{autoReful.desc.rate_amount}}</span>元</div>
			  </div>
			  <ul class="form-li">
          <li>
            <label>充值明细</label>
            <div class="form-control"><span class="c-red">100元每个月*1个月=100元</span></div>
            <i class="icon-right"></i>
          </li>
        </ul>
        <div class="mt-5 mr-15 c-gray tr">首月<span>100</span>元，在购买后10分钟内到账</div>

        <div class="mt-15 p-15"><router-link to="/fuelCardBuy" class="btn btn-orange">下一步</router-link></div>
        <div class="fs-15 c-blue tc">分月返还套餐代充值服务说明</div>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
			autoReful:[],
			appSetting:[],
			price: 100,
			zhe: 9.95,
			amounts: [
				{
					value: 100,
					isActive: true
				},
				{
					value: 200,
					isActive: false
				},
				{
					value: 500,
					isActive: false
				}
			],
			discounts: [
				{
					value: 9.9,
					desc:'即充即用',
					isActive: true
				},
				{
					value: 9.8,
					desc:'充值2个月',
					isActive: false
				},
				{
					value: 9.7,
					desc:'充值3个月',
					isActive: false
				},
				{
					value: 9.5,
					desc:'充值6个月',
					isActive: false
				},
				{
					value: 9.3,
					desc:'充值12个月',
					isActive: false
				}
			],
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	methods: {
		changeTab(item, index) {
			let self = this;
			console.log(item.value);
			this.discounts.map(function(v, i) {
				i == index ? v.isActive = true : v.isActive = false
			});

		console.log(1);
			//ajax
			setTimeout(function() {
				console.log(2);

				self.price = 50;
			},2000)
		}
	},
	mounted() {
		this.$nextTick(function() {
			this.$refs.scroll.scroll.scrollTo(0,0);
			console.log(this.price,this.zhe);
		})
	},
	components: {
		'v-header': Vheader
	},
	created(){
		api.getAddOilCart({
        permonth_amount: '',
        discountrate: '',
        confirm_month: ''
      }).then(response => {
        this.autoReful = response.data.data.dataList;
        // this.$refs.slide.refresh();
      }).catch(error => {
        console.log(error);
      })

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
  font-size: 14px;
}
.fuel-li{
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	background-color: #fff;
}
.fuel-li > li{
	flex: 0 0 33%;
	margin: 5px 0;
	text-align: center;
}
.fuel-li > li > div{
	margin: 0 5px;
	padding: 10px 0;
	border-radius: 4px;
	border: 1px solid #bbb;
	box-sizing: border-box;
	color: #666;
	font-size: 16px;
}
.fuel-li > li > div.active{
	border-color: #fd9a27;
	background-color: #fd9a27;
	color: #fff;
}
.fuel-li > li > div > p{
	margin-top: 5px;
	font-size: 14px;
}
.form-li{
  margin-top: 10px;
  position: relative;
  min-height: 30px;
  background-color: #fff;
  font-size: 16px;
  overflow: hidden;
}
.form-li > li{
  position: relative;
  min-height: 24px;
  line-height: 24px;
  padding: 12px 15px;
  border-bottom: 1px solid #e8e8e8;
}
.form-li > li:last-child{
  border-bottom: 0;
}
.form-li > li > a{
    display: block;
}
.form-li label{
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  min-height: 24px;
  line-height: 24px;
  border: none;
  background: none;
  text-align: right;
  font-size: 14px;
  outline: none;
  transform: translate(0,-50%);
}
.form-li .form-control span{
  margin-right: 30px;
}
.form-li .icon-right{
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 18px;
  transform: translate(0,-50%);
}
.btn-orange{
  padding: 12px 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
</style>
