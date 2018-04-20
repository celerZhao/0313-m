<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div class="bg-white tc pay-order">
		            <div><img src="./img/pay-suc.png"></div>
		            <p>您已购买大众储油体验卡，xx升，</p>
		            <p>消费金额为xx元</p>
		        </div>
		        <div class="p-15">
			        <router-link to="#" class="btn btn-orange mt-15">分享赚钱</router-link >
			        <router-link to="#" class="btn btn-default mt-15">下载APP提油</router-link >
			        <router-link to="/home" class="btn btn-default mt-15">返回首页</router-link >
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
