<template lang="html">
  <div class="wrap">
    <v-header></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
    		<ul class="qn-li">
          <li>
            <h5 class="active">交易相关问题<i class="icon-xiangxiafanye right"></i></h5>
            <div style="display:block;">
              <font face="Microsoft Yahei" size="2">若充值后未投资直接提现，则将收取0.5%提现</font><span style="font-family: 'Microsoft Yahei'; font-size: small;">手续费</span><font face="Microsoft Yahei" size="2">，且每笔</font><span style="font-family: 'Microsoft Yahei'; font-size: small;">手续费</span><font face="Microsoft Yahei" size="2">不少于2元。</font>
            </div>
          </li>
          <li>
            <h5>交易相关问题<i class="icon-xiangxiafanye right"></i></h5>
            <div>
              <font face="Microsoft Yahei" size="2">若充值后未投资直接提现，则将收取0.5%提现</font><span style="font-family: 'Microsoft Yahei'; font-size: small;">手续费</span><font face="Microsoft Yahei" size="2">，且每笔</font><span style="font-family: 'Microsoft Yahei'; font-size: small;">手续费</span><font face="Microsoft Yahei" size="2">不少于2元。</font>
            </div>
          </li>
    		</ul>
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
.qn-li > li{
  border-bottom: 1px solid #e8e8e8;
}
.qn-li > li:last-child{
  border: 0;
}
.qn-li > li > h5{
  padding: 15px;
  background: #fff;
  font-size: 15px;
  color: #161616
}
.qn-li > li > h5 i.icon-xiangxiafanye{
  position: relative;
  top: -6px;
  display: flex;
  flex: 2;
  line-height: 30px;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.qn-li > li > h5.active i.icon-xiangxiafanye {
  transform: rotate(180deg)!important;
}
.qn-li > li > div{
  display: none;
  padding: 15px;
  font-size: 14px;
  line-height: 20px;
}
</style>