<template lang="html">
    <div class="wrap">
        <v-header title="加油卡详情"></v-header>
        <div class="main">
          <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        	   <div class="bought-content">
              <div class="left">
                <span class="fs-14">加油优惠(元)</span>
                <div class="mt-5 fs-26">{{fuelCardData.cashprofit}}</div>
              </div>
              <div class="right tr">
                <span class="fs-14">{{fuelCardData.card_name}}({{fuelCardData.card_count}}张)</span>
                <div class="mt-15 fs-12">{{fuelCardData.region_name}} {{fuelCardData.oil_name}}</div>
              </div>
            </div>

            <ul class="bg-white fuel-card">
              <li class="bottom-line">
                <label>初始信息</label>
                <div class="form-control">
                  <p><span class="mr-5">购买金额</span>{{fuelCardData.cost}}</p>
                  <p><span class="mr-5">购买优惠</span>{{fuelCardData.discount}}</p>
                  <p v-if="fuelCardData.type_bn == 'amount_refuel_nation'"><span class="mr-5">折扣</span>{{fuelCardData.sale}}</p>
                  <p v-else-if="fuelCardData.type_bn == 'amount_refuel_nation'"><span class="mr-5">折扣</span>{{fuelCardData.sale}}</p>
                  <p v-else-if="fuelCardData.type_bn == 'amount_refuel_nation_v1'"><span class="mr-5">折扣优惠</span>{{fuelCardData.discountNotCpns}}元</p>

                  <p v-else><span class="mr-5">赠送金额</span>{{fuelCardData.gift}}</p>

                  <p v-if="fuelCardData.type_bn == 'amount_refuel_nation_v1'"><span class="mr-5">折扣</span>{{fuelCardData.sale}}</p>

                </div>
              </li>
              <li>
                <label>当前信息</label>
                <div class="form-control">
                  <p><span class="mr-5">卡内余额</span>{{fuelCardData.remain_amount}}元</p>
                  <p><span class="mr-5">可兑金额</span>{{fuelCardData.cash_amount}}</p>
                </div>
              </li>
            </ul>

            <div class="mt-10 bg-white">
              <h5 class="p-15 fs-16 c-darkgray bottom-line">兑付计划</h5>
              <div class="border-bottom-line"></div>
              <ul class="ml-10 mr-10 tc m-oil-card-plan">
                <li>
                  <span></span>
                  <span>日期</span>
                  <span>升数</span>
                </li>
                <li class="m-oil-card-radio" v-for="(item, index) in planData">
                  <span :class="index == 0 ? 'active' :''"><i></i><em :class="(index == planData.length-1) ? '' : 'line'"></em></span>
                  <span>{{item.cash_start}}</span>
                  <span>开发兑付{{item.cash_remain}}{{item.card_company}}</span>
                </li>

              </ul>
            </div>

            <div class="mt-10 bg-white">
                <h5 class="p-15 fs-16 c-darkgray bottom-line">交易记录</h5>
                <div class="border-bottom-line"></div>
                <ul class="ml-10 mr-10 tc m-oil-card-plan m-oil-card-plan2">
                  <li>
                    <span></span>
                    <span>日期</span>
                    <span>兑付(升)</span>
                    <span>收益(元)</span>
                    <span>金额(元)</span>
                  </li>
                  <li class="m-oil-card-radio" v-for="(item, index) in operRecoData">
                    <span :class="index == 0 ? 'active' :''"><i></i><em :class="(index == operRecoData.length-1) ? '' : 'line'"></em></span>
                    <span>{{item.trade_time}}</span>
                    <span>{{item.trade_nums}}</span>
                    <span>{{item.income}}</span>
                    <span>{{item.amount}}</span>
                  </li>

                </ul>
            </div>
          </cube-scroll>
        </div>
        <!-- 底部固定按钮 -->
        <a class="btn btn-orange" href="javascript:;">立即兑付</a>
    </div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data() {
      return {
        fuelCardData : [],
        planData:[],
        operRecoData : [],
        order_sn : null,
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
    },
    beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm=>{
      vm.loaded();
    })

  },
    methods: {

      loadedPlanAndReco(){
        api.getPaymentPlan({
            ver: '5.2.2',
            card_id :this.fuelCardData.card_id,
            order_bn: this.order_sn
        }).then(response => {
             this.planData = response.data.data.dataList;

        }).catch(error => {
          console.log(error);
        })




        api.getOperReco({
            ver: '5.2.2',
            card_id :this.fuelCardData.card_id,
            order_bn: this.order_sn
        }).then(response => {
             this.operRecoData = response.data.data.dataList;

        }).catch(error => {
          console.log(error);
        })
      },
      loaded(){

        this.order_sn = this.$route.params.order_sn;
        api.getMyCloudStorageCard({
            ver: '5.2.2',
            type : 'amount',
            order_bn: this.order_sn
        }).then(response => {
             this.fuelCardData = response.data.data.dataList[0];
               this.loadedPlanAndReco();
        }).catch(error => {
          console.log(error);
        })



      }
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
    padding: 0.3rem 0.5rem;
    border-bottom: none;
    background-image: linear-gradient(120deg, #f3ba3d, #ff9726);
    font-size: 0.4rem;
    color: #fff;
    overflow: hidden;
}
.fuel-card > li{
    position: relative;
    display: flex;
    min-height: 1rem;
    padding: 0.5rem;
    line-height: normal;
    font-size: 14px;
}
.fuel-card > li > label{
    flex: 0 0 30%;
    position: absolute;
    left: 0.5rem;
    top: 50%;
    height: 0.6rem;
    line-height: 0.6rem;
    margin-top: -0.3rem;
    color: #000;
}
.fuel-card > li > label:after{
    display: inline-block;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: -0.5rem;
    border-right: 1px solid #999;
}
.fuel-card .form-control{
    flex: 0 0 70%;
    padding-left: 3rem;
    height: auto;
}
.fuel-card .form-control p{
    margin-bottom: 0.1rem;
    color: #666;
}
.fuel-card .form-control p span{
    color: #999;
}
.m-oil-card-plan li {
  font-size: 0;
  color: #666;
}
.m-oil-card-plan li:first-child {
  border-bottom: 1px solid #e8e8e8;
}

.m-oil-card-plan li > span {
  display: inline-block;
  position: relative;
  padding: 15px 0;
  width: 40%;
  font-size: 14px;
}
.m-oil-card-plan li > span:first-child {
  width: 10%
}
.m-oil-card-plan li > span:last-child {
  width: 50%
}
.m-oil-card-radio span  i{
  display: inline-block;
}
.m-oil-card-radio span:first-child i {
  position: relative;
  width: 16px;
  height: 16px;
  background: url("./img/m-icon-radio01.png") no-repeat center;
  background-size: 16px auto;
  z-index: 2;
}
.m-oil-card-radio span.active i {
  background-image: url("./img/m-icon-radio02.png");
}
.m-oil-card-radio .line {
  display: inline-block;
  position: absolute;
  top: 8px;
  right: 50%;
  bottom: -16px;
  width: 1px;
  margin: 24px -1px 0 0;
  border-right: 1px solid #e8e8e8;
  z-index: 1;
}
.m-oil-card-plan2 li > span{
  width: 20%;
}
.m-oil-card-plan2 li > span:first-child{
  width: 10%;
}
.m-oil-card-plan2 li > span:nth-child(2){
  width: 30%;
}
.m-oil-card-plan2 li > span:last-child{
  width: 20%;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 15px;
  color: #fff;
}
</style>
