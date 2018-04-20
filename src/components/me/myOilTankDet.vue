<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true" :data="oilData" @pulling-up="onPullingUp">
        <ul class="tank-li" v-if="oilData != null">

          <li v-for="(item,index) in oilData" :key="index">
            <div>
              <span class="left">{{item.goils_name}}</span>
              <span class="right bold fs-18">{{item.goil_trade_nums}}</span>
            </div>
            <p>{{item.goil_createtime}}</p>
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
      oilData: [],
      page: 1,
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
     api.getGoilTran({
        page : this.page,
        limit : 10,
        ver: '5.2.2',
      }).then(response => {
        this.oilData = response.data.data.dataList
        // this.$refs.slide.refresh();
      }).catch(error => {
        console.log(error);
      })
  },
  methods:{

    //上拉加载
    onPullingUp () {
      api.getGoilTran({
        ver: '5.2.2',
        page : ++this.page,
        limit : 10
      }).then(response => {
       let dataListNew = response.data.data.dataList
       if(dataListNew.length>0) {
         this.oilData = this.oilData.concat(dataListNew)
       }else {
         this.$refs.scroll.forceUpdate();
       }
      }).catch(error => {
        console.log(error);
      })
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
.tank-li li{
  padding: 10px 15px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  font-size: 14px;
  color: #666;
}
.tank-li li > div{
  overflow: hidden;
}
.tank-li li > p{
  margin-top: 10px;
  font-size: 12px;
  color: #999;
}
</style>
