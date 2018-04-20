<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <ul class="form-li">
          <li>
            <label>充值金额</label>
            <div class="form-control"><cube-input :maxlength="7" placeholder="请输入充值金额"></cube-input></div>
          </li>
        </ul>
        <p class="mt-5 mb-20 pl-15 c-gray fs-12">大额充值，请在电脑端使用网银支付</p>

        <ul class="form-li pay-order-li">
          <li class="fs-12" style="min-height:auto;padding-left:0;">
            <span class="ml-15 mr-15 fs-16 c-black">充值方式</span>
          </li>
          <li>
            <router-link to="#">
              <img class="pay-order-bank-img" src="./img/online-pay2.jpg">
              <div class="pay-order-method">
                  <div class="c-black">银联卡在线支付</div>
                  <span class="fs-12 c-gray">无需开通网银</span>
                  <i class="icon-right"></i>
              </div>
            </router-link>
          </li>
        </ul>
			</cube-scroll>
		</div>
    <div class="mb-15 tc fs-15">
        <router-link to="/balanceRechargeDet" class="c-blue">充值明细</router-link> | <router-link to="/questionNormal" class="c-blue">常见问题</router-link>
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
.cube-input input{
  padding-left: 0;
  padding-right: 0;
  text-align: right;
  font-size: 20px;
}
.cube-input::after{
  border: 0;
}
.form-li{
  position: relative;
  min-height: 30px;
  background-color: #fff;
  font-size: 15px;
  overflow: hidden;
}
.form-li > li{
  position: relative;
  min-height: 24px;
  line-height: 24px;
  padding: 12px 15px;
  border-bottom: 1px solid #e8e8e8;
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
  left: 100px;
  right: 15px;
  top: 50%;
  min-height: 24px;
  line-height: 24px;
  border: none;
  background: none;
  text-align: right;
  font-size: 14px;
  outline: none;
  transform: translate(0,-50%);
}
.form-li .icon-right{
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 18px;
  transform: translate(0,-50%);
}
.pay-order-li > li{
  min-height: 40px;
  padding: 10px 15px 10px 70px;
  border-bottom: 1px solid #e8e8e8!important;
}
.pay-order-bank-img{
  position: absolute;
  left: 15px;
  top: 50%;
  width: 40px;
  height: 40px;
  transform: translate(0,-50%);
}
</style>
