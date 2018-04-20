<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div class="pay-order">
          <p><label>商户名称</label>深圳光汇云油电商有限公司</p>
          <p><label>订单号</label>180324154165716</p>
          <p><label>订单商品</label>加油充值卡</p>
          <p><label>商品套餐</label>：100元，1期</p>
          <p><label>购买日期</label>：2018-03-24 15:41</p>
          <p><label>实付金额</label>：<span class="c-red">100.00</span>元</p>
        </div>
        <div class="p-15">
	        <router-link to="/payOrderSuc" class="btn btn-orange">立即支付</router-link>
        </div>
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
		})
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
.pay-order{
	padding: 15px 15px 10px;
	background-color: #fff;
	font-size: 14px;
}
.pay-order > p{
	margin-bottom: 15px;
	font-size: 14px;
	color: #666;
}
.pay-order > p > label{
	display: inline-block;
	width: 75px;
	text-align:justify;
	text-justify:distribute-all-lines;
	text-align-last:justify;
}
</style>
