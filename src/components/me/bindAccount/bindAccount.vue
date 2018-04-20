<template lang="html">
  <div class="wrap">
    <v-header></v-header>
    <div class="main">
      <cube-scroll ref="scroll" :options="options" :listenScroll="true">
		<ul class="form-li">
			<li>
				<!--<label>已绑定手机号</label>-->
				<div class="form-control">
          <cube-input :maxlength="11" placeholder="请输入手机号" v-model="userNumber" :clearable="clearable"></cube-input>
        </div>
			</li>
			<li>
				<!--<label>短信验证码</label>-->
        <div class="form-control"><cube-input :maxlength="6" placeholder="请输入短信验证码"></cube-input></div>
				<a class="btn btn-phonecode"  v-bind:class="{'disable':btnDis}"  @click="sendMsg" href="javascript:void(0);" v-html="btnContent">获取验证码</a>
			</li>
		</ul>
		<div class="p-15">
			<!-- 注：表单验证通过后才把class中的disable去掉 -->
			<a class="btn btn-orange {'disable':nextBtn}" href="javascript:;" @click="bindBtn">绑定账号</a>
		</div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import Vheader from '../../header/header.vue'
import api from '../../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			},
      clearable:true,
      btnDis:false,
      nextBtn:true,
      userNumber:'',
      btnContent:'获取验证码',
      second:60, // 倒计时延时时间
      thisInterval:null


		}
	},
	created() {
		
	},
  methods:{
    msg(type, txt) {
      this.$createToast({
        type: type,
        txt: txt,
        time: 1000
      }).show()
    },

    //    按钮倒计时
    btnInterval:function(){
      let _this = this;
      this.thisInterval =  setInterval(function(){
        if(_this.second>0){
          let second = _this.second--;
          _this.btnContent  = '<span style="width:2rem; display:inline-block;" class="text-center">'+second + '(s)</span>';
        }else{
          clearInterval(_this.thisInterval);
          _this.btnContent = '获取验证码';
          _this.second =60;   // 重置倒计时延时时间
          _this.btnDis = false;
        }

      },1000)
    },

    sendMsg:function(){


      if(!this.btnDis){
        if(this.userNumber != ''){
          if(/^[1][3,4,5,7,8][0-9]{9}$/g.test(this.userNumber)){

            this.btnDis =  !this.btnDis;

            this.btnInterval();

            api.sendDxCode({}).then(response => {
              console.log(response);
            }).catch(error => {
              console.log(error);
            })

          }else{
            this.msg('error','手机号码不正确')
          }
        }else{
          this.msg("error","请输入手机号");
        }

      }
    },
    bindBtn:function(){



      this.$router.push('/me');
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
  /*left: 110px;*/
  top: 50%;
  /*right: 15px;*/
  min-height: 24px;
  line-height: 24px;
  border: none;
  background: none;
  text-align: left;
  font-size: 14px;
  outline: none;
  transform: translate(0,-50%);
  width:90%;
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