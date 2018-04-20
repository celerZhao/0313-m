<template lang="html">
  <div class="wrap">
    <v-header title="产品" :showBlack="false"></v-header>
    <div class="main">
    <cube-scroll ref="scroll" :options="options" :listenScroll="true">
      <div class="p-tips"><img class="" src="./img/icon02-dun.png">人保，易安保险与工商银行保障您的资金安全</div>

      <div class="p-tag">
        <ul class="p-tag-li">
            <li v-for="(item, index) in items" :class="{active: item.isAction}" @click="toggleTab(item.name, index)">
              {{item.text}}
            </li>
        </ul>
        <!-- <a class="check-oil-price" href="javascript:;">查油价</a> -->
        <router-link class="check-oil-price" to="/oliprice">查油价</router-link>
    </div>
    <!--<keep-alive>-->
      <Savecard :is="currentView"></Savecard>
    <!--</keep-alive>-->

  </cube-scroll>
  </div>
  <v-footer></v-footer>
  </div>
</template>

<script>
import Vheader from '../header/header.vue'
import Savecard from './tab/saveCard.vue'
import Addcard from './tab/addCard.vue'
import Vfooter from '../footer/footer.vue'
export default {
  name: 'product',
  data() {
    return {
      options: {
        observeDOM: true,
        click: true,
        probeType: 3,
        scrollbar: false
      },
      currentView: 'saveCard',
      items: [
        {
          text: '储油卡',
          name: 'saveCard',
          isAction: true },
        {
          text: '加油卡',
          name: 'addCard',
          isAction: false
        }
      ]
    }
  },
  components: {
    'v-footer': Vfooter,
    'v-header': Vheader,
    'saveCard': Savecard,
    'addCard': Addcard
  },
  methods: {
    toggleTab(textContent, index) {
      this.items.map(function(v, i) {
        i == index ? v.isAction = true : v.isAction = false
      })
      this.currentView = textContent;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.scroll.scroll.scrollTo(0,0);
      // console.log(this.$refs.scroll.scroll);
      // this.$refs.scroll.scroll.on('scroll', function(pos) {
      //   console.log(`x: ${pos.x},y:${pos.y}`);
      // })
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
.p-tips{
	height: 30px;
	line-height: 30px;
    border: 1px solid #fd9a27;
    background-color: #fff5e9;
    text-align: center;
    font-size: 13px;
    color: #fd9a27;
}
.p-tips > img{
	position: relative;
	top: 2px;
    margin-right: 5px;
    width: 12px;
}
.p-tag{
	position: relative;
	border-bottom: 1px solid #e8e8e8;
	background-color: #fff;
	overflow: hidden;
}
.p-tag-li{
	display: flex;
	width: 60%;
	margin: 8px auto;
	border: 2px solid #fd9a27;
	border-radius: 18px;
	overflow: hidden;
	text-align: center;
	font-size: 16px;
	color: #666;
}
.p-tag-li > li{
	flex: 0 0 50%;
	padding: 8px 0;
}
.p-tag-li > li.active{
	background-color: #fd9a27;
	color: #fff;
}
.check-oil-price{
	position: absolute;
    right: 15px;
    top: 50%;
    font-size: 16px;
    color: #666;
    transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -webkit-transform: translate(0, -50%);
}
.p-list > li{
	position: relative;
	margin-bottom: 12px;
	padding: 0 15px;
	background-color: #fff;
}
.p-list-cons > li{
	position: relative;
	overflow: hidden;
	padding: 12px 0 15px;
	border-bottom: 1px solid #e8e8e8;
}
.p-list-cons > li:last-child{
	border-bottom: 0;
}
.p-list-cons > li > a{
	display: block;
}
.p-list-new {
	padding: 0.4rem 0rem 0.4rem!important;
	border-bottom: 1px solid #e8e8e8;
}
.new-product-icon,
.new-user{
	display: block;
    position: absolute;
    top: 0;
    right: 15px;
    width: 30px;
    height: 40px;
    background: url(./img/xin-icon.png) no-repeat 95% 0;
    background-size: 100% auto;
}
.new-user{
    background: url(./img/icon01-xing.png) no-repeat 95% 0;
    background-size: 100% auto;
}
.p-list-new h3{
	font-size: 16px;
	color: #161616;
}
.p-list-new h3.c-red{
    color: #f95e30;
}
.p-list-new h3 b{
	font-weight: bold;
}
.p-tips2,.p-tips3{
	display: inline-block;
	height: 12px;
	line-height: 12px;
	margin-left: 3px;
	padding: 2px;
	background-color: #ff9d28;
	font-size: 12px;
	color: #fff;
}
.p-tips3{
	border-radius: 0;
	border-color: #ff9d28;
	background-color: #ff9d28;
    color: #fff;
}
.p-list-cons > li > a {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	font-size: 0;
}
.p-list-cons > li > a > div{
	flex: 0 0 25%;
}
.p-list-cons > li > a > div:first-child{
	flex: 0 0 50%;
}
.p-list-new p,
.p-list-cons li div > div{
	margin-top: 10px;
	font-size: 12px;
	color: #999;
}
.p-list-cons div span{
	font-size: 20px;
	color: #f95e30;
}
.p-list-cons div span b{
	font-size: 14px;
	color: #333;
}
.p-list-cons i{
	font-style: normal;
	font-size: 14px;
}
.btn-jb,
.btn-jb-danger{
    padding: 10px 0;
    border-radius: 20px;
    background-image: linear-gradient(to right, #ff9d28, #f4bd46);
    font-size: 20px;
    color: #fff;
}
.btn-jb-danger{
    background-image: linear-gradient(to right, #fb4f46, #ff874e);
}
</style>
