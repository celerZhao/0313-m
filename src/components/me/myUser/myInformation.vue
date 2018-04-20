<template lang="html">
  <div class="information">
      <!-- 我的信息 s -->
      <ul class="form-li">
        <li>
          <router-link to="/myBank">
            <label>实名认证</label>
            <div class="form-control"><span class="c-darkgray">{{userData.true_name_sub}}</span></div>
            <i class="icon-right"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/myBank">
            <label>银行卡</label>
            <div class="form-control"><span class="c-darkgray">{{userData.bank_account}}</span></div>
            <i class="icon-right"></i>
          </router-link>
        </li>
      </ul>
      <!-- 我的信息 e -->
  </div>
</template>

<script>
export default {
  props: ['userData'],
  created() {
    console.log(this.userData);
  }
}
</script>

<style lang="css" scoped>
.information{
	margin-top: 10px;
}
.h-title{
	padding-bottom: 10px;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
}
.h-title .icon-xiangxiafanye{
  position: relative;
  top: 3px;
  float: right;
  font-size: 14px;
  color: #666;
}
.fuel-li{
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	background-color: #fff;
}
.fuel-li > li{
	position: relative;
	flex: 0 0 50%;
	margin: 5px 0;
	text-align: center;
}
.fuel-li > li:after{
	display: inline-block;
	content: '';
	position:absolute;
	right:0;
	top: 20px;
	bottom: 20px;
	border-right: 1px solid #e8e8e8;
}
.fuel-li > li:nth-child(even):after{
	border: 0;
}
.fuel-li > li > a{
	display: block;
	padding: 10px;
	box-sizing: border-box;
	font-size: 14px;
	color: #666;
}
.form-li{
  margin-bottom: 10px;
  position: relative;
  min-height: 30px;
  background-color: #fff;
  font-size: 15px;
  overflow: hidden;
}
.form-li > li{
  position: relative;
  min-height: 24px;
  line-height: 24px;
  padding: 12px 15px;
  border-bottom: 1px solid #e8e8e8;
}
.form-li > li:last-child{
  border-bottom: 0;
}
.form-li > li > a{
    display: block;
}
.form-li label{
  color: #000;
}
.form-li .form-control{
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
  transform: translate(0,-50%);
}
.form-li .form-control span{
  margin-right: 30px;
}
.form-li .form-control span i{
  font-style: normal;
}
.form-li .form-control a{
  position: absolute;
  top: 50%;
  right: 15px;
  width: 70px;
  padding: 6px 0;
  border-radius: 20px;
  text-align: center;
  font-size: 15px;
  transform: translate(0,-50%);
}
.form-li .icon-right{
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 18px;
  transform: translate(0,-50%);
}
</style>
