import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Home from '../components/home/home.vue'
import OilNews from '../components/home/oilNews.vue'
import Product from '../components/product/product.vue'
import ProFreeCard from '../components/product/proFreeCard.vue'
import ProOilCard from '../components/product/proOilCard.vue'
import ProHyb from '../components/product/proHyb.vue'
import ProAddOilGh from '../components/product/proAddOilGh.vue'
import couponList from '../components/product/couponList.vue'
import ProFuelCard from '../components/product/proFuelCard.vue'
import ProductDatel from '../components/product/product_detal.vue'
import Order from '../components/order/order.vue'
import PayOrder from '../components/order/payOrder0.vue'
import PayOrderSuc from '../components/order/payOrderSuc.vue'
import PayOrderFail from '../components/order/payOrderFail.vue'
import PayOrderIng from '../components/order/payOrderIng.vue'
import PayOrderConfirm from '../components/order/payOrderConfirm.vue'
import Find from '../components/find/find.vue'
import Acts from '../components/find/acts.vue'
import Excoupon from '../components/find/excoupon.vue'
import Me from '../components/me/me.vue'
import NoteList from '../components/me/set/msgCenter/noteList.vue'
import NoteListDet from '../components/me/set/msgCenter/noteListDet.vue'
import AccountInsurance from '../components/me/accountInsurance.vue'
import BalanceRecharge from '../components/me/balanceRecharge.vue'
import BalanceRechargeDet from '../components/me/balanceRechargeDet.vue'
import QuestionNormal from '../components/me/questionNormal.vue'
import MyUser from '../components/me/myUser/myUser.vue'
import MyBank from '../components/me/myUser/myBank.vue'
import ValidateUser from '../components/me/myUser/validateUser.vue'
import PerfectBankInfo from '../components/me/myUser/perfectBankInfo.vue'
import FindPayPwd from '../components/me/myUser/findPayPwd.vue'
import MyOilCard from '../components/me/myOilCard.vue'
import MyOilCardDetail from '../components/me/myOilCardDetail.vue'
import MyOilTank from '../components/me/myOilTank.vue'
import MyOilTankDet from '../components/me/myOilTankDet.vue'
import MyOilTankAbout from '../components/me/myOilTankAbout.vue'
import MyFuelCard from '../components/me/myFuelCard.vue'
import MyFuelCardDetail from '../components/me/myFuelCardDetail.vue'
import MyLitreRefuelCards from '../components/me/myLitreRefuelCards.vue'
import Quan from '../components/me/quan.vue'
import Quan2 from '../components/me/quan2.vue'
import ShareFriend from '../components/me/shareFriend/shareFriend.vue'
import ShareFriendRule from '../components/me/shareFriend/shareFriendRule.vue'
import ShareFriendEarn from '../components/me/shareFriend/shareFriendEarn.vue'
import ShareFriendList from '../components/me/shareFriend/shareFriendList.vue'
import BindAccount from '../components/me/bindAccount/bindAccount.vue'
import About from '../components/me/about.vue'
import Set from '../components/me/set/set.vue'
import Security from '../components/me/set/security/security.vue'
import SetPaymentPwd from '../components/me/set/security/setPaymentPwd.vue'
import FindPaymentPwd from '../components/me/set/security/findPaymentPwd.vue'
import FindPaymentPwdStep2 from '../components/me/set/security/findPaymentPwdstep2.vue'
import FindPaymentPwdStep3 from '../components/me/set/security/findPaymentPwdstep3.vue'
import UpdatePaymentPwd from '../components/me/set/security/updatePaymentPwd.vue'
import UpdateLoginPwd from '../components/me/set/security/UpdateLoginPwd.vue'
import HelpCenter from '../components/me/set/helpCenter/helpCenter.vue'
import LegalDeclaration from '../components/me/set/legalDeclaration/legalDeclaration.vue'

import Login from '../components/login/loginNew.vue'
import Register from '../components/register/register1.vue'
import oilProce from '../components/oilPrice/oilprice.vue'

import FuelCard from '../components/fuelcard/fuelCard.vue'
import FuelCardBuy from '../components/fuelcard/fuelCardBuy.vue'
import FuelCardBind from '../components/fuelcard/fuelCardBind.vue'
import Car from '../components/car/car.vue'
import CarSuc from '../components/car/carSuc.vue'

Vue.use(Router)

// const scrollBehavior = (to, from, savedPosition) => {
//     if (savedPosition) {
//     return savedPosition
//     } else {
//     return { x: 0, y: 0 }
//     }
// }


const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
      } else {
        const position = {}

        if (to.hash) {
          position.selector = to.hash
          }
        if (to.matched.some(m => m.meta.scrollToTop)) {
          position.x = 0
          position.y = 0
          }
        return position
    }
}

export default new Router({
  // mode: 'history',
  base: '/dist200/',
  linkActiveClass: 'active',
  // scorllBehavior: () => ({
  //   y: 0 // 滚动条的滚动行为，不加这个默认就会记忆原来滚动条的位置
  // }),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      name: '今日油讯',
      path: '/oilNews:id',
      component: OilNews
    },
    {
      name: '光汇云油',
      path: '/home',
      component: Home
    },
    {
      name: '产品',
      path: '/product',
      component: Product,
      meta:{
        keepAlive: true,
        scrollToTop: true
      }
    },
    {
      name: '测试详情页',
      path: '/productDatel',
      component: ProductDatel
    },
    {
      name: '大众储油卡体验卡',
      path: '/proFreeCard',
      component: ProFreeCard
    },
    {
      name: '光汇储油卡',
      path: '/proOilCard/:pro_id/:period',
      component: ProOilCard
    },
    //{
    //  name: '光汇储油卡',
    //  path: '/proOilCardGh/:pro_id',
    //  component: ProOilCardGh
    //},
    {
      name: '汇油宝',
      path: '/proHyb/:pro_id',
      component: ProHyb
    },
    {
      name: '光汇加油卡',
      path: '/proAddOilGh/:pro_id/:period',
      component: ProAddOilGh
    },
    //{
    //  name: '全国加油卡',
    //  path: '/proAddOilQg/:pro_id',
    //  component: ProAddOilQg
    //},
    {
      name: '现金券',
      path: '/couponList',
      component: couponList
    },

    {
      name: '油价走势',
      path: '/oliprice',
      component: oilProce
    },
    {
      name: '全国加油卡',
      path: '/proFuelCard',
      component: ProFuelCard,
      meta:{
        keepAlive: false,
        scrollToTop: true
      }
    },
    {
      name: '我的订单',
      path: '/order',
      component: Order
    },
    {
      name: '支付订单',
      path: '/payOrder',
      component: PayOrder
    },
    {
      name: '支付订单成功',
      path: '/payOrderSuc',
      component: PayOrderSuc
    },
    {
      name: '支付订单失败',
      path: '/payOrderFail',
      component: PayOrderFail
    },
    {
      name: '订单支付中',
      path: '/payOrderIng',
      component: PayOrderIng
    },
    {
      name: '订单支付确认',
      path: '/payOrderConfirm',
      component: PayOrderConfirm
    },
    {
      name: '发现',
      path: '/find',
      component: Find
    },
    {
      name: '活动',
      path: '/acts',
      component: Acts
    },
    {
      name: '兑换码',
      path: '/excoupon',
      component: Excoupon
    },
    {
      name: '登录',
      path: '/login',
      component: Login
    },
    {
      name: '注册',
      path: '/register',
      component: Register
    },
    {
      name: '个人中心',
      path: '/me',
      meta: {
        requireAuth: true
      },
      component: Me
    },
    {
      name: '消息中心',
      path: '/noteList',
      meta: {
        requireAuth: true
      },
      component: NoteList
    },
    {
      name: '消息详情',
      path: '/noteListDet',
      meta: {
        requireAuth: true
      },
      component: NoteListDet
    },
    {
      name: '账户资金安全险保单',
      path: '/accountInsurance',
      meta: {
        requireAuth: true
      },
      component: AccountInsurance
    },
    {
      name: '余额充值',
      path: '/balanceRecharge',
      meta: {
        requireAuth: true
      },
      component: BalanceRecharge
    },
    {
      name: '充值明细',
      path: '/balanceRechargeDet',
      meta: {
        requireAuth: true
      },
      component: BalanceRechargeDet
    },
    {
      name: '常见问题',
      path: '/questionNormal',
      meta: {
        requireAuth: true
      },
      component: QuestionNormal
    },
    {
      name: '我的会员',
      path: '/myUser',
      meta: {
        requireAuth: true
      },
      component: MyUser
    },
    {
      name: '我的银行卡',
      path: '/myBank',
      meta: {
        requireAuth: true
      },
      component: MyBank
    },
    {
      name: '验证当前用户',
      path: '/validateUser',
      meta: {
        requireAuth: true
      },
      component: ValidateUser
    },
    {
      name: '完善银行卡信息',
      path: '/perfectBankInfo',
      meta: {
        requireAuth: true
      },
      component: PerfectBankInfo
    },
    {
      path: '/findPayPwd',
      meta: {
        requireAuth: true
      },
      component: FindPayPwd
    },
    {
      name: '我的储油卡',
      path: '/myOilCard',
      meta: {
        requireAuth: true
      },
      component: MyOilCard
    },
    {
      name: '我的储油卡详情',
      path: '/myOilCardDetail/:order_sn',
      meta: {
        requireAuth: true
      },
      component: MyOilCardDetail
    },
    {
      name: '我的油箱',
      path: '/myOilTank',
      meta: {
        requireAuth: true
      },
      component: MyOilTank
    },
    {
      name: '油箱明细',
      path: '/myOilTankDet',
      meta: {
        requireAuth: true
      },
      component: MyOilTankDet
    },
    {
      name: '什么是获赠油箱',
      path: '/myOilTankAbout',
      meta: {
        requireAuth: true
      },
      component: MyOilTankAbout
    },
    {
      name: '我的加油卡',
      path: '/myFuelCard',
      meta: {
        requireAuth: true
      },
      component: MyFuelCard
    },
    {
      name: '我的加油卡详情',
      path: '/myFuelCardDetail/:order_sn',
      meta: {
        requireAuth: true
      },
      component: MyFuelCardDetail
    },
    {
      name: '定升加油卡余额',
      path: '/myLitreRefuelCards',
      meta: {
        requireAuth: true
      },
      component: MyLitreRefuelCards
    },
    {
      name: '优惠券1',
      path: '/quan',
      meta: {
        requireAuth: true
      },
      component: Quan
    },
    {
      name: '优惠券',
      path: '/quan2',
      meta: {
        requireAuth: true
      },
      component: Quan2
    },
    {
      name: '推荐',
      path: '/shareFriend',
      meta: {
        requireAuth: true
      },
      component: ShareFriend
    },
    {
      name: '奖励规则',
      path: '/shareFriendRule',
      meta: {
        requireAuth: true
      },
      component: ShareFriendRule
    },
    {
      name: '我的加油服务费',
      path: '/shareFriendEarn',
      meta: {
        requireAuth: true
      },
      component: ShareFriendEarn
    },
    {
      name: '查询明细',
      path: '/shareFriendList',
      meta: {
        requireAuth: true
      },
      component: ShareFriendList
    },
    {
      name: '绑定账号',
      path: '/bindAccount',
      meta: {
        requireAuth: true
      },
      component: BindAccount
    },
    {
      name: '关于光汇',
      path: '/about',
      meta: {
        requireAuth: true
      },
      component: About
    },
    {
      name: '设置中心',
      path: '/set',
      meta: {
        requireAuth: true
      },
      component: Set
    },
    {
      name: '安全中心',
      path: '/security',
      meta: {
        requireAuth: true
      },
      component: Security
    },
    {
      name: '设置支付密码',
      path: '/setPaymentPwd',
      meta: {
        requireAuth: true
      },
      component: SetPaymentPwd
    },
    {
      name: '找回支付密码',
      path: '/findPaymentPwd',
      meta: {
        requireAuth: true
      },
      component: FindPaymentPwd
    },
    {
      path: '/findPaymentPwdStep2',
      meta: {
        requireAuth: true
      },
      component: FindPaymentPwdStep2
    },
    {
      path: '/findPaymentPwdStep3',
      meta: {
        requireAuth: true
      },
      component: FindPaymentPwdStep3
    },
    {
      name: '修改交易密码',
      path: '/updatePaymentPwd',
      meta: {
        requireAuth: true
      },
      component: UpdatePaymentPwd
    },
    {
      name: '修改登录密码',
      path: '/updateLoginPwd',
      meta: {
        requireAuth: true
      },
      component: UpdateLoginPwd
    },
    {
      name: '帮助中心',
      path: '/helpCenter',
      meta: {
        requireAuth: true
      },
      component: HelpCenter
    },
    {
      name: '法律声明',
      path: '/legalDeclaration',
      meta: {
        requireAuth: true
      },
      component: LegalDeclaration
    },

    {
      name: '加油卡充值',
      path: '/fuelCard',
      component: FuelCard
    },
    {
      name: '购买',
      path: '/fuelCardBuy',
      component: FuelCardBuy
    },
    {
      name: '绑定加油卡',
      path: '/fuelCardBind',
      component: FuelCardBind
    },
    {
      name: '车主认证',
      path: '/car',
      component: Car
    },
    {
      name: '车主认证成功',
      path: '/carSuc',
      component: CarSuc
    }
  ]
})
