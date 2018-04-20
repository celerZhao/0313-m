<template lang="html">
	<div class="wrap">
		<v-header ref="headerheight"></v-header>
		<div class="main">
			<!-- prevent -->
			<div class="main-content" @touchstart="upTouchStart" @touchmove="upTouchMove" @touchend="upTouchEnd">
				<div class="one-tent" ref="oneContent">
					<div class="one-top">
					  <div class="pro-detail-top">
	            <div class="tc">
	              <div class="fs-26 mt-20"><span class="relative">测试10.0<span class="fs-16">% +100.00%</span></span></div>
	              <div class="fs-12 mt-5">赠送比例 + 上涨红利 <i class="icon-wenhao"></i></div>
	            </div>

	            <ul class="tc">
	              <li>期限 1个月</li>
	              <li>起购金额 100元</li>
	            </ul>
			      </div>
				    <ul class="form-li">
							<li>
								<label>参考油价 <i class="icon-wenhao c-gray"></i></label>
								<div class="form-control"><span class="mr-15 c-darkgray">6.08元/升</span></div>
							</li>
							<li>
								<label>兑付服务费 <i class="icon-wenhao c-gray"></i></label>
								<div class="form-control"><span class="mr-15 c-darkgray">上涨红利的<i class="c-red">10%</i></span></div>
							</li>
							<li>
								<label>购买金额</label>
								<div class="form-control not-transform"><span class="mr-15 c-gray fs-10">100元起购，100元递增，每人限购800元</span></div>
								<dl class="new-pro-li">
									<dt class="fs-26 c-black">¥</dt>
									<dd>
										<div class="relative tc buy-num">
											<input type="tel" maxlength="6" placeholder="请输入100~800，100的整数倍">
										</div>
									</dd>
								</dl>
							</li>
							<li class="pt-5 pb-5 pl-15 pr-15 fs-10 c-gray">购买油量：<span class="c-red">117.65</span>升，赠送油量：<span class="c-red">11.76</span>升，合计：<span class="c-red">129.41</span>升</li>
				    </ul>
				    <div class="mb-10 mt-5 mr-15 tr c-gray fs-10">风险提示：油价波动会影响您的上涨红利</div>
				    <ul class="form form-li"></ul>
		       	<p class="tips"><img class="" src="./img/icon02-dun.png">人保，易安保险与工商银行保障您的资金安全</p>
					</div>
		     <!-- 点击返回顶部 s-->
					<div class="hua-wrap">
						<i class="icon-up up"></i>
						<fieldset class="shnaghua">
							<legend>上滑查看更多详情</legend>
						</fieldset>
					</div>
		</div>
		<div class="detal-footer" ref="footerH">
			<router-link to="home" class="back-home"><i class="icon-home1"></i>首页</router-link>
			<!-- 如果禁止点击，需要给a加class：disable -->
			<div class="shiPay">
				<div class="fs-15">实付: <span class="c-red">770.00 元</span></div>
				<div class="mt-5 fs-12 c-red">优惠：30.00 元</div>
			</div>
			<router-link to="/payOrder" class="touzi">立即投资</router-link>
		</div>
	    	<div class="pro-detail" ref="productD">

					<div class="pro-wrap">
						<ul class="row bottom-line pro-detail-tag" :class="{'fix':currentShow === 'shopDetal'}">
							<li class="active"><span>产品详情</span></li>
							<li><span>使用案例</span></li>
							<li><span>关于光汇</span></li>
						</ul>
						<div class="pro-main">
							<cube-scroll ref="scroll" :options="options" :listenScroll="true">
	          		<div class="pro-detail-cons">
	                <!-- 产品详情 s -->
	                <ul>
	                  <!-- 收益说明 s -->
	                  <li>
	                    <h5 class="pdc-title">收益说明</h5>
	                    <ol class="pro-detail-rules">
	                      <li>1、保底年收益12%，同时还可以享受油价上涨35%的双重收益</li>
	                      <li>2、油品单价参考当前发改委公布的深圳市V汽油92#价格</li>
	                      <li>3、该产品适合尝试平台产品的新客，每100升一个单位，最多可购买500升</li>
	                    </ol>
	                  </li>
	                  <!-- 收益说明 e -->

	                  <!-- 兑付说明 s -->
	                  <li>
	                    <h5 class="pdc-title">兑付说明</h5>
	                    <div class="fs-11 bg-white margin-bottom">
                        <table class="pro-detail-tb" width="100%" cellpadding="0" cellspacing="0">
                           <thead>
                            <tr>
                                <th>兑付日</th>
                                <th>兑付数量</th>
                            </tr>
                           </thead>
                           <tbody>
                            <tr>
                                <td>2018-02-12</td>
                                <td>500.00升</td>
                            </tr>
                            <tr>
                                <td>2018-02-12</td>
                                <td>500.00升</td>
                            </tr>
                          </tbody>
                        </table>

                        <div>
                          <div class="duifu-box mt-15 mb-15">
                            <div class="node stage1"></div>
                            <div class="node stage2"></div>
                            <div class="node stage3"></div>
                          </div>
                          <div class="clear tc pb-10 fs-14">
                              <div class="left tl">
                                  <div>2017/9/25</div>
                                  <div>购买成功</div>
                              </div>
                              <div class="right tr">
                                  <div>后续可<br>随时兑付</div>
                              </div>
                              <div>
                                  <div>2017/12/24</div>
                                  <div>到期开放兑付</div>
                              </div>
                          </div>
                          <div class="top-line c-darkgray mt-10 pt-10 pb-10 fs-14">稳健的固定收益产品</div>
                        </div>
	                    </div>
	                    <div class="fs-15 c-darkgray">注：此为每张卡可兑付数量说明</div>
	                  </li>
	                  <!-- 兑付说明 e -->

	                  <!-- 交易规则 s -->
	                  <li>
	                    <h5 class="pdc-title">交易规则</h5>
	                    <ol class="pro-detail-rules">
	                      <li>1、交易规则交易规则交易规则交易规则交易规则</li>
	                      <li>2、交易规则交易规则交交易规则交易规则交易规则交易规则交易规则易规则</li>
	                    </ol>
	                  </li>
	                  <!-- 交易规则 e -->

	                  <!-- 资金安全 s -->
	                  <li>
	                    <!--第一种保险状态 start-->
	                    <div class="mb-15">
	                    	<h5 class="pdc-title">资金安全</h5>
	                      <div class="pdc-title-span">
	                        <span class="border-item">工商银行托管</span>
	                        <span class="border-item">易安保险保障</span>
	                      </div>
	                      <div class="fs-14 c-darkgray">
	                        <p class="mt-10 mb-10 c-orange">工商银行资金存管,易安保险保障账户资金安全</p>
	                        <p class="mb-10 c-black">您只要再购买价值<span class="c-red">3688.99元</span>的光汇云油产品，光汇云油将为您购买保额为50000元，由易安保险承保的光汇云油账户资金安全险。</p>
	                        <p>光汇云油平台账户资金安全险，是易安保险专门为光汇云油平台打造的专属产品，为您的账户资金安全提供全面保障。目前光汇云油平台为所有储油资产金额超过10000元的用户购买额度合理的账户资金安全险，按月根据资产余额情况确定是否购买或者购买更高额度的保险，安全险最早于在您储油资产达到1万元后的第3个工作日零时生效。保险生效后，您可以在我的账户页面查看到您的保单，或者在易安保险官网/热线电话/微信公众号凭保单、姓名、身份证号核实保单真伪。您可以在我的账户页面查看到您的保单，或者在易安保险官网/热线电话/微信公众号凭保单、姓名、身份证号核实保单真伪。</p>
	                      </div>
	                    </div>
	                    <!--第一种保险状态 end-->

	                    <!--第2种保险状态 start-->
	                    <div class="mb-15">
	                    	<h5 class="pdc-title">资金安全</h5>
	                        <div class="pdc-title-span">
	                          <span class="border-item">工商银行托管</span>
	                          <span class="border-item">易安保险保障</span>
	                        </div>
	                        <div class="fs-14 c-darkgray">
	                          <p class="mt-10 mb-10 c-orange">如您成功支付当前订单，光汇云油将为您购买保额为50000元，由易安保险承保的光汇云油账户资金安全险。</p>
	                          <div>
	                            <label class="c-black fs-14">
	                              <input type="checkbox" class="hide" checked="" disabled="">
	                              本人已阅读并同意<a class="inline-block c-blue" href="#">《投保须知》</a>和<a class="inline-block c-blue" href="#"> 《保险条款》</a>
	                            </label>
	                          </div>
	                        </div>
	                    </div>
	                    <!--第2种保险状态 end-->

	                    <!--第3种保险状态 start-->
	                    <div class="mb-15">
	                    	<h5 class="pdc-title">资金安全</h5>
	                      <div class="pdc-title-span">
	                        <span class="border-item">工商银行托管</span>
	                        <span class="border-item">易安保险保障</span>
	                      </div>
	                      <div class="fs-14 c-darkgray">
	                        <p class="mt-10 mb-10 c-orange">3个工作日内，您的账户资金安全险将生效（保费由本平台支付）。</p>
	                        <div>
	                          <label class="c-black fs-14">
	                            <input type="checkbox" class="hide" checked="" disabled="">
	                            本人已阅读并同意<a class="inline-block c-blue" href="#">《投保须知》</a>和<a class="inline-block c-blue" href="#"> 《保险条款》</a>
	                          </label>
	                        </div>
	                      </div>
	                    </div>
	                    <!--第3种保险状态 end-->

	                    <!--第4种保险状态 start-->
	                    <div class="mb-15">
	                    	<h5 class="pdc-title">资金安全</h5>
	                      <div class="pdc-title-span">
	                        <span class="border-item">工商银行托管</span>
	                        <span class="border-item">易安保险保障</span>
	                      </div>
	                      <div class="fs-14 c-darkgray">
	                        <p class="mt-10 mb-10 c-orange">恭喜您，光汇云油已为您购买保额为50000元，由易安保险承保的光汇云油账户资金安全险，为您的资产保驾护航。</p>
	                        <div class="c-black fs-14">
	                          相关保险条款请点击查看<a class="inline-block c-blue" href="#">《投保须知》</a>和<a class="inline-block c-blue" href="#"> 《保险条款》</a>
	                        </div>
	                      </div>
	                    </div>
	                    <!--第4种保险状态 end-->
	                  </li>
	                  <!-- 资金安全 e -->
	                </ul>
	                <!-- 产品详情 e -->

	                <!-- 储油卡使用案例 s -->
	                <div style="display: none">
	                  <div class="row mb-10 p-15 bg-white">
	                    <ol class="pro-detail-rules">
	                      <li>1、储油卡使用案例</li>
	                      <li>2、储油卡使用案例</li>
	                      <li>3、储油卡使用案例</li>
	                    </ol>
	                  </div>
	                </div>
	                <!-- 储油卡使用案例 e -->

	                <!-- 关于光汇 s -->
	                <div style="display: none">
	                  <div class="row mb-10 p-15 bg-white">
	                    <img src="./img/img-about.jpg">
	                    <ol class="pro-detail-rules">
	                      <li>1、关于光汇</li>
	                      <li>2、关于光汇</li>
	                      <li>3、关于光汇</li>
	                    </ol>
	                  </div>
	                </div>
								</div>
							</cube-scroll>
	              <!-- 关于光汇 e -->
	         	</div>
					</div>
	    	</div>
			</div>
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
			currentShow: 'shop',
			down: false,
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false,
				bounce: false
			}
		}
	},
	created() {
		this.touch = {}
	},
	components: {
		'v-header': Vheader
	},
	mounted() {
		this.$nextTick(function() {
			var me = this
			// const windHeight = window.innerHeight;
			// const footerHeight = this.$refs.footerH.offsetHeight;
			// const headerH = this.$refs.headerheight.$el.offsetHeight;
			// const tentheight = this.$refs.oneContent.offsetHeight;
			// const footerHeight1 = windHeight-tentheight-headerH;
			// const contentHeight = tentheight+footerHeight1;
			//
			// this.$refs.productD.style.height = (windHeight-headerH)+'px'
			// this.$refs.footerH1.style.height = footerHeight1+'px'

			const windHeight = window.innerHeight
			const footerHeight = this.$refs.footerH.offsetHeight
			const headerH = this.$refs.headerheight.$el.offsetHeight
			const contentHeight = windHeight-headerH-footerHeight
			this.$refs.oneContent.style.height = contentHeight+'px'
			// this.$refs.oneContent.style.paddingBottom = 10+'px'
			this.$refs.productD.style.height = (windHeight-headerH)+'px'

			this.$refs.scroll.scroll.on('scroll', function(pos) {
					if(pos.y == 0) {
							me.down = true
					}
			})
		//	商品详情页面
			api.productDfa({
				user_identify_id: 10,
				productId: 189,
				addr: '汇油宝'
				// period: 45,
			}).then(response => {
				console.log(response);
			}).catch(error => {
				console.log(error);
			})

		})
	},
	methods: {
		upTouchStart(e) {
			this.touch.initiated = true
			const touch = e.touches[0]
			this.touch.startX = touch.pageX
			this.touch.startY = touch.pageY
		},
		upTouchMove(e) {
			if (!this.touch.initiated) {
				return
			}
			const touch = e.touches[0]
			const deltaX = touch.pageX - this.touch.startX
			const deltaY = touch.pageY - this.touch.startY
			if (Math.abs(deltaX) > Math.abs(deltaY)) {
					return
			}

			 if(deltaY>0 && (!this.down)) {
			 	return false
			 }

			const windHeight = window.innerHeight
			const footerHeight = this.$refs.footerH.offsetHeight
			const headerH = this.$refs.headerheight.$el.offsetHeight
			const contentHeight = windHeight-headerH

			const top = this.currentShow === 'shop' ? 0 : -contentHeight
			const offsetHeight = Math.min(0, Math.max(-contentHeight, top + deltaY))
			this.touch.percent = Math.abs(offsetHeight / contentHeight)
			this.$refs.oneContent.style.transform= `translate3d(0,${offsetHeight}px,0)`
			this.$refs.productD.style.transform= `translate3d(0,${offsetHeight}px,0)`
			this.$refs.productD.style.transitionDuration = 0
			// this.$refs.footerH.style.opacity = 1 - this.touch.percent
			this.$refs.oneContent.style.transitionDuration = 0

		},
		upTouchEnd(e) {
			if (!this.touch.initiated) {
				return
			}
			let offsetHeight
			// let opacity
			const windHeight = window.innerHeight
			const footerHeight = this.$refs.footerH.offsetHeight
			const headerH = this.$refs.headerheight.$el.offsetHeight
			const contentHeight = windHeight-headerH

			if(this.currentShow === 'shop') {
					if(this.touch.percent > 0.3) {
						offsetHeight = -contentHeight
						this.currentShow = 'shopDetal'
						this.$refs.footerH.style.opacity = 0
						this.touch.percent = 1
						this.down = false
					}else {
						offsetHeight = 0
						this.$refs.footerH.style.opacity = 1
					}
			}else {
					if(this.touch.percent < 0.7) {
						offsetHeight = 0
						this.currentShow = 'shop'
						this.$refs.footerH.style.opacity = 1
						this.touch.percent = 0
					}else {
						offsetHeight = -contentHeight
						this.$refs.footerH.style.opacity = 0
						this.down = false
					}
			}
			const time = 200
			this.$refs.productD.style.transform= `translate3d(0,${offsetHeight}px,0)`
			this.$refs.oneContent.style.transform= `translate3d(0,${offsetHeight}px,0)`
			this.$refs.productD.style.transitionDuration = `${time}ms`
			this.$refs.oneContent.style.transitionDuration = `${time}ms`
			this.touch.initiated = false
		}
	}
}
</script>

<style lang="css" scoped>
.wrap {
  /* display: flex;
  flex-direction: column; */
  height: 100%;
  overflow: hidden;
}
.main {
  /* flex: 1; */
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0rem;
}
.pro-wrap {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
}
.pro-main {
	flex: 1;
	overflow-y: auto;
	overflow-x: hidden;
	box-sizing: border-box;
	/* padding-top: 50px; */
}
.form-li{
  /* margin-bottom: 10px; */
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
.form-li > li:last-child{
  border-bottom: 0;
}
.form-li > li > a{
    display: block;
}
.form-li label{
  color: #000;
}
.form-li label i{
  margin-right: 5px;
  color: #fd9a27;
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
.form-li .form-control.tl{
    padding-left: 90px;
}
.hua-wrap {
	text-align: center;
	height: 80px;
}
.hua-wrap>i.up {
	display: inline-block;
	font-size: 18px;
}
.shnaghua {
	text-align: center;
	border-top: 1px solid #bbb;
	font-size: 14px;
}
.one-tent {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	position: relative;
	/* padding-bottom: 0.6rem; */
}
.one-top {
	flex: 1;
}
.pro-detail-top{
	position: relative;
	height: 4.2rem;
	background-image: linear-gradient(to right, #f4bd46, #ff9d28);
	color: #fff;
	overflow: hidden;
}
.pro-detail-top > ul{
	display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
	width: 100%;
	height: 1rem;
	line-height: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 0.36rem;
    color: #fff;
}
.pro-detail-top > ul > li{
	flex: 0 0 50%;
	position: relative;
}
.pro-detail-top > ul > li:after{
    content: '';
    position: absolute;
    right: 0;
    top: 0.25rem;
    bottom: 0.25rem;
    border-right: 1px solid #fae4c2;
}
.pro-detail-top > ul > li:last-child:after{
	border-right: 0;
}
.form-li .not-transform{
	top: 0.4rem;
	transform: none;
}
.new-pro-li{
	display: flex;
	margin-top: 0.3rem;
}
.new-pro-li dt{
	flex: 0 0 5%;
	position: relative;
	top: 0.1rem;
	font-size: 1rem;
	color: #161616;
}
.new-pro-li dd{
	flex: 0 0 95%;
}
.buy-num {
    position: relative;
    min-height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.2rem;
    background-color: #fff;
    font-size: 0.4rem;
    overflow: hidden;
}
.buy-num input {
    display: block;
    width: 100%;
    height: 0.8rem;
    line-height: normal;
    border: none;
    background: none;
    font-size: 1rem;
    color: #f95e30 !important;
    outline: none;
}
.list-switch {
	position: relative;
	top: -0.1rem;
	display: inline-block;
    width: 1rem;
    height: 0.65rem;
    border-radius: 1.25rem;
    border: 1px solid #e4e4e4;
}
.list-switch.s-close {
    background-color: #fdfdfd;
}
.list-switch.s-open {
    background-color: #fd9a27;
    border: 1px solid #fd9a27;
}
.list-switch .dot {
    position: absolute;
    top: -1px;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    border: 1px solid #e4e4e4;
    background-color: #fff;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
    transition: all .5s ease-in .1s;
}
.list-switch.s-open .dot {
    right: -1px;
}

 .detal-footer {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50px;
	font-size: 0.4rem;
	background: #fff;
	position: relative;
	z-index: 999;
}
.back-home {
	flex: 1;
	height: 100%;
	font-size: 12px;
	text-align: center;
	border-right: 1px solid #e8e8e8;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
}
.shiPay {
	flex: 3;
	text-align: right;
	box-sizing: border-box;
	padding-right: 10px;
}
.touzi {
	flex: 2;
	background-image: linear-gradient(to right, #ff9d28, #f4bd46);
	font-size: 18px;
	color: #fff;
	text-align: center;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.back-home i.icon-home1 {
    display: block;
    margin-bottom: 3px;
    font-size: 22px;
}

.click-show-more {
    position: relative;
    height: 1px;
    width: 100%;
    font-size: 0.4rem;
    color: #bbb;
}
.click-show-more:after {
    content: '';
    position: absolute;
    left: 15px;
    top: 10px;
    right: 15px;
    height: 1px;
    border-bottom: 1px solid #bbb;
    z-index: 0;
}
.click-show-more span {
	position: relative;
    display: inline-block;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0 0.3rem;
    background-color: #f5f5f5;
    z-index: 1;
}
.pro-detail-tag{
	overflow: hidden;
	background-color: #fff;
	font-size: 0;
}
/* .pro-detail-tag.fix {
	position: fixed;
	width: 100%;
	left: 0px;
	top: 0px;
	z-index: 10000;
} */
.pro-detail-tag li {
    display: inline-block;
    width: 33.33333333333%;
    text-align: center;
    font-size: 0.4rem;
    color: #333;
}
.pro-detail-tag li span {
	display: inline-block;
    padding: 0.3rem 0;
}
.pro-detail-tag li.active span {
    border-bottom: 3px solid #fd9a27;
    color: #fd9a27;
}
.pro-detail-cons{
	font-size: 0.4rem;
	line-height: 0.6rem;
	overflow-x: hidden;
	overflow-y: auto;
}
.pro-detail-cons > ul > li{
	position: relative;
	/* margin-bottom: 0.3rem; */
	padding: 0.5rem;
	background-color: #fff;
}
.pdc-title {
    height: 0.45rem;
    margin: 0.3rem 0;
    padding-left: 0.3rem;
    border-left: .15rem solid #ff9d28;
    font-weight: bold;
    line-height: 0.45rem;
    font-size: 0.45rem;
    color: #161616;
}
.pro-detail-rules li {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
    color: #666;
}
.pro-detail-tb th, .pro-detail-tb td {
    padding: 8px 0;
    border: 1px solid #e8e8e8;
    text-align: center;
    font-weight: normal;
    font-size: 14px;
    color: #666;
}
.pro-detail-tb th {
    color: #999;
}
.duifu-box {
    height: 2px;
    background-color: #fd9a27;
    position: relative;
}
.node {
    width: 0.3rem;
    height: 0.3rem;
    background-color: #fd9a27;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -0.15rem;
}
.stage1 {
    left: 0
}

.stage2 {
    left: 50%;
    margin-left: -0.15rem
}

.stage3 {
    right: 0
}
.pdc-title-span {
	position: absolute;
	right: 0.5rem;
	top: 0.6rem;
}
.pdc-title-span .border-item {
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border-radius: 3px;
    border: 1px solid #fd9a27;
    color: #fd9a27;
}
</style>
