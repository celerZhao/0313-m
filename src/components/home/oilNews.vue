<template lang="html">
	<div class="wrap">
		<v-header :title="title"></v-header>
		<div class="main wrap1">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
					<div class="content-wrap" v-html="content"></div>
			</cube-scroll>
		</div>
		<ul class="p-list" v-show="showProduct">
		<li>
			<div class="p-list-new">
				<h3><b>{{getNew.product_name}}</b><span class="p-tips3">限时抢购</span><span class="p-tips3" v-show="!(getNew.is_add_rate == 0)">{{getNew.rate_txt}}</span></h3>
				<p class="c-gray" v-html="getNew.product_intro"></p>
			</div>
			<ul class="p-list-cons">
				<li>
					<router-link to="/proFuelCard">
						<div>
							<span>{{getNew.discounts}}<i>
								{{getNew.discounts_unit}} <span v-show="!(showProduct == '汇油宝')">+{{getNew.up_money}}{{getNew.up_money_unit}}</span></i></span>
							<div>{{getNew.discounts_text}}<span class="shang" v-show="!(showProduct == '汇油宝')">+{{getNew.profit_rate_label}}</span></div>
						</div>
						<div>
							<span><b>{{getNew.cashday}}{{getNew.cashday_unit}}</b></span>
							<div>{{getNew.cashday_text}}</div>
						</div>
						<div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
					</router-link>
				</li>
			</ul>
		</li>
		</ul>
	</div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapGetters} from 'vuex'
export default {
	data() {
		let id = this.$route.params.id
		return {
			title: '今日油讯',
			id: id,
			content: null,
			showProduct: '',
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	computed: {
		...mapGetters([
			'getNew'
		])
	},
	activated() {
		this._getDetail()
		this.content = this.getNew.context
		this.showProduct = this.getNew.product_name
		console.log(this.showProduct);
	},
	methods: {
		_getDetail() {
			if(!this.getNew.id) {
				this.$router.push('/home')
				return
			}
		}
	},
	mounted() {
		this.$nextTick(function() {
			this.$refs.scroll.scroll.scrollTo(0,0);
			console.log(this.getNew);
		})
	},
	components: {
		'v-header': Vheader
	}
}
</script>

<style lang="css" scoped>
.wrap1 {
	padding: 10px!important;
}
.wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}
.main {
  flex: 1;
  overflow: auto;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0;
}
.cube-scroll-content{
	background-color: #f00!important;
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
.p-list-cons div span.shang {
	font-size: 0.32rem;
	color: #999;
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
