import Vue from 'vue'
import Vuex from 'vuex'

// 公共数据管理
import com from './modules/common.js'
// 首页
import home from './modules/home.js'
// 产品详情页
import cardpageinfo from './modules/cardPageInfo.js'
// 会员中心
import usercenter from './modules/usercenter.js'



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    com,
    home,
    cardpageinfo,
    usercenter
  }
})
