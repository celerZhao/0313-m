<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <ul class="form-li">
          <li>
            <label>真实姓名</label>
            <div class="form-control"><span class="c-darkgray">张*疯</span></div>
          </li>
          <li>
            <label>身份证号</label>
            <div class="form-control"><span class="c-darkgray">6************8</span></div>
          </li>
        </ul>

        <ul class="form-li pay-order-li">
          <li>
              <img class="pay-order-bank-img" src="./../img/bank01-icbc.jpg">
              <div class="pay-order-method">
                  <div class="c-black">工商银行</div>
                  <span class="fs-12 c-gray">6888 **** **** 8888</span>
                  <i class="order-pay-recom c-red">已设为默认提现卡</i>
              </div>
          </li>
          <li>
              <img class="pay-order-bank-img" src="./../img/bank02-ccb.jpg">
              <div class="pay-order-method">
                  <div class="c-black">建设银行</div>
                  <span class="fs-12 c-gray">6888 **** **** 8888</span>
                  <i class="order-pay-recom">设为默认提现卡</i>
              </div>
          </li>
          <li>
              <img class="pay-order-bank-img" src="./../img/bank03-cmb.jpg">
              <div class="pay-order-method">
                  <div class="c-black">招商银行</div>
                  <span class="fs-12 c-gray">6888 **** **** 8888</span>
                  <i class="order-pay-recom">设为默认提现卡</i>
              </div>
          </li>
        </ul>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
import Vheader from '../../header/header.vue'
import api from '../../../fetch/ajax.js'
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
.form-li{
  margin-bottom: 10px;
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
  margin-right: 15px;
}
.form-li .form-control span i{
  font-style: normal;
}
.form-li .form-control a{
  position: absolute;
  top: 50%;
  right: 15px;
  width: 70px;
  padding: 6px 0;
  border-radius: 20px;
  text-align: center;
  font-size: 15px;
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
  padding: 10px 15px 10px 90px;
  border-bottom: 1px solid #e8e8e8!important;
}
.pay-order-bank-img{
  position: absolute;
  left: 15px;
  top: 50%;
  width: 60px;
  height: 60px;
  transform: translate(0,-50%);
}
.order-pay-recom {
  position: absolute;
  top: 50%;
  right: 15px;
  display: inline-block;
  color: #187eea;
  font-size: 12px;
  font-style: normal;
  transform: translate(0,-50%);
}
</style>
