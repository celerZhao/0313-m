<template lang="html">
	<div class="wrap">
		<v-header></v-header>
		<div class="main">
			<cube-scroll ref="scroll" :options="options" :listenScroll="true">
        <div class="p-15 c-gray">绑定加油卡(仅能绑定一张)</div>
			  <ul class="form-li">
          <li>
            <cube-input :maxlength="maxlength" type="tel" :clearable="clearable" placeholder="请输入加油卡主卡号" @input="changeVal" v-model="value" ref="addCart"></cube-input>
          </li>
          <li>
            <cube-input :maxlength="maxlength" type="tel" :clearable="clearable" placeholder="请再次输入以确认" @input="changeVal" v-model="value1" ref="addCart1"></cube-input>
          </li>
        </ul>
        <div class="mb-10 pr-15 pl-15 lh-20 fs-13"><span class="c-red">*</span>请仔细核对加油卡号，以免充错加油卡号，造成损失，充值成功后，将发送短信至以下手机号</div>
        <div class="p-15 bg-white c-black fs-18">138****8888</div>

        <div class="mt-15 p-15">
					<!-- <router-link to="/fuelCardBuy" class="btn btn-orange">确定绑卡</router-link> -->
					<a href="javascript:void(0);" class="btn btn-orange" @click="okCard">确定绑卡</a>
				</div>

        <div class="p-15 c-gray">
          <p>绑卡说明：</p>
          <ol class="mt-15 lh-20">
            <li>1、一个账户只能绑定一张中石油或中石化个人记名加油卡。</li>
            <li>2、请仔细核对加油卡号，以免充值到他人油卡造成损失。</li>
            <li>3、支持全国中石油/中石化个人记名主卡，不支持副卡、增值税发票卡、BP卡、车队卡、不记名卡。</li>
            <li>4、用户购买加油套餐后，资金会按照充值日程安排自动充值到您绑定的加油卡中，无需客户手动充值。</li>
            <li>5、中石油加油卡客户需自行在中石油昆仑加油卡官网注册账号才可充值。</li>
            <li>6、如您成功购买套餐并充值成功后，需 90 天后才可以更换加油卡号</li>
          </ol>
		    </div>
			</cube-scroll>
		</div>
	</div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	data() {
		return {
      maxlength: 23,
      clearable: true,
			value: '',
			value1: '',
			options: {
				observeDOM: true,
				click: true,
				probeType: 3,
				scrollbar: false
			}
		}
	},
	methods: {
		changeVal() {
			let val = this.value.replace(/\s/g,'').replace(/(\w{4})(?=\w)/g,"$1 ")
			let val1 = this.value1.replace(/\s/g,'').replace(/(\w{4})(?=\w)/g,"$1 ")
			this.value = val
			this.value1 = val1
		},
		okCard() {
			if(!this.value) {
				this.msg('error','请输入加油卡号码');
				return false
			}
			if(this.value && !((/^[0-9]{4}\s{1}[0-9]{4}\s{1}\d{4}\s{1}\d{4}\s{1}\d{3}/g).test(this.value))) {
				this.msg('error','请输入正确的加油卡号码');
				return false
			}
			if(!this.value1) {
				this.msg('error','请再次输入加油卡号码');
				return false
			}
			if(this.value1 && !(this.value1 == this.value)) {
				this.msg('error','2次输入的号码不一致');
				return false
			}

			// ajax
			this.msg('correct','成功了额');

			this.$router.push({path: '/fuelCardBuy'})

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
  font-size: 14px;
  color: #666;
}
.cube-input::after{
  border:none;
}
.form-li{
  margin-bottom: 10px;
  position: relative;
  min-height: 30px;
  background-color: #fff;
  font-size: 16px;
  overflow: hidden;
}
.form-li > li{
  position: relative;
  padding: 0 5px;
  border-bottom: 1px solid #e8e8e8;
}
.form-li > li:last-child{
  border-bottom: 0;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 16px;
  color: #fff;
}
ol > li{
  margin: 5px 0;
}
</style>
