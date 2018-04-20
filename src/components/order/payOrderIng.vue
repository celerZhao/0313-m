<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div class="bg-white tc pay-order">
		            <div><img src="./img/paying.png"></div>
		            <p>订单正在处理中，请稍等...</p>
		            <p class="mb-20 fs-12">您可以稍后查看订单详情，了解订单状态。</p>
		            <p>支付金额：<span class="c-red">¥600.00</span></p>
		        </div>
		        <div class="p-15">
			        <router-link to="/order" class="btn btn-orange mt-15">查看订单详情</router-link>
			        <router-link to="/product" class="btn btn-default mt-15">继续购买</router-link>
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
	padding-bottom: 15px;
}
.pay-order > div{
	width: 80px;
	margin: 0 auto 10px;
	padding-top: 50px;
}
.pay-order > p{
	margin-bottom: 10px;
	font-size: 16px;
	color: #666;
}
</style>