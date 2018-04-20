<template lang="html">
  <div class="wrap">
    <v-header title="消息详情"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
    		<div class="p-15 bg-white fs-14 lh-20">
          {{ $route.query.msgContent }}
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Vheader from '../../../header/header.vue'
import api from '../../../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			},
      msgId:''
		}
	},
	created() {
    // 根据msg 的id，获取msg详情
    this.msgId = this.$route.query.msgId;
    //消息详情
    // api.noteDetail({
    //   comment_id: this.msgId,
    //   type: '1',
    //   ver: '5.2.2'
    // }).then(response => {
    //   console.log(response);
    // }).catch(error => {
    //   console.log(error);
    // })
	},
	mounted() {
		this.$nextTick(function() {
			// this.$refs.scroll.scroll.scrollTo(0,0);
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
</style>
