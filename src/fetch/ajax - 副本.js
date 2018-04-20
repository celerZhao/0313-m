import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store.js'
Vue.prototype.$ajax = axios
var vm = new Vue()

// axios配置
axios.defaults.timeout = 3000;
axios.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
// axios.defaults.headers['bwoil-token'] = 'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODU2NjIxMDM1MSIsIm1lbWJlcklkIjoiMTAxIiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjMzNDE4ODI1NDV9.PLVixH8tMH_u1G03aiOL89sUNG0tbUBtR7OYH5yQuOKKhOnGrT6JioieRMZ-EKuMPDWE9d8T7EnlYmWOjfdGolK_ZOXBrV9GH8SNmsM0A3zfwYb3yYeofvlmKMMiprbKMeeg_3bEBN6uZmFK-7J-ZHu2ObfggWG3WrR2XK2lnLE';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = '';

//POST传参序列化
axios.interceptors.request.use((config) => {
    Vue.loading();
    // console.log(store.state.com.token);
    // window.sessionStorage.getItem('token')
    if(window.sessionStorage.getItem('token')) {// 判断是否存在token，如果存在的话，则每个http header都加上token
        // config.headers.Authorization = `bwoil-token: ${store.state.com.login}`;
        // config.headers = `{
        //   Content-Type: application/x-www-form-urlencoded;charset=UTF-8,
        //   bwoil-token: ${store.state.com.login}
        // }`;
        // config.headers['bwoil-token'] = `${store.state.com.token}`
        config.headers['bwoil-token'] = `${window.sessionStorage.getItem('token')}`
   }
  if(config.method  === 'post'){
      config.data = qs.stringify(config.data);
  }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
   Vue.loading.end();
   if(res.data.status == '90000') {
     window.sessionStorage.setItem('token','')
     vm.$createToast({
        txt: 'token失效，重新登录',
        type: 'correct'
      }).show();
      // window.location.href='/#/register'
   }else {
      return res;
   }
}, (error) => {
  console.log(error);
  vm.$createToast({
     txt: '获取数据失败',
     type: 'correct',
     time: 1000
   }).show();
  Vue.loading.end();
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response);
            }, err => {
                reject(err);
            })
            .catch((error) => {
              reject(error)
            })
    })
}

export default {
  // 首页测试
  homePage(params) {
    return fetch('/api/user/login', params)
  },
  // 首页接口
  // 首页广告
  homeAd(params) {
    return fetch('/api/content/wap/ads', params)
  },
  // 首页今日油讯
  todayOil(params) {
    return fetch('/api/content/cardList/topnews',params)
  },
  // 活动主页
  activeHome() {
    return fetch('/api/content/wap/activity')
  },
  // 油价趋势
  oilTrend(params) {
    return fetch('/api/content/cardList/oilTrend',params)
  },
  // 油价数据填充
  oilTrendReady() {
    return fetch('/api/content/cardList/trendReady')
  },
  // 首页四宫格
  homeFourPalaces(params) {
    return fetch('/api/config/setting/appIndex',params)
  },
  // 首页商品列表
  homeShopList(params) {
    return fetch('/api/order/cardList/showList',params)
  },
  // 注册获取图片验证码
  getImgCode() {
    return fetch('/api/member/user/getCaptchaImage')
  },
  // 油卡服务
  // 获得加油站状态
  getGasStation(params) {
    return fetch('/api/order/refuel_order/gasstationStatus',params);
  },
  // 验证油枪信息
  checkOilGun(params) {
    return fetch('/api/order/refuel_order/CheckstationGun',params)
  },
  // 获得加油站基本信息
  getBaseOil(params) {
    return fetch('/api/order/refuel_order/getGasStation', params)
  },
  // 获取加油卡信息
  getAddOilCart(params) {
    return fetch('/api/order/refuel_goods/get_auto_refuel_info', params)
  },
  // 小票状态
  getRefuelCard1() {
    return fetch('/zxj/user/getRefuelCard')
  },
  // 取消订单
  cancelOrder(params) {
    return fetch('/zxj/order/cancel',params)
  },
  // 支付成功分享链接
  successShare(params) {
    return fetch('/api/order/user/sharePromotionInfo', params)
  },
  // 重置加油卡选择现金卷
  selectCash(params) {
    return fetch('/zxj/refuel_goods/selectCashcoupon',params)
  },


  // 兑付详情
  cashingDetails(params) {
    return fetch('/zza/cloudStorage/honour',params)
  },
  // 获取油箱抵扣信息
  getGoilInformation(params) {
    return fetch('/zza/order/getGoilamount',params)
  },
  // 文件上传(暂未调通)
  fileUpload() {
    return fetch('/zza1/file/upload')
  },
  // 发送邮件验证码
  sendCode(params) {
    return fetch('/zza2/user/send_email',params)
  },
  // 设置交易密码
  setJyPassword(params) {
    debugger;
    return fetch('/zza2/user/save_transation_pass',params)
  },
  //忘记交易密码第一步:验证手机号码
  forgetJyPasswordOne(params) {
    return fetch('/zza2/user/question_List',params)
  },
  //忘记交易密码第2步:验证身份证号码与银行卡号信息 token
  forgetJyPasswordTwo(params) {
    return fetch('/zza2/user/verify_identity',params)
  },
  //检测交易密码是否正确
  checkTransationPass(params) {
    return fetch('/zza2/user/check_transation_pass',params)
  },
  // 发送短信验证码
  sendDxCode(params) {
    return fetch('/zza2/user/send_sms',params)
  },
  // 个人信息
  PersonalInformation() {
    return fetch('/zza2/user/setting')
  },
  //个人油箱信息，加油卡购买获取油箱抵扣
  personEmailInformation(params) {
    return fetch('/zza2/user/getMemberGoilSetting',params)
  },
  //新增车主认证状态返回的接口
  carOwnerState() {
    return fetch('/zza2/user/isOwner')
  },

  // 发票充值
  invoice() {
    return fetch('/api/order/refuel_tocash/index')
  },


  // 获取加油卡产品列表
  getAddOilList() {
    return fetch('/api/order/refuel_card/get_refuel_product_list')
  },
  // 获取储油列表
  getSaveOilList(params) {
    return fetch('/api/order/cloudStorage/showList',params)
  },

  // 获取所有产品列表
  getAllproductList(params){
    return fetch('/api/order/cardList/newShowList',params)
  },
<<<<<<< .mine

||||||| .r67156


=======
// 获取我的订单列表
getAllorderList(params){
  return fetch('/api/order/order/showList',params)
},
//删除订单
deleteOrder(params){
  return fetch('/api/order/order/delete',params)
},
cancelOrder(params){
  return fetch('/api/order/order/cancel',params)
},
// 获取我的储油卡列表
getMyCloudStorageCard(params){
  return fetch('/api/order/cloudStorage/my_CloudStorageCard',params)
},
>>>>>>> .r67278
  //用户注册获取国家地区的代码
  getCountry() {
    return fetch('/api/config/user/get_country_code_list')
  },

  //用户index
  userIndex(params) {
    return fetch('/api/member/user/userIndex', params)
  },
  // 商品详情
  productDfa(params) {
    return fetch('/api/order/cardList/cardInfo', params)
  },
  // 商品详情里的 现金券
  getCouponsList(params){
    return fetch('/api/order/order/getCouponsList',params)
    //return fetch("http://192.168.204.96:8388/order/getCouponsList",params)

  },
  // 商品详情里的  加息券
  getAnnualizedCoupons(params){
    return fetch('/api/order/order/getAnnualizedCoupons',params)
  },

  // 商品详情里的  油箱抵扣
  getGoilamount(params){
    return fetch('/api/order/order/getGoilamount',params)
  },

  //添加购物车
  addCart(params) {
    return fetch('/api/cart/add', params)
  },
  // 创建订单
  createOrder(params) {
    return fetch('/api/cart/add', params)
  },
  // 用户注册
  userRegist(params) {
    return fetch('/api/user/create', params)
  },
  // 兑付动态或得收益
  profit(params) {
    return fetch('/api/cloudStorage/cashProfit', params)
  },
  // 支付
  pay(params) {
    return fetch('/api/payCenter/comindex', params)
  },


  /*
  * 活动服务
  */
  //获取推荐有奖信息
  getRecomPrizeInfo(params) {
    return fetch('/zy/user/promotionInfo',params)
  },
  //获取我的奖励页面数据
  getRewardPageData(params) {
    return fetch('/zy/user/getPromotionReward',params)
  },
  //获取佣金明细
  getCommisDetail(params) {
    return fetch('/zy/user/getPromotionRewardList',params)
  },
  //获取推荐规则
  getRecomRule(params) {
    return fetch('/zy/user/getPromotionRule',params)
  },
  //获取发现配置
  getOwnerService(params) {
    return fetch('/api/config/setting/getOwnerService',params)
  },
  //获取精彩活动广告
  getWapAds(params) {
    return fetch('/api/content/wap/ads',params)
  },
  //获取精彩活动列表
  getWapActivity(params) {
    return fetch('/api/content/wap/activity',params)
  },
  /*
  *订单服务
  */
  //获取油箱抵扣信息
  getTankDedInfo() {
    return fetch('/zza/order/getGoilamount')
  },
  //我的订单列表
  myOrderList(params) {
    return fetch('/zza/order/orderdetail',params)
  },
  /*
  *商品服务
  */
  //易安保险数据接口
  yianInsurance(params) {
    return fetch('/zy/cardList/insurance',params)
  },
  //获取最小金额(add)
  getMinMoney() {
    return fetch('/zy/order/getMinRechargeMoney')
  },
  //获取常见问题URL(add)
  getNormalUrl() {
    return fetch('/zy/wap/getNormalQuestionUrl')
  },
  /*
  *油卡服务-储油卡
  */
  //我的储油列
  // myOilList(params) {
  //   return fetch('/zy/cloudStorage/showList',params)
  // },
  //获赠油箱接
  receiveTankLink() {
    return fetch('/zy/user/oilLink')
  },
  //获赠油箱新接
  receiveTankNewLink() {
    return fetch('/zy/user/userOils')
  },
  //油箱收支明细token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzUzNzIyMzE1MSIsIm1lbWJlcklkIjoiMTAzNjQwMyIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIxMTY3NjczOTc4fQ.FKwoRLfROHwLiG67fyHMVhTs750qPFVZV2aiDR8BI69whW7_JTpa0oKmqg5KXVzOtyEEHUAOqPF3Ik5RcggqJOg2kKfofjs3EsNI1w3s2y1zs84-_V3EKRx3A9ReDQRlTLFWYpB2FN82es3AWTvEgu7VFP0d3F54Rx5240Hg7NM
  tankPayDetail(params) {
    return fetch('/zy/cloudStorage/goil_tranReco',params)
  },
  //我的交易列表token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzUzNzIyMzE1MSIsIm1lbWJlcklkIjoiMTAzNjQwMyIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIxMTY3NjczOTc4fQ.FKwoRLfROHwLiG67fyHMVhTs750qPFVZV2aiDR8BI69whW7_JTpa0oKmqg5KXVzOtyEEHUAOqPF3Ik5RcggqJOg2kKfofjs3EsNI1w3s2y1zs84-_V3EKRx3A9ReDQRlTLFWYpB2FN82es3AWTvEgu7VFP0d3F54Rx5240Hg7NM
  myTradeList(params) {
    return fetch('/zy/cloudStorage/tranReco',params)
  },
  //新我的交易列表token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzUzNzIyMzE1MSIsIm1lbWJlcklkIjoiMTAzNjQwMyIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIxMTY3NjczOTc4fQ.FKwoRLfROHwLiG67fyHMVhTs750qPFVZV2aiDR8BI69whW7_JTpa0oKmqg5KXVzOtyEEHUAOqPF3Ik5RcggqJOg2kKfofjs3EsNI1w3s2y1zs84-_V3EKRx3A9ReDQRlTLFWYpB2FN82es3AWTvEgu7VFP0d3F54Rx5240Hg7NM
  myTradeListNew(params) {
    return fetch('/zy/cloudStorage/tranRecoNew',params)
  },
  //储油卡操作记录token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzUzNzIyMzE1MSIsIm1lbWJlcklkIjoiMTAzNjQwMyIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIxMTY3NjczOTc4fQ.FKwoRLfROHwLiG67fyHMVhTs750qPFVZV2aiDR8BI69whW7_JTpa0oKmqg5KXVzOtyEEHUAOqPF3Ik5RcggqJOg2kKfofjs3EsNI1w3s2y1zs84-_V3EKRx3A9ReDQRlTLFWYpB2FN82es3AWTvEgu7VFP0d3F54Rx5240Hg7NM
  tankOperReco(params) {
    return fetch('/zy/cloudStorage/operReco',params)
  },
  //加油卡列表token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzUzNzIyMzE1MSIsIm1lbWJlcklkIjoiMTAzNjQwMyIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIxMTY3NjczOTc4fQ.FKwoRLfROHwLiG67fyHMVhTs750qPFVZV2aiDR8BI69whW7_JTpa0oKmqg5KXVzOtyEEHUAOqPF3Ik5RcggqJOg2kKfofjs3EsNI1w3s2y1zs84-_V3EKRx3A9ReDQRlTLFWYpB2FN82es3AWTvEgu7VFP0d3F54Rx5240Hg7NM
  refuCardList() {
    return fetch('/zy/cloudStorage/refuelCardList_new')
  },
  //批量兑付列表token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzUzNzIyMzE1MSIsIm1lbWJlcklkIjoiMTAzNjQwMyIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIxMTY3NjczOTc4fQ.FKwoRLfROHwLiG67fyHMVhTs750qPFVZV2aiDR8BI69whW7_JTpa0oKmqg5KXVzOtyEEHUAOqPF3Ik5RcggqJOg2kKfofjs3EsNI1w3s2y1zs84-_V3EKRx3A9ReDQRlTLFWYpB2FN82es3AWTvEgu7VFP0d3F54Rx5240Hg7NM
  betchHonour(params) {
    return fetch('/zy/cloudStorage/honourlist',params)
  },
  //储油记录详情token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMzUzNzIyMzE1MSIsIm1lbWJlcklkIjoiMTAzNjQwMyIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIxMTY3NjczOTc4fQ.FKwoRLfROHwLiG67fyHMVhTs750qPFVZV2aiDR8BI69whW7_JTpa0oKmqg5KXVzOtyEEHUAOqPF3Ik5RcggqJOg2kKfofjs3EsNI1w3s2y1zs84-_V3EKRx3A9ReDQRlTLFWYpB2FN82es3AWTvEgu7VFP0d3F54Rx5240Hg7NM
  tankCardRecoDetail(params) {
    return fetch('/zy/cloudStorage/details',params)
  },
  //新增获取批量兑付总金额接
  betchHonourNewTotal(params) {
    return fetch('/zy/cloudStorage/honourlistTotalMoney',params)
  },
  //储油卡兑付计划token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkyMDAyNzM3NyIsIm1lbWJlcklkIjoiMjA5IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjExODkzOTAwOTF9.PrNhCCLYVzRwVfrEft7GEuIZs2raMEKfRjVu8Fs4MawT9RHUhhjY3qiHRaO1tDyq9sWJ81me_2LCAd-jlQ3sOooDH-MCO4MKtXxY9_2-LhWuGm1WowItdAkZ8LxFuVaXE-nt4bzN1Q8MaQPbwYRTuaqTnS8BXeOaGjoGaCKzWb4
  tankCardPlan(params) {
    return fetch('/zy/user/payment_plan',params)
  },
  //获取兑付规则token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkyMDAyNzM3NyIsIm1lbWJlcklkIjoiMjA5IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjExODkzOTAwOTF9.PrNhCCLYVzRwVfrEft7GEuIZs2raMEKfRjVu8Fs4MawT9RHUhhjY3qiHRaO1tDyq9sWJ81me_2LCAd-jlQ3sOooDH-MCO4MKtXxY9_2-LhWuGm1WowItdAkZ8LxFuVaXE-nt4bzN1Q8MaQPbwYRTuaqTnS8BXeOaGjoGaCKzWb4
  getHonourRule(params) {
    return fetch('/zy/cloudStorage/honurInfo',params)
  },
  //新增安全险保单界面接口token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkyMDAyNzM3NyIsIm1lbWJlcklkIjoiMjA5IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjExODkzOTAwOTF9.PrNhCCLYVzRwVfrEft7GEuIZs2raMEKfRjVu8Fs4MawT9RHUhhjY3qiHRaO1tDyq9sWJ81me_2LCAd-jlQ3sOooDH-MCO4MKtXxY9_2-LhWuGm1WowItdAkZ8LxFuVaXE-nt4bzN1Q8MaQPbwYRTuaqTnS8BXeOaGjoGaCKzWb4
  accountInsuranceNew() {
    return fetch('/wzf/user/accountInsurance')
  },
  /*
  *会员中心
  */
  userLogin(params) {
    return fetch('/api/member/user/login',params)
    //return fetch('/member/user/login',params) // 周治安环境
  },
  //忘记密码token:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTEwMzA5NDR9.ncwlw8X5rIWZZIh-Tv88CVXCGXXKZF_jxiVrt54grActh1bMOrTopteW88hCBv2kyPmd5GSiHmffuARUjpH58RedPEDuP4FTo_Fo8vOeXx-5yUWWcMz58BbBvgjM1sF4VttISQj5kH6nohJ6Xi7zKNFtIeT_l8ZGtYfsjFT07wc
  forgetPwd(params) {
    return fetch('/wzf/user/check_account',params)
  },
  //用户注册检测手机号
  userCheckMobile(params) {
    return fetch('/api/member/user/check_mobile',params)
  },
  //密保问题列表:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTEwMzA5NDR9.ncwlw8X5rIWZZIh-Tv88CVXCGXXKZF_jxiVrt54grActh1bMOrTopteW88hCBv2kyPmd5GSiHmffuARUjpH58RedPEDuP4FTo_Fo8vOeXx-5yUWWcMz58BbBvgjM1sF4VttISQj5kH6nohJ6Xi7zKNFtIeT_l8ZGtYfsjFT07wc
  setQuestionList() {
    return fetch('/wzf/user/set_question')
  },
  //设置密保问题:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTEwMzA5NDR9.ncwlw8X5rIWZZIh-Tv88CVXCGXXKZF_jxiVrt54grActh1bMOrTopteW88hCBv2kyPmd5GSiHmffuARUjpH58RedPEDuP4FTo_Fo8vOeXx-5yUWWcMz58BbBvgjM1sF4VttISQj5kH6nohJ6Xi7zKNFtIeT_l8ZGtYfsjFT07wc
  setSaveQuestion() {
    return fetch('/wzf/user/save_set')
  },
  //重置登录密码:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTEwMzA5NDR9.ncwlw8X5rIWZZIh-Tv88CVXCGXXKZF_jxiVrt54grActh1bMOrTopteW88hCBv2kyPmd5GSiHmffuARUjpH58RedPEDuP4FTo_Fo8vOeXx-5yUWWcMz58BbBvgjM1sF4VttISQj5kH6nohJ6Xi7zKNFtIeT_l8ZGtYfsjFT07wc
  reLoginPwd(params) {
    return fetch('/wzf/user/member_security',params)
  },
  //重置密码第二步:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTEwMzA5NDR9.ncwlw8X5rIWZZIh-Tv88CVXCGXXKZF_jxiVrt54grActh1bMOrTopteW88hCBv2kyPmd5GSiHmffuARUjpH58RedPEDuP4FTo_Fo8vOeXx-5yUWWcMz58BbBvgjM1sF4VttISQj5kH6nohJ6Xi7zKNFtIeT_l8ZGtYfsjFT07wc
  reLoginPwdSec(params) {
    return fetch('/wzf/user/resetpwd_code',params)
  },
  //重置密码第三步:eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTEwMzA5NDR9.ncwlw8X5rIWZZIh-Tv88CVXCGXXKZF_jxiVrt54grActh1bMOrTopteW88hCBv2kyPmd5GSiHmffuARUjpH58RedPEDuP4FTo_Fo8vOeXx-5yUWWcMz58BbBvgjM1sF4VttISQj5kH6nohJ6Xi7zKNFtIeT_l8ZGtYfsjFT07wc
  reLoginPwdSec(params) {
    return fetch('/wzf/user/reset_pwd',params)
  },
  //单独验证密保问题接口eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTM4NzAyNjh9.ELZ1qgwxLCV68vkPONGm3eJNzbDp3UTPLVgyUCfXShClJ1WmnXqVcouEPqxzaT-VgbobxS3Nwnh88vCXsINAgoO21HmKxWXUOAy3RHnRK3Lj3TUy_6Sx94Fx5yoYmO-yJNyh-WRZVPsMe9GxwMZNe_Ri-0QcxwKirlHqtARJtvY
  checkSetQuestion(params) {
    return fetch('/wzf/user/check_question',params)
  },
  //用户设置头像eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTM4NzAyNjh9.ELZ1qgwxLCV68vkPONGm3eJNzbDp3UTPLVgyUCfXShClJ1WmnXqVcouEPqxzaT-VgbobxS3Nwnh88vCXsINAgoO21HmKxWXUOAy3RHnRK3Lj3TUy_6Sx94Fx5yoYmO-yJNyh-WRZVPsMe9GxwMZNe_Ri-0QcxwKirlHqtARJtvY
  userSetAvatar(params) {
    return fetch('/wzf/user/upload_avatar',params)
  },
  //我的积分eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxNTkwMDAwMDAwMCIsIm1lbWJlcklkIjoiMjAzOTc3IiwibG9naW5UeXBlIjoiYWEiLCJleHBpcmUiOjE1MjEyNTM4NzAyNjh9.ELZ1qgwxLCV68vkPONGm3eJNzbDp3UTPLVgyUCfXShClJ1WmnXqVcouEPqxzaT-VgbobxS3Nwnh88vCXsINAgoO21HmKxWXUOAy3RHnRK3Lj3TUy_6Sx94Fx5yoYmO-yJNyh-WRZVPsMe9GxwMZNe_Ri-0QcxwKirlHqtARJtvY
  myIntegralMsg() {
    return fetch('/wzf/user/integral_message')
  },
  //用户消息列表
  userNoteList(params) {
    return fetch('/api/member/user/noteList',params)
  },
  //清空消息
  clearNote(params) {
    return fetch('/api/member/user/clearNotice',params)
  },
  //消息详情
  noteDetail(params) {
    return fetch('/api/member/user/notice_Details',params)
  },
  //提现记录
  presentRecord() {
    return fetch('/wzf/user/present_record')
  },
  //获取加油卡接口
  getTankCardNo() {
    return fetch('/wzf/user/getCardNo')
  },
  //中石油中石化加油卡更新绑定卡
  updateOilCardNo() {
    return fetch('/wzf/user/updateCardNo')
  }


}
