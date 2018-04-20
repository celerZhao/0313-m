<template lang="html">
  <div class="wrap">
    <v-header title="兑换"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="ex-box">
      		<ul class="form-li">
      			<li>
              <div class="form-control"><cube-input placeholder="兑换码/口令"></cube-input></div>
      			</li>
      			<li>
              <div class="form-control"><cube-input :maxlength="6" placeholder="短信验证码"></cube-input></div>
      				<!-- 注：点击获取验证码后，在class中添加disable -->
      				<a class="btn btn-phonecode" href="javascript:void(0);">获取验证码</a>
      			</li>
      		</ul>
      		<a class="btn btn-orange" href="javascript:;">兑换</a>
        </div>
        <div class="tip-txt">
            <p>兑付规则</p>
            <p><font face="宋体" size="2">1、兑换码为英文或数字组合，不区分大小写</font></p>
            <p><font face="宋体" size="2">2、口令为中文</font></p>
            <p><font face="宋体" size="2">3、一个手机号同一个活动限使用一个兑换码或口令</font></p>
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
	created() {

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
  background: #dc3b33 url(./img/bg.jpg) no-repeat center;
  background-size: auto 100% ;
  box-sizing: border-box;
  padding: 0;
}
.ex-box{
  margin: 20px 15px 30px;
  padding: 20px 15px 30px;
  border-radius: 4px;
  background: rgba(255, 255, 255, .3);
  font-size: 18px;
}
.cube-input::after{
  border:none;
}
.form-li{
  margin-bottom: 10px;
  position: relative;
  min-height: 30px;
  font-size: 15px;
  overflow: hidden;
}
.form-li > li{
  position: relative;
  min-height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
  padding: 12px 15px;
  border-radius: 4px;
  background-color: #fff;
}
.form-li label{
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  right: 0;
  min-height: 24px;
  line-height: 24px;
  border: none;
  background: none;
  text-align: left;
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
.btn-phonecode{
  position: absolute;
  right: 5px;
  top: 50%;
  display: inline-block;
  width: auto;
  padding: 6px 10px;
  border-radius: 3px;
  background-color: #fff100;
  color: #ab2520;
  transform: translate(0,-50%);
}
.btn-orange{
  padding: 12px 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #fff100, #fff100);
  font-size: 18px;
  font-weight: bold;
  color: #ab2520;
}
.btn-orange.disable{
  background: #ccc;
  color: #fff;
}
.tip-txt {
  margin: 0 15px;
  font-size: 14px;
  color: #fff;
}
.tip-txt p{
  margin-bottom: 10px;
  line-height: 16px;
}
</style>
