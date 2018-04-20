<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
      <ul>
        <li>
          <div class="p-15 fs-16 c-darkgray bottom-line">2018-01</div>
          <ul class="form-li pay-order-li">
            <li>
              <i class="icon-txt-name">充</i>
              <div class="pay-order-method">
                  <div class="c-darkgray">管理员代充值<span class="right c-black fs-20 bold">+88888888</span></div>
                  <span class="fs-12 c-gray">03-28 18:08</span>
              </div>
            </li>
          </ul>
        </li>
        <li>
          <div class="p-15 fs-16 c-darkgray bottom-line">2017-01</div>
          <ul class="form-li pay-order-li">
            <li>
              <i class="icon-txt-name">充</i>
              <div class="pay-order-method">
                  <div class="c-darkgray">管理员代充值<span class="right c-black fs-20 bold">+999</span></div>
                  <span class="fs-12 c-gray">03-28 18:08</span>
              </div>
            </li>
            <li>
              <i class="icon-txt-name">充</i>
              <div class="pay-order-method">
                  <div class="c-darkgray">后台退款<span class="right c-black fs-20 bold">+989554</span></div>
                  <span class="fs-12 c-gray">03-28 18:08</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
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
.form-li{
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
.icon-txt-name{
  position: absolute;
  left: 15px;
  top: 50%;
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 45px;
  background-color: #32BB6B;
  font-size: 30px;
  color: #fff;
  text-align: center;
  transform: translate(0,-50%);
}
</style>
