<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="relative p-15 bg-white tc c-darkgray fs-16">
          <div class="tr"><router-link to="/myOilTankDet" class="fs-18 bold c-blue">油箱明细</router-link></div>
          <div class="mb-20 tank-img"><img src="./img/icon01-tank.png"></div>
          <p>油量(升)<i class="icon-wenhao ml-5" @click="showOil()"></i></p>
          <p class="mt-15 mb-15 bold c-black fs-30">{{userData.goil_give}}</p>
          <p>可抵金额(元) <span class="ml-5">+{{userData.goil_money}}</span></p>
        </div>
        <div class="p-15">
          <router-link v-if="userData.goil_money>0" to="/product" class="btn btn-orange">去使用</router-link>
          <a v-else="" href="javasrcpt:;" class="btn btn-orange disable">去使用</a>
        </div>
			</cube-scroll>
		</div>
    <div class="mb-15 tc fs-16" v-if="userData.goil_setting != null"><router-link :to="{path:'myOilTankAbout',query:{content:userData.goil_setting.about}}" class="c-blue">什么是获赠油箱？</router-link></div>
	</div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
      userData: [],
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
  created() {
     api.userIndex({
       ver: '5.2.2',
      }).then(response => {
         this.userData = response.data.data.dataList
        // this.$refs.slide.refresh();
      }).catch(error => {
        console.log(error);
      })
  },
  methods:{
    showOil() {
      this.$createDialog({
        type: 'alert',
        showClose: true,
        title: '油量说明',
        content: this.userData.goil_setting.content,
      }).show()
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
.tank-img{
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 40px;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
.btn-orange.disable{
  border: 0!important;
  background: #ccc;
  color: #fff!important;
}
</style>
