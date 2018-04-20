<template lang="html">
	<div class="wrap">
		<v-header title="我的加油服务费"></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="p-15 tc fs-16">
          <p class="c-gray">累计加油服务费(元) <i class="icon-wenhao ml-5" @click="showInfo"></i></p>
          <p class="mt-20 mb-10 fs-30 c-red">{{promotionInfo.total_profit}}</p>
          <router-link to="/shareFriendList" class="c-blue">查看明细 &gt;</router-link>
        </div>
        <ul class="tc fs-14 uc-line">
          <li>
            <div>已结金额(元)</div>
            <span>{{promotionInfo.finish_profit}}</span>
          </li>
          <li>
            <div>待结金额(元)</div>
            <span>{{promotionInfo.waiting_profit}}</span>
          </li>
        </ul>
        <div class="tc c-gray fs-15 lh-20">*加油服务费为实时计算,每月10日转入可用余额<br>(遇节假日顺延)</div>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
import Vheader from '../../header/header.vue'
import api from '../../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
      promotionInfo:[],
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
  },
  created() {
    api.getRewardPageData({
            ver: '5.2.2'
           }).then(response => {
               this.promotionInfo = response.data.data.dataList;
           }).catch(error => {
             console.log(error);
           })
	},
  methods: {
    showInfo() {
      this.$createDialog({
        type: 'alert',
        showClose: true,
        title: '提示',
        content: '累计奖励：待结金额+已结金额；<br>待结金额：加油服务费尚未入账可用余额中；<br>已结金额：加油服务费已入账可用余额中；',
      }).show()
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
.uc-line{
  display: flex;
  margin: 20px 0;
  padding: 15px;
  background-color: #ffebea;
  color: #666;
}
.uc-line > li{
  position: relative;
  flex: 0 0 50%;
  font-size: 16px;
}
.uc-line > li:after{
  content: '';
  position: absolute;
  right: 0;
  top: 3px;
  bottom: 3px;
  border-right: 1px solid #fff;
}
.uc-line > li:last-child:after{
  border-right: 0;
}
.uc-line > li > span{
  display: inline-block;
  margin-top: 10px;
  font-weight: bold;
  font-size: 22px;
}
</style>
