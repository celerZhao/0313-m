<template lang="html">
  <div class="wrap">
    <v-header title="帮助中心"></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="p-15 helpContent">
          <p></p><p><font face="Microsoft Yahei" size="3" style=""><strong>光汇云油卡</strong></font></p>
          <p><font face="Microsoft Yahei" size="3">Q1：什么是汇油宝？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：汇油宝是基于光汇石油集团25年成熟的油品供应链体系推出的固定收益委托投资产品，用户购买后委托光汇购买石油产品，存储在光汇的油库里，并通过光汇智价引擎工具进行分销给加油站及用油企业赚取利润。用户投资资金安全由银行与保险公司保障。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q2：如何购买汇油宝？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：登录后，进入“首页”页面或“我要储油”页面，点击某个汇油宝产品的‘立即购买’按钮，进入“产品详情”页面，然后录入投资金额后直接购买即可。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q3：什么是储油涨？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：储油涨是光汇云油推出的“固定年化 + 油价涨幅分成”的双重保值增值型委托产品，用户购买后委托光汇购买石油产品，存储在光汇的油库里，并通过光汇智价引擎工具进行套&nbsp; 期保值，赚取收益。当油价涨，你不但可以获得预期收益，还可以获得因油价上涨而带来的浮动收益；油价跌，你依然可以获得预期收益，浮动收益则为0，同时本金不会有任何损失。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q4：如何购买储油涨？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：登录后，进入“首页”页面或“我要储油”页面，点击某个储油涨产品的‘立即购买’按钮，进入“产品详情”页面，然后选择地区、油品、购买数量后直接购买即可。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q5：什么是全国加油卡？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：全国加油卡是光汇云油推出的即买即用、全国可加油，同时享受折扣优惠的加油卡。购买后可通过光汇云油APP或微信公众号的扫码功能在光汇石油自营加油站或联盟加油站进&nbsp; &nbsp; 行扫码加油，也可以在其他加油站加油消费后将发票上传光汇云油APP进行报销加油费用，未消费完，余额到期可提现。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q6：如何购买全国加油卡？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：登录后，进入“首页”页面或“我要加油”页面，点击某个全国加油卡产品的‘立即购买’按钮，进入“产品详情”页面，然后录入购买数量后直接购买即可。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q7：为什么官网上面的价格跟加油站的不一样？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：光汇云油平台价格是以国家发改委发布价格为准（每吨调整幅度按密度标准换算而来，可能与个别地区发改委执行的区域油价略有差异，最终价格以平台油价为准）。加油站零售价格规定不允许高于发改委发布的价格，因此加油站可以自主降价，所以您看到加油站的 价格低于平台的价格是正常的。您购买及兑付都是以光汇云油平台价格为准，所以不影响您的使用，请放心购买。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q8：光汇云油卡有效期是多久？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：大众储油卡和全国加油卡有效期是3年，在产品有效期到期后，如您未申请延期，剩余额度将按到期日油价（依据储油所属地区和油品，以平台油价为准）自动换算为平台余额。</font></p>
          <p><font face="Microsoft Yahei" size="3"><br></font></p>
          <p><font face="Microsoft Yahei" size="3"><strong>交易问题</strong></font></p>
          <p><font face="Microsoft Yahei" size="3">Q1：现在支持的支付方式有哪些？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：光汇云油平台目前支持平台账户余额、银联在线支付（借记卡）、微信支付、富友支付。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q2：支付有限额吗？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：平台账户余额支付：平台账户余额即账户余额，无限额，可用余额均可用于支付订单。</font></p>
          <p><font face="Microsoft Yahei" size="3">微信支付：添加过银行卡的用户（绑定后解绑了也算），实物限额单笔单日50000元，虚拟限额单笔3000元、单日6000元、没有月限额；未添加过银行卡的用户，零钱支付额度为单笔单日1000元、单月1000元，超过额度需要添加银行卡完成支付。</font></p>
          <p><font face="Microsoft Yahei" size="3">银联在线支付（借记卡）：不同银行对第三方平台有不同的限额，具体标准详询京东和银联客服。另外如果您的银行卡有设置限额，请以较低的限额为准。</font></p>
          <p><font face="Microsoft Yahei" size="3">大额支付请选择银联网银支付，银联网银支付限额标准详见：https://static.95516.com/static/help/detail_38.html</font></p>
          <p><font face="Microsoft Yahei" size="3">Q3：如何查找订单信息？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：登录后，进入“会员中心—&gt;我的订单”菜单页面，可以查看订单记录，可以再次购买或查看订单详情。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q4：如何查看我的收益？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：登录后，在“会员中心”页面可以查看到未兑付储油卡的总收益。您可以点击查看交易明细来查看以往兑付和购买记录。在我的储油产品可查看单个储油卡收益。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q5：如何查看我的提现记录？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：登录后，在“会员中心—&gt;交易明细”菜单页面可以查看提现记录。可查询的信息包括提现时间、提现金额、及提现账户信息、状态。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q6：如何查看我的平台账户余额？</font></p>
          <p><font face="Microsoft Yahei" size="3">A：平台账户余额即账户余额。余额分为可用余额和冻结余额，可用余额才可用来支付订单。您申请提现后，提现金额会被冻结即为冻结金额。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q7: 如何更改加油卡规则和操作指引？</font></p>
          <p><font face="Microsoft Yahei" size="3">A: 如果用户首次购买加油充值卡成功，则默认绑定中石化/中石油卡，且90天内不可以更换</font></p>
          <p><font face="Microsoft Yahei" size="3">90天后可以通过以下方式更改</font></p>
          <p><font face="Microsoft Yahei" size="3">在APP的“我的—&gt;我的加油赚钱”菜单中自行更换（此按钮90天后可以点击，90天内灰色不可点）</font></p>
          <p><font face="Microsoft Yahei" size="3">注：若换新卡之前买过超过3期的产品，则后面期数充值会自动充值到新绑定的加油卡中</font></p>
          <p><font face="Microsoft Yahei" size="3">Q8: 平台赠送的优惠券如何使用？</font></p>
          <p><font face="Microsoft Yahei" size="3">A: 登录后，进入“会员中心—&gt;我的订单”菜单页面，可以看到持有的优惠券列表（包含现金券、加息券......）</font></p>
          <p><font face="Microsoft Yahei" size="3">每个现金券会标识出：a.订单金额每满多少钱可以抵扣；b.现金券的有效期，用户在此期限内方可使用优惠券，过期失效；c.购买哪种商品、期数为多少可以使用。</font></p>
          <p><font face="Microsoft Yahei" size="3">Q9: 上传发票规则是什么？</font></p>
          <p><font face="Microsoft Yahei" size="3">A: 同一张发票只能兑付一次，</font></p>
          <p><font face="Microsoft Yahei" size="3">微信公众号：每日兑付金额小于等于500元。APP: 单卡每周提取金额为50元到125元不等；</font></p>
          <p><font face="Microsoft Yahei" size="3">开票日期不得超过7天。</font></p>
          <p><font face="Microsoft Yahei" size="3">发票金额不得小于兑付金额</font></p>
          <p><font face="Microsoft Yahei" size="3">需为正规加油站开具的加油发票</font></p>
          <p><font face="Microsoft Yahei" size="3">Q10:资金申请提现多久可以到账？</font></p>
          <p><font face="Microsoft Yahei" size="3" style="">A: 提现审批通过后，资金到账期限为1-3个工作日。</font></p><p></p>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>
<script>
  import Vheader from '../../../header/header.vue'
  export default {
    data() {
    return {
      options: {
        observeDOM: true,
        click: true,
        probeType: 3,
        scrollbar: false
      },

    }
  },
  created() {


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
  background: #ffffff;
  box-sizing: border-box;
  padding: 0;
}
.helpContent strong{
  font-weight:bold;
}
.helpContent p{
  margin-bottom:10px;
  color:#666 !important;
  line-height:20px;
}
</style>
