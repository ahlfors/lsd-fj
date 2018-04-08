<!--传统业务-->
<template>
  <transition name="slide-cmnet-region">
    <div class="cmnet-region-wrap">
      <embed src="static/swf/cmnet@ds.swf" width="1850" height="850" wmode="transparent" quality="high"
             pluginspage="http://www.macromedia.com/Go/getflashplayer"
             type="application/x-shockwave-flash">
      </embed>
      <div class="top-item pos-left">
        <div class="top-item-text">CMNET流量(TB)</div>
        <div class="top-item-content">
          <div class="item-content-left">
            <counter :data="xmFlowIn" :config="NumConfig1"></counter>
          </div>
          <div class="item-content-right">
            <counter :data="xmFlowOut" :config="NumConfig1"></counter>
          </div>
        </div>
      </div>
      <div class="top-item pos-center">
        <div class="top-item-text">平均带宽利用率(%)</div>
        <div class="top-item-content">
          <div class="item-content-left">
            <counter :data="xmAvgIn" :config="NumConfig2"></counter>
          </div>
          <div class="item-content-right">
            <counter :data="xmAvgOut" :config="NumConfig2"></counter>
          </div>
        </div>
      </div>
      <div class="top-item pos-right">
        <div class="top-item-text">峰值带宽利用率(%)</div>
        <div class="top-item-content">
          <div class="item-content-left">
            <counter :data="xmPeakIn" :config="NumConfig2"></counter>
          </div>
          <div class="item-content-right">
            <counter :data="xmPeakOut" :config="NumConfig2"></counter>
          </div>
        </div>
      </div>
      <div class="bottom-item item-1">
        <div class="bottom-item-mum item-1">
          <counter :data="jamRate" :config="NumConfig2"></counter>
        </div>
        <div class="bottom-item-text">城域网链路拥塞率(%)</div>
      </div>
      <div class="bottom-item item-2">
        <div class="bottom-item-mum item-2">
          <counter :data="lossRate" :config="NumConfig2"></counter>
        </div>
        <div class="bottom-item-text">城域网链路丢包率(%)</div>
      </div>
      <div class="bottom-item item-3">
        <div class="bottom-item-mum item-3">
          <counter :data="delayTime" :config="NumConfig1"></counter>
        </div>
        <div class="bottom-item-text">城域网链路时延(ms)</div>
      </div>
      <div class="bottom-item item-4">
        <div class="bottom-item-mum item-4">
          <counter :data="usageRate" :config="NumConfig2"></counter>
        </div>
        <div class="bottom-item-text">BBAS设备地址利用率(%)</div>
      </div>
      <div>
        <div class="title"><span style="color: rgb(255, 240, 0);">{{startTime}}</span>CMNET质量监控 - - {{regionName}}</div>
        <div class="name">{{regionName}}</div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      regionName: {
        default: '',
        type: String
      }
    },
    data() {
      return {
        startTime: '',
        xmFlowIn: 126.5,
        xmFlowOut: 128.5,
        xmAvgIn: 54.3,
        xmAvgOut: 52.3,
        xmPeakIn: 87.3,
        xmPeakOut: 79.3,
        jamRate: 0,
        lossRate: 0,
        delayTime: 0,
        usageRate: 0,
        NumConfig1: {
          justifyContent: 'center',
          numbers: { // 数字配置项
            textStyle: {
              color: 'rgb(103, 253, 255)',
              fontSize: 30,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 2 // 数字之间间距
          }
        },
        NumConfig2: {
          justifyContent: 'center',
          numbers: { // 数字配置项
            textStyle: {
              color: 'rgb(103, 253, 255)',
              fontSize: 30,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 2 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '%',
            textStyle: {
              fontFamily: 'PixelLCD-7',
              color: 'rgb(103, 253, 255)',
              fontSize: 30
            }
          }
        },
        regionKeyMap: {
          '福州': ['f0302', 'f0303'],
          '厦门': ['f0291', 'f0294'],
          '宁德': ['f0304', 'f0305'],
          '莆田': ['f0306', 'f0307'],
          '泉州': ['f0308', 'f0309'],
          '漳州': ['f0310', 'f0311'],
          '龙岩': ['f0312', 'f0313'],
          '三明': ['f0314', 'f0315'],
          '南平': ['f0316', 'f0317']
        }
      }
    },
    watch: {
      regionName() {
        this.loadData();
      }
    },
    methods: {
      loadData() {
        this.xmFlowIn = 0;
        this.xmFlowOut = 0;
        this.xmAvgIn = 0;
        this.xmAvgOut = 0;
        this.xmPeakIn = 0;
        this.xmPeakOut = 0;
        this.jamRate = 0;
        this.lossRate = 0;
        this.delayTime = 0;
        this.usageRate = 0;
        this.$http.indi.get([this.regionKeyMap[this.regionName][0], this.regionKeyMap[this.regionName][1]], {}, (res1, res2) => {
          try {
            var tempTime = (new Date(Date.parse(res1.data.data[0].START_TIME))).pattern('HH');
            this.startTime = Number(tempTime) + '时~' + (Number(tempTime) + 1) + '时';
            this.xmFlowIn = res1.data.data[0].CMNET_INFLOW;
            this.xmFlowOut = res1.data.data[0].CMNET_OUTFLOW;
            this.xmAvgIn = res1.data.data[0].IN_AVG_BANDWIDTH_UTILIZATION;
            this.xmAvgOut = res1.data.data[0].OUT_AVG_BANDWIDTH_UTILIZATION;
            this.xmPeakIn = res1.data.data[0].IN_MAX_BANDWIDTH_UTILIZATION;
            this.xmPeakOut = res1.data.data[0].OUT_MAX_BANDWIDTH_UTILIZATION;
            this.jamRate = res2.data.data[0]['LINK_CONGESTION_RATE'];
            this.lossRate = res2.data.data[0]['LINK_LOSS_RATE'];
            this.delayTime = res2.data.data[0]['LINK_DELAY'];
            this.usageRate = res2.data.data[0]['DEVICE_ADDRESS_UTILIZATION'];
          } catch (err) {
            console.log(`${this.regionKeyMap[this.regionName][0]},${this.regionKeyMap[this.regionName][0]} indicator has error`)
          }
        })
      }
    },
    mounted() {
      this.loadData();
    }
  }
</script>
