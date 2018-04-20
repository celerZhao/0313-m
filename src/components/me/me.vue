<template lang="html">
  <div class="wrap">
    <v-header title="个人中心" :showBlack="false"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="bought-content">
          <div class="relative my-user">
            <div class="absolute my-user-img"><img src="./img/img04.png"></div>
            <div class="my-user-info">
              <span class="relative left my-user-name">{{userData.true_name_sub}}</span>
              <div class="left my-user-icon">
                <span class="my-user-icon-01 active"></span>
                <span class="my-user-icon-02"></span>
                <span class="my-user-icon-03"></span>
              </div>
            </div>
            <router-link to="/noteList" class="absolute my-user-news active" v-if="userData.unread_msg > 0" href="javascript:;"><img src="./img/m-icon13-news.png"></router-link>
						<router-link to="/noteList" class="absolute my-user-news " v-if="userData.unread_msg == 0" href="javascript:;"><img src="./img/m-icon13-news.png"></router-link>
          </div>

          <p class="fs-15">
            <span>储油资产(元)</span>
            <i class="iconfont icon-wenhao" @click="showAssets"></i>
          </p>

          <div class="mt-20 mb-20 fs-30">
            <span v-if="eye">{{userData.total_assets}}</span>
            <span v-else>******</span>
            <i :class="eye ? 'icon-eye1' : 'icon-buxianshi'" @click="clickeye"></i>
          </div>

          <ul class="fs-15 uc-line">
            <li>
              <div class="mb-10">固定收益(元)</div>
              <span v-if="eye">{{userData.fixedIncomeTotal}}</span>
              <span v-else>****</span>
            </li>
            <li>
              <div class="mb-10">累计收益(元)<i class="ml-5 icon-wenhao" @click="showProfit"></i></div>
              <span v-if="eye">{{userData.income_amount}}</span>
              <span v-else>****</span>
            </li>
          </ul>
        </div>

        <router-link to="/accountInsurance" class="tips"><img src="./img/icon02-dun.png">保障资产额度：<b class="c-blue">{{userData.insurance_amount}}</b> 元</router-link>

        <ul class="form-li">
          <li>
            <router-link to="#">
              <label><i class="icon-money"></i>账号余额(元)：</label>
              <div class="form-control">
                <router-link v-if="userData.recharge_open == 'true'" to="/balanceRecharge" class="btn btn-orange">充值</router-link>
                <router-link to="#" class="btn btn-down-app">下载提现</router-link>
              </div>
              <div class="mt-15 pl-20"><span class="c-red">{{userData.use_advance}}</span></div>
            </router-link>
          </li>
        </ul>

        <ul class="form-li">
          <li>
            <router-link to="/myUser">
              <label><i class="icon-user"></i>我的会员</label>
              <div class="form-control"><span class="c-darkgray">普通会员<i class="my-spot"></i></span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
        </ul>

        <ul class="form-li">
          <li>
            <router-link to="/myOilCard">
              <label><i class="icon-money"></i>我的储油卡</label>
              <div class="form-control"><span class="c-red">{{userData.litre_amount}}元</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/myFuelCard">
              <label><i class="icon-order"></i>我的加油卡</label>
              <div class="form-control"><span class="c-red">{{userData.total_remain_amount}}元</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/myLitreRefuelCards">
              <label><i class="icon-order2"></i>定升加油卡</label>
              <div class="form-control"><span class="c-red">{{userData.remain_litre_refuel_litre}}升</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/order">
              <label><i class="icon-order"></i>我的订单</label>
              <div class="form-control"><span class="c-darkgray" v-if="userData.unpay_orders != 0">{{userData.unpay_orders}}单未支付</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
        </ul>

        <ul class="form-li">
          <li>
            <router-link to="/quan">
              <label><i class="icon-coupon"></i>我的优惠券</label>
              <div class="form-control"><span class="c-darkgray" v-if="userData.total_coupons > 0 ">{{userData.total_coupons}}张未用</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/shareFriend">
              <label><i class="icon-fenxiang"></i>邀请好友</label>
              <div class="form-control"><span class="c-darkgray">已赚取<i class="c-red">{{userData.promotion_profit}}元</i></span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
        </ul>

        <ul class="form-li">
          <li v-if="userData.mobile == '' || userData.mobile == 'null'">
            <router-link to="/bindAccount">
              <label><i class="icon-danqia"></i>绑定账号</label>
              <div class="form-control"><span class="c-gray">未绑定</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>

					<li v-if="userData.mobile != '' && userData.mobile != 'null'">
            <a href="javascript:void(0);">
              <label><i class="icon-danqia"></i>绑定账号</label>
              <div class="form-control"><span class="c-gray">{{userData.mobile}}</span></div>
              <i class="icon-right"></i>
            </a>
          </li>

          <li>
            <router-link to="/about">
              <label><i class="icon-yonghu3"></i>关于光汇</label>
              <i class="icon-right"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/set">
              <label><i class="icon-set"></i>设置中心</label>
              <i class="icon-right"></i>
            </router-link>
          </li>
        </ul>

        <div class="mt-20 mb-10 tc fs-15"><span class="c-gray">联系客服：</span><a class="c-blue" href="tel:4008098888">400-809-8888</a></div>
        <div class="pb-15 fs-13 tc c-gray">服务时间：8:30-21:30(工作日)   10:00-17:00(节假日)</div>
      </cube-scroll>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Vheader from '../header/header.vue'
import Vfooter from '../footer/footer.vue'
import api from '../../fetch/ajax.js'
import {mapGetters,mapMutations,mapActions} from 'vuex'
// import {loadFromLocal} from 'common/js/cache.js'
export default {
  name: 'me',
  data() {
    return {
			userData: [],
      eye: true,
      switchShow: true,
      options: {
        observeDOM: true,
        click: true,
        probeType: 3,
        scrollbar: false
      },
      // favorite: (() => {
      //   return loadFromLocal(this.phone, 'favorite', false)
      // })()
    }
  },
  components: {
    'v-footer': Vfooter,
    'v-header': Vheader
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.scroll.scroll.scrollTo(0,0)
    })
  },
  computed: {
    // ...mapState({
    //   eye: state => state.com.eye
    // }),
    ...mapGetters([
      'phone'
    ]),
    // favoriteText() {
    //   return this.favorite ? ''
    // }
  },
  methods: {
    ...mapMutations({
      showEye: 'EYE'
    }),
    ...mapActions([
      'showMoney'
    ]),
    ...mapMutations({
      'usercenter': 'USER_CENTER'
    }),
    clickeye() {
      this.eye = !this.eye
      // this.showMoney('showeye',this.eye)
        // this.eye = (this.showEye(false) == false) ? false : true;
      // if(this.eye)
      // console.log(this.eye);
      // if(this.switchShow) {

      //   this.switchShow = false
      // }else {
      //   this.showEye(true);
      //   this.switchShow = true
      // }
    },
    showProfit() {
      this.$createDialog({
        type: 'alert',
        showClose: true,
        title: '累计收益',
        content: this.userData.my_desc3,
      }).show()
		},
		showAssets(){
			this.$createDialog({
        type: 'alert',
        showClose: true,
        title: '储油资产',
        content: this.userData.my_desc1,
      }).show()
		}
  },
  created() {
  	//我
  	 api.userIndex({
       ver: '5.2.2'
      }).then(response => {
         this.userData = response.data.data.dataList
         this.usercenter(this.userData)
        // this.$refs.slide.refresh();
      }).catch(error => {
        console.log(error);
      })
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
.bought-content {
  margin-bottom: 0;
  padding: 12px 15px;
  border-bottom: none;
  background-image: linear-gradient(120deg, #f3ba3d, #ff9726);
  font-size: 15px;
  color: #fff;
}
.my-user {
  height: 50px;
  margin-bottom: 15px;
  padding-left: 65px;
}
.my-user-img {
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  border: 2px solid #fff;
  border-radius: 50px;
  overflow: hidden;
}
.my-user-name {
  margin-top: 20px;
  margin-right: 15px;
  padding-right: 15px;
}
.my-user-name:after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-right: 1px solid #fcb7b3;
}
.my-user-icon span {
  display: block;
  float: left;
  position: relative;
  top: 18px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background: url(./img/m-icon01-1.png) no-repeat  center;
  background-size: 100% auto;
}
.my-user-icon span.my-user-icon-02 {
  background-image: url("./img/m-icon02-1.png");
}
.my-user-icon span.my-user-icon-03 {
  background-image: url("./img/m-icon03-1.png");
}
.my-user-icon span.my-user-icon-01.active {
  background-image: url("./img/m-icon01-2.png");
}
.my-user-icon span.my-user-icon-02.active {
  background-image: url("./img/m-icon02-2.png");
}
.my-user-icon span.my-user-icon-03.active {
  background-image: url("./img/m-icon03-2.png");
}
.my-user-news {
  top: 12px;
  right: 0;
}
.my-user-news > img {
  width: 25px;
  height: auto;
}
.my-user-news.active:after {
  content: '';
  display: block;
  position: absolute;
  top: -3px;
  right: -3px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f00;
}
.uc-line{
  display: flex;
}
.uc-line > li{
  flex: 0 0 50%;
}
.tips {
  display: block;
  padding: 15px 0;
  text-align: center;
  font-size: 13px;
  color: #f6ab00;
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
  padding: 0 15px;
  border-bottom: 1px solid #e8e8e8;
}
.form-li > li:last-child{
  border-bottom: 0;
}
.form-li > li > a{
  padding: 12px 0;
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
.form-li .form-control a.btn-orange{
  right: 95px;
}
.form-li .form-control a.btn-down-app{
  padding: 5px 0;
  border: 1px solid #ff9d28;
  border-radius: 20px;
  background-color: #fff;
  color: #ff9d28;
}
.form-li .my-spot {
  position: absolute;
  top: 50%;
  right: 25px;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: #ea3534;
  transform: translate(0,-50%);
}
.form-li .icon-right{
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 18px;
  transform: translate(0,-50%);
}
</style>
