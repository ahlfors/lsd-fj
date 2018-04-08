<!--移动二级页面 - 规模-->
<template>
  <popupTemplate >
    <viewTemplate class="a1-traditional-scale">
      <div class="a1-traditional-scale-div"  @click.stop.self="goOne">
        <div is="businessScaleSub" idFlag="two"></div>
        <div class="scale-measure">
          <viewTemplate viewId="0102" class="scale-flow1" :class="{'scale-flow2': downFlag === '01'}" @ok="upDown('flow')">LTE流量</viewTemplate>
          <viewTemplate viewId="0103" class="scale-flow1" :class="{'scale-flow2': downFlag === '02'}" @ok="upDown('traffic')">话务量</viewTemplate>
          <viewTemplate viewId="X0104" class="scale-flow1" :class="{'scale-flow2': downFlag === '03'}" @ok="upDown('cmnet')">CMNET</viewTemplate>
        </div>
        <div class="scale-measure-next" v-show="SelectFlag === '01'">
          <viewTemplate viewId="0104" class= "measure-traffic1" :class="{'measure-traffic2': trafficDownFlag === '01'}" @ok="trafficFlow(topTitle)">{{topTitle}}</viewTemplate>
          <viewTemplate viewId="0105" class= "measure-traffic1" :class="{'measure-traffic2': trafficDownFlag === '02'}" @ok="trafficFlow(downTitle)">{{downTitle}}</viewTemplate>
          <viewTemplate v-if="downFlag === '02'" viewId="0106" class= "measure-traffic1" :class="{'measure-traffic2': trafficDownFlag === '03'}" @ok="trafficFlow(volteTitle)">{{volteTitle}}</viewTemplate>
        </div>
        <div class="scale-measure-chart" v-show="chartShow === '01'">
          <div class="traffic-chart-show">
            <div class="historyTraffic-title">
              <span></span>
              <span>{{title}}</span>
            </div>
            <div class="historyTraffic-chart" id="historyTraffic-chart"></div>
          </div>
        </div>
        <div is="Cmnet" v-if="chartShow === '02'"></div>
      </div>
    </viewTemplate>
  </popupTemplate>
</template>
<script>
  import './ScaleMain.scss';
  import echarts from 'echarts/lib/echarts'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/chart/line'
  import 'echarts/lib/component/tooltip'
  import 'echarts//lib/component/legend'
  import businessScaleSub from '../BusinessScale.vue'
  import Cmnet from './Cmnet.vue'
  export default {
    props: {
      flag: String
    },
    data() {
      return {
        downFlag: '00',
        topTitle: '分地市话务量',
        downTitle: '2G话务量历史走势',
        volteTitle: 'VoLTE话务量历史走势',
        trafficDownFlag: '00',
        flowDownFlag: '00',
        SelectFlag: '00',
        chartShow: '00',
        chart1: null,
        title: '话务量历史走势(万Erl)',
        option: {
          color: ['#F5B82A'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#fefefe'
              }
            }
          },
          grid: {
            top: '65',
            bottom: '45',
            left: '120'
          },
          xAxis: {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#2F7CB3',
                width: 2
              }
            },
            axisLabel: {
              margin: 15,
              interval: 0,
              textStyle: {
                fontSize: 23,
                color: '#fefefe'
              }
            },
            axisTick: {
              show: false
            },
            data: ['福州', '厦门', '漳州', '泉州', '莆田', '三明', '南平', '龙岩', '宁德']
          },
          yAxis: {
            type: 'value',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#2F7CB3',
                width: 2
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                width: 2,
                color: '#2F7CB3'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#2F7CB3',
                width: 2
              }
            },
            axisLabel: {
              textStyle: {
                color: '#2F7CB3',
                fontSize: 18
              }
            }
          },
          series: [{
            name: '2G(万Erl)',
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 18
                }
              }
            },
            data: [75, 25, 38, 63, 38, 42, 30, 70, 55],
            barWidth: 45
          }]
        },
        history_option: {
          color: ['#FCCA77'],
          grid: {
            top: '65',
            bottom: '45',
            left: '120'
          },
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: '#fefefe'
              }
            }
          },
          xAxis: {
            boundaryGap: true,
            data: ['4/07', '4/08', '4/09', '4/10', '4/11', '4/12', '4/13'],
            axisLine: {
              lineStyle: {
                color: '#77A5D4',
                width: 3
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 15,
              textStyle: {
                fontSize: 18,
                color: '#fefefe'
              }
            }
          },
          yAxis: {
            axisLine: {
              show: true,
              lineStyle: {
                color: '#77A5D4',
                width: 3
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#2F7CB3',
                width: 2
              }
            },
            axisLabel: {
              textStyle: {
                fontSize: 18,
                color: '#2F7CB3'
              }
            }
          },
          series: [{
            type: 'line',
            name: '2G(万Erl)',
            itemStyle: {
              normal: {
                borderWidth: 4,
                color: '#FCCA77'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  fontSize: 18
                }
              }
            },
            lineStyle: {
              normal: {
                width: 3
              }
            },
            symbol: 'emptyCircle',
            symbolSize: 10,
            smooth: true,
            areaStyle: {
              normal: {
                color: '#FCCA77',
                opacity: 0.4
              }
            },
            data: [10, 20, 10, 40, 60, 50, 60]
          }]
        }
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      goOne() {
        this.$router.back();
      },
      init() {
        this.chart1 = echarts.init(document.getElementById('historyTraffic-chart'));
      },
      upDown(measureName) {
        switch (measureName) {
          case 'flow':
            this.downFlag = '01';
            this.topTitle = '分地市流量';
            this.downTitle = '流量历史走势';
            this.SelectFlag = '01';
            this.chartShow = '00';
            this.trafficDownFlag = '00';
            break;
          case 'traffic':
            this.downFlag = '02';
            this.topTitle = '分地市话务量';
            this.downTitle = '2G话务量历史走势';
            this.volteTitle = 'VoLTE话务量历史走势';
            this.SelectFlag = '01';
            this.chartShow = '00';
            this.trafficDownFlag = '00';
            break;
          case 'cmnet':
            this.downFlag = '03';
            this.SelectFlag = '00';
            this.chartShow = '02';
            this.trafficDownFlag = '00';
            break;
        }
      },
      trafficFlow(name) {
        this.chartShow = '01';
        switch (name) {
          case '分地市话务量':
            this.trafficDownFlag = '01';
            this.title = '今日地市2G话务量(万Erl)';
            this.option.series[0].name = '2G(万Erl)';
            this.$http.indi.get('f0022', {}, (res) => {
              let arr = [];
              let regionArr = [];
              res.data.data.sort(this.areaSort('REGION_NAME')).forEach( item => {
                arr.push(item.REGION_NAME);
                if (item.KPI_VALUE === null || item.KPI_VALUE === '' || item.KPI_VALUE === 'null' ) {
                  item.KPI_VALUE = '';
                }
                regionArr.push(item.KPI_VALUE);
              })
              this.option.xAxis.data = arr;
              this.option.series[0].data = regionArr;
              this.chart1.clear();
              this.chart1.setOption(this.option);
            })
            break;
          case '2G话务量历史走势':
            this.trafficDownFlag = '02';
            this.title = '2G话务量历史走势(万Erl)';
            this.history_option.series[0].name = '2G(万Erl)';
            this.$http.indi.get('f0023', {}, (res) => {
              let arr = [];
              let regionArr = [];
              res.data.data.forEach( item => {
                arr.push((new Date(Date.parse(item.START_TIME))).pattern('MM/dd'));
                if (item.KPI_VALUE === null || item.KPI_VALUE === '' || item.KPI_VALUE === 'null' ) {
                  item.KPI_VALUE = '';
                }
                regionArr.push(item.KPI_VALUE);
              })
              this.history_option.xAxis.data = arr;
              this.history_option.series[0].data = regionArr;
              this.chart1.clear();
              this.chart1.setOption(this.history_option);
            })
            break;
          case 'VoLTE话务量历史走势':
            this.trafficDownFlag = '03';
            this.title = 'VoLTE话务量历史走势(万Erl)';
            this.history_option.series[0].name = 'VoLTE(万Erl)';
            this.$http.indi.get('f0150', {}, (res) => {
              let arr = [];
              let regionArr = [];
              res.data.data.forEach( item => {
                arr.push((new Date(Date.parse(item.START_TIME))).pattern('MM/dd'));
                if (item.KPI_VALUE === null || item.KPI_VALUE === '' || item.KPI_VALUE === 'null' ) {
                  item.KPI_VALUE = '';
                }
                regionArr.push(item.KPI_VALUE);
              })
              this.history_option.xAxis.data = arr;
              this.history_option.series[0].data = regionArr;
              this.chart1.clear();
              this.chart1.setOption(this.history_option);
            })
            break;
          case '分地市流量':
            this.trafficDownFlag = '01';
            this.title = '今日地市LTE流量(TB)';
            this.option.series[0].name = 'LTE(TB)';
            this.$http.indi.get('f0020', {}, (res) => {
              let arr = [];
              let regionArr = [];
              res.data.data.sort(this.areaSort('REGION_NAME')).forEach( item => {
                arr.push(item.REGION_NAME);
                if (item.KPI_VALUE === null || item.KPI_VALUE === '' || item.KPI_VALUE === 'null' ) {
                  item.KPI_VALUE = '';
                }
                regionArr.push(item.KPI_VALUE);
              })
              this.option.xAxis.data = arr;
              this.option.series[0].data = regionArr;
              this.chart1.clear();
              this.chart1.setOption(this.option);
            })
            break;
          case '流量历史走势':
            this.trafficDownFlag = '02';
            this.title = 'LTE流量历史走势(TB)';
            this.history_option.series[0].name = 'LTE(TB)';
            this.$http.indi.get('f0021', {}, (res) => {
              let arr = [];
              let regionArr = [];
              res.data.data.forEach( item => {
                arr.push((new Date(Date.parse(item.START_TIME))).pattern('MM/dd'));
                if (item.KPI_VALUE === null || item.KPI_VALUE === '' || item.KPI_VALUE === 'null' ) {
                  item.KPI_VALUE = '';
                }
                regionArr.push(item.KPI_VALUE);
              })
              this.history_option.xAxis.data = arr;
              this.history_option.series[0].data = regionArr;
              this.chart1.clear();
              this.chart1.setOption(this.history_option);
            })
            break;
        }
      },
      loadData() {
      }
    },
    components: {
      businessScaleSub,
      Cmnet
    }
  }
</script>

