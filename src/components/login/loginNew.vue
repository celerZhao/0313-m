<template lang="html">
  <div class="wrap">
    <v-header></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <ul class="form">
          <li>
            <cube-input v-model="phone" type="tel" :maxlength="11" :clearable="clearable" placeholder="请输入手机号码"></cube-input>
          </li>
          <li>
            <cube-input v-model="loginPsw" :maxlength="20" :clearable="clearable" placeholder="请输入密码(6~20个字母数字组合)"></cube-input>
          </li>
        </ul>
        <div class="p-15 bg-white">
          <div class="mb-10 fs-14 tr">
            <router-link to="#" class="c-blue">忘记密码？</router-link>
          </div>
          <a class="btn btn-orange mt-10" href="javascript:javascript:void(0);" @click="submit">登录</a>
          <div class="mt-10 fs-16 tc"><router-link class="c-red" to="/register">立即注册</router-link></div>
        </div>

        <div class="other-login"><span>第三方账号登录</span></div>
        <ul class="other-login-sel">
          <li>
            <img src="./img/wx.png">
            <p>微信</p>
          </li>
          <li>
            <img src="./img/qq.png">
            <p>QQ</p>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <div class="copyright">Copyright@深圳光汇云油电商有限公司</div>
  </div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data() {
    return {
      clearable: true,
      phone: '',
      loginPsw: '',
      options: {
        observeDOM: true,
        click: true,
        probeType: 3,
        scrollbar: false
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.scroll.scroll.scrollTo(0,0);
    })
  },
  methods: {
    ...mapMutations({
      setToken: 'TOKEN'
    }),
    // 手机号码验证
    checkphone(txt) {
      if(!txt) {
        this.msg('error', '请输入手机号码');
        return false
      }
      if(txt && !((/^1[3-8]\d{9}$/).test(txt))) {
        this.msg('error', '请输入正确手机号码')
        return false
      }
      return true
    },
    //登录密码校验
    checkLoginPassWord(txt) {
      if(!txt) {
        this.msg('error', '请输入登录密码');
        return false
      }
      if(txt && !((/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(txt))) {
        this.msg('error', '设置登录密码(6~20个字母数字组合)')
        return false
      }
      return true
    },
    submit() {
      if(this.checkphone(this.phone)&&this.checkLoginPassWord(this.loginPsw)) {
        // ajax 请求
        api.userLogin({
//          account: '18520829695',
//          password: 'a123456',

//          account: '18566210351',
//          password: 'dazhen520134',

//          account: '18970147799',
//          password: 'test222',

          account:'13811110240',
          password:'a123456',

//          account:'13876128396',
//          password:'qwe123',

//          account:'13876128399',
//          password:'qwe123',

//          account:'16326353593',
//          password:'qwe123',

//          account: "13874745858",
//          password:'qwe123',

//          account: "15899798427",
//          password:'qwe123',




          devinfo: 'v1.0.01'
        }).then(response => {
          this.msg('correct', '登录成功');
          // 设置token
          // this.setToken(response.data.data.token);
          console.log(response.data.data.token);
          window.sessionStorage.setItem('token',response.data.data.token)
          // this.setToken('eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxODAzMzQyMDkxMCIsIm1lbWJlcklkIjoiMzAwMDk0NCIsImxvZ2luVHlwZSI6ImFhIiwiZXhwaXJlIjoxNTIyOTEwNzI1NjU3fQ.YaCtbjvk_5POCHKZhdeUF95gXE_dRBPcC6cFMUQPSBKGepEQSupOUPFs65tcoRl7XY2nkvVJ0gQLPy3fuAJ4hJY-i5Dvr4M1DXgptqUs8OOPdzP6gBS6nn9Yc7cgncDREKdJGDX57CrP5CUEAqTCu5KIOMSRwICZdrHIU43nRDc');
          this.$router.push('/home');
        }).catch(error => {
          this.msg('error', '登录失败');
          console.log(error);
        })
      }
    },
    // 弹窗提示
    msg(type, txt) {
      this.$createToast({
          type: type,
          txt: txt,
          time: 1000
        }).show()
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
.form > li{
  position: relative;
  min-height: 26px;
  padding: 0 5px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  font-size: 16px;
  overflow: hidden;
}

.other-login{
  position: relative;
  margin: 30px 0;
  text-align: center;
}
.other-login:before,
.other-login:after{
  content: '';
  position: absolute;
  top: 0.55rem;
  left: 0;
  width: 30%;
  height: 1px;
  border-bottom: 1px solid #e8e8e8;
}
.other-login:after{
  left: inherit;
  right: 0;
}
.other-login span{
  display: inline-block;
  font-size: 0.45rem;
}
.other-login-sel{
  display: flex;
}
.other-login-sel li{
  flex: 0 0 50%;
  text-align: center;
}
.other-login-sel > li > img{
  width: 1.5rem;
}
.other-login-sel > li > p{
  margin-top: 0.2rem;
  font-size: 0.4rem;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
.copyright{
  padding: 15px 0;
  text-align: center;
  font-size: 14px;
  color: #999;
}
</style>
