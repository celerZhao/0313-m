<template lang="html">
    <div class="wrap">
        <v-header title="我的储油卡"></v-header>
        <div class="main">
            <cube-scroll ref="scroll" :options="options" :data="oilCardData" :listenScroll="true" @pulling-up="onPullingUp">
          	   <div class="relative c-white bought-content">
                  <i class="absolute icon-qita fs-30"></i>
                  <p class="tc fs-14">
                    <i class="icon-49 fs-18 mr-5"></i>
                    <!--注：<i class="icon-buxianshi fs-18 mr-5"></i>  眼睛不显示的时候icon-49换成icon-buxianshi-->
                    <span>储油卡金额(元)</span>
                    <i class="icon-wenhao ml-5" @click="showPopup('myPopup')"></i>
                  </p>
                  <p class="mt-15 mb-20 tc fs-30">{{userData.litre_amount}}</p>

                <ul class="tc fs-14 uc-line">
                  <li>
                    <div>累计收益(元)</div>
                    <span>{{userData.income_amount}}</span>
                  </li>
                  <li>
                    <div class="bold">浮动收益(元)</div>
                    <span class="bold">{{userData.floatIncomeTotal}}</span>
                  </li>
                  <li>
                    <div>固定收益(元)</div>
                    <span>{{userData.fixedIncomeTotal_ycy}}</span>
                  </li>
                </ul>
              </div>
              <div class="p-15 fs-14 c-darkgray lh-20">{{userData.float_income_desc}}</div>
              <ul class="form-li">
          			<li>
                  <router-link to="/myOilTank">
            				<label>我的油箱(升)</label>
            				<div class="form-control"><span class="c-red">{{userData.goil_give}}</span></div>
                    <i class="icon-right"></i>
                  </router-link>
          			</li>
          		</ul>

          		<ul class="form-li oil-card-li">
          			<li v-for="item in oilCardData">
          				<router-link :to="'/myOilCardDetail/'+item.order_bn" class="block">
          					<div class="mb-5 c-black">
                      <b class="fs-16 c-black">{{item.card_name}}</b>
                      <span class="fs-12 c-gray">({{item.card_count}}张)</span>
                      <span class="right c-red">{{item.remain_amount}}</span>
                    </div>
                    <ul class="moc-info">
                      <li>
                        <div class="c-red">{{item.cash_amount}}</div>
                        可兑金额
                      </li>
                      <li>
                        <div class="c-red">{{item.cashprofit}}</div>
                        储油收益
                      </li>
                    </ul>
                    <div class="mt-5 fs-14 c-gray">订单号：{{item.order_bn}}</div>
          				</router-link>
          			</li>

          		</ul>

            </cube-scroll>
        </div>

        <!-- 底部固定按钮 -->
        <a class="btn btn-orange" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.brightoilonline.c2b_phone">下载APP立即兑付</a>
        <!-- 底部弹窗 -->
        <cube-popup type="my-popup" :center="false" ref="myPopup">
          <div class="content">
            <h5>储油资产 <i class="icon-no" @click="close"></i></h5>
            <div class="content-list">
             {{userData.storage_card_desc}}
            </div>
          </div>
        </cube-popup>

    </div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data() {
      return {
        userData: [],
        oilCardData: [],
        page: 1,
        options: {
          observeDOM: true,
          click: true,
          probeType: 3,
          scrollbar: false,
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: '加载更多',
              noMore: '没有更多数据了'
            }
          }
        }
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.$refs.scroll.scroll.scrollTo(0,0);
      })
    },
    methods: {
      onPullingUp () {
        this.loaded(++this.page)
      },
      showPopup(refId) {
        const component = this.$refs[refId]
        component.show()
      },
      close() {
        this.$refs.myPopup.hide()
        this.$emit('hide')
      },
      loaded(aPage) {
        api.getMyCloudStorageCard({
        ver: '5.2.2',
        type : 'litre',
        cardStatus: 'ready',
        page : aPage,
        limit : 10
        }).then(response => {
              let orderDataNew = response.data.data.dataList
              if(orderDataNew.length>0) {
                 this.oilCardData = this.oilCardData.concat(orderDataNew)
               }else {
                 this.$refs.scroll.forceUpdate();
                 // this.$refs.scroll.scroll.scrollBy(0, 64, 800)
               }
          // this.$refs.slide.refresh();
        }).catch(error => {
          console.log(error);
        })
    }
    },
    components: {
      'v-header': Vheader
    },
    created() {
       api.userIndex({
       ver: '5.2.2'
      }).then(response => {
         this.userData = response.data.data.dataList
        // this.$refs.slide.refresh();
      }).catch(error => {
        console.log(error);
      })
     this.loaded(this.page)

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
.content {
  background: #f6f6f6;
  font-size: 0.38rem;
}
.content h5 {
  background: #e3e3e3;
  color: #333;
  font-size: 0.42rem;
  text-align: center;
  position: relative;
  padding: 12px;
}
.content h5 .icon-no {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 10px;
  right: 15px;
  margin: auto 0;
}
.content-list {
  padding: 10px;
  box-sizing: border-box;
}
.content-list p {
  margin: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-list p span {
  display: inline-block;
  width: 25%;
}
.content-list p i {
  flex: 1;
}
.bought-content {
  margin-bottom: 0;
  padding: 12px 15px;
  border-bottom: none;
  background-image: linear-gradient(120deg, #f3ba3d, #ff9726);
  font-size: 15px;
  color: #fff;
}
.bought-content .icon-qita {
  top: 10px;
  right: 15px;
}
.uc-line{
  display: flex;
}
.uc-line > li{
	position: relative;
  flex: 0 0 33.33333%;
}
.uc-line > li:after{
	content: '';
  position: absolute;
  right: 0;
  top: 3px;
  bottom: 3px;
  border-right: 1px solid #fae4c2;
}
.uc-line > li:last-child:after{
	border-right: 0;
}
.uc-line > li > div{
	margin-bottom: 8px;
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
.oil-card-li > li{
	margin-bottom: 10px;
	border-bottom: 0;
}
.moc-info{
	clear: both;
	display: flex;
	font-size: 15px;
}
.moc-info > li{
	flex: 0 0 35%;
	color: #999;
	line-height: 20px;
}
.moc-info > li:last-child{
	padding-left: 35px;
	border-left: solid 1px #d4d4d4;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 15px;
  color: #fff;
}
</style>
