<template lang="html">
	<div class="wrap">
		<v-header title="发现" :showBlack="false"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  	<!--会员服务 s-->
			    <div class="f-cons">
			        <h5 class="f-cons-title">
			            <img class="f-cons-title-img" src="./img/icon-hyfw.png" />
			            <span>会员服务</span>
			        </h5>
			        <div class="f-cons-list">
			            <router-link to="/acts">
			                <img src="./img/f-icon01.png" />
			                <div>精彩活动</div>
			                <p>总有一款</p>
			                <p>适合你</p>
			            </router-link>
			            <router-link to="/shareFriend">
			                <img src="./img/f-icon02.png" />
			                <div>邀请好友</div>
			                <p>和好友一起</p>
			                <p>享受好产品</p>
			            </router-link>
			            <router-link to="/excoupon">
			                <img src="./img/f-icon03.png" />
			                <div>兑换码</div>
			                <p>活动兑换码</p>
			                <p>从此进</p>
			            </router-link>
			            <router-link to="/quan">
			                <img src="./img/f-icon04.png" />
			                <div>优惠卡券</div>
			                <p>红包 现金券</p>
			                <p>啥都有</p>
			            </router-link>
			        </div>
			    </div>
			    <!--会员服务 e-->

			    <!--车主服务 s-->
			    <div class="f-cons">
			        <h5 class="f-cons-title">
			            <img class="f-cons-title-img" src="./img/icon-czfw.png" />
			            <span>车主服务</span>
			        </h5>
			        <div class="f-cons-list" v-if="itemData != null">
			            <router-link to="/fuelCard">
			                <img src="./img/f-icon05.png" />
			                <div>加油卡直充</div>
			                <p>支持中石化</p>
			                <p>中石油低至9.3折</p>
			            </router-link>
			            <router-link to="car">
			                <img src="./img/f-icon06.png" />
			                <div>车主认证</div>
			                <p>认证有机会</p>
			                <p>享福利</p>
			            </router-link>


			            <a v-for="item in itemData" v-bind:href="item.link" v-if="item.fun =='links'">

			                <img v-bind:src="item.img" />
			                <div>{{item.text}}</div>
			                {{item.desc}}

			            </a>


			        </div>
			    </div>
			    <!--车主服务 e-->

			    <a class="btn f-down-app" href="javascript:;">
		            下载APP享更多车主服务
		            <div>发票报销,扫码加油等</div>
		        </a>

			</cube-scroll>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
import Vfooter from '../footer/footer.vue'
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	name: 'find',
	data() {
		return {
			itemData: [],
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	created() {
		// api.personEmailInformation({
		//   'type_bn':'type_bn'
		// }).then(response => {
		//   console.log(response);
		// }).catch(error => {
		//   console.log(error);
		// })
		api.getOwnerService({
            ver: '5.2.2'
        }).then(response => {
        console.log(response);
        this.itemData = response.data.data.dataList.ownerGrid;
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
		'v-footer': Vfooter,
		'v-header': Vheader
	},
	computed: {
		...mapState({
			token: state => state.com.token,
			login: state => state.com.login
		})
	},
	methods:{
		...mapMutations({
			setToken: 'TOKEN'
		}),
		cliarToken() {
			console.log('清除');
			this.setToken("")
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
.f-cons{
	margin-bottom:10px;
	padding:0 15px;
	background-color: #fff;
	color: #161616;
}
.f-cons-title{
	position: relative;
	display: flex;
	height: 46px;
	line-height: 46px;
	font-size: 15px;
}
.f-cons-title:after{
	position: absolute;
    content: '';
    left: 0;
    right: 0;
    height: 1px;
    bottom: 0;
    border-bottom: 1px solid #e8e8e8;
}
.f-cons-title-img{
	width: 22px;
	align-self: center;;
	justify-content: flex-start;
	margin-right: 10px;
}
.f-cons-list{
	width: 100%;
	font-size: 0;
}
.f-cons-list > a{
	display: inline-block;
	width: 25%;
	margin: 15px 0;
	text-align: center;
}
.f-cons-list > a > img{
	width: 35px;
}
.f-cons-list > a > div{
	margin: 10px 0 5px;
	font-size: 14px;
}
.f-cons-list > a > p{
	white-space: nowrap;
	font-size: 12px;
	line-height: 16px;
	color: #999;
}
.f-down-app{
	margin: 15px;
	padding: 12px 0;
	background-image: linear-gradient(to right, #ff9d28, #f4bd46);
	font-size: 16px;
}
.f-down-app > div{
	margin-top: 8px;
	font-size: 12px;
}
</style>
