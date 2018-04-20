<template lang="html">
  <div class="wrap">
    <v-header title="安全中心"></v-header>
    <div class="main">
    		<ul class="form-li">
    			<li>
    				<a href="javascript:void(0);" @click="setPayPsw">
    					<label>设置交易密码</label>
    					<div class="form-control"><span class="c-gray" v-html="favoriteText"></span></div>
    					<i class="icon-right"></i>
    				</a>
    			</li>
    			<li>
    				<router-link to="/FindPaymentPwd">
    					<label>重置交易密码</label>
    					<i class="icon-right"></i>
    				</router-link>
    			</li>
    			<li>
    				<router-link to="/updateLoginPwd">
    					<label>修改登录密码</label>
    					<i class="icon-right"></i>
    				</router-link>
    			</li>
  	    </ul>
    </div>
  </div>
</template>

<script>
import Vheader from '../../../header/header.vue'
import api from '../../../../fetch/ajax.js'
import {mapGetters,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
      // usercenter: {},
      // favorite: (() => {
      //   return loadFromLocal(this.phone, 'favorite', false)
      // })()
		}
	},
  computed: {
    ...mapGetters([
      'payPassword',
      'usercenter',
      'phone'
    ]),
    isRZ() {
      return (this.usercenter.realname_auth == 'true') ? '已认证' : '未认证'
    },
    trade_pwd() {
      return (this.usercenter.trade_pwd_auth == 'true') ? true : false
    },
    favoriteText() {
      return this.trade_pwd ? '已设置' : '未设置'
    }
  },
  methods: {
    msg(type, txt) {
      this.$createToast({
          type: type,
          txt: txt,
          time: 1000
        }).show()
    },
    ...mapMutations({
      findPayPwd: 'FIND_PAY_PAW'
    }),
    setPayPsw() {
      if(this.isRZ == '已认证') {
        if(this.trade_pwd) {
          this.$router.push('/updatePaymentPwd')
        }else {
          this.$router.push('/setPaymentPwd')
        }

      }else {
        this.msg('error', '请先实名认证！')
      }
    }
  },
	created() {
    if(!this.usercenter.true_name_sub) {
      this.$router.push('/me')
    }
	},
  // activated() {
  //   api.userIndex({
  //     ver: '5.2.2'
  //    }).then(response => {
  //       this.usercenter = response.data.data.dataList
  //    }).catch(error => {
  //      console.log(error);
  //    })
  // },
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
