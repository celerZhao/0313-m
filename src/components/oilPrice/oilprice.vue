<template lang="html">
  <div class="oliprice-wrap">
    <v-header title="油价走势图"></v-header>
    <div class="content">
        <div class="select">
          <div class="select-item slect-left" @click="showCity">
            <div class="input-content">
              <input type="text" value="北京/北京" class="input ellipsis" readonly ref="input1">
            </div>
            <div class="option-dropdown"></div>
          </div>
          <div class="select-item slect-right" @click="showOil">
            <div class="input-content">
              <input type="text" name="" value="V汽油92#" class="input ellipsis" readonly ref="input2">
            </div>
            <div class="option-dropdown"></div>
          </div>
        </div>
        <p class="desc">北京/北京参考油价6.58元/升</p>
        <div class="tab-box">
          <div v-for="(item, index) in items" class="tab-item" :class="{active: item.isAction}" @click="toggleTab(item.name, index)">{{item.text}}</div>
        </div>
        <div class="oil-price-wrap">
          <p class="oil-desc">手指移至下方折线图上,可查看近期油价</p>
          <div class="fold-line">
              <three :is="currentView"></three>
          </div>
        </div>


    </div>
  </div>
</template>

<script>
import Vheader from '../header/header.vue'
import three from './foldLine/threeline.vue'
import six from './foldLine/sixline.vue'
import twelve from './foldLine/twelveline.vue'
import {provinceList,cityList} from './city.js'
const cityData = provinceList
cityData.forEach(province => {
  province.children = cityList[province.value]
  // province.children.forEach(city => {
  //   city.children = areaList[city.value]
  // })
})
const colData = [{text: 'IV汽油97#', value: 'IV汽油97#'},
                 {text: 'V汽油92#', value: 'V汽油92#'},
                 {text: 'V汽油93#', value: 'V汽油93#'},
                 {text: 'V汽油95#', value: 'V汽油95#'},
                 {text: 'IV柴油0#', value: 'IV柴油0#'},
                 {text: 'V柴油0#', value: 'V柴油0#'}];

export default {
  data() {
    return {
      currentView: 'Three',
      items: [
        {
          text: '3个月',
          name: 'Three',
          isAction: true
        },
        {
          text: '6个月',
          name: 'Six',
          isAction: false
        },
        {
          text: '12个月',
          name: 'Twlve',
          isAction: false
        }
      ],
      options: ['北京','上海','深圳'],
      options1:  ['剧毒','梅肯','输出'],
      value: 2016,
      title: '入职时间',
      placeholder: '请选择地区',
      autoPop: false,
      disabled: false
    }
  },
  mounted () {
    this.$nextTick(function() {
      this.cityPicker = this.$createCascadePicker({
        title: '',
        data: cityData,
        onSelect: (selectedVal, selectedIndex, selectedText) => {
          this.$refs.input1.value = selectedText.join('/');
          // this.$createDialog({
          //   type: 'warn',
          //   content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/>
          //     - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
          //   icon: 'cubeic-alert'
          // }).show()
        },
        onChange:(index, selectedIndex) => {
          console.log('change');
        },
        onCancel: () => {
          this.$createToast({
            type: 'correct',
            txt: 'Picker canceled',
            time: 1000
          }).show()
        }
      })
    })

    // 油型号选择
    this.picker = this.$createPicker({
      title: '',
      data: [colData],
      onSelect: (selectedVal, selectedIndex, selectedText) => {
        this.$refs.input2.value = selectedText;
        // this.$createDialog({
        //   type: 'warn',
        //   content: `Selected Item: <br/> - value: ${selectedVal.join(', ')} <br/>
        //     - index: ${selectedIndex.join(', ')} <br/> - text: ${selectedText.join(' ')}`,
        //   icon: 'cubeic-alert'
        // }).show()
      },
      onCancel: () => {
        // this.$createToast({
        //   type: 'correct',
        //   txt: 'Picker canceled',
        //   time: 1000
        // }).show()
      }
    });

  },
  methods: {
    toggleTab(textContent, index) {
      this.items.map(function(v, i) {
        i == index ? v.isAction = true : v.isAction = false
      })
      this.currentView = textContent;
    },
    showCity() {
      this.cityPicker.show()
    },
    showOil() {
      this.picker.show()
    }
  },
  components: {
    'v-header': Vheader,
    'Three': three,
    'Six': six,
    'Twlve': twelve
  }
}
</script>

<style lang="css">
.cube-picker-choose {
  background-color: red;
  height: 1.4rem!important;
}
.cube-picker-choose>[data-action="confirm"],
.cube-picker-choose>[data-action="cancel"] {
  color: white!important;
}
.content {
  padding: 0 0.5rem;
  box-sizing: border-box;
  font-size: 0.4rem;
}
.select {
  margin: 0.6rem 0 0.3rem 0;
  display: flex;
  justify-content:space-between;
}
.select-item {
  width: 42%;
  height: 0.8rem;
  border: 1px solid #bbbbbb;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-content {
  flex: 3;
  padding-left:0.1rem;
}
input:focus {
  border: none;
  outline: none;
}
.input {
  width: 100%;
  border: none;
  height: 0.6rem;
}
.option-dropdown {
  flex: 1;
  width: 100%;
  height: 100%;
  background: url('./dropdown.png') no-repeat left top;
  background-size: 100% 100%;
  border-left: 1px solid #bbbbbb;
}
.desc {
  font-size: 0.36rem;
  margin: 0.2rem 0 0.4rem 0;
}
.tab-box {
  border-bottom: 1px solid #ddd;
  height: 1rem;
  margin: 0 -0.5rem;
  display: flex;
  justify-content: space-around;
  font-size: 0.4rem;
}
.tab-item {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.tab-item.active {
  color: red;
}
.tab-item.active::after {
  content: "";
  display: block;
  width: 100%;
  height: 3px;
  background: red;
  position: absolute;
  left: 0;
  bottom: -1.5px;
}
.oil-desc {
  text-align: center;
  margin: 0.8rem 0 0rem 0;
}

</style>
