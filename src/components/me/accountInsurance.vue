<template lang="html">
  <div class="wrap">
    <v-header></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
    		<ul class="form-li">
    			<li>
    				<label>保单号</label>
            <div class="form-control"><span class="c-gray">109570602288888888</span></div>
    			</li>
          <li>
            <label>姓名</label>
            <div class="form-control"><span class="c-gray">张三疯</span></div>
          </li>
          <li>
            <label>身份证号</label>
            <div class="form-control"><span class="c-gray">4887585535487464654</span></div>
          </li>
    			<li>
    				<label>保险热线</label>
            <div class="form-control"><span class="c-gray"></span></div>
    			</li>
    		</ul>
        <div class="mt-10 p-15 bg-white"><img src="./img/img03-bx.jpg"></div>
      </cube-scroll>
    </div>
    <router-link to="/me" class="btn btn-orange">我知道了</router-link>
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
	created() {
		
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
  position: relative;
  min-height: 30px;
  font-size: 15px;
  overflow: hidden;
}
.form-li > li{
  position: relative;
  min-height: 24px;
  line-height: 24px;
  margin-top: 10px;
  padding: 12px 15px;
  background-color: #fff;
}
.form-li label{
  display: inline-block;
  width: 65px;
  text-align:justify;
  text-justify:distribute-all-lines;
  text-align-last:justify;
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 100px;
  top: 50%;
  right: 15px;
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
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
</style>