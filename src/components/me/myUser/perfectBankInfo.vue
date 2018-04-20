<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="p-15 c-gray fs-13"><span class="mr-15 fs-16 c-darkgray">个人信息</span>光汇云油保证不会滥用或泄露您的个人信息</div>
        <ul class="form-li">
          <li>
            <label>真实姓名</label>
            <div class="form-control"><cube-input :maxlength="20" placeholder="请输入真实姓名"></cube-input></div>
          </li>
          <li>
            <label>身份证号</label>
            <div class="form-control"><cube-input :maxlength="18" placeholder="请输入身份证号码"></cube-input></div>
            <i class="icon-wenhao"></i>
          </li>
          <li>
            <label>银行卡号</label>
            <div class="form-control"><cube-input :maxlength="19" placeholder="请输入一张用来提现的银行卡号"></cube-input></div>
          </li>
          <li>
            <label>手机号码</label>
            <div class="form-control"><cube-input :maxlength="11" placeholder="请输入您在银行的预留手机号"></cube-input></div>
            <i class="icon-wenhao"></i>
          </li>
          <li>
            <label>验证码</label>
            <div class="form-control"><cube-input :maxlength="6" placeholder="请输入短信验证码"></cube-input></div>
            <a class="btn btn-phonecode" href="javascript:void(0);">获取验证码</a>
          </li>
        </ul>
        <div class="p-15">
          <router-link to="/findPayPwd" class="btn btn-orange disable">下一步</router-link>
          <div class="mt-10 tc c-blue fs-16"><span>查看支持的提现银行卡</span></div>
          <div class="mt-20 fs-14 lh-20 c-gray">您所绑定的银行卡用于提现，为避免产生额外费用，请您绑定银行借记卡；绑定成功后，如有问题需要联系客服：<a class="c-blue" href="tel:4008098888">400-8098-888</a></div>
        </div>
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
.cube-input::after{
  border:none;
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
.form-li label{
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 110px;
  top: 50%;
  right: 15px;
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
.form-li .icon-wenhao{
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 16px;
  transform: translate(0,-50%);
}
.btn-phonecode{
  position: absolute;
  right: 15px;
  top: 50%;
  display: inline-block;
  width: auto;
  padding: 5px 10px;
  border:1px solid #f95e30;
  background-color: #f95e30;
  border-radius: 3px;
  color: #fff;
  transform: translate(0,-50%);
}
.btn-orange{
  padding: 12px 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
.btn-orange.disable{
  background: #ccc;
  color: #fff;
}
</style>
