<template lang="html">
  <div class="wrap">
    <v-header title="找回支付密码"></v-header>
    <div class="main">
        <!-- step 1 s-->
        <div>
      		<ul class="form-li">
      			<li>
      				<label>已绑定手机号</label>
      				<div class="form-control"><span class="ml-10 c-darkgray">{{phone | checkphone}}</span></div>
      			</li>
      			<li>
      				<label>短信验证码</label>
              <div class="form-control"><cube-input v-model="dxCode" :maxlength="6" placeholder="请输入短信验证码" :clearable="clearable"></cube-input></div>
              <a class="btn btn-phonecode" href="javascript:void(0);" @click="getDxCode" v-if="!unbind">获取验证码</a>
              <a class="btn btn-phonecode" href="javascript:void(0);" :class="{disable:unbind}" v-else>{{time+'秒后获取'}}</a>
      			</li>
      		</ul>
      		<div class="p-15">
      			<!-- 注：表单验证通过后才把class中的disable去掉 -->
      			<a class="btn btn-orange" :class="{disable: !dxCode}" href="javascript:;" @click="nextStep" ref="nextStep">下一步</a>
      		</div>
        </div>
        <!-- step 1 e-->
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
      unbind: false, // 是否可以点击
      time: 120,
      clearable: true,
      dxCode: null,
      interval:null,
		}
	},
  filters: {
    checkphone(phone) {
      return phone.replace(/(\d{3})\d{4}(\d{4})/,'$1****$2')
    }
  },
  computed: {
    ...mapGetters([
      'phone'
    ])
  },
  methods:{
    msg(type, txt) {
      this.$createToast({
        type: type,
        txt: txt,
        time: 1000
      }).show()
    },
    // 短信验证码校验
    checkDxCode(txt) {
      if(!txt) {
        this.msg('error', '请输入短信验证码');
        return false
      }
      if(txt && !((/^[0-9]{6}$/).test(txt))) {
        this.msg('error', '请输入正确短信验证码')
        return false
      }
      return true
    },
    // 验证码倒计时
    sendCodeInit() {
      this.unbind = true;
      this.interval = window.setInterval(() => {
        if((this.time--) <= 1) {
          window.clearInterval(this.interval);
          this.unbind = false;
          this.time = 120;
        }
      }, 1000);
    },
    // 获取验证码
    getDxCode() {
      api.sendDxCode({
        uname: this.phone,
        type: 'change-pay-password',
        ver: '5.2.1'
      }).then(response => {
        if(response.data.status === 10000) {
          this.msg('correct', '获取验证码成功');
          this.sendCodeInit();
        }else {
          this.msg('error', '获取验证码失败');
        }
      }).catch(error => {
        console.log(error);
      })
    },
    nextStep() {
      if(!(this.dxCode)) {return}
      // 校验通过
      if(this.checkDxCode(this.dxCode)) {
        api.forgetJyPasswordOne({
          mobile: this.phone,
          vcode: this.dxCode
        }).then(response => {
          if(response.data.status === 10000) {
            this.$router.push('/FindPaymentPwdStep2')
          }else {
            this.msg('correct', response.data.info);
          }

        }).catch(error => {
          console.log(error);
        })
      }
    }

  },
  beforeDestroy() {
    window.clearInterval(this.interval);
    this.unbind = false
    this.time = 120
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
.cube-input {width: 56%;}
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
