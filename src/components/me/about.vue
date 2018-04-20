<template lang="html">
  <div class="wrap">
    <v-header title="关于光汇"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
    		<div class="p-tag">
          <ul class="p-tag-li">
            <li v-for="(item, index) in items" :class="{active: item.isAction}" @click="toggleTab(item.name, index)">
              {{item.text}}
            </li>
          </ul>
        </div>
        <Aboutme :is="currentView"></Aboutme>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Vheader from '../header/header.vue'
import Aboutme from './aboutTab/aboutMe.vue'
import Oilvalue from './aboutTab/oilValue.vue'
import Howgas from './aboutTab/howGas.vue'
export default {
	data() {
		return {
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			},
      currentView: 'aboutMe',
      items: [
        {
          text: '关于光汇',
          name: 'aboutMe',
          isAction: true
        },
        {
          text: '储油价值',
          name: 'oilValue',
          isAction: false
        },
        {
          text: '如何加油',
          name: 'howGas',
          isAction: false
        }
      ]
		}
	},
  components: {
    'v-header': Vheader,
    'aboutMe': Aboutme,
    'oilValue': Oilvalue,
    'howGas': Howgas
  },
  methods: {
    toggleTab(textContent, index) {
      this.items.map(function(v, i) {
        i == index ? v.isAction = true : v.isAction = false
      })
      this.currentView = textContent;
    }
  },
	mounted() {
		this.$nextTick(function() {
			this.$refs.scroll.scroll.scrollTo(0,0);
		})
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
.p-tag{
  position: relative;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  overflow: hidden;
}
.p-tag-li{
  display: flex;
  width: 90%;
  margin: 8px auto;
  border: 2px solid #fd9a27;
  border-radius: 30px;
  overflow: hidden;
  text-align: center;
  font-size: 16px;
  color: #666;
}
.p-tag-li > li{
  flex: 0 0 33.4%;
  padding: 8px 0;
}
.p-tag-li > li.active{
  background-color: #fd9a27;
  color: #fff;
}
</style>
