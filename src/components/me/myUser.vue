<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div class="bought-content">
        	<div class="mb-img">
            <img src="./img/img04.png">
          </div>
    		</div>
    		<div class="bg-white tc user-tag">
					<span class="active">我的特权</span>
					<span>我的信息</span>
				</div>
				<div class="h-pro">
          <h5 class="h-title">普通会员<i class="icon-xiangxiafanye"></i></h5>
          <ul class="fuel-li">
				  	<li><router-link to="#"><img src="./img/img01.png"><div class="mt-10">免费提油</div></router-link></li>
				  	<li><router-link to="#"><img src="./img/img02.jpg"><div class="mt-10">免费领ETC</div></router-link></li>
				  </ul>
        </div>

				<!-- 我的信息 s -->
        <ul class="form-li">
          <li>
            <router-link to="#">
              <label>实名认证</label>
              <div class="form-control"><span class="c-darkgray">张*疯</span></div>
              <i class="icon-right"></i>
            </router-link>
          </li>
          <li>
            <router-link to="#">
	            <label>银行卡</label>
	            <div class="form-control"><span class="c-darkgray">6558 **** **** 8888</span></div>
	            <i class="icon-right"></i>
            </router-link>
          </li>
        </ul>
				<!-- 我的信息 e -->
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
  padding: 15px;
  border-bottom: none;
  background-image: linear-gradient(120deg, #f3ba3d, #ff9726);
  text-align: center;
  color: #fff;
}
.mb-img {
  display: inline-block;
  width: 70px;
  height: 70px;
  margin: 15px 0;
  border-radius: 35px;
  background: url(./img/img-member.jpg) no-repeat;
  background-size: 100%;
  overflow: hidden;
  position: relative;
}
.user-tag{
	display: flex;
	font-size: 15px;
}
.user-tag span{
	display: inline-block;
	flex: 0 0 50%;
	padding: 15px 0 12px;
    color: #333;
}
.user-tag span.active{
	border-bottom: 2px solid #fc3536;
    font-weight: bold;
    color: #fc3635;
}
.h-pro{
	margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  font-size: 16px;
  color: #666;
}
.h-title{
	padding-bottom: 10px;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
}
.h-title .icon-xiangxiafanye{
  position: relative;
  top: 3px;
  float: right;
  font-size: 14px;
  color: #666;
}
.fuel-li{
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	background-color: #fff;
}
.fuel-li > li{
	position: relative;
	flex: 0 0 50%;
	margin: 5px 0;
	text-align: center;
}
.fuel-li > li:after{
	display: inline-block;
	content: '';
	position:absolute;
	right:0;
	top: 20px;
	bottom: 20px;
	border-right: 1px solid #e8e8e8;
}
.fuel-li > li:nth-child(even):after{
	border: 0;
}
.fuel-li > li > a{
	display: block;
	padding: 10px;
	box-sizing: border-box;
	font-size: 14px;
	color: #666;
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
  padding: 12px 15px;
  border-bottom: 1px solid #e8e8e8;
}
.form-li > li:last-child{
  border-bottom: 0;
}
.form-li > li > a{
    display: block;
}
.form-li label{
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  min-height: 24px;
  line-height: 24px;
  border: none;
  background: none;
  text-align: right;
  font-size: 14px;
  outline: none;
  transform: translate(0,-50%);
}
.form-li .form-control span{
  margin-right: 30px;
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
.form-li .icon-right{
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 18px;
  transform: translate(0,-50%);
}
</style>
