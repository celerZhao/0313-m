<template lang="html">
  <div class="wrap">
    <v-header></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
				<div ref="scrollMain">
    		<div class="pro-detail-top" ref="proHeader">
          <div class="tc">
            <div class="fs-30 mt-20"><span class="relative">10.0<span class="fs-18">% +100.00%</span></span></div>
            <div class="fs-14 mt-10">赠送比例 + 上涨红利 <i class="icon-wenhao" @click="honglitip"></i></div>
          </div>

          <ul class="tc">
            <li>期限 1个月</li>
            <li>起购金额 100元</li>
          </ul>
        </div>

        <ul class="form-li">
    			<li>
    				<label style="z-index:100" >参考油价 <i class="icon-wenhao c-gray" @click="youjiatip" ></i></label>
    				<div style="z-index:1" class="form-control"><span class="mr-15 c-darkgray">6.08元/升</span></div>
    			</li>
    			<li>
    				<label style="z-index:100" >兑付服务费 <i class="icon-wenhao c-gray" @click="fuwufeetip"></i></label>
    				<div style="z-index:1"class="form-control"><span class="mr-15 c-darkgray">上涨红利的<i class="c-red">10%</i></span></div>
    			</li>
    			<li style="padding-bottom:0;">
    				<label>购买金额</label>
    				<div class="form-control not-transform"><span class="mr-15 c-gray fs-12">100元起购，100元递增，每人限购800元</span></div>
    				<dl class="new-pro-li">
    					<dt class="fs-26 c-black bold">¥</dt>
    					<dd>
    						<div class="relative tc buy-num">
                  <cube-input :maxlength="6" type="number" placeholder="请输入100~800，100的整数倍" @focus="focusHandle" @blur="blurHandle"></cube-input>
    						</div>
    					</dd>
    				</dl>
    			</li>
    			<li class="pt-5 pb-5 pl-15 pr-15 fs-12 c-gray">购买油量：<span class="c-red">117.65</span>升，赠送油量：<span class="c-red">11.76</span>升，合计：<span class="c-red">129.41</span>升</li>
        </ul>
        <div class="mb-10 mt-5 mr-15 tr c-gray fs-12">风险提示：油价波动会影响您的上涨红利</div>
        <ul class="form-li">
    			<li>
    				<label>使用现金券</label>
    				<div class="form-control"><span class="c-red">30元现金红包</span></div>
    				<i class="icon-right"></i>
    			</li>
    			<li>
    				<label>使用加息券</label>
    				<div class="form-control"><span class="c-red" >1个月加息1%</span></div>
    				<i class="icon-right"></i>
    			</li>
    		</ul>

    		<ul class="form-li">
    			<li>
    				<label>获赠油箱抵扣 <span class="fs-12"><span class="icon-tanhao c-gray fs-16"></span> 当前订单可用<span class="c-red">2.85升</span>，抵<span class="c-red">18.18元</span></span></label>
    				<div class="form-control">
      				<span class="mr-10">
      					<i class="list-switch s-close" :class="{'s-open':chekboxopen}" @click="clickCheckbox">
                  <div class="dot"></div>
                  <input type="checkbox" class="hide" v-model="chekboxopen">
                </i>
              </span>
            </div>
    			</li>
    			<li class="pt-5 pb-5 pl-15 pr-15 fs-12 c-grey">获赠油箱现有3升油,价值<span class="c-red">18.81元</span></li>
    		</ul>
				</div>

      	<div class="pro-detail" style="display:none;" ref="proDetail">
      		<ul class="row bottom-line pro-detail-tag">

            <li v-for="(item, index) in tabList" :class="{active: item.isAction}" @click="toggleTab(item.name, index)">
              <span>{{item.text}}</span>
            </li>

          </ul>
          <!-- 点击返回顶部 s-->
          <div class="click-top" href="#" style="display: block;" @click="backTop">
            <div class="click-show-more iconfont"><span>点击返回顶部</span></div>
            <i class="iconfont icon-chevron-copy fs-14"></i>
          </div>
          <!-- 点击返回顶部 e-->

          <div class="pro-detail-cons" >
            <!-- 产品详情 s -->
            <ul v-show="tabList[0].isAction">
              <!-- 收益说明 s -->
              <li class="row">
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
                    <div class="top-line c-darkgray mt-10 pt-10 pb-10 fs-13">稳健的固定收益产品</div>
                  </div>
                </div>

                <div class="mt-10 fs-14 c-darkgray">注：此为每张卡可兑付数量说明</div>
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
              <li class="row">
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
            <div style="display: block" v-show="tabList[1].isAction">
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
            <div style="display: block" v-show="tabList[2].isAction">
              <div class="row mb-10 p-15 bg-white">
                <img src="./img/img-about.jpg">
                <ol class="pro-detail-rules">
                  <li>1、关于光汇</li>
                  <li>2、关于光汇</li>
                  <li>3、关于光汇</li>
                </ol>
              </div>
            </div>
              <!-- 关于光汇 e -->
          </div>
      	</div>

        <p class="tips"><img class="" src="./img/icon02-dun.png">人保，易安保险与工商银行保障您的资金安全</p>

    		<!-- 点击显示更多 s -->
      	<div class="click-show" style="display: block;" @click="showMore" ref="showMore">
          <i class="iconfont icon-chevron-copy fs-14"></i>
          <div class="click-show-more"><span>点击显示更多</span></div>
        </div>

    		<!-- 点击显示更多 e -->
      </cube-scroll>
    </div>
    <!-- 底部固定按钮 -->
    <div class="fixed-bottom">
      <router-link to="home" class="back-home"><i class="icon-home1"></i>首页</router-link>
      <!-- 如果禁止点击，需要给a加class：disable -->
      <router-link to="/payOrder" class="btn btn-orange">立即投资</router-link>
      <!-- <a href="javasctipt:;">立即投资</a> -->
      <div class="fs-18">实付: <span class="c-red">770.00 元</span></div>
      <div class="mt-5 fs-14 c-red">优惠：30.00 元</div>
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
			height: null,
      options: {
        observeDOM: true,
        click: true,
        probeType: 3,
        scrollbar: false
      },
     tabList:[
       {text:'产品详情',name:'', isAction: true},
       {text:'使用案例',name:'', isAction: false},
       {text:'关于光汇',name:'', isAction: false}
     ],
      chekboxopen:false,

    }

  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.scroll.scroll.scrollTo(0,0)
			// this.$refs.proDetail.style.display = 'block'
			this.height = this.$refs.scrollMain.offsetHeight+12
			document.body.scrollTop = document.body.scrollHeight;
    })


  },
	methods: {
    msg(title, txt){
      this.$createDialog({
        type: 'alert',
//        icon: 'cubeic-alert',
        title: title,
        content: txt,
        confirmBtn: {
          text: '我知道了',
          active: true,
          disabled: false,
          href: 'javascript:;'
        }
      }).show()
    },
    youjiatip(){
      this.msg('提示','参考深圳市Ⅴ汽油92#发改委价格');
    },
    fuwufeetip(){
      this.msg('提示','兑付时平台将收取兑付金额的5%作为服务费');
    },
    honglitip(){
      this.msg('提示','购买油卡赠送5.5%油量，同时还可以享受油价上涨的100%的涨幅收益，享有赠送+油价上涨100%双重收益；');
    },
    clickCheckbox(){
      this.chekboxopen = !this.chekboxopen;
    },

    toggleTab(textContent, index) {
      this.tabList.map(function(v, i) {
        i == index ? v.isAction = true : v.isAction = false;

      })
    },

		showMore() {
			this.$refs.showMore.style.display = 'none'
			this.$refs.proDetail.style.display = 'block'
			this.$refs.scroll.scroll.refresh();
			this.$refs.scroll.scroll.scrollTo(0,-(this.height),1000);
		},
		backTop() {
			this.$refs.scroll.scroll.scrollTo(0,0,1000);
			this.$refs.showMore.style.display = 'block'
			this.$refs.proDetail.style.display = 'none'
		},
		focusHandle() {
			console.log('获取焦点');
//			 const height =  this.$refs.proHeader.offsetHeight
//			 this.$refs.scroll.scroll.scrollTo(0,-(height),1000);
		},
		blurHandle() {
			console.log('失去焦点');
		}
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
.pro-detail-top{
	position: relative;
	height: 160px;
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
	height: 30px;
	line-height: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 14px;
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
  top: 8px;
  bottom: 8px;
  border-right: 1px solid #fae4c2;
}
.pro-detail-top > ul > li:last-child:after{
	border-right: 0;
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
  right: 0;
  top: 50%;
  width: 65%;
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
.form .icon-right,
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
.form-li .not-transform{
	top: 0.4rem;
	transform: none;
}
.cube-input::after{
  border: 0;
}
.new-pro-li{
	display: flex;
	margin-top: 10px;
}
.new-pro-li dt{
	flex: 0 0 5%;
	position: relative;
	top: 6px;
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
	top: 3px;
	display: inline-block;
  width: 35px;
  height: 20px;
  border-radius: 20px;
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
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #e4e4e4;
  background-color: #fff;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
  transition: all .5s ease-in .1s;
}
.list-switch.s-open .dot {
  right: -1px;
}
.fixed-bottom{
  position: relative;
	height: 40px;
	padding-top: 10px;
	padding-right: 150px;
  background-color: #fff;
  text-align: right;
  font-size: 18px;
  color: #161616;
  z-index: 999;
}
.back-home {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 50px;
  padding-top: 8px;
  border-radius: 0;
  border-right: 1px solid #e8e8e8;
  background-color: transparent;
  text-align: center;
  font-size: 12px;
  color: #666;
}
.back-home i.icon-home1 {
  display: block;
  margin-bottom: 3px;
  font-size: 22px;
}
.fixed-bottom a.btn{
	position: absolute;
  right: 0;
  top: 0;
	width: 140px;
  height: 50px;
  line-height: 50px;
  padding: 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 18px;
  color: #fff;
  -webkit-appearance: none;
}
/*点击显示和收起更多*/
.click-show,
.click-top {
  margin: 0 15px;
  height: 60px;
  text-align: center;
  z-index: 9999;
}
.click-top {
  margin-top: 8px;
}
i.iconfont{
	display: inline-block;
}
.click-show i.iconfont,
.click-top i.iconfont {
  content: "\e687";
  transform: rotate(90deg);
  color: #bbb;
}
.click-top i.iconfont {
  position: relative;
  top: 10px;
  transform: rotate(-90deg);
}
.click-show-more {
  position: relative;
  height: 1px;
  width: 100%;
  font-size: 14px;
  color: #bbb;
}
.click-show-more:after {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #bbb;
  z-index: 0;
}
.click-show-more span {
	position: relative;
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 0 10px;
  background-color: #f5f5f5;
  z-index: 1;
}
.pro-detail-tag{
	overflow: hidden;
	background-color: #fff;
	font-size: 0;
}
.pro-detail-tag li {
  display: inline-block;
  width: 33.33333333333%;
  text-align: center;
  font-size: 14px;
  color: #333;
}
.pro-detail-tag li span {
	display: inline-block;
  padding: 10px 0;
}
.pro-detail-tag li.active span {
  border-bottom: 3px solid #fd9a27;
  color: #fd9a27;
}
.pro-detail-cons{
	font-size: 14px;
	line-height: 20px;
}
.pro-detail-cons > ul > li{
	position: relative;
	margin-bottom: 10px;
	padding: 15px;
	background-color: #fff;
}
.pdc-title {
  height: 16px;
  margin: 10px 0 15px;
  padding-left: 10px;
  border-left: 3px solid #ff9d28;
  font-weight: bold;
  line-height: 16px;
  font-size: 16px;
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
  width: 10px;
  height: 10px;
  background-color: #fd9a27;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -5px;
}
.stage1 {
  left: 0
}

.stage2 {
  left: 50%;
  margin-left: -5px
}

.stage3 {
  right: 0
}
.pdc-title-span {
	position: absolute;
	right: 15px;
	top: 20px;
}
.pdc-title-span .border-item {
  display: inline-block;
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid #fd9a27;
  color: #fd9a27;
}
</style>
