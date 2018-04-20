<template lang="html">
  <div class="wrap">
    <v-header title="设置中心"></v-header>
    <div class="main">
		<ul class="row form form-li">
			<li>
				<router-link to="/security">
          <label>安全中心</label>
					<i class="icon-right"></i>
				</router-link>
			</li>
	    </ul>
		<ul class="row form form-li">
			<li>
        <router-link to="/noteList">
          <label>消息中心</label>
          <div class="form-control"><span class="c-gray" v-show="usercenter.unread_msg != '0'">{{usercenter.unread_msg}}条未读</span></div>
          <i class="icon-right"></i>
        </router-link>
			</li>
			<li>
        <router-link to="/helpCenter">
          <label>帮助中心</label>
          <i class="icon-right"></i>
        </router-link>
			</li>
			<li>
        <router-link to="/legalDeclaration">
          <label>法律声明</label>
          <i class="icon-right"></i>
        </router-link>
			</li>
			<li>
				<label>当前版本</label>
				<div class="form-control"><span class="c-darkgray">1.0</span></div>
			</li>
	    </ul>

		<a class="btn btn-orange mt-15 mr-15 ml-15" href="javascript:void(0);" @click="ecxt">退出账号{{phone | checkphone}}</a>
    </div>
  </div>
</template>

<script>
import Vheader from '../../header/header.vue'
import api from '../../../fetch/ajax.js'
import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
      noSee: 0,
      dataList: [],
      userData: {}
		}
	},
  computed: {
    ...mapGetters([
      'phone',
      'usercenter'
    ])
  },
  watch: {
    'usercenter.unread_msg'(val,oldval) {
      console.log(val+'==='+oldval);
      return val
    }
  },
  created() {
    if(!this.usercenter.unread_msg) {
      this.$router.push('/me')
    }
     // api.userIndex({
     //   ver: '5.2.2'
     //  }).then(response => {
     //     this.userData = response.data.data.dataList
     //  }).catch(error => {
     //    console.log(error);
     //  })
  },
  filters: {
    checkphone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
    }
  },
  methods: {
    ...mapMutations({
      setToken: 'TOKEN'
    }),
    ecxt() {
      window.sessionStorage.setItem('token','')
      this.$router.push('/home')
    }
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
  background: #f6f6f6;
  box-sizing: border-box;
  padding: 0;
}
.form-li{
  margin-top: 10px;
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
.form-li label i{
  margin-right: 0.2rem;
  color: #fd9a27;
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
  border-radius: 1rem;
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
