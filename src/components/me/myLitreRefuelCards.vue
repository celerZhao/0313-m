<template lang="html">
	<div class="wrap">
		<v-header title="定升加油卡余额"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
				<div class="row bg-white p-15 c-darkgray">
			        <h5 class="mt-15 mb-20 fs-20 bold">光汇石油加油站管理有限公司-定升加油卡</h5>
			        <div class="fs-16 lh-20 c-gray">该卡由光汇石油加油站管理有限公司发行，仅适用于光汇石油自营加油站</div>
			    </div>
			</cube-scroll>
		</div>
    	<router-link to="/balanceRecharge" class="btn btn-orange disable">立即充值</router-link>
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
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0;
}
.cube-scroll-content{
	background-color: #f00!important;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
.btn.disable {
	cursor: not-allowed;
  background: #ccc;
  color: #fff!important;
}
</style>
