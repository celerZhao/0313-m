<template lang="html">
  <!-- 储油卡 s -->
    <ul class="p-list">
      <!-- 光汇储油卡 s -->
      <li>
        <i class="new-product-icon"></i>
        <div class="row p-list-new">
          <h3 class="c-red"><b>光汇储油卡</b><span class="p-tips3">new</span></h3>
          <p class="c-gray">低价储油，分享油价上涨红利；您的油价您做主</p>
        </div>
        <ul class="p-list-cons">
       <!--   <li>
            <router-link to="/productDatel">
              <div class="p-list-48">
                <span>5.5<i>% +100%</i></span>
                <div>赠送比例+上涨红利</div>
              </div>
              <div class="p-list-25">
                <span><b>1个月</b></span>
                <div>期限</div>
              </div>
              <div class="relative p-list-27"><a class="btn btn-jb-danger" href="javascript:;">抢购</a></div>
            </router-link>
          </li>-->
         <!-- <li>
            <router-link to="/productDatel">
              <div class="p-list-48">
                <span>5.5<i>% +100%</i></span>
                <div>【测试】赠送比例+上涨红利</div>
              </div>
              <div class="p-list-25">
                <span><b>1个月</b></span>
                <div>期限</div>
              </div>
              <div class="relative p-list-27"><a class="btn btn-jb-danger" href="javascript:;">抢购</a></div>
            </router-link>
          </li>-->
          <li v-for="item in items">
            <router-link :to="'/ProOilCard/'+item.product_id+'/'+item.cashday">
              <div class="p-list-48">
                <span>{{item.discounts}}<i>{{item.up_money_unit}} +{{item.up_money}}{{item.up_money_unit}}</i></span>
                <div><!--赠送比例+上涨红利-->{{item.discounts_text}}{{item.up_money_text}}</div>
              </div>
              <div class="p-list-25">
                <span><b>{{item.cashday}}<!--个月-->{{item.cashday_unit}}</b></span>
                <div><!--期限-->{{item.cashday_text}}</div>
              </div>
              <div class="relative p-list-27"><a class="btn btn-jb-danger" javascript=":;">抢购</a></div>
            </router-link>
          </li>
        </ul>
      </li>
      <!-- 光汇储油卡 e -->

      <!-- 大众储油体验卡 s -->
      <li class="hide">
        <i class="new-user"></i>
        <div class="row p-list-new">
          <h3><b>大众储油体验卡</b><span class="p-tips3">新手专享</span></h3>
          <p class="c-gray">线上储油，全国加油，享100%油价涨幅收益</p>
        </div>
        <ul class="p-list-cons">
          <li>
            <router-link to="/proFreeCard">
              <div>
                <span>10.00<i>% +100%</i></span>
                <div>赠送比例+上涨红利</div>
              </div>
              <div>
                <span><b>1个月</b></span>
                <div>期限</div>
              </div>
              <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
            </router-link>
          </li>
        </ul>
      </li>
      <!-- 大众储油体验卡 e -->


      <!-- 大众储油卡 s -->
      <li class="hide">
        <div class="row p-list-new">
          <h3><b>大众储油卡</b><span class="p-tips3">双重收益</span></h3>
          <p class="c-gray">线上储油理财，享受固定与油价涨浮双重收益，稳赚不亏</p>
        </div>
        <ul class="p-list-cons">
          <li>
            <router-link to="/proOilCard">
              <div>
                <span>10.00<i>% +100%</i></span>
                <div>赠送比例+上涨红利</div>
              </div>
              <div>
                <span><b>12个月</b></span>
                <div>期限</div>
              </div>
              <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
            </router-link>
          </li>
          <li>
            <router-link to="/proOilCard">
              <div>
                <span >6.00<i>% +100%</i></span>
                <div>赠送比例+上涨红利</div>
              </div>
              <div>
                <span><b>8个月</b></span>
                <div>期限</div>
              </div>
              <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
            </router-link>
          </li>
        </ul>
      </li>
      <!-- 大众储油卡 e -->

      <!-- 储油涨 s -->
      <li class="hide">
        <div class="row p-list-new">
          <h3><b>储油涨</b><span class="p-tips3">双重收益</span></h3>
          <p class="c-gray">线上储油理财，享受固定与油价涨浮双重收益，稳赚不亏</p>
        </div>
        <ul class="p-list-cons">
          <li>
            <router-link to="/proFreeCard">
              <div>
                <span>12.00<i>% +30%</i></span>
                <div>预期年化+涨幅收益</div>
              </div>
              <div>
                <span><b>12个月</b></span>
                <div>期限</div>
              </div>
              <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
            </router-link>
          </li>
          <li>
            <router-link to="/proFreeCard">
              <div>
                <span>13.80<i>% +35%</i></span>
                <div>预期年化+涨幅收益</div>
              </div>
              <div>
                <span><b>24个月</b></span>
                <div>期限</div>
              </div>
              <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
            </router-link>
          </li>
          <li>
            <router-link to="/proFreeCard">
              <div>
                <span>14.80<i>% +40%</i></span>
                <div>预期年化+涨幅收益</div>
              </div>
              <div>
                <span><b>36个月</b></span>
                <div>期限</div>
              </div>
              <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
            </router-link>
          </li>
        </ul>
      </li>
      <!-- 储油涨 e -->
    </ul>
  <!-- 储油卡 e -->
</template>

<script>
import api from '../../../fetch/ajax.js'
export default {
  data() {
    return {
      items:[]
    }
  },
  created() {
    // 我的储油卡列表
    api.getAllproductList({
//      page: '1',
//      limit: '10',
//      card_status:"1", //1:有效卡，2:无效卡，如未传入则不过滤
      type:'litre'
    }).then(response => {
      console.log('储油列表'+response);
      this.items = response.data.data.dataList.goodArray[0].goods;
    }).catch(error => {
      console.log(error);
    })

    //我的储油列表
    /*api.myOilList({
      page: '1',
      limit: '10'
    }).then(response => {
      console.log(response);
    }).then(error => {
      console.log(error);
    })*/
  }
}
</script>

<style lang="css" scoped>
.p-tips{
	height: 30px;
	line-height: 30px;
    border: 1px solid #fd9a27;
    background-color: #fff5e9;
    text-align: center;
    font-size: 13px;
    color: #fd9a27;
}
.p-tips > img{
	position: relative;
	top: 2px;
    margin-right: 5px;
    width: 12px;
}
.p-tag{
	position: relative;
	border-bottom: 1px solid #e8e8e8;
	background-color: #fff;
	overflow: hidden;
}
.p-tag-li{
	display: flex;
	width: 60%;
	margin: 8px auto;
	border: 2px solid #fd9a27;
	border-radius: 18px;
	overflow: hidden;
	text-align: center;
	font-size: 16px;
	color: #666;
}
.p-tag-li > li{
	flex: 0 0 50%;
	padding: 8px 0;
}
.p-tag-li > li.active{
	background-color: #fd9a27;
	color: #fff;
}
.check-oil-price{
	position: absolute;
    right: 15px;
    top: 50%;
    font-size: 16px;
    color: #666;
    transform: translate(0, -50%);
    -moz-transform: translate(0, -50%);
    -ms-transform: translate(0, -50%);
    -webkit-transform: translate(0, -50%);
}
.p-list > li{
	position: relative;
	margin-bottom: 12px;
	padding: 0 15px;
	background-color: #fff;
}
.p-list-cons > li{
	position: relative;
	overflow: hidden;
	padding: 12px 0 15px;
	border-bottom: 1px solid #e8e8e8;
}
.p-list-cons > li:last-child{
	border-bottom: 0;
}
.p-list-cons > li > a{
	display: block;
}
.p-list-new {
	padding: 0.4rem 0rem 0.4rem!important;
	border-bottom: 1px solid #e8e8e8;
}
.new-product-icon,
.new-user{
	display: block;
    position: absolute;
    top: 0;
    right: 15px;
    width: 30px;
    height: 40px;
    background: url(../img/xin-icon.png) no-repeat 95% 0;
    background-size: 100% auto;
}
.new-user{
    background: url(../img/icon01-xing.png) no-repeat 95% 0;
    background-size: 100% auto;
}
.p-list-new h3{
	font-size: 16px;
	color: #161616;
}
.p-list-new h3.c-red{
    color: #f95e30;
}
.p-list-new h3 b{
	font-weight: bold;
}
.p-tips2,.p-tips3{
	display: inline-block;
	height: 12px;
	line-height: 12px;
	margin-left: 3px;
	padding: 2px;
	background-color: #ff9d28;
	font-size: 12px;
	color: #fff;
}
.p-tips3{
	border-radius: 0;
	border-color: #ff9d28;
	background-color: #ff9d28;
    color: #fff;
}
.p-list-cons > li > a {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	font-size: 0;
}
.p-list-cons > li > a > div{
	flex: 0 0 25%;
}
.p-list-cons > li > a > div:first-child{
	flex: 0 0 50%;
}
.p-list-new p,
.p-list-cons li div > div{
	margin-top: 10px;
	font-size: 12px;
	color: #999;
}
.p-list-cons div span{
	font-size: 20px;
	color: #f95e30;
}
.p-list-cons div span b{
	font-size: 14px;
	color: #333;
}
.p-list-cons i{
	font-style: normal;
	font-size: 14px;
}
.btn-jb,
.btn-jb-danger{
    padding: 10px 0;
    border-radius: 20px;
    background-image: linear-gradient(to right, #ff9d28, #f4bd46);
    font-size: 20px;
    color: #fff;
}
.btn-jb-danger{
    background-image: linear-gradient(to right, #fb4f46, #ff874e);
}
</style>
