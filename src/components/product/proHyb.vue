<template lang="html">

  <div class="wrap">
    <v-header :title="title" :showBlack="showBlack"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div ref="scrollMain">
            <div class="row pro-detail-top" ref="proHeader">
              <div class="tc">
                <div class="fs-26 mt-20"><span class="relative">{{yearPercent}}<span class="relative inline-block fs-16">{{yearPercentUnit}}<div
                  class="pd-tips-kjx"><i></i><span><!--最高加息8.88%-->{{yearPercentTips}}</span></div></span></span></div>
                <div class="fs-12 mt-5">预期年化收益率</div>
              </div>

              <ul class="tc">
                <li>{{desTitle}}</li>
                <li>{{desAmount}}</li>
              </ul>
            </div>

            <ul class="row form form-li">
              <li class="pt-5">
                <p class="mb-10 tr c-gray fs-10">{{dataObj.buyTipTpl}}</p>
                <label>购买金额</label>

                <div class="form-control">
                  <div class="relative tc buy-minus-add">
                    <div class="buy-minus absolute" @click="cardMinus" >-</div>
                    <div class="buy-add absolute" @click="cardAdd">+</div>
                    <input type="tel" class="tc"  v-model="totalAmount" v-on:input="formatInput">
                  </div>
                </div>
              </li>
              <li class="pt-5 pb-5 pl-15 pr-15 fs-10 c-gray tr">
                {{expectedReturnTpl }}<span class="c-red">{{allshouyi}}</span>元
                <span v-if="has_addCoupons">{{expectedRateReturnTpl}}<span  class="c-red">{{jiaxishouyi}}</span>元</span> <i class="icon-wenhao fs-12"></i>
              </li>
            </ul>
            <ul class="row form form-li">
              <li @click="showCoupns">
                <label>使用现金券</label>

                <div class="form-control"><span class="c-red" v-if="dataObj.coupons!= null"><!--30元现金红包-->{{couponTipc}}</span></div>
                <i class="icon-right"></i>
              </li>
              <li v-if="has_addCoupons">
                <label>使用加息券</label>

                <div class="form-control"><span class="c-red"><!--1个月加息1%-->{{jiaxiRate}}%</span></div>
                <i class="icon-right"></i>
              </li>
            </ul>
            <ul class="row form form-li">
              <li>
                <label>获赠油箱抵扣 <span class="fs-10"><span class="icon-tanhao c-gray fs-14"></span> 当前订单可用<span
                  class="c-red"><!--2.85-->{{goil_litre_use}}升</span>，抵<span class="c-red"><!--18.18-->{{goil_amount_use}}元</span></span></label>

                <div class="form-control">
                  <span class="mr-10">
                    <i class="list-switch s-close" :class="{'s-open':checkboxopen}" @click="clickCheckbox">
                      <div class="dot"></div>
                      <input type="checkbox" class="hide">
                    </i>
                  </span>
                </div>
              </li>
              <li class="pt-5 pb-5 pl-15 pr-15 fs-10 c-grey">获赠油箱现有<!--3-->{{goil_litre_all}}升油,价值<span class="c-red"><!--18.81-->{{goil_money_all}}元</span></li>
            </ul>
        </div>
            <div class="pro-detail" style="display:none;"  ref="proDetail">
              <ul class="row bottom-line pro-detail-tag">
              <!--  <li class="active"><span>产品详情</span></li>
                <li><span>使用案例</span></li>
                <li><span>关于光汇</span></li>-->
                <li v-for="(item, index) in tabList" :class="{active: item.isAction}" @click="toggleTab(item.name, index)">
                  <span>{{item.text}}</span>
                </li>
              </ul>
              <!-- 点击返回顶部 s-->
              <div class="click-top" href="#" style="display: block;" @click="backTop">
                <div class="click-show-more iconfont"><span>点击返回顶部</span></div>
                <i class="iconfont icon-chevron-copy fs-14"></i>
              </div>
              <!-- 点击返回顶部 e-->

              <div class="pro-detail-cons">
                <!-- 产品详情 s -->
                <ul v-show="tabList[0].isAction">
                  <!-- 收益说明 s -->
                  <li class="row">
                    <h5 class="pdc-title">收益说明</h5>
                    <ol class="pro-detail-rules">
                      <li>1、保底年收益12%，同时还可以享受油价上涨35%的双重收益</li>
                      <li>2、油品单价参考当前发改委公布的深圳市V汽油92#价格</li>
                      <li>3、该产品适合尝试平台产品的新客，每100升一个单位，最多可购买500升</li>
                    </ol>
                  </li>
                  <!-- 收益说明 e -->

                  <!-- 兑付说明 s -->
                  <li class="row">
                    <h5 class="pdc-title">兑付说明</h5>

                    <div class="fs-11 bg-white margin-bottom">

                      <table class="pro-detail-tb" width="100%" cellpadding="0" cellspacing="0">
                        <thead>
                        <tr>
                          <th>兑付日</th>
                          <th>兑付数量</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>2018-02-12</td>
                          <td>500.00升</td>
                        </tr>
                        <tr>
                          <td>2018-02-12</td>
                          <td>500.00升</td>
                        </tr>
                        </tbody>
                      </table>

                      <div>
                        <div class="duifu-box mt-15 mb-15">
                          <div class="node stage1"></div>
                          <div class="node stage2"></div>
                          <div class="node stage3"></div>
                        </div>
                        <!--
                            honourFirst:{title:'',tm:''},     // 购买成功
                            honourMidle:{{title:'',tm:''},     // 到期开放兑付
                            honourend:{{title:'',tm:''},       // 后续可随时兑付
                        -->
                        <div class="tc pb-10 fs-14 dis_flex">
                          <div class="tl flext_1">
                            <div><!--2017/9/25-->{{honourFirst.tm}}</div>
                            <div><!--购买成功-->{{honourFirst.title}}</div>
                          </div>
                          <div class="tc flext_1">
                            <div>{{honourMidle.tm}}</div>
                            <div>{{honourMidle.title}}</div>
                          </div>
                          <div class="tr flext_1">
                            <div><!--2017/12/24-->{{honourend.tm}}</div>
                            <div><!--后续可、、、-->{{honourend.title}}</div>
                          </div>
                        </div>
                        <div class="top-line c-darkgray mt-10 pt-10 pb-10 fs-10">稳健的固定收益产品</div>
                      </div>
                    </div>

                    <div class="mt-10 fs-12 c-darkgray">注：此为每张卡可兑付数量说明</div>
                  </li>
                  <!-- 兑付说明 e -->

                  <!-- 交易规则 s -->
                  <li class="row">
                    <h5 class="pdc-title">交易规则</h5>
                    <ol class="pro-detail-rules">
                      <li>1、交易规则交易规则交易规则交易规则交易规则</li>
                      <li>2、交易规则交易规则交交易规则交易规则交易规则交易规则交易规则易规则</li>
                    </ol>
                  </li>
                  <!-- 交易规则 e -->

                  <!-- 资金安全 s -->
                  <li class="row">
                    <!--第一种保险状态 start-->
                    <div class="mb-15">
                      <h5 class="pdc-title">资金安全</h5>

                      <div class="pdc-title-span">
                        <span class="border-item">工商银行托管</span>
                        <span class="border-item">易安保险保障</span>
                      </div>
                      <div class="fs-12 c-darkgray">
                        <p class="mt-10 mb-10 c-orange">工商银行资金存管,易安保险保障账户资金安全</p>

                        <p class="mb-10 c-black">您只要再购买价值<span class="c-red">3688.99元</span>的光汇云油产品，光汇云油将为您购买保额为50000元，由易安保险承保的光汇云油账户资金安全险。
                        </p>

                        <p>
                          光汇云油平台账户资金安全险，是易安保险专门为光汇云油平台打造的专属产品，为您的账户资金安全提供全面保障。目前光汇云油平台为所有储油资产金额超过10000元的用户购买额度合理的账户资金安全险，按月根据资产余额情况确定是否购买或者购买更高额度的保险，安全险最早于在您储油资产达到1万元后的第3个工作日零时生效。保险生效后，您可以在我的账户页面查看到您的保单，或者在易安保险官网/热线电话/微信公众号凭保单、姓名、身份证号核实保单真伪。您可以在我的账户页面查看到您的保单，或者在易安保险官网/热线电话/微信公众号凭保单、姓名、身份证号核实保单真伪。</p>
                      </div>
                    </div>
                    <!--第一种保险状态 end-->

                    <!--第2种保险状态 start-->
                    <div class="mb-15">
                      <h5 class="pdc-title">资金安全</h5>

                      <div class="pdc-title-span">
                        <span class="border-item">工商银行托管</span>
                        <span class="border-item">易安保险保障</span>
                      </div>
                      <div class="fs-12 c-darkgray">
                        <p class="mt-10 mb-10 c-orange">如您成功支付当前订单，光汇云油将为您购买保额为50000元，由易安保险承保的光汇云油账户资金安全险。</p>

                        <div>
                          <label class="c-black fs-12">
                            <input type="checkbox" class="hide" checked="" disabled="">
                            本人已阅读并同意<a class="inline-block c-blue" href="#">《投保须知》</a>和<a class="inline-block c-blue"
                            href="#"> 《保险条款》</a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <!--第2种保险状态 end-->

                    <!--第3种保险状态 start-->
                    <div class="mb-15">
                      <h5 class="pdc-title">资金安全</h5>

                      <div class="pdc-title-span">
                        <span class="border-item">工商银行托管</span>
                        <span class="border-item">易安保险保障</span>
                      </div>
                      <div class="fs-12 c-darkgray">
                        <p class="mt-10 mb-10 c-orange">3个工作日内，您的账户资金安全险将生效（保费由本平台支付）。</p>

                        <div>
                          <label class="c-black fs-12">
                            <input type="checkbox" class="hide" checked="" disabled="">
                            本人已阅读并同意<a class="inline-block c-blue" href="#">《投保须知》</a>和<a class="inline-block c-blue"
                            href="#"> 《保险条款》</a>
                          </label>
                        </div>
                      </div>
                    </div>
                    <!--第3种保险状态 end-->

                    <!--第4种保险状态 start-->
                    <div class="mb-15">
                      <h5 class="pdc-title">资金安全</h5>

                      <div class="pdc-title-span">
                        <span class="border-item">工商银行托管</span>
                        <span class="border-item">易安保险保障</span>
                      </div>
                      <div class="fs-12 c-darkgray">
                        <p class="mt-10 mb-10 c-orange">恭喜您，光汇云油已为您购买保额为50000元，由易安保险承保的光汇云油账户资金安全险，为您的资产保驾护航。</p>

                        <div class="c-black fs-12">
                          相关保险条款请点击查看<a class="inline-block c-blue" href="#">《投保须知》</a>和<a class="inline-block c-blue"
                          href="#"> 《保险条款》</a>
                        </div>
                      </div>
                    </div>
                    <!--第4种保险状态 end-->
                  </li>
                  <!-- 资金安全 e -->
                </ul>
                <!-- 产品详情 e -->

                <!-- 储油卡使用案例 s -->
                <div style="display: block" v-show="tabList[1].isAction">
                  <div class="row mb-10 p-15 bg-white">
                    <ol class="pro-detail-rules">
                      <li>1、储油卡使用案例</li>
                      <li>2、储油卡使用案例</li>
                      <li>3、储油卡使用案例</li>
                    </ol>
                  </div>
                </div>
                <!-- 储油卡使用案例 e -->

                <!-- 关于光汇 s -->
                <div style="display: block" v-show="tabList[2].isAction">
                  <div class="row mb-10 p-15 bg-white">
                    <img src="./img/img-about.jpg">
                    <ol class="pro-detail-rules">
                      <li>1、关于光汇</li>
                      <li>2、关于光汇</li>
                      <li>3、关于光汇</li>
                    </ol>
                  </div>
                </div>
                <!-- 关于光汇 e -->
              </div>
            </div>

            <p class="tips"><img class="" src="./img/icon02-dun.png"><!--人保，易安保险与工商银行保障您的资金安全-->{{insurance_lang}}</p>

            <!-- 点击显示更多 s -->
            <div class="click-show" style="display: block;" @click="showMore" ref="showMore">
              <i class="iconfont icon-chevron-copy fs-14"></i>

              <div class="click-show-more"><span>点击显示更多</span></div>
            </div>
            <!-- 点击显示更多 e -->


      </cube-scroll>
    </div>
    <!-- 底部固定按钮 -->
    <div class="fixed-bottom">
      <router-link to="/home" class="back-home"><i class="icon-home1"></i>首页</router-link>
      <!-- 如果禁止点击，需要给a加class：disable -->
      <a  class="btn btn-orange" @click="buyNow">立即购买</a>
      <!-- <a href="javasctipt:;">立即投资</a> -->
      <div class="fs-16">实付: <span class="c-red">{{payMoney}} 元</span></div>
      <div class="mt-5 fs-12 c-red">优惠：{{saveMoney}} 元</div>
    </div>

  </div>
</template>

<script>
  import Vheader from '../header/header.vue'
  import api from '../../fetch/ajax.js'
  import {mapState,mapActions,mapGetters} from 'vuex'
  export default {
    data() {
    return {
      title:'',
      showBlack:true,
      options: {
        observeDOM: true,
        click: true,
        probeType: 3,
        scrollbar: false
      },
      tabList:[
        {text:'产品详情',name:'', isAction: true},
        {text:'使用案例',name:'', isAction: false},
        {text:'关于光汇',name:'', isAction: false}
      ],
      checkboxopen:false,
      pro_id: '',
      period: '', // 期数
      goods_id:'', // goods_id

      coupons_id:[], // 现金券 id 列表

      riseFeeTips:'',
      riskTip:'',
      insurance_lang:'',
      buyTipTpl:'',
      buyMoneyTipTpl:'',
      couponTipc:'',

      desTitle:'',
      desAmount:'',

      expectedReturnTpl:'',
      expectedRateReturnTpl:'',

      hasLogin:false,

      dataObj:[],
//      invest:1,     // 期数: n


      yearPercentUnit:'%',  //百分比
      yearPercentTips:'', //
      type_bn:'fixed_amount_copy',

      totalAmount:0 ,// 投资总额: a
      yearPercent:'0', // 预期年化: b

      jiaxiRate:0, // 加息比例: c
      cashQuan:0, // 现金券 : d
      oilTank:0,  //油箱抵扣: e

      payMoney:0,  // 实付金额 :f
      saveMoney:0,      // 优惠金额
      pay_leftByRule:0,      // 现金券抵扣规则剩余金额

      inputTimeout: 1000, // 输入延迟 1s钟 响应数字格式化
      timeoutObj:{},

      buyOilAmount:0,   // 购买油量
      giftOilAmount:0,  // 赠送油量
      totalOilAmount:0, // 总油量
      totalWorth:0,     // 总价值

      allshouyi:0, // 预期收益 ：X
      jiaxishouyi:0, // 加息收益:Y
      yearGetRate:0,  // 折合年化：Z

      has_addCoupons: false , // 是否有加息券
      has_coupons: false , // 是否有现金券
      has_oilTank: false , // 是否有油箱

      cardNum:1 ,// 油卡数量
      cardAmount:0 ,//油卡面额

      coupons:[],       // 现金券列表

      describe:'',      // 油箱抵扣描述
      goil_amount_use:0,    // 油箱抵扣金额
      goil_litre_use:0,     // 油箱抵扣升数

      goil_give :0,     // 账户油箱总升数
      goil_litre_all:'',    // 获赠油箱总升数
      goil_money_all:'',    // 获赠油箱总价值
      about:'',         //

      honourFirst:{title:'',tm:''},     // 购买成功
      honourMidle:{title:'',tm:''},     // 到期开放兑付
      honourend:{title:'',tm:''},       // 后续可随时兑付

    }
  },

  mounted()
  {
    this.$nextTick(function () {
      this.$refs.scroll.scroll.scrollTo(0, 0)
      // this.$refs.proDetail.style.display = 'block'
      this.height = this.$refs.scrollMain.offsetHeight + 12
      document.body.scrollTop = document.body.scrollHeight;
    })
  },
  created() {
//    this.getData();
  },

  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next(vm=>{
      vm.cardPageInfo = vm.getCard;

      if(vm.getCard.page_cpsObj){
        vm.getData( vm.getCard);
      }else{
        vm.getData(null)
      }
    })
  },
  watch:{

   /* totalAmount:function(){
    }*/

  },
  computed: {
    ...mapState({
        cardpageinfo: state => state.com.cardpageinfo
    }),

    ...mapGetters([
      'getCard'
    ])

  },

  methods:{
  ...mapActions([
      'setCardPageInfo'
    ]),

      //跳转到现金券页面
    showCoupns(){
      // productId=34719&amount=1000.00&cpns_id=31268993-31268995-31267999&qty=1&ratecpn_id=&cashLimit=1
      let cardPageInfo ={
        page_pro_id:this.pro_id,
        page_pro_period:this.period,
        page_amount:this.totalAmount,
        page_cpsObj:this.coupons,
        page_pay_leftByRule:this.pay_leftByRule,
        page_from_path:'proHyb',
      }
      this.$router.push({path: '/couponList'});

      this.setCardPageInfo(cardPageInfo);


    },

    formatInput(){

      var _this = this;
      clearTimeout(_this.timeoutObj);

      _this.timeoutObj = setTimeout(()=>{

        _this.cardNum = _this.totalAmount / _this.cardAmount;

        if(_this.cardNum >99){
          _this.cardNum = 99;
          _this.totalAmount = 99 *_this.cardAmount;
          _this.msg("error","最多99张卡")
        }
        if(_this.cardNum <1){
          _this.cardNum = 1;
          _this.totalAmount = 1 *_this.cardAmount;
          _this.msg("error","请至少选择一张卡");
        }
        if(_this.totalAmount % _this.cardAmount != 0){
          _this.totalAmount -= _this.totalAmount % _this.cardAmount;
          _this.cardNum = _this.totalAmount / _this.cardAmount;
        }
        if(_this.totalAmount ==0){
          _this.totalAmount = _this.cardAmount;
          _this.cardNum = 1;
          _this.msg("error","请至少选择一张卡");
        }
        if(_this.totalAmount / _this.cardAmount >99){
          _this.cardNum = 99;
          _this.totalAmount = 99 *_this.cardAmount;
          _this.msg("error","最多99张卡")
        }

//      _this.allshouyi = parseFloat(_this.yearPercent*_this.period/12*_this.cardNum*_this.cardAmount/100).toFixed(2);


        /*
         *
         投资金额：a，预期年化：b，加息比例：c，，现金券：d，油箱抵扣：e，期限：n，实付金额：f=（a-d-e）

         1、只有加息时展示：
         APP展示文字：预期收益X元，含加息收益Y元，折合年化Z
         公式：Y=a*c*n/12
         X=(a*b*n/12)+Y
         Z=(12X)/(nf)
         Z转化为百分数，都四舍五入保留两位小数

         2、只有现金券或只有油箱抵扣时或两者都有时展示：
         APP展示文字：预期收益X元，含优惠Y元，折合年化Z
         公式：Y=d+e
         X=(a*b*n/12)+Y
         Z=(12X)/(nf)
         Z转化为百分数，都四舍五入保留两位小数

         3、三者都有时展示：
         APP展示文字：预期收益X元，含优惠及加息Y元，折合年化Z
         公式：Y=d+e+(a*c*n)/12
         X=(a*b*n/12)+Y
         Z=(12X)/(nf)
         Z转化为百分数，都四舍五入保留两位小

         totalAmount:0 ,// 投资总额: a
         yearPercent:'0', // 预期年化: b

         jiaxiRate:0, // 加息比例: c
         cashQuan:0, // 现金券 : d
         oilTank:0,  //油箱抵扣: e

         payMoney:0,  // 实付金额 :f
         *
         */
        let y = 0; // Y=a*c*n/12
        let x = _this.totalAmount*_this.yearPercent/100*_this.period/12;
        let f = _this.totalAmount-_this.cashQuan -parseFloat(_this.oilTank);
        //     let z = (12*x)/(_this.period*)
        if(_this.has_addCoupons && !_this.has_coupons && !_this.has_oilTank ){
          y = _this.totalAmount*_this.jiaxiRate/100*_this.period/12;
          x += y;
        }
        if((_this.has_coupons || _this.has_oilTank) && !_this.has_addCoupons ){
          x = _this.totalAmount*_this.yearPercent/100*_this.period/12;
          y= _this.cashQuan + parseFloat(_this.oilTank);
        }
        if(_this.has_addCoupons && _this.has_coupons && _this.has_oilTank){
          y = _this.cashQuan + parseFloat(_this.oilTank) +_this.totalAmount*_this.jiaxiRate/100*_this.period/12;
          x = _this.totalAmount*_this.yearPercent/100*_this.period/12 +y;

        }
        _this.jiaxishouyi = parseFloat(_this.totalAmount*_this.jiaxiRate/100*_this.period/12).toFixed(2);


        // 更新页面油量 数据
        _this.refreshOilAmount();

        console.log('// 获取现金券')
        // 获取现金券
        _this.getcoupons();

     /*   _this.payMoney = f.toFixed(2);
        _this.allshouyi = x.toFixed(2);
*/


      },_this.inputTimeout)


    },
    // 更新油量
    refreshOilAmount(){

      this.buyOilAmount = parseFloat(this.totalAmount/this.referenceOilPrice).toFixed(2);
      this.giftOilAmount = parseFloat(this.totalAmount*this.giftpercent/this.referenceOilPrice).toFixed(2);
      this.totalOilAmount =  parseFloat(parseFloat(this.buyOilAmount) +  parseFloat(this.giftOilAmount)).toFixed(2);
      this.totalWorth = (this.totalAmount*(1+this.giftpercent)).toFixed(2);
    },

    getData(_vmCard){
      let _this = this;

      this.pro_id = this.$route.params.pro_id;
      api.productDfa({
        "ver":"5.2.2",
        "user_identify_id":'0',
        "productId":this.pro_id,
      }).then(response => {
        let res = response.data.data;
        this.dataObj = res;
        this.goods_id = res.goods_id;
        this.title = res.name;

        this.expectedReturnTpl = res.expectedReturnTpl.split("&")[0],
        this.expectedRateReturnTpl = res.expectedRateReturnTpl.split("&")[0]

        this.desTitle = res.dataInfo[0].title +" "+res.dataInfo[0].value;
        this.desAmount = res.dataInfo[1].title +" "+res.dataInfo[1].value;

        this.riseFeeTips = res.riseFeeTips;
        this.riskTip = res.riskTip;
        this.insurance_lang = res.insurance_lang;

        this.cardAmount = res.sale_rule.cashnum;
//        alert(this.cardAmount);
        this.totalAmount =  this.cardAmount;
        if(_vmCard != null){
          this.totalAmount = _vmCard.page_amount;
          this.cardNum = this.totalAmount/this.cardAmount;

        }

        this.period = res.famountCopy.invest;
        this.yearPercent = res.famountCopy.yearPercent;
        this.yearPercentUnit = res.famountCopy.yearPercentUnit;
        this.yearPercentTips = res.famountCopy.yearPercentTips;


        /**
         *
         * honourFirst:[],     // 购买成功
         honourMidle:[],     // 到期开放兑付
         honourend:[],       // 后续可随时兑付
         * */
        this.honourFirst.title = res.famountCopy.honourFirst.title;
        this.honourFirst.tm = res.famountCopy.honourFirst.tm;
        this.honourMidle.title = res.famountCopy.honourMidle.title;
        this.honourMidle.tm = res.famountCopy.honourMidle.tm;
        this.honourend.title = res.famountCopy.honourend.title;
        this.honourend.tm = res.famountCopy.honourend.tm;

        /*
        * has_addCoupons: false , // 是否有加息券
         has_coupons: false , // 是否有现金券
         has_oilTank: false , // 是否有油箱
        *
        * */


        // 加息券
        if(res.add_coupons != null){
          /*
           *  jiaxiRate:0, // 加息比例: c
           */
          this.has_addCoupons = true;
          this.jiaxiRate = parseFloat(res.add_coupons.cpns_money);
          this.jiaxishouyi = res.add_coupons.add_rate_amount;
        }else{
          this.has_addCoupons = false;
          this.jiaxiRate = 0;
          this.jiaxishouyi = 0;
        }
        // 现金券
        if(res.coupons != null){
          /*
           *  cashQuan:0, // 现金券: d
           */
          if(res.coupons.coupon_list.length != 0){
            this.has_coupons = true;
          }else{
            this.has_coupons = false;
          }

          let coupons = res.coupons.coupon_list;
          let _couponArr = [];
//          alert(this.totalAmount);

          let payLeft = parseFloat(this.totalAmount);

          _this.coupons_id = [];
          let allCpnsUsed = 0;
          if(_vmCard != null ){
            coupons = _vmCard.page_cpsObj;
            for(let a in coupons){

              let _coupon = {
                count_rule_type_bn:'',
                cpn_id        :"",
                cpn_name      :"",
                cpns_bn       :"",
                cpns_end_date :"",
                cpns_money    :"",
                cpns_start_date: "",
                is_select     :"",
                max_desc        :"",
                max_num         :'',
                rule_desc       :"",
                rule_order_money:""
              };
              _coupon.count_rule_type_bn = coupons[a].count_rule_type_bn;
              _coupon.cpn_id = coupons[a].cpn_id;
              _coupon.cpn_name = coupons[a].cpn_name;
              _coupon.cpns_bn = coupons[a].cpns_bn;
              _coupon.cpns_end_date = coupons[a].cpns_end_date;
              _coupon.cpns_money = coupons[a].cpns_money;
              _coupon.cpns_start_date = coupons[a].cpns_start_date;
              _coupon.is_select = coupons[a].is_select||false;
              _coupon.max_desc = coupons[a].max_desc;
              _coupon.max_num = coupons[a].max_num;
              _coupon.rule_desc = coupons[a].rule_desc;
              _coupon.rule_order_money = coupons[a].rule_order_money;

              _couponArr.push(_coupon);

              if(coupons[a].is_select){
                _this.coupons_id.push(coupons[a].cpns_bn);
              }

              _coupon  = null;

              let cpns_money = parseFloat(coupons[a].cpns_money);
              let rule_order_money = parseFloat(coupons[a].rule_order_money);
              if(coupons[a].is_select){
                allCpnsUsed += cpns_money;
                payLeft -= rule_order_money;
              }
            }

          }else{

            for(let a in coupons){
              let _coupon = {
                count_rule_type_bn:'',
                cpn_id        :"",
                cpn_name      :"",
                cpns_bn       :"",
                cpns_end_date :"",
                cpns_money    :"",
                cpns_start_date: "",
                is_select     :"",
                max_desc        :"",
                max_num         :'',
                rule_desc       :"",
                rule_order_money:""
              };
              _coupon.count_rule_type_bn = coupons[a].count_rule_type_bn;
              _coupon.cpn_id = coupons[a].cpn_id;
              _coupon.cpn_name = coupons[a].cpn_name;
              _coupon.cpns_bn = coupons[a].cpns_bn;
              _coupon.cpns_end_date = coupons[a].cpns_end_date;
              _coupon.cpns_money = coupons[a].cpns_money;
              _coupon.cpns_start_date = coupons[a].cpns_start_date;
              _coupon.is_select = coupons[a].is_select||false;
              _coupon.max_desc = coupons[a].max_desc;
              _coupon.max_num = coupons[a].max_num;
              _coupon.rule_desc = coupons[a].rule_desc;
              _coupon.rule_order_money = coupons[a].rule_order_money;

              _couponArr.push(_coupon);

              if(coupons[a].is_select){
                _this.coupons_id.push(coupons[a].cpns_bn);
              }
              _coupon  = null;


              let cpns_money = parseFloat(coupons[a].cpns_money);
              let rule_order_money = parseFloat(coupons[a].rule_order_money);
              if(coupons[a].is_select){
                allCpnsUsed += cpns_money;
                payLeft -= rule_order_money;
              }
            }
          }

          this.coupons = _couponArr;
          this.cashQuan = allCpnsUsed;
          this.couponTipc = "- ¥ "+allCpnsUsed+" ";
          this.pay_leftByRule = payLeft;

          this.describe = res.coupons.goil_amount.describe;
          this.goil_amount_use = parseFloat(res.coupons.goil_amount.goil_amount); //  可用油量等价金额
          this.goil_litre_use = parseFloat(res.coupons.goil_amount.goil_litre);   //  可用抵扣油量
        }
        // 油箱
        if(res.goilinfo != null){
          /*
           *  oilTank:0, // 油箱抵扣: e
           */
          this.has_oilTank = true;
          this.oilTank = res.goilinfo.goil_money;


          this.goil_give = res.goilinfo.goil_give;
          this.goil_litre_all = res.goilinfo.goil_litre;
          this.goil_money_all = res.goilinfo.goil_money;
          this.about = res.goilinfo.goil_setting.about;
        }

        // 初始化收益

        _this.allshouyi = parseFloat(_this.yearPercent*_this.period/12*_this.cardNum*_this.cardAmount/100).toFixed(2);
        console.log("yyy="+_this.allshouyi);


        this.refreshOilAmount();
        this.payMoney = parseFloat(this.totalAmount-this.cashQuan);
        this.saveMoney = this.cashQuan;

        this.getoilTank();

      }).catch(error => {
//        console.log(error);
      })
    },
    // 获取现金券
    getcoupons(){
      api.getCouponsList({

        amount:this.totalAmount,
        product_id:this.pro_id,
        periods:this.period,
        ver :'5.2.1',
        type_bn:this.type_bn,

      }).then(response => {
        console.log("getCoupons 111")
        this.useCpns(response.data.data.dataList.cashcoupons)

        // this.getoilTank(); // 获取油箱抵扣

      })

    },

    // 计算现金券使用逻辑
    useCpns(_coupons){
      let _this = this;
      let coupons = _coupons;
      let payLeft = parseFloat(this.totalAmount);
//      console.log("1111111111111111111111payLeft = "+this.totalAmount);
      let allCpnsUsed = 0;
      let _couponArr = [];
      this.coupons_id = [];
      for(let a in coupons){
        let _coupon = {
          count_rule_type_bn:'',
          cpn_id        :"",
          cpn_name      :"",
          cpns_bn       :"",
          cpns_end_date :"",
          cpns_money    :"",
          cpns_start_date: "",
          is_select     :"",
          max_desc        :"",
          max_num         :'',
          rule_desc       :"",
          rule_order_money:""
        };
        _coupon.count_rule_type_bn = coupons[a].count_rule_type_bn;
        _coupon.cpn_id = coupons[a].cpn_id;
        _coupon.cpn_name = coupons[a].cpn_name;
        _coupon.cpns_bn = coupons[a].cpns_bn;
        _coupon.cpns_end_date = coupons[a].cpns_end_date;
        _coupon.cpns_money = coupons[a].cpns_money;
        _coupon.cpns_start_date = coupons[a].cpns_start_date;
        _coupon.is_select = coupons[a].is_select||false;
        _coupon.max_desc = coupons[a].max_desc;
        _coupon.max_num = coupons[a].max_num;
        _coupon.rule_desc = coupons[a].rule_desc;
        _coupon.rule_order_money = coupons[a].rule_order_money;

        _couponArr.push(_coupon);

        if(coupons[a].is_select){
          this.coupons_id.push(coupons[a].cpns_bn);
        }

        _coupon  = null;

        let cpns_money = parseFloat(coupons[a].cpns_money);
        let rule_order_money = parseFloat(coupons[a].rule_order_money);
//        if(payLeft>=rule_order_money){
        if(coupons[a].is_select){
          allCpnsUsed += cpns_money;
          payLeft -= rule_order_money;
        }
      }

      _this.allshouyi = parseFloat(_this.yearPercent*_this.period/12*_this.cardNum*_this.cardAmount/100).toFixed(2);

      this.coupons = _couponArr;
      this.payMoney = this.totalAmount - allCpnsUsed;
      this.pay_leftByRule = payLeft;      // 现金券抵扣规则剩余金额
      this.couponTipc = "- ¥ "+allCpnsUsed+" ";
      this.saveMoney = allCpnsUsed;

      this.getoilTank();
    },

    getoilTank(){
      api.getGoilamount({
        discount_money:0,    // 购买加油卡时必须的参数 储油卡不需要
        amount:this.payMoney,            // 当前实付金额
        total_amount:this.totalAmount,      // 总价值
        type_bn:this.type_bn, // 产品类型
        cpn_money:this.saveMoney ,         // 选中的现金券总价值 由现金券接口返回
        ver:"5.2.2",

      }).then(response =>{
        let res = response.data.data.dataList;
        console.log('oilTank');
        console.log(response.data.data);
        /**
         * describe:'',      // 油箱抵扣描述
         goil_amount_use:0,    // 油箱抵扣金额
         goil_litre:0,     // 油箱抵扣升数
         */
        this.describe = res.describe;
        this.goil_amount_use = parseFloat(res.goil_amount);
        this.goil_litre_use = parseFloat(res.goil_litre);
        this.has_oilTank = true;
        if(res.goil_amount >0){
          this.describe = '<span class="icon-tanhao c-gray fs-14"></span> 当前订单可用<span class="c-red">'
            +res.goil_litre+'升</span>，抵<span class="c-red">'+res.goil_amount+'元</span>';
        }
        this.checkboxopen = false;
      })

    },

    cardAdd(){
      if(this.cardNum <=99){
        this.cardNum +=1;

        this.totalAmount = this.cardNum * this.cardAmount;

      }
      if(this.cardNum >99){
        this.cardNum = 99;
        this.totalAmount = 99 *this.cardAmount;
        this.msg("error","最多99张卡")
      }

      this.formatInput()
    },
    cardMinus(){
      if(this.cardNum>=1){
        this.cardNum -=1;
        this.totalAmount = this.cardNum * this.cardAmount;

      }
      if(this.cardNum <1){
        this.cardNum = 1;
        this.totalAmount = 1 *this.cardAmount;
        this.msg("error","请至少选择一张卡");
      }

      this.formatInput()
    },



    buyNow(){
      this.createCart();

//      this.createOrder();


    },

    // 添加购物车
    createCart(){
      let _goods = {
        cash:this.totalAmount,
//        frozen: this.period,
        goods_id:this.goods_id,
        num:'1',
        product_id:this.pro_id
      };
      let _goodsStr = JSON.stringify(_goods);
//      debugger;

      api.addCart({
        btype:"is_fastbuy",
        goods:_goodsStr,
        reggoods_id:this.goods_id,
        ver:"5.2.2",
        is_true:'virtual'

      }).then(response =>{
        let res = response.data;


        if(res.status =="10000") { // 添加购物车成功
          let obj_ident = res.data.dataList[0][0].obj_ident;
//          console.log("ident"+obj_ident);
          this.createOrder(obj_ident);
        }
      })

    },

    // 创建订单
    createOrder(obj_ident){
      let _payment = {
        currency:'CNY',
        pay_app_id: {
          pay_app_id:"deposit",
          payment_name:''
        },
      };

      let _paymentStr = JSON.stringify(_payment);

      api.createOrder({
        obj_idents:obj_ident,
        payment:_paymentStr,

        cashcoupons:this.coupons_id,
        cashcoupons_plus:[],
        period:this.period,
        isfastbuy:"true",
        goil_money:'',
        reggoods_id:this.goods_id,
        ver:"5.2.2",

      }).then(response =>{
        let res = response.data;

//        console.log("order create"+response.data.data);
        if(res.status == "10000"){
          let order_id = res.data.dataList.order_id;

          // 判断微信环境

        }

      })
    },


    msg(type, txt) {
      this.$createToast({
        type: type,
        txt: txt,
        time: 1000
      }).show()
    },

    showMore() {
      this.$refs.showMore.style.display = 'none'
      this.$refs.proDetail.style.display = 'block'
      this.$refs.scroll.scroll.refresh();
      this.$refs.scroll.scroll.scrollTo(0,-(this.height),1000);
    },
    backTop() {
      this.$refs.scroll.scroll.scrollTo(0,0,1000);
      this.$refs.showMore.style.display = 'block'
      this.$refs.proDetail.style.display = 'none'
    },
    toggleTab(textContent, index) {
      this.tabList.map(function(v, i) {
        i == index ? v.isAction = true : v.isAction = false;

      })
    },
    clickCheckbox(){
      this.checkboxopen = !this.checkboxopen;
      let _payMoney =  parseFloat(this.payMoney);
      let _saveMoney = parseFloat(this.saveMoney);

      if(this.checkboxopen){ // 使用油箱抵扣
        _payMoney -= parseFloat(this.goil_amount_use);
        _saveMoney += parseFloat(this.goil_amount_use);
      }else{
        _payMoney += parseFloat(this.goil_amount_use);
        _saveMoney -= parseFloat(this.goil_amount_use);
      }
      this.payMoney  = _payMoney.toFixed(2);
      this.saveMoney = _saveMoney.toFixed(2);

    }
  },
  components: {
    'v-header': Vheader}
  }
</script>

<style lang="css" scoped>
  .dis_flex{
    display:flex;
  }
  .flext_1{
    flex:1;
  }

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

  .form-li {
    margin-bottom: 10px;
    position: relative;
    min-height: 30px;
    background-color: #fff;
    font-size: 15px;
    overflow: hidden;
  }

  .form-li > li {
    position: relative;
    min-height: 24px;
    line-height: 24px;
    padding: 12px 15px;
    border-bottom: 1px solid #e8e8e8;
  }

  .form-li > li:last-child {
    border-bottom: 0;
  }

  .form-li > li > a {
    display: block;
  }

  .form-li label {
    color: #000;
  }

  .form-li label i {
    margin-right: 5px;
    color: #fd9a27;
  }

  .form-li .form-control {
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    min-height: 24px;
    line-height: 24px;
    border: none;
    background: none;
    text-align: right;
    font-size: 14px;
    outline: none;
    transform: translate(0, -50%);
  }

  .form-li .form-control span {
    margin-right: 30px;
  }

  .form-li .form-control span i {
    font-style: normal;
  }

  .form-li .form-control a {
    position: absolute;
    top: 50%;
    right: 15px;
    width: 70px;
    padding: 6px 0;
    border-radius: 20px;
    text-align: center;
    font-size: 15px;
    transform: translate(0, -50%);
  }

  .form-li .form-control a.btn-orange {
    right: 95px;
  }

  .form-li .form-control a.btn-down-app {
    padding: 5px 0;
    border: 1px solid #ff9d28;
    border-radius: 20px;
    background-color: #fff;
    color: #ff9d28;
  }

  .form-li .my-spot {
    position: absolute;
    top: 50%;
    right: 25px;
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background-color: #ea3534;
    transform: translate(0, -50%);
  }

  .form .icon-right,
  .form-li .icon-right {
    position: absolute;
    right: 10px;
    top: 50%;
    font-size: 18px;
    transform: translate(0, -50%);
  }

  .form-li .form-control.tl {
    padding-left: 90px;
  }

  .pro-detail-top {
    position: relative;
    height: 4.2rem;
    background-image: linear-gradient(to right, #f4bd46, #ff9d28);
    color: #fff;
    overflow: hidden;
  }

  .pro-detail-top > ul {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 0.36rem;
    color: #fff;
  }

  .pro-detail-top > ul > li {
    flex: 0 0 50%;
    position: relative;
  }

  .pro-detail-top > ul > li:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0.25rem;
    bottom: 0.25rem;
    border-right: 1px solid #fae4c2;
  }

  .pro-detail-top > ul > li:last-child:after {
    border-right: 0;
  }

  .form-li .not-transform {
    top: 0.4rem;
    transform: none;
  }

  .new-pro-li {
    display: flex;
    margin-top: 0.3rem;
  }

  .new-pro-li dt {
    flex: 0 0 5%;
    position: relative;
    top: 0.1rem;
    font-size: 1rem;
    color: #161616;
  }

  .new-pro-li dd {
    flex: 0 0 95%;
  }

  .buy-num {
    position: relative;
    min-height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.2rem;
    background-color: #fff;
    font-size: 0.4rem;
    overflow: hidden;
  }

  .buy-num input {
    display: block;
    width: 100%;
    height: 0.8rem;
    line-height: normal;
    border: none;
    background: none;
    font-size: 1rem;
    color: #f95e30 !important;
    outline: none;
  }

  .list-switch {
    position: relative;
    top: -0.1rem;
    display: inline-block;
    width: 1rem;
    height: 0.65rem;
    border-radius: 1.25rem;
    border: 1px solid #e4e4e4;
  }

  .list-switch.s-close {
    background-color: #fdfdfd;
  }

  .list-switch.s-open {
    background-color: #fd9a27;
    border: 1px solid #fd9a27;
  }

  .list-switch .dot {
    position: absolute;
    top: -1px;
    width: 0.65rem;
    height: 0.65rem;
    border-radius: 50%;
    border: 1px solid #e4e4e4;
    background-color: #fff;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
    transition: all .5s ease-in .1s;
  }

  .list-switch.s-open .dot {
    right: -1px;
  }

  .fixed-bottom {

    position: relative;
    height: 1.066667rem;
    padding-top: 0.266667rem;
    padding-right: 4rem;
    background-color: #fff;
    text-align: right;
    font-size: 0.48rem;
    color: #161616;
    z-index: 999;
  }

  .back-home {
    position: absolute;
    top: 0.3rem;
    bottom: 0;
    left: 0;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0;
    border-right: 1px solid #e8e8e8;
    background-color: transparent;
    text-align: center;
    font-size: 0.34rem;
    color: #666;
  }

  .back-home i.icon-home1 {
    display: block;
    margin-bottom: 0.1rem;
    font-size: 0.5rem;
  }

  .fixed-bottom a.btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 3.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    padding: 0;
    border-radius: 0;
    background-image: linear-gradient(to right, #ff9d28, #f4bd46);
    color: #fff;
    -webkit-appearance: none;
  }

  /*点击显示和收起更多*/
  .click-show,
  .click-top {
    height: 1.5rem;
    text-align: center;
    z-index: 9999;
  }

  .click-top {
    margin-top: 0.3rem;
  }

  i.iconfont {
    display: inline-block;
  }

  .click-show i.iconfont,
  .click-top i.iconfont {
    content: "\e687";
    transform: rotate(90deg);
    color: #bbb;
  }

  .click-top i.iconfont {
    position: relative;
    top: 0.5rem;
    transform: rotate(-90deg);
  }

  .click-show-more {
    position: relative;
    height: 1px;
    width: 100%;
    font-size: 0.4rem;
    color: #bbb;
  }

  .click-show-more:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0.3rem;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #bbb;
    z-index: 0;
  }

  .click-show-more span {
    position: relative;
    display: inline-block;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0 0.3rem;
    background-color: #f5f5f5;
    z-index: 1;
  }

  .pro-detail-tag {
    overflow: hidden;
    background-color: #fff;
    font-size: 0;
  }

  .pro-detail-tag li {
    display: inline-block;
    width: 33.33333333333%;
    text-align: center;
    font-size: 0.4rem;
    color: #333;
  }

  .pro-detail-tag li span {
    display: inline-block;
    padding: 0.3rem 0;
  }

  .pro-detail-tag li.active span {
    border-bottom: 3px solid #fd9a27;
    color: #fd9a27;
  }

  .pro-detail-cons {
    font-size: 0.4rem;
    line-height: 0.6rem;
  }

  .pro-detail-cons > ul > li {
    position: relative;
    margin-bottom: 0.3rem;
    padding: 0.5rem;
    background-color: #fff;
  }

  .pdc-title {
    height: 0.45rem;
    margin: 0.3rem 0;
    padding-left: 0.3rem;
    border-left: .15rem solid #ff9d28;
    font-weight: bold;
    line-height: 0.45rem;
    font-size: 0.45rem;
    color: #161616;
  }

  .pro-detail-rules li {
    margin-bottom: 0.4rem;
    font-size: 0.4rem;
    line-height: 0.6rem;
    color: #666;
  }

  .pro-detail-tb th, .pro-detail-tb td {
    padding: 0.25rem 0;
    border: 1px solid #e8e8e8;
    text-align: center;
    font-weight: normal;
    font-size: 0.4rem;
    color: #666;
  }

  .pro-detail-tb th {
    color: #999;
  }

  .duifu-box {
    height: 2px;
    background-color: #fd9a27;
    position: relative;
  }

  .node {
    width: 0.3rem;
    height: 0.3rem;
    background-color: #fd9a27;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    margin-top: -0.15rem;
  }

  .stage1 {
    left: 0
  }

  .stage2 {
    left: 50%;
    margin-left: -0.15rem
  }

  .stage3 {
    right: 0
  }

  .pdc-title-span {
    position: absolute;
    right: 0.5rem;
    top: 0.6rem;
  }

  .pdc-title-span .border-item {
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border-radius: 3px;
    border: 1px solid #fd9a27;
    color: #fd9a27;
  }

  .pd-tips-kjx {
    display: flex;
    position: absolute;
    top: -0.6rem;
    height: auto;
    margin-left: 0.5rem;
    background-color: #fff;
    align-self: center;
    align-items: center;
    justify-content: center;
    width:120px;
  }

  .pd-tips-kjx > i {
    position: absolute;
    left: -0.15rem;
    bottom: 0.5rem;
    width: 0;
    height: 0;
    border-top: .3rem solid transparent;
    border-right: 0.3rem solid #fff;
    border-bottom: 0 solid transparent;
  }

  .pd-tips-kjx > span {
    position: relative;
    line-height:0.5rem;
    padding: 0 5px;
    font-size: 0.3rem;
    color: #fd9a27;
    /*white-space: nowrap;*/
    align-self: center;
    align-items: center;
    justify-content: center;
  }

  .buy-minus-add {
    display: inline-block;
    width: 2.5rem;
    height: 0.8rem;
    line-height: 0;
    margin: 0.2rem 1.3rem 0 0;
    border: 1px solid #ddd;
  }

  .buy-minus, .buy-add {
    top: -1px;
    width: 0.8rem;
    height: 0.8rem;
    border: 1px solid #ddd;
    background-color: #f5f5f5;
    line-height: 0.7rem;
  }

  .buy-minus {
    left: -0.8rem;
    border-radius: 2px 0 0 2px;
  }

  .buy-add {
    right: -0.8rem;
    border-radius: 0 2px 2px 0;
  }

  .buy-minus-add input {
    width: 100%;
    height: 0.8rem;
    line-height: 1;
    padding: 0;
    border: none;
    background: none;
    font-size: 0.4rem;
  }
</style>