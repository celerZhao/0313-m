<template lang="html">
	<div class="wrap">
		<v-header title="邀请好友"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div><img src="./../img/img-sharefriend.png"></div>
        <div class="p-15 bg-white bottom-line tc c-black">
          <p class="fs-20">我的加油站</p>
          <p class="mt-15 tl fs-16 lh-20">邀请好友储油可享高达3%佣金奖励，邀请越多，获得收益越大！</p>
          <router-link to="/shareFriendRule" class="c-darkgray fs-18 c-black">具体规则 &gt;</router-link>
        </div>
        <div class="s-li">
          <a href="javascript:void(0);" class="nativeShare" ref="weixin" data-app="weixin" @click="shareInit">
						<img src="../img/s-icon01-wx.png">
						<div>微信好友</div>
          </a>
          <a href="javascript:void(0);" class="nativeShare" ref="weixinFriend" data-app="weixinFriend" @click="shareInit">
            <img src="../img/s-icon02-pyq.png">
            <div>微信朋友圈</div>
          </a>
					<a href="javascript:void(0);" class="nativeShare" ref="copylink" data-app="copylink" @click="shareInit">
            <img src="../img/s-icon04-link.png">
            <div>发链接邀请</div>
          </a>

					<!-- <a href="javascript:void(0);" v-for="(item, index) in items" class="nativeShare" @click="shareInit(item.name)">
						<img :src="item.imgUrl">
						<div>{{item.text}}</div>
					</a> -->
        </div>
        <div class="mt-20 tc fs-15"><router-link to="/shareFriendEarn" class="c-darkgray">{{promotionInfo.recommend_profit_memo}}<span class="c-red">{{promotionInfo.recommend_profit_money}}</span> &gt;</router-link></div>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
import Vheader from '../../header/header.vue'
import api from '../../../fetch/ajax.js'
import {nativeShare} from '../../../common/share/nativeShare.js'
export default {
	data() {
		return {
      promotionInfo: [],
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	created() {
    api.getRecomPrizeInfo({
            ver: '5.2.2'
           }).then(response => {
               this.promotionInfo = response.data.data.dataList;
           }).catch(error => {
             console.log(error);
           })
	},
	methods: {

		shareInit() {
			//应用平台判断
      var config = {
          url: 'http://www.baidu.com',
          title: '这里是分享内容的标题',
          desc: '这里是分享的内容描述',
          img: 'http://test.bwoonline.com/guocj/tmp/mobile/img/Qr-code.png',
          img_title: '3333333333333',
          from: '44444444444444444444'
      };
			// console.log(event);
			// console.log(event.target.getAttribute("data-app"));
			new nativeShare("#nativeShare", '0000', config);
		}
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
.s-li{
  width: 100%;
  font-size: 0;
}
.s-li > a{
  display: inline-block;
  width: 33.333333%;
  margin: 15px 0;
  text-align: center;
}
.s-li > a > img{
  width: 40px;
}
.s-li > a > div{
  margin: 10px 0 5px;
  font-size: 13px;
}
</style>
