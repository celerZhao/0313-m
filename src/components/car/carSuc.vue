<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
			  <div><img src="./img/banner.jpg"></div>
        <div class="car-suc">
          <img src="./img/suc.png">
          <p class="mt-20 mb-15 fs-18 bold">恭喜您，已通过车主认证！</p>
          <p>尊敬的光汇XXX车主，送您的X升油/X元券已经到账！</p>
        </div>
			</cube-scroll>
		</div>
		<router-link to="#" class="btn btn-orange">立即使用</router-link>
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
.car-suc{
  padding: 15px;
  background-color: #fff;
  text-align: center;
  font-size: 14px;
  color: #161616;
}
.car-suc > img{
  width: 100px;
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
