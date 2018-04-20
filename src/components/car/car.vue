<template lang="html">
	<div class="wrap">
		<v-header title="车主认证"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div><img src="./img/banner.jpg"></div>
			  <ul class="form-li">
          <li>
            <label>车型</label>
            <div class="form-control">小型汽车</div>
          </li>
        </ul>
        <div class="upload-car">
	        <div>
	        	<img src="./img/add.png">
	        	<p>上传行驶证</p>
        	</div>
        </div>
			  <ul class="form-li">
          <li>
            <label>车牌号</label>
            <div class="form-control"><cube-input :maxlength="7" :clearable="clearable" placeholder="请输入车牌号"></cube-input></div>
          </li>
          <li>
            <label>车架号</label>
            <div class="form-control"><cube-input :maxlength="17" :clearable="clearable" placeholder="请输入车架号"></cube-input></div>
          </li>
          <li>
            <label>发动机号</label>
            <div class="form-control"><cube-input :maxlength="7" :clearable="clearable" placeholder="请输入发动机号"></cube-input></div>
          </li>
        </ul>
			</cube-scroll>
		</div>
		<router-link to="/carSuc" class="btn btn-orange disable">提交资料</router-link>
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
.cube-input::after{
  border:none;
}
.form-li{
  margin-bottom: 10px;
  position: relative;
  min-height: 30px;
  background-color: #fff;
  font-size: 16px;
  overflow: hidden;
}
.form-li > li{
  position: relative;
  min-height: 24px;
  line-height: 24px;
  padding: 12px 15px;
  border-bottom: 1px solid #e8e8e8;
}
.form-li label{
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 80px;
  top: 50%;
  width: 100%;
  min-height: 24px;
  line-height: 24px;
  border: none;
  background: none;
  text-align: left;
  font-size: 16px;
  color: #333;
  transform: translate(0,-50%);
}
.form-li .form-control span{
  margin-right: 30px;
}
.upload-car{
	padding: 15px;
	background-color: #fff;
}
.upload-car > div{
	padding: 20px 0;
	border: 2px dashed #ccc;
	text-align: center;
	font-size: 16px;
}
.upload-car > div > img{
	display: inline-block;
	width: 50px;
	margin-bottom: 10px;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
.btn-orange.disable{
	background: #ccc;
	color: #fff;
}
</style>
