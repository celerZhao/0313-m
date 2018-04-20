<template lang="html">
    <div class="wrap">
        <v-header title="储油卡详情"></v-header>
        <div class="main">
            <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        	  <div class="bought-content">
                  <div class="left">
                    <span class="fs-14">储油收益</span>
                    <div class="mt-5 fs-26">{{(oilCardData.type_bn=='fixed_litre_up_v1' || oilCardData.type_bn=='fixed_litre_exper_v1') ? oilCardData.totalDiscount+'元' : oilCardData.cashprofit}}</div>
                  </div>
                  <div class="right tr">
                    <span class="fs-14">{{oilCardData.card_name}}({{oilCardData.card_count}}张)</span>
                    <div class="mt-15 fs-12">{{oilCardData.region_name}} {{oilCardData.oil_name}}</div>
                  </div>
                </div>

                <!-- 折线图位置 s -->
                <div><img src="./img/img01.jpg"></div>
                <!-- 折线图位置 e -->

                <table class="m-oil-card-tb" cellpadding="0" cellspacing="0">
                    <colgroup>
                        <col width="50%">
                        <col width="50%">
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>{{oilCardData.floatIncome}} <div class="fs-10">浮动收益</div></td>
                            <td>{{oilCardData.income_amount}} <div class="fs-10">固定收益</div></td>
                        </tr>
                        <tr>
                            <td>{{oilCardData.remain_litre}}<div class="fs-10">总油量</div></td>
                            <td>{{oilCardData.cash_litre}}<div class="fs-10">可兑油量</div></td>
                        </tr>
                        <tr>
                            <td>{{oilCardData.buy_price}}<div class="fs-10">储油成本</div></td>
                            <td class="c-red">{{oilCardData.sale_price}}<div class="fs-10 c-darkgray">当前油价</div></td>
                        </tr>
                    </tbody>
                </table>

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
            oilCardData : [],
            planData:[],
            operRecoData : [],
            order_sn : null,
            oilData:[],
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
    }, beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm=>{
      vm.loaded();
    })

  }, methods: {

      loadedPlanAndReco(){
        api.getPaymentPlan({
            ver: '5.2.2',
            card_id :this.oilCardData.card_id,
            order_bn: this.order_sn
        }).then(response => {
             this.planData = response.data.data.dataList;

        }).catch(error => {
          console.log(error);
        })




        api.getOperReco({
            ver: '5.2.2',
            card_id :this.oilCardData.card_id,
            order_bn: this.order_sn
        }).then(response => {
             this.operRecoData = response.data.data.dataList;

        }).catch(error => {
          console.log(error);
        })
        api.getOilTrend({
            ver: '5.2.2',
            oil_id :this.oilCardData.oil_id,
            oil_name: this.oilCardData.oil_name,
            city:this.oilCardData.city
        }).then(response => {
             this.oilData = response.data.data.dataList;

        }).catch(error => {
          console.log(error);
        })

      },
      loaded(){

        this.order_sn = this.$route.params.order_sn;
        api.getMyCloudStorageCard({
            ver: '5.2.2',
            type : 'litre',
            order_bn: this.order_sn
        }).then(response => {
             this.oilCardData = response.data.data.dataList[0];
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
.bought-content .icon-qita {
  top: 10px;
  right: 15px;
}
.m-oil-card-tb {
  width: 100%;
  background-color: #fff5f5;
  font-size: 14px;
}
.m-oil-card-tb td {
  padding: 8px 10px;
  border-top: 1px solid #fecfcf;
  border-bottom: 1px solid #fecfcf;
  line-height: 20px;
  color: #666;
}
.m-oil-card-tb td:first-child {
  border-right: 1px solid #fecfcf;
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
