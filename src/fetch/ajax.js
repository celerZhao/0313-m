import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store.js'
Vue.prototype.$ajax = axios
var vm = new Vue()

// axios配置
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//POST传参序列化
axios.interceptors.request.use((config) => {
    // Vue.loading();
    if(window.sessionStorage.getItem('token')) {// 判断是否存在token，如果存在的话，则每个http header都加上token
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
   //Vue.loading.end();
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
  // 保存交易密码
  setJyPassword(params) {
    return fetch('/api/member/user/save_transation_pass',params)
  },
  // 修改交易密码
  updatePassword(params) {
    return fetch('/api/member/user/update_transation_pass',params)
  },
  //找回支付密码第一步:验证手机号码
  forgetJyPasswordOne(params) {
    return fetch('/api/member/user/new_verify',params)
  },
  //忘记交易密码第2步:验证身份证号码与银行卡号信息 token
  forgetJyPasswordTwo(params) {
    return fetch('/api/member/user/verify_identity',params)
  },
  //检测交易密码是否正确
  checkTransationPass(params) {
    return fetch('/api/member/user/check_transation_pass',params)
  },
  // 发送短信验证码
  sendDxCode(params) {
    return fetch('/api/member/user/send_sms',params)
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
//获取兑付计划
getPaymentPlan(params){
  return fetch('/api/order/user/payment_plan',params)
},
//获取交易记录
getOperReco(params){
  return fetch('/api/order/cloudStorage/operReco',params)
},
//油价走势图
getOilTrend(params){
  return fetch('/api/content/cardList/oilTrend',params)
},
//获取用户优惠券
getCashCouponList(params){
  return fetch('/api/order/user/cashCouponList',params)
},
//获取加油卡列表
getRefuelCardList(params){
  return fetch('/api/order/cloudStorage/refuelCardList_new',params)
},
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
    return fetch('/api/order/cart/add', params)
  },
  // 创建订单
  createOrder(params) {
    return fetch('/api/order/order/create', params)
  },
  // 用户注册
  userRegist(params) {
    return fetch('/api/member/user/create', params)
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
    return fetch('/api/order/user/promotionInfo',params)
  },
  //获取我的奖励页面数据
  getRewardPageData(params) {
    return fetch('/api/order/user/getPromotionReward',params)
  },
  //获取佣金明细
  getCommisDetail(params) {
    return fetch('/api/order/user/getPromotionRewardList',params)
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
  //获取现金券列表
  getCashCoupon(params) {
    return fetch('/api/order/user/cashCouponList',params)
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
  //油箱收支明细
  tankPayDetail(params) {
    return fetch('/zy/cloudStorage/goil_tranReco',params)
  },
  //我的交易列表
  myTradeList(params) {
    return fetch('/zy/cloudStorage/tranReco',params)
  },
  //新我的交易列表
  myTradeListNew(params) {
    return fetch('/zy/cloudStorage/tranRecoNew',params)
  },
  //储油卡操作记录
  tankOperReco(params) {
    return fetch('/zy/cloudStorage/operReco',params)
  },
  //加油卡列表
  refuCardList() {
    return fetch('/zy/cloudStorage/refuelCardList_new')
  },
  //批量兑付列表
  betchHonour(params) {
    return fetch('/zy/cloudStorage/honourlist',params)
  },
  //储油记录详情
  tankCardRecoDetail(params) {
    return fetch('/zy/cloudStorage/details',params)
  },
  //新增获取批量兑付总金额接
  betchHonourNewTotal(params) {
    return fetch('/zy/cloudStorage/honourlistTotalMoney',params)
  },
  //储油卡兑付计划
  tankCardPlan(params) {
    return fetch('/zy/user/payment_plan',params)
  },
  //获取兑付规则
  getHonourRule(params) {
    return fetch('/zy/cloudStorage/honurInfo',params)
  },
  //新增安全险保单界面接口
  accountInsuranceNew() {
    return fetch('/wzf/user/accountInsurance')
  },
  /*
  *会员中心
  */
  userLogin(params) {
    return fetch('/api/member/user/login',params)
  },
  //忘记密码
  forgetPwd(params) {
    return fetch('/wzf/user/check_account',params)
  },
  //用户注册检测手机号
  userCheckMobile(params) {
    return fetch('/api/member/user/check_mobile',params)
  },
  //密保问题列表:
  setQuestionList() {
    return fetch('/wzf/user/set_question')
  },
  //设置密保问题:
  setSaveQuestion() {
    return fetch('/wzf/user/save_set')
  },
  //重置登录密码:
  reLoginPwd(params) {
    return fetch('/wzf/user/member_security',params)
  },
  //重置密码第二步:
  reLoginPwdSec(params) {
    return fetch('/wzf/user/resetpwd_code',params)
  },
  //重置密码第三步:
  reLoginPwdSec(params) {
    return fetch('/wzf/user/reset_pwd',params)
  },
  //单独验证密保问题接口
  checkSetQuestion(params) {
    return fetch('/wzf/user/check_question',params)
  },

  //修改登录密码
  memberSecurity(params) {
    return fetch('/api/member/user/member_security',params)
  },
  //用户设置头像
  userSetAvatar(params) {
    return fetch('/wzf/user/upload_avatar',params)
  },
  //我的积分
  myIntegralMsg() {
    return fetch('/wzf/user/integral_message')
  },
  //用户消息列表
  userNoteList(params) {
    return fetch('/api/member/user/noteList',params)
  },
  //清空消息
  clearNote() {
    return fetch('/api/member/user/clearNotice')
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
  },
  //关于光汇
  getAppSettingData(params) {
    return fetch('/api/config/setting/getAppSettingData',params)
  },
  //获取油箱明细
  getGoilTran(params) {
    return fetch('/api/order/cloudStorage/goil_tranReco',params)
  }

}
