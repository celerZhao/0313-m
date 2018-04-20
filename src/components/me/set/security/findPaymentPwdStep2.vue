<template lang="html">
  <div class="wrap">
    <v-header title="找回支付密码"></v-header>
    <div class="main">
		<ul class="form-li">
			<li>
				<label>真实姓名</label>
				<div class="form-control"><span class="ml-10 c-darkgray">{{usercenter.true_name_sub}}</span></div>
			</li>

      <li>
        <label>证件号码</label>
        <div class="form-control"><cube-input :clearable="clearable" type="tel" v-model="IDnum" :maxlength="18" placeholder="请输入您的身份证号码"></cube-input></div>
      </li>

      <li>
        <label>银行卡号</label>
        <div class="form-control"><cube-input :clearable="clearable" type="tel" v-model="banCkard" :maxlength="20" placeholder="请输入当前绑定的银行卡号"></cube-input></div>
      </li>
		</ul>
		<div class="p-15">
			<!-- 注：表单验证通过后才把class中的disable去掉 -->
			<a class="btn btn-orange" :class="{disable: dis}" href="javascript:;" @click="nextStep">下一步</a>
		</div>
    </div>
  </div>
</template>

<script>
import Vheader from '../../../header/header.vue'
import api from '../../../../fetch/ajax.js'
import {mapGetters} from 'vuex'
export default {
	data() {
		return {
      clearable: true,
      IDnum:'',
      banCkard:''
		}
	},
  deactivated() {
    this.IDnum = ''
    this.banCkard = ''
  },
  computed: {
    dis() {
      if(this.IDnum && this.banCkard) {
        return false
      }
      return true
    },
    ...mapGetters([
      'findPayPwd',
      'usercenter'
    ])
  },
	created() {
		// this.name = this.findPayPwd;
    if(!this.usercenter.true_name_sub) {
      this.$router.push('/me')
    }
	},
  methods:{
    msg(type, txt) {
      this.$createToast({
        type: type,
        txt: txt,
        time: 1000
      }).show()
    },
    checkID(txt) {  // 校验省份证
      if(!txt) {
        this.msg('error', '请输入身份证号码');
        return false
      }
      if(txt && !((/^[0-9]{18}$/).test(txt))) {
        this.msg('error', '请输入正确身份证号码')
        return false
      }
      return true
    },
    checkBankCard(txt) {  // 校验银行卡
      if(!txt) {
        this.msg('error', '请输入银行卡号码');
        return false
      }
      if(txt && !((/^[0-9]{19}$/).test(txt))) {
        this.msg('error', '请输入正确银行卡号码')
        return false
      }
      return true
    },
    nextStep() {
      // if(!this.dis) {return}
      if(this.checkID(this.IDnum)&&(this.checkBankCard(this.banCkard))) {
        api.forgetJyPasswordTwo({
          'identity_no': this.IDnum,  //441323200902173016
          'bank_account': this.banCkard  //6222084000005212249
        }).then(response => {
          if(response.data.status === 10000) {
            this.$router.push('/findPaymentPwdStep3');
          }else {
            this.msg('error', response.data.info)
          }

        }).catch(error => {
          console.log(error);
        })
      }
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
.cube-input::after{
  border:none;
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
.form-li label{
  color: #000;
}
.form-li .form-control{
  display: block;
  position: absolute;
  left: 110px;
  top: 50%;
  right: 15px;
  min-height: 24px;
  line-height: 24px;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
  outline: none;
  transform: translate(0,-50%);
}
.form-li .form-control span{
  margin-right: 15px;
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
.btn-phonecode{
  position: absolute;
  right: 15px;
  top: 50%;
  display: inline-block;
  width: auto;
  padding: 5px 10px;
  border:1px solid #f95e30;
  background-color: #f95e30;
  border-radius: 3px;
  color: #fff;
  transform: translate(0,-50%);
}
.btn-orange{
  padding: 12px 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
.btn-orange.disable{
  background: #ccc;
  color: #fff;
}
</style>
