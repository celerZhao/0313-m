<template lang="html">
    <div class="wrap">
        <v-header title="优惠券"></v-header>
        <div class="main">
        <cube-scroll ref="scroll" :options="options" :listenScroll="true" :data="couponData" @pulling-up="onPullingUp">
  				<div class="bg-white tc quan-tag">
                <span v-for="(item, index) in items" :class="{active: item.isAction}" @click="toggleTab(item.name, index)">{{item.text}}</span>
  				</div>

  				<!-- 暂无优惠券 s -->
  				<div class="mt-20 mb-20 tc" v-show="noCoupons">
  			        <p><i class="quan_no"></i></p>
  			        <p class="fs-16 c-darkgray">当前没有可使用券</p>
  			    </div>
  				<!-- 暂无优惠券 e -->
          <noUse :is="currentView" keep-alive :couponData="couponData"></noUse>
          </cube-scroll>
        </div>
    </div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import noUse from './quan/no_use.vue'
import alreadyUse from './quan/already_use.vue'

export default {
    data() {
        return {
            couponData: [],
            page: 1,
            status: 'available',
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
            },
            noCoupons: false,
            currentView: 'noUse',
            items: [
              {
                text: '未使用',
                name: 'noUse',
                isAction: true        },
              {
                text: '已使用/过期',
                name: 'alreadyUse',
                isAction: false
              }
            ]
        }
    },
    created() {

     api.getCashCouponList({
       ver: '5.2.2',
       statu: this.status,
       page: this.page ,
       limit : 10
      }).then(response => {
         this.couponData = response.data.data.dataList
        // this.$refs.slide.refresh();
      }).catch(error => {
        console.log(error);
      })
    },
    methods: {
      //上拉加载
      onPullingUp () {
      api.getCashCouponList({
         ver: '5.2.2',
         statu: this.status,
         page : ++this.page,
         limit : 10
      }).then(response => {
        let dataListNew = response.data.data.dataList
        if(dataListNew.length>0) {
          this.couponData = this.couponData.concat(dataListNew)
        }else {
          this.$refs.scroll.forceUpdate();
        }
      }).catch(error => {
        console.log(error);
      })
      },
      toggleTab(textContent, index) {
        this.items.map(function(v, i) {
          i == index ? v.isAction = true : v.isAction = false;
        })

      this.page = 1;
      if (index == 1)
      {
        this.status = 'disable';
      }
      else
      {
        this.status = 'available';
      }

      api.getCashCouponList({
        ver: '5.2.2',
        statu: this.status,
        page: this.page,
        limit : 10
      }).then(response => {
        this.couponData = response.data.data.dataList
        // this.$refs.slide.refresh();
      }).catch(error => {
        console.log(error);
      })

      this.currentView = textContent;
      }
    },
    mounted() {
        this.$nextTick(function() {
            this.$refs.scroll.scroll.scrollTo(0,0);
        })
    },
    components: {
        'v-header': Vheader,
        noUse,
        alreadyUse
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
.quan-tag{
	display: flex;
	font-size: 15px;
}
.quan-tag span{
	display: inline-block;
	flex: 0 0 50%;
	padding: 15px 0 12px;
    color: #333;
}
.quan-tag span.active{
	border-bottom: 2px solid #fc3536;
    font-weight: bold;
    color: #fc3635;
}
.quan_no {
	display: block;
    width: 2rem;
    height: 2rem;
    margin: 0 auto 0.5rem;
    background-image: url("./img/quan_no.png");
    background-size: 100%;
}
.quan-li{
	padding: 0 15px;
}
.quan-li > li{
	margin-top: 10px;
	padding: 10px;
	border-radius: 4px;
	background: #fff;
	box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
	color: #666;
}
.quan-li-i{
	display: flex;
	border-bottom: 1px dotted #ccc;
	font-size: 15px;
	overflow: hidden;
}
.quan-li-i > li:first-child{
	flex: 0 0 35%;
	padding: 12px 0;
	align-self: center;
	text-align: center;
	font-size: 22px;
}
.quan-li-i i{
	font-style: normal;
	font-size: 15px;
}
.quan-li-notuse,
.quan-li-notuse *,
.quan-li-notuse li.active *{
	color: #ccc!important;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 15px;
  color: #fff;
}
</style>
