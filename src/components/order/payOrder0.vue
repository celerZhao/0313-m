<template lang="html">
	<div class="wrap">
		<v-header title="购买"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div class="pay-order">
		            <p><label>订单号</label>：170117101104365</p>
		            <p><label>订单商品</label>：大众储油体验卡</p>
		            <p><label>订单油品</label>：广东/深圳市 IV汽油93#</p>
		            <p><label>实付金额</label>：<span class="c-red">¥610.00</span></p>
		            <div class="bottom-line"></div>
		            <p class="mt-10 c-gray fs-12">*如您的手机快捷支付额度不够，请到PC端使用网银支付。</p>
		        </div>

		        <!-- <label class="row block mt-10 mb-10 p-15 bg-white c-gray hidden">
		            <p class="left fs-12"><input class="hide" type="checkbox"> 账户余额：<span class="c-red">¥100.00</span></p>
		            <p class="right tr fs-10">使用余额支付：<span class="c-blue">¥600.00</span></p>
		        </label> -->

		        <ul class="form-li pay-order-li">
		            <li class="fs-12" style="min-height:auto;padding-left:0;">
		                <span class="ml-15 mr-15 fs-16 c-black">支付方式</span>本订单不支付信用卡支付，请使用借记卡
		            </li>
		            <li @click="showPay">
		                <img class="pay-order-bank-img" src="./img/balance.jpg">
		                <div class="mt-10 c-black">余额支付<span class="c-red">￥740164.81</span></div>
		                <i class="icon-right"></i>
		            </li>
		            <li>
		                <img class="pay-order-bank-img" src="./img/img-wx.jpg">
		                <div class="pay-order-method">
		                    <div class="c-black">微信支付</div>
		                    <span class="fs-10 c-gray">微信安全支付</span>
		                </div>
		                <i class="icon-right"></i>
		            </li>
		            <li>
		                <img class="pay-order-bank-img" src="./img/quick-pay.jpg">
		                <div class="pay-order-method">
		                    <div class="c-black">银行卡快捷支付</div>
		                    <span class="fs-10 c-gray">无需网银，免手续费</span>
		                    <i class="order-pay-recom">推荐</i>
		                </div>
		                <i class="icon-right"></i>
		            </li>
		            <li>
		                <img class="pay-order-bank-img" src="./img/online-pay.jpg">
		                <i class="icon-right"></i>
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
var htmlContent = '<div class="payPwd">'+
			'<input type="password" maxlength="6" value="" class="psw">'+
			'<ul class="pwd-wrap flex">'+
				'<li class="flex flex-center"><div class="dian-one dian-item"></div></li>'+
				'<li class="flex flex-center"><div class="dian-two dian-item"></div></li>'+
				'<li class="flex flex-center"><div class="dian-three dian-item"></div></li>'+
				'<li class="flex flex-center"><div class="dian-four dian-item"></div></li>'+
				'<li class="flex flex-center"><div class="dian-five dian-item"></div></li>'+
				'<li class="flex flex-center"><div class="dian-six dian-item"></div></li>'+
			'</ul>'+
			'<div class="forget-content"><a href="" class="forget">忘记密码？</a></div>'+
		'</div>'
export default {
	data() {
		return {
			payMenty: 1,  // 0 未设置支付密码 1已设置支付密码
			inputVal: '',
			strLen: '',
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	methods: {
			// 弹窗提示
			msg(txt) {
				layer.open({
					content: txt,
					shade: false,
					time: 1
				})
			},
	    showPay() {
				let self = this;
			layer.open({
					type: 1,
					title: '请输入支付密码',
					skin: 'layui-layer-ziding', //样式类名
					closeBtn: 2, //不显示关闭按钮
					move: false,
					anim: 0,
					shade: 'background-color: rgba(0,0,0,.5)',
					shadeClose: true, //开启遮罩关闭
					content: htmlContent,
					btn: ['确定','取消'],
					success: function() {
						$('.psw').focus();
						$('.pwd-wrap').on('click', function() {
							$('.psw').focus();
						});
						$('.psw').on('keyup', function() {
							 $(this).val($(this).val().replace(/[^\d]/g,''));
						});
						$('.psw').on('input', function() {
						self.inputVal = $(this).val();
						if(!(/^[0-9]+$/g.test(self.inputVal))) {
								self.msg('只能输入纯数字')
							if(self.inputVal == null || self.inputVal == '') {
								$('.dian-one').hide();
							}
						}else {
							self.strLen = self.inputVal.toString().length;
							if(self.strLen==1) {$('.dian-one').show();$('.dian-two').hide();}
							if(self.strLen==2) {$('.dian-two').show();$('.dian-three').hide();}
							if(self.strLen==3) {$('.dian-three').show();$('.dian-four').hide();}
							if(self.strLen==4) {$('.dian-four').show();$('.dian-five').hide();}
							if(self.strLen==5) {$('.dian-five').show();$('.dian-six').hide();}
							if(self.strLen==6) {$('.dian-six').show();}
						}
						})
					},
					yes: function() {
						if(self.inputVal == null || self.inputVal == '') {
							self.msg('请输入支付密码！');
							return
						}
						if(self.inputVal&&(!(/^[0-9]{6}$/g.test(self.inputVal)))) {
							self.msg('请输入正确的支付密码！');
							return
						}


						alert('你输入的密码为： '+self.inputVal);

						layer.closeAll();

						// 验证完成  ajax 请求

					}

			});

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

<style lang="css">
.layui-m-layer-layui-layer-ziding {
	width: 80%;
}
.layui-m-layer1 .layui-m-layerchild {
	border-radius: 5px;
	overflow: hidden;
}
.layui-layer-ziding .layui-layer-title {
  text-align: center;
  padding: 0;
}
.layui-m-layer1 .layui-m-layercont {
	padding: 40px 20px 20px 20px;
}
.layui-m-layerbtn span {
	flex: 1;
	text-align: center;
	font-size: 0.4rem;
}
.layui-m-layerchild h3 {
	height: 1.2rem;
	line-height: 1.2rem;
	color: black;
	background-color: #eee;
}
.layui-m-layer0 .layui-m-layerchild {
	width: 60%;
	background-color: rgba(0,0,0,0.5);
	color: white;
}
.layui-m-layercont {
	padding: 0.3rem;
}
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
  padding: 0!important;
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
.pay-order{
	padding: 15px 15px 10px;
	background-color: #fff;
	font-size: 14px;
}
.pay-order > p{
	margin-bottom: 15px;
	font-size: 14px;
	color: #666;
}
.pay-order > p > label{
	display: inline-block;
	width: 75px;
	text-align:justify;
	text-justify:distribute-all-lines;
	text-align-last:justify;
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
    width: auto;
    height: 35px;
    transform: translate(0,-50%);
}
.order-pay-recom {
    position: absolute;
    top: 50%;
    right: 35px;
    display: inline-block;
    padding: 1px 10px;
    border: 1px solid #ea3534;
    color: #ea3534;
    font-size: 12px;
    font-style: normal;
    transform: translate(0,-50%);
}

/*弹窗样式*/
.cube-dialog-content-def > p{
	width: 80%;
}
.payPwd{
	position: relative;
}
.flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
.flex-center {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.psw {
	width: 100%;
	position: absolute;
	top: -30px;
	z-index: -1;
	opacity: 0;
	border: none;
}
.pwd-wrap {
  width: 100%;
  height: 30px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #ddd;
  cursor: pointer;
}
.pwd-wrap li {
  text-align: center;
  line-height: 30px;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  border-right: 1px solid #ddd;
}
.pwd-wrap li:last-child {
  border-right: 0;
}
.pwd-wrap li>div {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #000;
  display: none;
}
.forget-content {
  text-align: right;
  margin: 10px 0;
}
.forget {
  display: inline-block;
	color: red;
}
</style>
