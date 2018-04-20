<template lang="html">
  <!-- 加油卡 s -->
  <ul class="p-list">

<!--光汇加油卡-->
    <li>
      <i v-if="isNewGh" class="new-product-icon"></i>
      <div class="row p-list-new">
        <h3><b><!--光汇加油卡-->{{nameGh}}</b><span class="p-tips3"><!--限时限量--> {{labelGh}}</span></h3>
        <p class="c-gray" v-html="descappGh"><!--委托储油保值，专享稳健固定收益--></p>
      </div>
      <ul class="p-list-cons">
        <li v-for="item in itemsGh ">
          <router-link :to="'/proAddOilGh/'+item.product_id+'/'+item.cashday">
            <!-- <p><span class="p-tips3">可加息</span></p> -->
            <div>
              <span>{{item.discounts}}<i>{{item.discounts_unit}}</i></span>
              <div>{{item.discounts_text}}</div>
            </div>
            <div>
              <span><b>{{item.cashday}}{{item.cashday_unit}}</b></span>
              <div>{{item.cashday_text}}</div>
            </div>
            <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
          </router-link>
        </li>
      </ul>
    </li>

      <!-- 老全国加油卡-->
    <li>
      <div class="row p-list-new">
        <h3><b><!--老全国加油卡-->{{nameQg}}</b><span class="p-tips3"><!--限时限量--> {{labelQg}}</span></h3>
        <p class="c-gray" v-html="descappQg"><!--委托储油保值，专享稳健固定收益--></p>
      </div>
      <ul class="p-list-cons">
        <li v-for="item in itemsQg ">
          <router-link :to="'/proHyb/'+item.product_id">
            <!-- <p><span class="p-tips3">可加息</span></p> -->
            <div>
              <span>{{item.discounts}}<i>{{item.discounts_unit}}</i></span>
              <div>{{item.discounts_text}}</div>
            </div>
            <div>
              <span><b>{{item.cashday}}{{item.cashday_unit}}</b></span>
              <div>{{item.cashday_text}}</div>
            </div>
            <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
          </router-link>
        </li>
        </ul>
    </li>

    <!-- 汇油宝 s -->
    <li>
      <div class="row p-list-new">
        <h3><b><!--汇油宝-->{{nameHyb}}</b><span class="p-tips3"><!--限时限量-->{{labelHyb}}</span></h3>
        <p class="c-gray" v-html="descappHyb"><!--委托储油保值，专享稳健固定收益--></p>
      </div>
      <ul class="p-list-cons">
        <li v-for="item in itemsHyb ">
          <router-link :to="'/proHyb/'+item.product_id">
            <!-- <p><span class="p-tips3">可加息</span></p> -->
            <div>
              <span>{{item.discounts}}<i>{{item.discounts_unit}}</i></span>
              <div>{{item.discounts_text}}</div>
            </div>
            <div>
              <span><b>{{item.cashday}}{{item.cashday_unit}}</b></span>
              <div>{{item.cashday_text}}</div>
            </div>
            <div><a class="btn btn-jb" href="javascript:;">抢购</a></div>
          </router-link>
        </li>
      </ul>
    </li>

  </ul>
  <!-- 加油卡 e -->
</template>

<script>
import api from '../../../fetch/ajax.js'
export default {
  data() {
    return {
      itemsHyb:[],
      nameHyb:'',
      labelHyb:'',
      descappHyb:'',
      isNewHyb:false,

      itemsGh:[],
      nameGh:'',
      labelGh:'',
      descappGh:'',
      isNewGh:false,

      itemsQg:[],
      nameQg:'',
      labelQg:'',
      descappQg:'',
      isNewQg:false,
    }
  },
  created() {
    let _this = this;
    // 获取加油卡列表
    api.getAllproductList({
//      page: '1',
//      limit: '10',
//      card_status:"1", //1:有效卡，2:无效卡，如未传入则不过滤
      type:'amount'
    }).then(response => {
//      console.log('储油列表'+response);
      let  goodArray = response.data.data.dataList.goodArray;
      for(var a in goodArray){
        // 汇油宝
        if(goodArray[a].type_bn == 'fixed_amount_copy'){
          _this.itemsHyb = goodArray[a].goods;
          _this.nameHyb = goodArray[a].name;
          _this.labelHyb = goodArray[a].lable;
          _this.descappHyb = goodArray[a].descapp;
          _this.isNewHyb = goodArray[a].is_new;
        }
        // 光汇加油卡
        if(goodArray[a].type_bn == 'amount_refuel_nation_v1'){
          _this.itemsGh = goodArray[a].goods;
          _this.nameGh = goodArray[a].name;
          _this.labelGh = goodArray[a].lable;
          _this.descappGh = goodArray[a].descapp;
          _this.isNewGh = goodArray[a].is_new;
        }
        // 老全国加油卡
        if(goodArray[a].type_bn == 'amount_refuel_nation'){
          _this.itemsQg = goodArray[a].goods;
          _this.nameQg = goodArray[a].name;
          _this.labelQg = goodArray[a].lable;
          _this.descappQg = goodArray[a].descapp;
          _this.isNewQg = goodArray[a].is_new;
        }


      }

    }).catch(error => {
      console.log(error);
    })
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
