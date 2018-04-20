<template lang="html">
  <!-- 已使用/过期 s -->
  <ul class="quan-li quan-li-notuse">
    <li v-for="item in couponData">
      <ul class="quan-li-i">
        <li>
          <p><span>{{item.money}}<i v-if="item.cpns_type == 'annualized'">%</i><i v-if="item.cpns_type != 'annualized'">元</i></span></p>
        </li>
        <li>
          <p class="lh-20">{{item.cpn_name}}</p>
          <p class="mt-10 mb-10 fs-12 c-gray">有效期至: {{item.cpns_end_date}}</p>
        </li>
      </ul>
      <div class="mt-10 fs-12 c-gray hidden">
        <span class="left">{{item.rule_text}}</span>
        <span class="right">{{item.status}}</span>
      </div>
    </li>
  </ul>

  <!-- 已使用/过期 e -->
</template>

<script>
import api from '../../../fetch/ajax.js'
import {mapGetters,mapActions} from 'vuex'
export default {
  props: ['couponData'],
  data() {
    return {
    }
  },

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
.quan-tag{
	display: flex;
	font-size: 15px;
}
.quan-tag span{
	display: inline-block;
	flex: 0 0 50%;
	padding: 15px 0 12px;
    color: #333;
}
.quan-tag span.active{
	border-bottom: 2px solid #fc3536;
    font-weight: bold;
    color: #fc3635;
}
.quan_no {
	display: block;
    width: 2rem;
    height: 2rem;
    margin: 0 auto 0.5rem;
    background-image: url("../img/quan_no.png");
    background-size: 100%;
}
.quan-li{
	padding: 0 15px;
}
.quan-li > li{
	margin-top: 10px;
	padding: 10px;
	border-radius: 4px;
	background: #fff;
	box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
	color: #666;
}
.quan-li-i{
	display: flex;
	border-bottom: 1px dotted #ccc;
	font-size: 15px;
	overflow: hidden;
}
.quan-li-i > li:first-child{
	flex: 0 0 35%;
	padding: 12px 0;
	align-self: center;
	text-align: center;
	font-size: 22px;
}
.quan-li-i i{
	font-style: normal;
	font-size: 15px;
}
.quan-li-notuse,
.quan-li-notuse *,
.quan-li-notuse li.active *{
	color: #ccc!important;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 15px;
  color: #fff;
}
</style>
