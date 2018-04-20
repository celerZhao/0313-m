<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div class="bg-white tc pay-order">
		            <div><img src="./img/pay-fail.png"></div>
		            <p>很遗憾，本次加油卡充值操作失败。</p>
		            <p>如有疑问请咨询光汇云油24小时客服电话：</p>
		            <p><a class="c-blue" href="tel:400-809-8888">400-809-8888</a></p>
		        </div>
		        <div class="p-15"><router-link to="#" class="btn btn-orange mt-15">重新购买</router-link></div>
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