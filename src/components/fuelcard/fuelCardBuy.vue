<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <ul class="form-li">
          <li>
            <router-link to="/fuelCardBind">
              <label>加油卡号</label>
              <div class="form-control"><span class="c-gray">未绑定</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
        </ul>
        <div class="mb-10 pr-15 pl-15 c-gray fs-14 lh-20">绑定中石化/中石油加油卡(仅能绑定一张),如您成功绑定,需90天后才可更换</div>
        <ul class="form-li">
          <li>
            <router-link to="/quan2">
              <label>使用优惠券</label>
              <div class="form-control"><span class="c-gray">未使用</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
        </ul>
        <ul class="form-li">
          <li>
            <label>实付金额</label>
            <div class="form-control"><b class="c-red">￥</b><span class="c-red">99.50</span></div>
          </li>
        </ul>

        <div class="mt-15 p-15"><router-link to="/payOrderConfirm" class="btn btn-orange">立即购买</router-link></div>
        <div class="p-15 fs-15">
	        <p>特别说明</p>
	        <div class="mt-15 mb-15"><router-link to="#" class="c-blue">充值成功后需要圈存</router-link ></div>
		      <div><router-link  to="#" class="c-blue">关于开具发票的说明</router-link ></div>
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
  font-size: 14px;
  color: #666;
}
.form-li{
  margin-bottom: 10px;
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
