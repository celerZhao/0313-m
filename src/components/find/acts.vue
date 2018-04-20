<template lang="html">
  <div class="wrap">
    <v-header title="精彩活动"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <!-- <div><img src="./img/banner-active.png"></div> -->
        <!-- banner s -->
        <div class="banner">
          <cube-slide ref="slide" :data="dataList">
            <cube-slide-item v-for="(item, index) in dataList" :key="index"
            @click.native="clickHandler(item, index)">
                <a :href="item.ad_id">
                  <img :src="item.image_url">
                </a>
            </cube-slide-item>
            <div slot="dots" slot-scope="props" class="dotss">
              <span class="my-dot" :class="{active: props.current === index}" v-for="(item, index) in props.dots"></span>
            </div>
          </cube-slide>
        </div>
        <!-- banner e -->

    		<ul class="form-li pay-order-li">

          <li v-for="item in actDataEnable">
            <img class="pay-order-bank-img" v-bind:src="item.activity_image">
            <div class="pay-order-method">
              <div class="c-black">{{item.activity_title}}</div>
              <span class="fs-12 c-gray">{{item.activity_stime}}-{{item.activity_etime}}</span>
              <i class="order-pay-recom">{{item.activity_buttontext}}</i>
            </div>
          </li>

          <li v-for="item in actDataUnenable" class="acts-over">
            <a class="block" :href="item.activity_hyperlink_type == '1' ? item.activity_hyperlink : '#'">
              <img class="pay-order-bank-img" v-bind:src="item.activity_image">
              <div class="pay-order-method">
                <div class="c-black">{{item.activity_title}}</div>
                <span class="fs-12 c-gray">{{item.activity_etime}}</span>
                <i class="order-pay-recom">{{item.activity_buttontext}}</i>
              </div>
            </a>
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
export default {
	data() {
		return {
      dataList: [],
      actDataEnable: [],
      actDataUnenable: [],
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	created() {
    // 活动轮播广告
		api.getWapAds({
        ad_type: 'APPact',
        ver: '5.2.2'
    }).then(response => {
        this.dataList = response.data.data.dataList;
        //console.log(this.dataList);
    }).catch(error => {
        console.log(error);
    })

    // 活动列表
    api.getWapActivity({
        ver: '5.2.2'
      }).then(response => {
        console.log(response);
        this.actDataEnable   = response.data.data.dataList.enable;
        this.actDataUnenable = response.data.data.dataList.unenable;
      }).catch(error => {
        console.log(error);
      })
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
.banner {
  height: 160px;
}
.ex-box{
  margin: 20px 15px 30px;
  padding: 20px 15px 30px;
  border-radius: 4px;
  background: rgba(255, 255, 255, .3);
  font-size: 18px;
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
  margin-bottom: 10px;
  padding: 12px 15px;
  border-radius: 4px;
}
.form-li label{
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  right: 0;
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
.pay-order-li > li{
  min-height: 70px;
  padding: 10px 15px 10px 120px;
  border-bottom: 1px solid #e8e8e8!important;
}
.pay-order-bank-img{
  position: absolute;
  left: 15px;
  top: 50%;
  width: auto;
  height: 70px;
  transform: translate(0,-50%);
}
.order-pay-recom {
  position: absolute;
  top: 50%;
  right: 10px;
  display: inline-block;
  min-width: 70px;
  padding: 1px 5px;
  border-radius: 3px;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  text-align: center;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  transform: translate(0,-50%);
}
.acts-over > a:after{
    display: block !important;
    content: '' !important;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    background: rgba(255, 255, 255, .6) url(./img/img-over.png) no-repeat 80% center;
    background-size: auto 75%;
    z-index: 999;
}
</style>
