<template lang="html">
  <div class="wrap">
    <v-header></v-header>
    <div class="main">
    		<ul class="form">
          <li>
            <dl>
              <dt class="left">国家地区</dt>
              <dd class="right" @click="showPicker"><input type="text" class="select-input tr" readonly="readonly" value="中国大陆+86" ref="selectCity"></dd>
            </dl>
            <i class="icon-right"></i>
          </li>
          <li>
            <cube-input v-model="phone" type="tel" :maxlength="11" :clearable="clearable" placeholder="请输入手机号码"></cube-input>
          </li>
          <li class="setWidth">
            <cube-input v-model="imgCode" :maxlength="4" :clearable="clearable" placeholder="请输入图形验证码"></cube-input>
            <img @click="getImgCode" ref="imgCode" class="imgVcode" src="">
          </li>
          <li class="setWidth">
            <cube-input v-model="dxCode" :maxlength="6" :clearable="clearable" placeholder="请输入短信验证码"></cube-input>
            <a class="btn btn-phonecode" href="javascript:void(0);" @click="getDxCode" v-if="!unbind">获取验证码</a>
            <a class="btn btn-phonecode" href="javascript:void(0);" :class="{disable:unbind}" v-else>{{time+'秒后获取'}}</a>
          </li>
          <li>
            <cube-input v-model="setLoginPsw" type="password" :maxlength="20" :clearable="clearable" placeholder="设置登录密码(6~20个字母数字组合)"></cube-input>
          </li>
        </ul>
        <div class="p-15 bg-white">
          <div class="mb-10 fs-14 c-darkgray">注册即代表阅读并同意<a class="c-blue" href="javascript:;">会员注册协议</a></div>
          <a class="btn btn-orange" href="javascript:javascript:void(0);" @click="registerSub">注册</a>

          <div class="mt-10 fs-16 tc">已有账号？<router-link to="/login" class="c-red">登录</router-link></div>
        </div>
    </div>
		<div class="copyright">Copyright@深圳光汇云油电商有限公司</div>
  </div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapGetters} from 'vuex'
export default {
  data() {
    return {
      unbind: false, // 是否可以点击
      time: 120,
      key: '',
      country: 86,
      countryCode: [],
      clearable: true,
      interval: null,
      eye: {open: true},
      phone: '',
      imgCode: '',
      dxCode: '',
      setLoginPsw: ''
    }
  },
  created() {
    // 获取图形验证码
    this.getImgCode();
  },
  mounted() {
    // 获取图形验证码
    //this.getImgCode();
    // 地区选择
    this.$nextTick(function() {
      // 获取国家地区的代码
      api.getCountry().then(response => {
        this.countryCode = response.data.data.dataList
        const new_country = this.countryCode
        new_country.forEach(item => {
          item.text = `${item.country} +${item.code}`
          item.value = `${item.country} +${item.code}`
        })
        this.picker = this.$createPicker({
          title: '',
          data: [new_country],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            this.$refs.selectCity.value = selectedVal.join(', ');
            let index = selectedVal.join().lastIndexOf('+')
            this.country = selectedVal.join().substring(index+1, selectedVal.join().length)
          },
          onCancel: () => {
          }
        });

      }).catch(error => {
        console.log(error);
      })
    })
  },
  computed: {
      ...mapState({
      imgCode1: state => state.com.imgCode
    }),
    // ...mapGetters([
    //   'imgCode'
    // ])
  },
  beforeDestroy() {
    // console.log(12121212);
    // this.phone = ''
    // this.setLoginPsw = ''
    // this.dxCode = ''
    // this.imgCode = ''
    window.clearInterval(this.interval)
    this.unbind = false
    this.time = 120
  },
  methods: {
    ...mapMutations({
      saveImgCode: 'IMGCODE'
    }),
    // 地区选择
    showPicker() {
      this.picker.show();
    },
    // 手机号码验证
    checkphone(txt) {
      if(!txt) {
        this.msg('error', '请输入手机号码');
        return false
      }
      if(txt && !((/^(13[0-9]|(14[5|7])|15([0-3]|[5-9])|18[0,5-9])\d{8}$/).test(txt))) {
        this.msg('error', '请输入正确手机号码')
        return false
      }
      return true
    },
    // 图形验证码校验
    checkImgCode(txt) {
      if(!txt) {
        this.msg('error', '请输入图形验证码');
        return false
      }
      if(txt && !((/^[0-9A-Za-z]{4}$/).test(txt))) {
        this.msg('error', '请输入正确图形验证码')
        return false
      }
      return true
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
    // 设置登录密码校验
    checkLoginPassWord(txt) {
      if(!txt) {
        this.msg('error', '请设置登录密码');
        return false
      }
      if(txt && !((/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(txt))) {
        this.msg('error', '设置登录密码(6~20个字母数字组合)')
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
          this.time = 120
        }
      }, 1000);
    },
    // 获取验证码
    async getDxCode() {
      try {
        if(this.checkphone(this.phone)) {
          let data = await api.userCheckMobile({uname : this.phone,
          country_code: this.country})
          if(data.data.status == 10000) {
            api.sendDxCode({
              uname: this.phone,
              type:'signup',
              country_code: this.country
            }).then(response => {
              this.msg('correct', '发送验证码成功');
              this.sendCodeInit();
            }).catch(error => {
              console.log(error);
            })
          }else {
            this.msg('error', '该手机号码已经注册过');
            return false
          }
        }

      } catch(error) {
        console.log(error);
      }
    },
    // 注册
    registerSub() {
      console.log(this.imgCode1);
      if(this.checkphone(this.phone)&&this.checkImgCode(this.imgCode)&&this.checkDxCode(this.dxCode)&&this.checkLoginPassWord(this.setLoginPsw)) {
        // ajax 请求
        api.userRegist({
          login_name: this.phone,
          login_password: this.setLoginPsw,
          psw_confirm: this.setLoginPsw,
          country_code: this.country,
          vcode: this.dxCode,
          verificationCode: this.imgCode,
          captchaKey: this.imgCode1
        }).then((response) => {  //60006
          if(response.data.status === 10000) {
            this.msg('correct', '注册成功');
            this.$router.push('/login')
            return
          }
          if(response.data.status === 10015) {
            this.msg('error', '图片验证码错误');
            return
          }
          if(response.data.status === 60006) {
            this.msg('error', '手机验证码错误');
            return
          }

        }).catch((error) => {
          console.log(error);
        })
      }
    },
    // 获取验证码
    getImgCode() {
      //this.saveImgCode('保存测试验证码')
      api.getImgCode().then(response => {
        this.$refs.imgCode.src = `data:image/png;base64,${response.data.data.base64Img}`;
        this.key = response.data.data.captchaKey
        this.saveImgCode(response.data.data.captchaKey)
      }).catch(error => {
        console.log(error);
      });
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
.setWidth>.cube-input {
  width: 60%;
}
.cube-input::after{
  border:none;
}
.form dl,
.form > li{
  position: relative;
  min-height: 26px;
  line-height: 26px;
  padding: 0 5px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fff;
  font-size: 16px;
  overflow: hidden;
}
.form dl{
  padding: 8px 15px 8px 10px;
  border-bottom: 0;
  color: #161616;
}
.form .form-control{
  display: block;
  width: 100%;
  height: 26px;
  line-height: normal;
  border: none;
  background: none;
  font-size: 16px;
  outline: none;
}
.form .icon-right{
  position: absolute;
  right: 10px;
  top: 50%;
  font-size: 22px;
  transform: translate(0,-50%);
}
.btn-phonecode{
  position: absolute;
  right: 15px;
  top: 50%;
  display: inline-block;
  width: auto;
  padding: 2px 8px;
  border:1px solid #f95e30;
  border-radius: 3px;
  color: #f95e30;
  transform: translate(0,-50%);
}
.select-input{
  margin-right: 10px;
  border: none;
  background-color: transparent!important;
}
.imgVcode{
  position: absolute;
  right: 15px;
  top: 50%;
	width: 92px;
	height: 32px;
  transform: translate(0,-50%);
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
