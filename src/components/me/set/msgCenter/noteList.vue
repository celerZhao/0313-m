<template lang="html">
  <div class="wrap">
    <v-header title="消息中心"></v-header>
    <div class="clearMsg" @click="clearNote">清空</div>
    <div class="main" v-if="dataList.length>0" ref="main">
      <cube-scroll ref="scroll" :options="up ? options : {}" :listenScroll="true" :data="dataList" @pulling-up="onPullingUp" @scroll="scrollInit">
    		<div class="note-li" ref="note">
          <router-link v-for="(item,index) in dataList" :key="index" :to="{path:'noteListDet',query:{msgId:item.comment_id,msgContent:item.comment}}" :class="{'c-gray': item.has_read == 'true'}">
            <div>{{item.comment}}</div>
            <p>{{item.time}}</p>
          </router-link>
    		</div>
      </cube-scroll>
    </div>
    <div  class="main none-new" v-if="dataList.length === 0">
      暂无消息
    </div>
  </div>
</template>

<script>
import Vheader from '../../../header/header.vue'
import api from '../../../../fetch/ajax.js'
import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'note',
	data() {
		return {
      dataList:[],
      page: 1,
      up: true,
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false,
        pullUpLoad: {
          threshold: 0,
          txt: {
            more: '加载更多',
            noMore: '没有更多数据了'
          }
        }
			}
		}
	},
	created() {
    this.loaded()
	},
  computed: {
    ...mapGetters([
      'usercenter'
    ])
  },
  methods:{
    scrollInit(pos) {
      // console.log(pos.y);
    },
    //清空用户消息列表
    clearNote() {
      api.clearNote().then(response => {
        if(response.data.status === 10000) {
          this.dataList = response.data.data.dataList
        }
      }).catch(error => {
        console.log(error);
      })
    },
    //上拉加载
    onPullingUp () {
      let mainH = this.$refs.main.offsetHeight
      let noteH = this.$refs.note.offsetHeight

      if(noteH < mainH) {
        this.up = false
        return
      }else {
        this.up = true
      }
      api.userNoteList({
        ver: '5.2.1',
        status : 0,
        page : ++this.page,
        limit : 10
      }).then(response => {
       let dataListNew = response.data.data.dataList
       if(dataListNew.length>0) {
         this.dataList = this.dataList.concat(dataListNew)
       }else {
         this.$refs.scroll.forceUpdate();
       }
      }).catch(error => {
        console.log(error);
      })
    },
    loaded() {
      api.userNoteList({
        ver: '5.2.1',
        status : 0,
        page : this.page,
        limit : 10
      }).then(response => {
        this.dataList = response.data.data.dataList
        console.log(this.dataList);
      }).catch(error => {
        console.log(error);
      })
    }
  },
	mounted() {
		this.$nextTick(function() {
      if(this.dataList.length>0) {
        // this.$refs.scroll.scroll.scrollTo(0,0);
      }
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
.none-new {
  text-align: center;
  font-size: 0.42rem;
  padding-top: 0.5rem!important;
}
.main {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0;
}
.clearMsg{
  position:absolute;
  right:20px;
  top:16px;
  z-index: 10;
  font-size:16px;
  font-weight:bold;
  color:#666;
}
.note-li > a{
  display: block;
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  font-size: 14px;
  line-height: 20px;
  color: #161616;
}
.note-li > a > p{
  margin-top: 5px;
  font-size: 12px;
}
</style>
