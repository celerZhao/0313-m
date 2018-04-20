<template lang="html">
  <div class="Twlve" ref="Twlve">

  </div>
</template>

<script>
var echarts = require('echarts');
export default {
  data() {
    return {}
  },
  methods:{
    initEchart(datax,str,datavalue) {
      var myEchatrs = echarts.init(this.$refs.Twlve);
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
                  type: 'piecewise',
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
                      smooth: true,
                      data: datavalue, // 价格动态取
                      label: {
                        show: false
                      }
                  }
              ]
          });
    }
  },
  mounted() {
    this.$nextTick(function() {
      // 初始化空坐标
      this.initEchart('','','');
      var d1 = ['11/03', '11/17', '12/01', '12/15', '12/29', '01/13','12/01', '12/15', '12/29'];
      var d2 = '93333';
      var d3 = [1,9,3,5,5,2,5,8,9];
      var self = this;
      // 模拟数据
      setTimeout(function() {
        self.initEchart(d1,d2,d3);
      },1000);
    })
  }
}
</script>

<style lang="css">
.Twlve {
  width: 100%;
  height: 240px;
}
</style>
