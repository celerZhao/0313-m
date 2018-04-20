<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div><img src="./../img/img-sharefriend.png"></div>
        <div class="p-15 bg-white bottom-line tc c-black">
          <p class="fs-20">我的加油站</p>
          <p class="mt-15 tl fs-16 lh-20">邀请好友储油可享高达3%佣金奖励，邀请越多，获得收益越大！</p>
          <router-link to="/shareFriendRule" class="c-darkgray fs-18 c-black">具体规则 &gt;</router-link>
        </div>
        <div class="s-li">
          <!-- <a href="javascript:void(0);" class="nativeShare" ref="weixin" data-app="weixin" @click="shareInit">
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
          </a> -->

					<a href="javascript:void(0);" v-for="(item, index) in items" class="nativeShare" @click="shareInit(item.name)">
						<!-- <img :src="item.imgUrl"> -->
						<div>{{item.text}}</div>
					</a>
        </div>
				<div id="share">测试分享</div>
        <div class="mt-20 tc fs-15"><router-link to="/shareFriendEarn" class="c-darkgray">已成功推荐32人，累计获得加油服务费<span class="c-red">78.79元</span> &gt;</router-link></div>
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
			items: [
				{
					name: "weixin",
					text: "微信好友",
					imgUrl: '../img/s-icon01-wx.png'
				},
				{
					name: "weixinFriend",
					text: "微信朋友圈",
					imgUrl: '../img/s-icon02-pyq.png'
				},
				{
					name: "copylink",
					text: "发送链接",
					imgUrl: '../img/s-icon04-link.png'
				}
			],
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	created() {

	},
	methods: {
		isWeiXin() {
			var ua = window.navigator.userAgent.toLowerCase();
			if(ua.match(/MicroMessenger/i) == 'micromessenger') {
				return true
			}
			return false
		},
		getVersion() {
			var a = c.split('.'), b = parseFloat(a[0] + '.' + a[1]);
			return b
		},
		share(to_app) {
			// this.share = function (to_app) {
					var title = this.title, url = this.url, desc = this.desc, img = this.img, img_title = this.img_title, from = '';
					if (this.isucBrowser) {
							to_app = to_app == '' ? '' : (this.platform_os == 'iPhone' ? this.ucAppList[to_app][0] : this.ucAppList[to_app][1]);
							if (to_app == 'QZone') {
									B = 'mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url='+img+'&title='+title+'&description='+desc+'&url='+url+'&app_name='+from;
									k = document.createElement('div'), k.style.visibility = 'hidden', k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
											k && k.parentNode && k.parentNode.removeChild(k)
									}, 5E3);
							}
							if (typeof(ucweb) != 'undefined') {
							    ucweb.startRequest('shell.page_share', [title, desc, url, to_app, '', '', ''])
							} else {
							    if (typeof(ucbrowser) != 'undefined') {
							        ucbrowser.web_share(title, desc, url, to_app, '', '', '')
							    } else { }
							}
					} else {
							if (this.isqqBrowser && !(this.isWeixin)) {
									to_app = to_app == '' ? '' : this.ucAppList[to_app][2];
									var ah = {
											url: url,
											title: title,
											description: desc,
											img_url: img,
											img_title: img_title,
											to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
											cus_txt: '请输入此时此刻想要分享的内容'
									};
									ah = to_app == '' ? '' : ah;
									if (typeof(browser) != 'undefined') {
											if (typeof(browser.app) != 'undefined' && this.isqqBrowser == this.bLevel.qq.higher) {
													browser.app.share(ah);
													setTimeout(function() {
														window.location.reload();
													},1000);

											}
									} else {
											if (typeof(window.qb) != 'undefined' && this.isqqBrowser == this.bLevel.qq.lower) {
													window.qb.share(ah)
													setTimeout(function() {
														window.location.reload();
													},1000);
											} else { }
									}
							} else { }
					}
			// };
		},
		isloadqqApi() {
			if (this.isqqBrowser) {
					var b = (this.version.qq < 5.4) ? this.qApiSrc.lower : this.qApiSrc.higher;
					var d = document.createElement('script');
					var a = document.getElementsByTagName('body')[0];
					d.setAttribute('src', b);
					a.appendChild(d)
			}
		},
		getPlantform() {
			if (navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('iPod') > -1) {
					return 'iPhone';
			}
			return 'Android';
		},
		nativeShare(config,name) {
			// console.log(name);
			// var this.version = {uc: '', qq: ''}
			config = config || {};
			this.url = config.url || document.location.href || '';
			this.title = config.title || document.title || '';
			this.desc = config.desc || document.title || '';
			this.img = config.img || document.getElementsByTagName('img').length > 0 && document.getElementsByTagName('img')[0].src || '';
			this.img_title = config.img_title || document.title || '';
			this.from = config.from || window.location.host || '';

			this.platform_os = this.getPlantform();
			this.version.qq = this.isqqBrowser ? this.getVersion(navigator.userAgent.split('MQQBrowser/')[1]) : 0;
			this.version.uc = this.isucBrowser ? this.getVersion(navigator.userAgent.split('UCBrowser/')[1]) : 0;
			this.isWeixin = this.isWeiXin();

			//微信打开
			if (this.isWeixin) {
					this.$createDialog({
							type: 'alert',
							title: '提示',
							showClose: true,
							content: '微信打开',
							icon: '',
							confirmBtn: '我知道了'
						}).show()
					return;
			}

			//QQ内置浏览器打开
			if (this.isqqWithBroser) {
					vm.$createDialog({
							type: 'alert',
							title: '提示',
							showClose: true,
							content: 'QQ内置浏览器打开',
							icon: '',
							confirmBtn: '我知道了'
						}).show()
					return;
			}

			//UC 或 QQ浏览器打开
			if ((this.isqqBrowser && this.version.qq < 5.4 && this.platform_os == 'iPhone') || (this.isqqBrowser && this.version.qq < 5.3 && this.platform_os == 'Android')) {
					this.isqqBrowser = this.bLevel.qq.forbid
			} else {
					if (this.isqqBrowser && this.version.qq < 5.4 && this.platform_os == 'Android') {
							this.isqqBrowser = this.bLevel.qq.lower
					} else {
							if (this.isucBrowser && ((this.version.uc < 10.2 && this.platform_os == 'iPhone') || (this.version.uc < 9.7 && this.platform_os == 'Android'))) {
									this.isucBrowser = this.bLevel.uc.forbid
							}
					}
			}

			this.isloadqqApi();
			if (this.isqqBrowser || this.isucBrowser) {
				this.$createDialog({
						type: 'alert',
						title: '提示',
						showClose: true,
						content: 'UC和QQ浏览器',
						icon: '',
						confirmBtn: '我知道了'
					}).show()

					this.share(name)
			} else {
					// let html = `<div id="maskFull" class="mask-full active">
					// 			<div id="maskInner" class="native-share"><img class="tip-img" src="../img/tip-img.png">
					// 					<span class="btn-close"><a id="closeTipImg" class="btn btn-default" href="JavaScript:void(0);">我知道了</a></span>
					// 			</div>
					// 	</div>`
					//
					// // var bdy = document.getElementsByTagName("body")[0];
					// var bdy = document.getElementById("app");
					// console.log(bdy);
					// bdy.append(html);

				this.$createDialog({
						type: 'alert',
						title: '提示',
						showClose: true,
						content: '对不起！目前仅支持UC和QQ浏览器',
						icon: '',
						confirmBtn: '我知道了'
					}).show()
			}
		},
		shareInit(name) {
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
			this.nativeShare(config,name);
		}
	},
	mounted() {
		this.$nextTick(function() {
			this.$refs.scroll.scroll.scrollTo(0,0);

			this.qApiSrc = {
					lower: '//3gimg.qq.com/html5/js/qb.js',
					higher: '//jsapi.qq.com/get?api=app.share'
			}
			this.bLevel = {
					qqWithBroser: {forbid: 0, higher: 2},
					qq: {forbid: 0, lower: 1, higher: 2},
					uc: {forbid: 0, allow: 1}
			}
			// UA = navigator.userAgent,
			this.isqqWithBroser = (navigator.userAgent.split('QQ/').length > 1) ? this.bLevel.qqWithBroser.higher : this.bLevel.qqWithBroser.forbid
			this.isqqBrowser = (navigator.userAgent.split('MQQBrowser/').length > 1) ? this.bLevel.qq.higher : this.bLevel.qq.forbid
			this.isucBrowser = (navigator.userAgent.split('UCBrowser/').length > 1) ? this.bLevel.uc.allow : this.bLevel.uc.forbid
			this.version = {uc: '', qq: ''}
			this.isWeixin = false
			this.platform_os = ''
			this.url = ''
			this.title = ''
			this.desc = ''
			this.img = ''
			this.img_title = ''
			this.from = ''
			this.ucAppList = {
					sinaWeibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
					weixin: ['kWeixin', 'WechatFriends', 1, '微信好友'],
					weixinFriend: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
					QQ: ['kQQ', 'QQ', '4', 'QQ好友'],
					QZone: ['kQZone', 'QZone', '3', 'QQ空间']
			}

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
