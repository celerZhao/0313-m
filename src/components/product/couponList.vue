<template>
  <div class="container zhichong" id="yhq">

    <div class="tipbar row fs-20">您能使用的现金券</div>
    <div class="quan_list row list_container">
      <ul class="list-unstyled list-p5 bg-default" id="cashcoupons_ul">
        <li class="quan quan_enough_t" cpns_id="31268001" order_money="10000.00" cpn_money="100.00">
          <div class="clear">
            <div class="col-xs-4 pr-0">
              <p class="mt-15"><span class="fs-20"><span class="fs-26 nowrap"> 100.00</span>元</span></p>
            </div>
            <div class="col-xs-6 pr-0 pl-0">
              <p class="quan_name  mb-0">324测试</p>
              <p class="quan_date fs-10 mb-0">2018-03-25 至 2018-04-30</p>
            </div>
            <div class="col-xs-2  hide ">
              <p class="radio_span mt-20">
                <i class="radio_no"></i>
              </p>
            </div>
          </div>
          <div class="pl-10 pr-10 pt-5 quan_date fs-10 quan_line"><span class="pull-left">满10000元可用，仅限储油月月升, 大众储油卡(2018V1)</span>
            <span class="pull-right">未使用</span></div>
        </li>

        <li v-for="(item,index) in coupons" class="quan" :class="{active:item.is_select}" @click="selectCpns(item.cpn_id,index,item.is_select||false)">
          <div class="clear">
            <div class="col-xs-4 pr-0">
              <p class="mt-15"><span class="fs-20"><span class="fs-26 nowrap">{{item.cpns_money}} <!--20.00--></span>元</span></p>
            </div>
            <div class="col-xs-6 pr-0 pl-0">
              <p class="quan_name  mb-0"><!--2018.3.31通用现金券-->{{item.cpn_name}}</p>
              <p class="quan_date fs-10 mb-0"><!--&gt;2018-03-31--> {{item.cpns_start_date}}至{{item.cpns_end_date}} <!--2018-04-30--></p>
            </div>
            <div class="col-xs-2 ">
              <p class="radio_span mt-20">
                <i class="radio_no " :class="{radio_yes:item.is_select}"></i>
              </p>
            </div>
          </div>
          <div class="pl-10 pr-10 pt-5 quan_date fs-10 quan_line"><span class="pull-left">{{item.rule_desc}}<!--满100元可用，仅限汇油宝, 大众储油卡(新), 全国加油卡, 储油月月升, 储油涨, 储油新手体验卡, 全国加油卡(2018V1), 大众储油卡(2018V1), 大众储油体验卡(2018V1 )--></span>
            <span class="pull-right">未使用</span></div>
        </li>
      </ul>
    </div>
    <a id="fixedBtn" class="btn btn-danger btn-danger2 btn-fixed radius0 fs-16" href="javascript:;" @click="submitToProductInfo">确定</a>    </div>
</template>
<script>
  import {mapState,mapActions,mapGetters} from 'vuex'
  export default {
    data(){
      return{
        cardPageInfo:{},
        coupons: [],
        pro_id:'',
        period:'',
        totalAmount:0,    // 购买油卡总价值
        pay_leftByRule:0,      // 待支付金额 (仅使用现金券，不使用油箱抵扣，剩余的支付金额)
        from_path:'',

      }
    },
    computed:{
    ...mapGetters([
        'getCard'
      ]),
    ...mapState({
        cardpageinfo: state => state.card.cardpageinfo
    })
    },
    activated() {
      this.cardPageInfo = this.getCard;

      this.coupons = this.getCard.page_cpsObj;
      this.totalAmount = parseFloat(this.getCard.page_amount);
      this.pay_leftByRule = parseFloat(this.getCard.page_pay_leftByRule);
      this.pro_id = this.getCard.page_pro_id;
      this.period = this.getCard.page_pro_period;
      this.from_path = this.getCard.page_from_path;

      console.log("-----------11-------------");
      console.log(this.cardPageInfo);

    },

  beforeRouteEnter(to, from, next){

    next(vm=>{
      let cardPageInfo = vm.getCard;
      vm.setter(cardPageInfo);

    })

  },

    methods:{

     ...mapActions([
        'setCardPageInfo'
      ]),

      setter(cardPageInfo){
        this.cardPageInfo = cardPageInfo;

        this.coupons = cardPageInfo.page_cpsObj;
        this.totalAmount = parseFloat(cardPageInfo.page_amount);
        this.pay_leftByRule = parseFloat(cardPageInfo.page_pay_leftByRule);
        this.pro_id = cardPageInfo.page_pro_id;
        this.period = cardPageInfo.page_pro_period;
        this.from_path = cardPageInfo.page_from_path;

        console.log("-------------22-----------");
        console.log(this.cardPageInfo);

      },

      submitToProductInfo(){

//        debugger;
        // productId=34719&amount=1000.00&cpns_id=31268993-31268995-31267999&qty=1&ratecpn_id=&cashLimit=1
        let cardPageInfo ={
          page_cpsObj:this.coupons,
          page_amount:this.totalAmount,
          page_pay_leftByRule:this.pay_leftByRule,
          page_pro_id:this.pro_id,
          page_pro_period:this.period,
          page_from_path:this.from_path,

        }
        if(this.from_path == 'ProOilCard'){
          this.$router.push({path: '/ProOilCard/'+this.pro_id+'/'+this.period}); // :pro_id/:period
        }

        if(this.from_path == 'proHyb'){
          this.$router.push({path: '/proHyb/'+this.pro_id}); // :pro_id/
        }

        if(this.from_path == 'proAddoilGh'){
          this.$router.push({path: '/proAddoilGh/'+this.pro_id+'/'+this.period}); // :pro_id/:period
        }



        this.setCardPageInfo(cardPageInfo);

      },

      selectCpns(cpn_id,index,flag){

        if(!flag){    // 如果被点击的券 未使用 ，则判断是否满足使用规则
          if(this.pay_leftByRule >= parseFloat(this.coupons[index].rule_order_money)){

            this.coupons[index].is_select = !flag;            // 现金券状态变为选中
            this.pay_leftByRule -= parseFloat(this.coupons[index].rule_order_money);  // 支付金额 减去 现金券面值
          }
        }else{

          this.coupons[index].is_select = !flag;            // 现金券状态变为 未选中
          this.pay_leftByRule += parseFloat(this.coupons[index].rule_order_money);  // 支付金额 加上 现金券面值

        }
        console.log("is_select xxx="+this.coupons[index].is_select);
        console.log("payleft xxxx ="+this.pay_leftByRule)

      },
      // 计算现金券使用逻辑: 当前的券是否可用
      useCpns(){
        let coupons = this.coupons;
        let payLeftByRule = parseFloat(this.totalAmount);
        let allCpnsUsed = 0;
        for(let a in coupons){
          let cpns_money = parseFloat(coupons[a].cpns_money);
          let rule_order_money = parseFloat(coupons[a].rule_order_money);
          if(payLeftByRule>rule_order_money){
            allCpnsUsed += cpns_money;
            payLeftByRule -= rule_order_money;
          }
        }

        this.pay_leftByRule = payLeftByRule;
        console.log("payleft --- ="+payLeft)
      },




    }
  }
</script>
<style lang="css" scoped>
  .clear{
    display:flex;
  }

  .col-xs-4{
    flex:4;
  }
  .col-xs-6{
    flex:6;
  }

  .col-xs-2{
    flex:2;
  }
  .pull-left, .left, .left-part {
    float: left;
  }
  .pull-right, .right, .right-part {
    float: right;
  }
  .active {
    color: #fc3635;
  }
  .tipbar {
    padding:10px 20px;
    color: #e68e46;
    background-color: #fff5eb;
    border-bottom: 1px solid #ddd;
    font-size: 1.2rem;
  }
  .list-unstyled, .list-inline {
    list-style: none;
  }
  .bg-default {
    color: #777;
    background-color: #efefef !important;
  }
  .zhichong .quan {
    background: #fff;
    border-radius: 5px;
    margin: 0.2rem;
  }
  .list-unstyled > li {
    position: relative;
    background-color: #fff !important;
  }

  .list-p5 > li {
    padding: .4rem 0;
  }

  .zhichong .quan .quan_date {
    font-size: 1.0rem;
    color: #ccc;
  }
  .quan .quan_date {
    font-size: 1.0rem;
    color: #ccc;
  }
  .zhichong .quan_line {
    border-top: 1px dotted #ccc;
  }

  .quan_name{
    font-size: 16px;
    margin:10px;
  }
  a:link, a:visited, a:hover, a:active, a.active {
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }
  .btn-danger2 {
    border: none;
    background-image: linear-gradient(to right, #ff9d28, #f4bd46);
    color: #fff;
  }


  .btn-danger {
    color: #fff;
     background-color: #d9534f;
    border-color: #d9534f;
  }
  .btn {
    position: fixed;
    left: 0;
    bottom: 0;

    padding: 10px;
    width: 100%;
    font-size: 1.4rem;
    text-align: center;
     white-space: nowrap;
     vertical-align: middle;
    border: 0.1rem solid transparent;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .zhichong .radio_span {
    width: 26px;
    height:26px;
    margin-bottom:20px;
  }

  .radio_span .radio_no {
    display:inline-block;
    background: url(./img/radio_no.png) no-repeat;
    width: 26px;
    height: 26px;
    background-size: 80%;
  }
  .radio_span .radio_yes {
    display:inline-block;
    background: url(./img/radio.png) no-repeat;
    width: 26px;
    height: 26px;
    background-size: 80%;
  }
</style>
