<template lang="html">
  <div class="wrap">
    <v-header></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
    		<ul class="form-li">
    			<li>
    				<label>手机号码</label>
    				<div class="form-control"><span class="ml-10 c-darkgray">{{phone | formatPhone}}</span></div>
    			</li>
    			<li>
    				<label>短信验证码</label>
            <div class="form-control"><cube-input v-model="valiCode" :maxlength="6"  placeholder="请输入短信验证码"></cube-input></div>
    				<!-- 注：点击获取验证码后，在class中添加disable -->
            <a class="btn btn-phonecode" href="javascript:void(0);" @click="getDxCode" v-if="!unbind">获取验证码</a>
            <a class="btn btn-phonecode" href="javascript:void(0);" :class="{disable:unbind}" v-else>{{time+'秒后获取'}}</a>
    			</li>
    			<li>
    				<label>支付密码</label>
            <div class="form-control"><cube-input :eye="eye" type="password" v-model="paymentPwd" :maxlength="6" placeholder="请设置6位密码，在使用余额时使用"></cube-input></div>
    			</li>
    			<li>
    				<label>确认密码</label>
            <div class="form-control"><cube-input :eye="eye" type="password" v-model="rePaymentPwd" :maxlength="6" placeholder="请再次输入"></cube-input></div>
    			</li>
    		</ul>
    		<div class="p-15">
    			<a class="btn btn-orange" href="javascript:void(0);" @click="finshed">完成</a>
    		</div>
      </cube-scroll>
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
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			},
      unbind: false,
      interval: null,
      time: 10,
      eye: {
        open: false
      },
      valiCode:'',
      paymentPwd:'',
      rePaymentPwd:'',
		}
	},
  computed: {
    ...mapGetters([
      'phone'
    ])
  },
  filters: {
    formatPhone(text) {
      return text.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    }
  },
  deactivated() {
    this.valiCode = ''
    this.paymentPwd = ''
    this.rePaymentPwd = ''
    window.clearInterval(this.interval);
    this.unbind = false;
    this.time = 10;
  },
  methods:{
    // ...mapMutations({
    //   'modifyPayPassword': 'PAY_PASSWORD'
    // }),
    ...mapActions([
      'setPayFlag'
    ]),
    msg(type, txt) {
      this.$createToast({
        type: type,
        txt: txt,
        time: 1000
      }).show()
    },
    // 验证码倒计时
    sendCodeInit() {
      this.unbind = true;
      this.interval = window.setInterval(() => {
        if((this.time--) <= 1) {
          window.clearInterval(this.interval);
          this.unbind = false;
          this.time = 10;
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
    // 支付密码校验
    checkPay(txt) {
      if(!txt) {
        this.msg('error', '请设置支付密码');
        return false
      }
      if(txt && !((/^[0-9]{6}$/).test(txt))) {
        this.msg('error', '请输入正确的支付密码')
        return false
      }
      return true
    },
    // 确认密码校验
    repeatPay(txt) {
      if(!txt) {
        this.msg('error', '请再次输入支付密码');
        return false
      }
      if(txt && (txt != this.paymentPwd)) {
        this.msg('error', '2次输入的密码不正确')
        return false
      }
      return true
    },
    finshed() {
      if(this.checkDxCode(this.valiCode)&&this.checkPay(this.paymentPwd)&&this.repeatPay(this.rePaymentPwd)) {
        api.setJyPassword({
          'transaction_pass': this.paymentPwd,
           devInfo:'324335'
        }).then((response) => {

          if(response.data.status === 10000) {
            this.$router.push('/security');
            this.msg('correct', '交易密码设置成功')
            this.setPayFlag(true)
          }else {
            this.msg('error', response.data.info)
          }

        }).catch((error) => {
          console.log(error);
        })
      }
    }
  },
	mounted() {
		this.$nextTick(function() {
			this.$refs.scroll.scroll.scrollTo(0,0);
		})
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
  left: 100px;
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
