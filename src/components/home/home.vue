<template lang="html">
  <div class="wrap">
    <v-header :title="title" :showBlack="showBlack"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="down-app">
          <img src="./img/logo.png">
          <div>下载光汇云油APP<br>新人免费领取5升油</div>
          <a class="btn btn-down-app" href="javascript:;">立即下载</a>
        </div>

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

        <!-- 今日油讯 s -->
        <div class="taday-oil-news">
          <span class="icon-news"></span>
          <div class="news-txt">
            <cube-slide ref="slide1" :data="dataNew" :showDots="false" direction="vertical" :interval="2000">
              <cube-slide-item v-for="(item, index) in dataNew" :key="index">
                  <a href="javascript:void(0);" @click="clickItem(item)">
                    {{item.title}}
                  </a>
              </cube-slide-item>
            </cube-slide>
          </div>
        </div>
        <!-- 今日油讯 e -->

        <!-- 四大块 s -->
        <ul class="bg-white four-info" v-if="fourData.app3 != null">
          <li v-for="(item,index) in fourData.app3.indexGrid">
            <a :href="item.link">
              <img :src="item.img">
              <p>{{item.text}}</p>
            </a>
          </li>
        </ul>

        <div class="new-vip" v-if="newProduct.additional != null">
          <h5 class="new-vip-title">{{newProduct.name}}</h5>
          <div class="tc new-vip-tag">
            <span>上限{{newProduct.buy_num_max}}{{newProduct.additional.unit}}</span>
            <span>每人限购1张</span>
            <span>{{newProduct.termText}}{{newProduct.term}}天</span>
          </div>
          <div class="tc c-red new-vip-profit">{{newProduct.additional.profit_extrarate}}<span>{{newProduct.additional.profit_extrarate_unit}}+{{newProduct.additional.profit_give}}{{newProduct.additional.profit_extrarate_unit}}</span></div>
          <p class="tc c-gray fs-10">{{newProduct.additional.profit_rate_label}}
            <span class="shang">+{{newProduct.additional.profit_extrarate_label}}</span></p>
          <a class="btn btn-vip" href="javascript:;">立即抢购</a>
        </div>
        <p class="tips"><img class="" src="./img/icon02-dun.png">人保，易安保险与工商银行保障您的资金安全</p>

        <div class="h-pro">
          <h5 class="h-title">储油精选
            <router-link class="more" to="/product">更多</router-link>
          </h5>
          <ul class="h-pro-li">
            <li v-for="(item, index) in list">
              <div class="h-pro-name">{{item.name}}</div>
                <ul class="h-pro-li-cons">
                  <li>
                    <router-link v-if="item.type == 'fixed_litre_up_v1'" :to="'/proOilCard/'+item.id+'/'+item.term"><!--光汇储油卡-->
                      <div>
                        <span>{{item.additional.profit_give}}<i>{{item.additional.profit_extrarate_unit}}+{{item.additional.profit_extrarate}}{{item.additional.profit_extrarate_unit}}</i></span>
                        <div>{{item.additional.profit_rate_label}}+{{item.additional.profit_extrarate_label}}</div>
                      </div>
                      <div>
                        <span><b>{{item.term}}{{item.termUnit}}</b></span>
                        <div>{{item.termText}}</div>
                      </div>
                      <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
                    </router-link>
                    <router-link v-if="item.type == 'fixed_amount_copy'" :to="'/proHyb/'+item.id"><!--汇油宝-->
                      <div>
                        <span>{{item.additional.profit_give}}<i>{{item.additional.profit_extrarate_unit}}+{{item.additional.profit_extrarate}}{{item.additional.profit_extrarate_unit}}</i></span>
                        <div>{{item.additional.profit_rate_label}}+{{item.additional.profit_extrarate_label}}</div>
                      </div>
                      <div>
                        <span><b>{{item.term}}{{item.termUnit}}</b></span>
                        <div>{{item.termText}}</div>
                      </div>
                      <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
                    </router-link>
                    <router-link v-if="item.type == 'amount_refuel_nation_v1'" :to="'/proAddOilGh/'+item.id+'/'+item.term"> <!--光汇加油卡-->
                      <div>
                        <span>{{item.additional.profit_give}}<i>{{item.additional.profit_extrarate_unit}}+{{item.additional.profit_extrarate}}{{item.additional.profit_extrarate_unit}}</i></span>
                        <div>{{item.additional.profit_rate_label}}+{{item.additional.profit_extrarate_label}}</div>
                      </div>
                      <div>
                        <span><b>{{item.term}}{{item.termUnit}}</b></span>
                        <div>{{item.termText}}</div>
                      </div>
                      <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
                    </router-link>
                    <router-link v-if="item.type == 'fixed_litre_exper_v1'" to="'/'"><!--新手储油体验卡-->
                      <div>
                        <span>{{item.additional.profit_give}}<i>{{item.additional.profit_extrarate_unit}}+{{item.additional.profit_extrarate}}{{item.additional.profit_extrarate_unit}}</i></span>
                        <div>{{item.additional.profit_rate_label}}+{{item.additional.profit_extrarate_label}}</div>
                      </div>
                      <div>
                        <span><b>{{item.term}}{{item.termUnit}}</b></span>
                        <div>{{item.termText}}</div>
                      </div>
                      <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
                    </router-link>
                  </li>
                </ul>
            </li>
          </ul>
        </div>

        <!-- 加油省钱 s -->
        <div class="h-pro">
          <h5 class="h-title">加油省钱</h5>
          <ul class="h-save-money">
            <li>
              <router-link to="/fuelCard">
                <img src="./img/img01.jpg">
                <div class="c-red">加油卡直充</div>
                <p class="c-gray">中石油/中石化加油卡，专享优惠折扣，即充即用</p>
              </router-link>
            </li>
            <li>
              <router-link to="/car">
                <img src="./img/img02.jpg">
                <div class="c-red">车主认证</div>
                <p class="c-gray">认证有机会得福利</p>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 加油省钱 e -->
        <div class="bg-white h-img"><img src="./img/img03.jpg"></div>

        <p class="tips"><img class="" src="./img/icon02-dun.png">人保，易安保险与工商银行保障您的资金安全</p>
      </cube-scroll>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Vfooter from '../footer/footer.vue'
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapActions} from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      showBlack: false,
      title: '光汇石油',
      dataNew: [],
      dataList: [],
      newProduct: {},
      list: [],
      productList: [],
      fourData: [],
      options: {
        observeDOM: true,
        click: true,
        probeType: 3,
        scrollbar: false
      }
    }
  },
  components: {
    'v-footer': Vfooter,
    'v-header': Vheader
  },
  computed: {
    ...mapState({
      token: state => state.com.token,
      login: state => state.com.login
    })

  // token() {
  //   return this.$store.state.com.token
  // }

  },
  methods: {
    ...mapActions([
      'getNewDatel'
    ]),
    clickItem(el) {
      this.$router.push({name: '今日油讯',params: {id: el.id}})
      this.getNewDatel(el)
    }
  },
  created() {

    // 首页轮播广告接口
    api.homeAd({
      key: '123',
      ad_type: 'home',
      ver: '5.2.1'
    }).then(response => {
      this.dataList = response.data.data.dataList
    }).catch(error => {
      console.log(error);
    })
    // // 首页今日油讯
    api.todayOil({
      ver: '5.2.1'
    }).then(response => {
      this.dataNew = response.data.data.dataList
    }).catch(error => {
      console.log(error);
    })
    // 首页四宫格
    api.homeFourPalaces({
      category: 'index',
      ver: '5.2.6'
    }).then(response => {
      this.fourData = response.data.data.dataList;
    }).catch(error => {
      console.log(error);
    })
    // 首页商品信息
    api.homeShopList({
      ver: '5.2.6',
      is_best: true,
      region_name: '深圳市'
    }).then(response => {
      this.productList = response.data.data.goods
      this.productList.map(v => {
        if(v.name == '新手体验卡') {
          this.newProduct = v
        }else {
          // this.list.push(v)
          this.list.unshift(v)
        }
      });
      console.log(this.newProduct);
    }).catch(error => {
      console.log(error);
    })
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.scroll.scroll.scrollTo(0,0)
      this.$refs.slide.refresh()
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
.news-txt>.cube-slide>.cube-slide-group>.cube-slide-item {
  width: 100%!important;
}
.dotss {
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-dot {
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background: rgba(0,0,0,0.2);
  margin: 0 0.1rem;
}
.my-dot.active {
  background: #fff;
}
.down-app{
  position: relative;
  display: flex;
  padding: 8px 15px;
}
.down-app > img{
  flex: 0 0 40px;
  margin-right: 10px;
  width: 30px;
  height: auto;
  align-self: center;
}
.down-app > div{
  position: relative;
  top: 5px;
  font-size: 12px;
  line-height: 18px;
  color: #161616;
}
.btn-down-app{
  position: absolute;
  top: 50%;
  right: 15px;
  width: auto;
  padding: 8px 15px;
  border-radius: 3px;
  background-color: #fc3635;
  font-size: 12px;
  color: #fff;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.banner {
  height: 160px;
  /* overflow: hidden; */
}
/* .banner img{
  width: 100%;
  display: block;
  vertical-align: middle;
} */
.taday-oil-news{
  position: relative;
  overflow: hidden;
  height: 40px;
  line-height: 40px;
  padding-left: 30px;
  /* border-top: 1px solid #e8e8e8; */
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
}
.icon-news{
  position: absolute;
  left: 0;
  top: 0;
  width: 15px;
  height: 40px;
}
 .icon-news:before {
  position: absolute;
  left: 10px;
  top: 50%;
  content: "\e668";
  font-size: 15px;
  -webkit-transform: translate(0,-50%);
  -moz-transform: translate(0,-50%);
  transform: translate(0,-50%);
}
.news-txt{
  font-size: 14px;
  height: 50px;
  overflow: hidden;
}
.news-txt a{
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #666;
}
.four-info{
  display: flex;
}
.four-info > li{
  flex: 0 0 25%;
  margin: 15px 0;
  text-align: center;
}
.four-info > li a {
  display: inline-block;
}
.four-info > li img{
  width: 40px;
}
.four-info > li p{
  margin-top: 8px;
  font-size: 14px;
  color: #69686b;
}
.new-vip{
  margin:10px 15px 0;
  padding: 0 15px 15px;
  border-top: 4px solid #ff9d28;
  border-radius: 0 0 3px 3px;
  background: #fff url(./img/icon01-xing.png) no-repeat 15px 0;
  background-size: 30px auto;
  box-shadow: 0 2px 3px rgba(153, 153, 153, .1);
}
.new-vip-title{
  padding:12px 0 10px;
  border-bottom: 1px dashed #e8e8e8;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  color: #333;
}
.new-vip-tag{
  margin-top: 8px;
  font-size: 0;
}
.new-vip-tag span {
  display: inline-block;
  height: 12px;
  line-height: 12px;
  padding: 3px;
  margin: 0 2px;
  border: 1px solid #e8e8e8;
  font-size: 10px;
  color: #999;
}
.new-vip-profit{
  margin: 15px 0 8px;
  font-size: 30px;
}
.new-vip-profit span{
  font-size: 16px;
}
.btn-vip{
  margin-top: 15px;
  padding: 12px 0;
  border-radius: 20px;
  background: linear-gradient(to right, #fb4d47, #fe894f);
  box-shadow: 0 3px 5px rgba(253, 213, 218, .1);
  font-size: 18px;
  color: #fff;
}
.h-pro{
  margin: 15px;
  font-size: 16px;
  color: #666;
}
.h-title{
  padding-left: 10px;
  border-left: 3px solid #ff9d28;
}
.h-title .more{
  position: relative;
  top: 3px;
  float: right;
  font-size: 12px;
  color: #6178e1;
}
.h-pro-li > li{
  position: relative;
  margin-top: 12px;
  padding: 12px 10px;
  border-radius: 4px;
  box-shadow: 0 3px 5px rgba(153, 153, 153, .1);
  background-color: #fff;
  overflow: hidden;
}
.h-pro-name {
  margin-bottom: 12px;
  font-size: 16px;
}
.h-pro-name .tips2{
  display: inline-block;
  height: 12px;
  line-height: 12px;
  margin-left: 3px;
  padding: 2px;
  background-color: #ff9d28;
  font-size: 12px;
  color: #fff;
}
.h-pro-li-cons > li > a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  font-size: 0;
}
.h-pro-li-cons > li > a > div:first-child{
  flex: 0 0 48%;
}
.h-pro-li-cons > li > a > div:nth-child(2){
  flex: 0 0 20%;
}
.h-pro-li-cons > li > a > div:last-child{
  flex: 0 0 32%;
}
.h-pro-li-cons li div > div{
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
.h-pro-li-cons div span{
  font-size: 20px;
  color: #f95e30;
}
.h-pro-li-cons div span b{
  font-size: 14px;
  color: #333;
}
.h-pro-li-cons i{
  font-style: normal;
  font-size: 14px;
}
.btn-jb{
    padding: 10px 0;
    border-radius: 20px;
    background-image: linear-gradient(to right, #ff9d28, #f4bd46);
    font-size: 20px;
    color: #fff;
}
.h-save-money{
  display: flex;
  margin-top: 10px;
}
.h-save-money > li{
  flex: 0 0 50%;
}
.h-save-money > li:first-child{
  padding-right: 2.5px;
}
.h-save-money > li:last-child{
  padding-left: 2.5px;
}
.h-save-money > li > a{
  height: 130px;
  padding: 8px 0;
  overflow: hidden;
  background-color: #fff;
  text-align: center;
}
.h-save-money > li img{
  width: 100%;
}
.h-save-money > li p{
  margin-top: 8px;
  line-height: 16px;
  font-size: 12px;
}
.h-img img{
  width: 100%;
}
</style>
