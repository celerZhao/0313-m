<template lang="html">
  <div>
    <div class="tab-box">
      <div v-for="(item, index) in items" class="tab-item" :class="{active: item.isAction}" @click="toggleTab(item.name, index,item.month)">{{item.text}}</div>
    </div>

    <div class="oil-price-wrap">
      <p class="oil-desc">手指移至下方折线图上,可查看近期油价</p>
      <div class="fold-line">
          <div class="six" ref="six">
          </div>
      </div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts');
import api from '../../fetch/ajax.js';

export default {
  data() {
    return {
      currentView: 'Three',
      items: [
        {
          text: '3个月',
          name: 'Three',
          isAction: true,
          month:3,
        },
        {
          text: '6个月',
          name: 'Six',
          isAction: false,
          month:6,
        },
        {
          text: '12个月',
          name: 'Twlve',
          isAction: false,
          month:12,
        }
      ],

      d1:[],
      d2:'93333',
      d3:[],

    }
  },
  props:['oil_id','oil_name','city','month'],

  created(){

/*  this.oil_id="112";
    this.oil_name = "柴油";
    this.city = '北京',
    this.month="3";
    */
  this.getData();


},

  methods:{
    getData(){
      api.oilTrend({
        oil_id:this.oil_id,
        oil_name:this.oil_name,
        city:this.city,
        month:this.month,
      }).then(response=>{

        let _priceList = response.data.data.object.oil[0].priceList[0].monthPrice;
        let _d1 = [];
        let _d2 = response.data.data.object.oil[0].oil_name;
        let _d3 = [];
        for(var a in _priceList){
          _d1.push(_priceList[a].date.split("-")[1]+'/'+_priceList[a].date.split("-")[2]);
//      _d2.push{_priceList[a].}
          _d3.push(parseFloat(_priceList[a].buy_price).toFixed(2));

        }
        this.d1 = _d1;
        this.d2 = _d2;
        this.d3 = _d3;


        console.log(_priceList)

        this.renderChart();

      }).catch(error=>{

      })

    },

    initEchart(datax,str,datavalue) {
      var myEchatrs = echarts.init(this.$refs.six);
      myEchatrs.setOption({
              tooltip: { // 全局设置提示框
                  show: true, // 是否显示提示框
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                        show: true,
                      }
                  },
                  formatter: '{a0}<br />{b0}<br />{c0}元/升',
                  showContent: true,  // 是否显示浮层
                  confine: true, //是否将 tooltip 框限制在图表的区域内
              },
              grid: {
                // show: true,
                left: '20%',
                top: '15%'
              },
              xAxis:  {
                  type: 'category',
                  boundaryGap: false, // 坐标轴是否从0开始
                  axisLabel: {
                    rotate: 45 // X轴文字的旋转
                  },
                  data: datax // 日期动态取
              },
              yAxis: {
                  position: 'left',
                  scale: true, // 是否显示0刻度
                  splitNumber: 10,
                  // minInterval: 2, // y轴最小间隔的距离
                  nameLocation: 'start',
                  nameTextStyle: {
                    color: 'red',
                    align: 100,
                    lineHeight: 200
                  },
                  nameGap: 40,
                  boundaryGap: ['20%', '20%'],
                  axisLine: {
                    show: true,
                    symbol: ['none', 'arrow']
                  },
                  splitLine: {
                    show: true, // 是否显示分割线
                    interval: 1,
                    lineStyle: {
                      color: '#ddd'
                    }
                  },
                  splitArea: {
                     show: false  // 是否显示分割的区域
                  },
                  type: 'value',
                  // data: [5.5,5.8,6.1,6.4,6.7,7.0],
                  axisLabel: {
                      // show: false,
                      formatter: '{value}'
                  },
                  axisPointer: {
                      show: true,
                      type: 'line',
                      snap: true,
                      label: {
                        show: true,
                        margin: 0
                      },
                      triggerTooltip: true
                  }
              },
              visualMap: {
//                  type: 'piecewise',
                  show: false,
                  dimension: 0,
                  hoverLink: false,
                  inRange: {
                    color: 'red', // 控制线条的颜色
                    symbolSize: 5, // 圆圈的大小
                  }
              },
              series: [
                  {
                      name: str,  // 动态获取 93号油
                      type:'line',
                      smooth: false,
                      data: datavalue, // 价格动态取
                      label: {
                        show: false
                      }
                  }
              ]
          });
    },

    renderChart(){
      let _this = this;
      this.$nextTick(function() {
        // 初始化空坐标
        this.initEchart('','','');
        var d1 = ['11/03', '11/17', '12/01', '12/15', '12/29', '01/13','12/01', '12/15', '12/29'];
        var d2 = '93#汽油';
        var d3 = [1,9,3,5,5,2,5,8,9];


        // 模拟数据
        setTimeout(function() {
          _this.initEchart(_this.d1,_this.d2,_this.d3);
        },1000);
      })

    },
    toggleTab(textContent, index,_month) {
      this.items.map(function(v, i) {
        i == index ? v.isAction = true : v.isAction = false
      })
      this.currentView = textContent;
      this.month = _month
      this.getData()

    },


  },
  mounted() {

  }
}
</script>

<style lang="css">

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
.six {
  flex:1;
  width: 300px;
  height: 240px;
}

</style>
