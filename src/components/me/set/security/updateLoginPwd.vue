<template lang="html">
  <div class="wrap">
    <v-header title="修改登录密码"></v-header>
    <div class="main">
		<ul class="form-li">
			<li>
				<label>当前密码</label>
        <div class="form-control"><cube-input type="password" :maxlength="20" placeholder="请输入当前密码" v-model="old_passwd" :clearable="clearable"></cube-input></div>
			</li>
			<li>
				<label>新密码</label>
        <div class="form-control"><cube-input type="password" :maxlength="20" placeholder="6-20个字母数字组合" v-model="passwd" :clearable="clearable"></cube-input></div>
			</li>
			<li>
				<label>确认新密码</label>
        <div class="form-control"><cube-input type="password" :maxlength="20" placeholder="再次输入新密码" v-model="passwd_re" :clearable="clearable"></cube-input></div>
			</li>
		</ul>
		<div class="p-15">
			<a class="btn btn-orange" href="javascript:;" @click="updatePwd">确认</a>
		</div>
    </div>
  </div>
</template>

<script>
import Vheader from '../../../header/header.vue'
import api from '../../../../fetch/ajax.js'
export default {
	data() {
		return {
      clearable: true,
      // eye: {
      //   open: false
      // },
      data: '',
      old_passwd: null,
      passwd: null,
      passwd_re: null,
		}
  },
  methods:{
    msg(type, txt) {
      this.$createToast({
        type: type,
        txt: txt,
        time: 2000
      }).show()
    },
    checkLoginPassWord(txt,txtnull,txterror) {
      if(!txt) {
        this.msg('error', txtnull);
        return false
      }
      if(txt && !((/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(txt))) {
        this.msg('error', txterror) //设置登录密码(6~20个字母数字组合)
        return false
      }
      return true
    },
    repeatPaw(txt) {
      if(!txt) {
        this.msg('error', '请再次输入新密码');
        return false
      }
      if(txt && (this.passwd != txt)) {
        this.msg('error', '2次输入密码不一致')
        return false
      }
      return true
    },
    updatePwd() {
      if(this.checkLoginPassWord(this.old_passwd,'请输入当前密码','当前密码错误')&&
        this.checkLoginPassWord(this.passwd,'请输入新密码','新密码为6~20个字母数字组合')&&
        this.repeatPaw(this.passwd_re)) {
          // 校验通过
          api.memberSecurity({
              ver: '5.2.2',
              old_passwd: this.old_passwd,
              passwd: this.passwd,
              passwd_re : this.passwd_re
            }).then(response => {
              if(response.data.status === 10000) {
                this.msg('correct', '修改成功');
                this.$router.push('/login')
              }else {
                this.msg('error', response.data.info);
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
