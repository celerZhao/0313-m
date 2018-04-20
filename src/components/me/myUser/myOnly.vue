<template lang="html">
  <div class="myOnly">
    <div class="h-pro">
      <h5 class="h-title" @click="showList">{{userData.privileges[0].identity_name}}
        <i :class="show ? 'icon-xiangxiafanye' : 'icon-xiangshangfanye'"></i>
      </h5>
      <ul class="fuel-li" v-show="show">
        
        <li v-for="item in userData.privileges[0].items" ><router-link to="#"><img v-bind:src="item.icon"><div class="mt-10">{{item.privilege_name}}</div></router-link></li>
        
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  props: ['userData'],
  created() {
    console.log(this.userData);
  },
  methods: {
    showList() {
      this.show = !this.show
    }
  }
}
</script>

<style lang="css" scoped>
.h-pro{
	margin-top: 10px;
  padding: 15px;
  background-color: #fff;
  font-size: 16px;
  color: #666;
}
.h-title{
	padding-bottom: 10px;
  font-size: 14px;
  border-bottom: 1px solid #e8e8e8;
}
.h-title .icon-xiangxiafanye,
.h-title .icon-xiangshangfanye{
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
