<template lang="html">
    <div class="wrap">
        <v-header></v-header>
        <div class="main">
            <cube-scroll ref="scroll" :options="options" :listenScroll="true">
				<ul class="quan-li" v-show="items.length > 0">
					<!-- <li>
            <cube-checkbox v-model="checked" position="right" ref="checked" :option="option">
  						<ul class="quan-li-i">
  							<li>
  								<p><span ref="price">100<i>元</i></span></p>
  							</li>
  							<li>
  								<p class="lh-18">新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款</p>
  								<p class="mt-10 mb-10 fs-12 c-gray">有效期至: 2018/03/28 23:59:59</p>
  							</li>
  							<li>
                </li>
  						</ul>
            </cube-checkbox>
            <p>是否选中{{checked}}</p>
						<div class="mt-10 fs-12 c-gray hidden">
							<span class="left">满9901元可用，产品周期大于等于9可用</span>
							<span class="right">未使用</span>
						</div>
					</li> -->

          <li v-for="(item, index) in items" ref="itemsArr" @click="setItem(item)">
            <cube-checkbox v-model="item.value" position="right" :option="item.opt" ref="itemList" @click.stop>
              <ul class="quan-li-i">
                <li>
                  <p><span ref="price">100<i>元</i></span></p>
                </li>
                <li>
                  <p class="lh-18">新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款</p>
                  <p class="mt-10 mb-10 fs-12 c-gray">有效期至: 2018/03/28 23:59:59</p>
                </li>
                <li>
                  <!-- <span class="active"></span> -->
                </li>
              </ul>
            </cube-checkbox>
            <p>是否选中{{item.value}}</p>
            <div class="mt-10 fs-12 c-gray hidden">
              <span class="left">满9901元可用，产品周期大于等于9可用</span>
              <span class="right">未使用</span>
            </div>
          </li>

          <!-- <li>
            <cube-checkbox v-model="checked" position="right" ref="checked" :option="option">
              <ul class="quan-li-i">
                <li>
                  <p><span ref="price">900<i>元</i></span></p>
                </li>
                <li>
                  <p class="lh-18">新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款</p>
                  <p class="mt-10 mb-10 fs-12 c-gray">有效期至: 2018/03/28 23:59:59</p>
                </li>
                <li>
                </li>
              </ul>
            </cube-checkbox>
            <p>是否选中{{checked}}</p>
            <div class="mt-10 fs-12 c-gray hidden">
              <span class="left">满9901元可用，产品周期大于等于9可用</span>
              <span class="right">未使用</span>
            </div>
          </li>
          <li>
            <cube-checkbox v-model="checked" position="right" ref="checked" :option="option">
              <ul class="quan-li-i">
                <li>
                  <p><span ref="price">9900<i>元</i></span></p>
                </li>
                <li>
                  <p class="lh-18">新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款</p>
                  <p class="mt-10 mb-10 fs-12 c-gray">有效期至: 2018/03/28 23:59:59</p>
                </li>
                <li>

                </li>
              </ul>
            </cube-checkbox>
            <p>是否选中{{checked}}</p>
            <div class="mt-10 fs-12 c-gray hidden">
              <span class="left">满9901元可用，产品周期大于等于9可用</span>
              <span class="right">未使用</span>
            </div>
          </li>
					<li>
            <cube-checkbox v-model="checked1" position="right" ref="checked" :option="option1">
						<ul class="quan-li-i">
							<li>
								<p><span>9900<i>元</i></span></p>
							</li>
							<li>
								<p class="lh-18">新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款</p>
								<p class="mt-10 mb-10 fs-12 c-gray">有效期至: 2018/03/28 23:59:59</p>
							</li>
							<li>
              </li>
						</ul>
            </cube-checkbox>
            <p>是否选中{{checked1}}</p>
						<div class="mt-10 fs-12 c-gray hidden">
							<span class="left">满9901元可用，产品周期大于等于9可用</span>
							<span class="right">未使用</span>
						</div>
					</li>
          <li>
            <cube-checkbox v-model="checked2" position="right" ref="checked" :option="option2">
            <ul class="quan-li-i">
              <li>
                <p><span>9900<i>元</i></span></p>
              </li>
              <li>
                <p class="lh-18">新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款</p>
                <p class="mt-10 mb-10 fs-12 c-gray">有效期至: 2018/03/28 23:59:59</p>
              </li>
              <li>
              </li>
            </ul>
            </cube-checkbox>
            <p>是否选中{{checked2}}</p>
            <div class="mt-10 fs-12 c-gray hidden">
              <span class="left">满9901元可用，产品周期大于等于9可用</span>
              <span class="right">未使用</span>
            </div>
          </li> -->

				</ul>
            </cube-scroll>
        </div>
		<!-- 底部固定按钮 -->
		<a class="btn btn-orange" href="javascript:void(0);" @click="must">确定</a>
    </div>
</template>

<script>
import Vheader from '../header/header.vue'
import api from '../../fetch/ajax.js'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data() {
        return {
          items: [
            {
              value: false,
              opt: {
                label: '465454',
                value: '新春汇油宝666款',
                disabled: false
              }
            },
            {
              value: '新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款',
              opt: {
                label: '465454',
                value: '新春汇油宝9月C款新春汇油宝9月C款新春汇油宝9月C款',
                disabled: false
              }
            },
            {
              value: false,
              opt: {
                label: '465454',
                value: 'true',
                disabled: true
              }
            },
            {
              value: false,
              opt: {
                label: '465454',
                value: '这是其中的一个val',
                disabled: false
              }
            }
          ],
            // checked: false,
            // checked1: false,
            // checked2: 'haha',
            // option: {
            //   label: '465454',
            //   value: 'true',
            //   disabled: false
            // },
            // option1: {
            //   label: '465454',
            //   value: '你真牛',
            //   disabled: false
            // },
            // option2: {
            //   label: '465454',
            //   value: 'haha',
            //   disabled: true
            // },
            options: {
                observeDOM: true,
                click: true,
                probeType: 3,
                scrollbar: false
            }
        }
    },
    methods: {
      setItem(item) {
        console.log(item);
      },
      must() {
        this.setItem()
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
.cube-checkbox {
  border-bottom: 1px dotted #ccc;
}
.cube-checkbox .cube-checkbox-wrap {
  padding: 0!important;
}
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
.quan-li{
	padding: 0 15px;
}
.quan-li > li{
	margin-top: 10px;
	padding: 10px;
	border-radius: 4px;
	background: #fff;
	box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
	color: #666;
}
.quan-li-i{
	display: flex;
	/* border-bottom: 1px dotted #ccc; */
	font-size: 15px;
	overflow: hidden;
}
.quan-li-i > li{
	position: relative;
}
.quan-li-i > li:first-child{
	flex: 0 0 35%;
	padding: 12px 0;
	align-self: center;
	text-align: center;
	font-size: 22px;
}
/* .quan-li-i > li:last-child{
	flex: 0 0 30px;
} */
.quan-li-i > li:last-child span{
	position: absolute;
	width: 16px;
	height: 16px;
	top: 50%;
	right: 0;
	background: url(./img/radio_no.png);
	background-size: 100% auto;
	transform: translate(0,-50%);
}
.quan-li-i > li:last-child span.active{
	background: url(./img/radio.png);
	background-size: 100% auto;
}
.quan-li-i i{
	font-style: normal;
	font-size: 15px;
}
.quan-notuse *{
	color: #ccc!important;
}
.btn-orange{
  padding: 12px 0;
  border-radius: 0;
  background-image: linear-gradient(to right, #ff9d28, #f4bd46);
  font-size: 15px;
  color: #fff;
}
</style>
