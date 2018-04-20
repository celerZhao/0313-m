<template lang="html">
  <div class="wrap">
    <v-header title="我的订单"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :data="orderData" :listenScroll="true" @pulling-up="onPullingUp">
	     <ul class="order-li">
          <li v-for="item in orderData">
            <div class="hidden p-15 bg-darkgray c-white">
                <span class="left">{{item.createtime}}</span>
                <span class="right">{{item.status}}</span>
            </div>
            <div class="p-15 c-gray bottom-line">订单号:{{item.order_id}}</div>
            <div class="p-15 relative c-black fs-16">
                <div class="icon-baozhang"></div>
                <div class="mb-5">{{item.goods[0].goods_name}}，{{item.goods[0].litre_or_amount}}，{{item.quantity}}张</div>
                <div class="mb-5"><span class="c-gray">油品：</span>{{item.goods[0].newspec}}</div>
                <div><span class="c-gray">单价：</span>{{item.goods[0].oil_price}}元/升</div>
                <div class="mb-10 tr">
                    <div class="mb-5"><span class="c-gray">实付金额：</span>{{item.paied_amount}}元</div>
                    <div><span class="c-gray">优惠金额：</span>{{item.cpns_money}}元</div>
                </div>
                <div class="tr oil-storage-btn">
                    <router-link to="#" class="btn btn-gray" v-if="item.is_active == 'true'" @click.native="cancelOrder(item.order_id)">取消订单</router-link>
                    <span class="btn btn-orange" v-if="item.is_delete == 'true'" v-on:click="delOrder(item.order_id)">删除</span>
                    <router-link to="/payOrder" class="btn btn-orange" v-if="item.is_pay == 'false'">立即支付</router-link>
                    <router-link to="/payOrder" class="btn btn-orange" v-if="item.is_buy == 'true'">再次购买</router-link>
                </div>
            </div>
          </li>


      </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
const UP = 'up'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
      orderData: [],
      match: [],
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
  methods: {
    onPullingUp () {
          api.getAllorderList({
            ver: '5.2.2',
            status : 0,
            page : ++this.page,
            limit : 10
           }).then(response => {
               let orderDataNew = response.data.data.dataList
               if(orderDataNew.length>0) {
                 this.orderData = this.orderData.concat(orderDataNew)
               }else {
                 this.$refs.scroll.forceUpdate();
                 // this.$refs.scroll.scroll.scrollBy(0, 64, 800)
               }
           }).catch(error => {
             console.log(error);
           })

    },
    delOrder(order_id) {
       this.$createDialog({
        type: 'confirm',
        title: '确认删除',
        content: '确定删除后订单将会不存在，是否删除',
        confirmBtn: {
          text: '确认',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          api.deleteOrder({
          ver: '5.2.1',
          order_id : order_id
          }).then(response => {

            this.$refs.slide.refresh();
          }).catch(error => {
            console.log(error);
          })
        },
        onCancel: () => {

        }
      }).show()




    },
    cancelOrder(order_id){
      this.$createDialog({
        type: 'confirm',
        title: '确认取消',
        content: '取消后订单将会不存在，是否取消',
        confirmBtn: {
          text: '确认',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
           api.cancelOrder({
            ver: '5.2.1',
            order_id : order_id
            }).then(response => {

              this.$refs.slide.refresh();
            }).catch(error => {
              console.log(error);
            })
        },
        onCancel: () => {

        }
      }).show()


    },
    loaded() {
      api.getAllorderList({
        ver: '5.2.2',
        status : 0,
        page : this.page,
        limit : 10
       }).then(response => {
          this.orderData = response.data.data.dataList
         // this.$refs.slide.refresh();
       }).catch(error => {
         console.log(error);
       })
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
   created() {
     this.loaded()
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
.order-li li {
  margin-bottom: 15px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
  background-color: #FFF;
  font-size: 16px;
}
.oil-storage-btn{
	white-space: nowrap;
}
.oil-storage-btn .btn {
	display: inline-block;
  width: 31%;
  margin: 0 3px;
  padding: 8px 0;
  border-radius: 3px;
  font-size: 14px;
}
.icon-baozhang {
  position: absolute;
  right: 30px;
  top: -20px;
  width: 80px;
  height: 80px;
  background: url("./img/baozhang.png") no-repeat;
  background-size: 100%;
}
</style>
