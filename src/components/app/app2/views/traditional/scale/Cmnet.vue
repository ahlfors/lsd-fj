<!--传统业务-->
<template>
  <div class="cmnet-wrap">
    <embed src="static/swf/cmnet@xm.swf" width="1850" height="850" wmode="transparent" quality="high"
           pluginspage="http://www.macromedia.com/Go/getflashplayer"
           type="application/x-shockwave-flash">
    </embed>
    <div class="cmnet-wrap-title"><span style="color: rgb(255, 240, 0);">{{startTime}}</span>CMNET质量监控 — — 厦门</div>
    <div class="cmnet-city-name">厦门</div>
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
  </div>
</template>
<script>
export default {
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
      }
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
      this.$http.indi.get(['f0291', 'f0294'], {}, (res291, res294) => {
        try {
          var tempTime = (new Date(Date.parse(res291.data.data[0].START_TIME))).pattern('HH');
          this.startTime = Number(tempTime) + '时~' + (Number(tempTime) + 1) + '时';
          this.xmFlowIn = res291.data.data[0].CMNET_INFLOW;
          this.xmFlowOut = res291.data.data[0].CMNET_OUTFLOW;
          this.xmAvgIn = res291.data.data[0].IN_AVG_BANDWIDTH_UTILIZATION;
          this.xmAvgOut = res291.data.data[0].OUT_AVG_BANDWIDTH_UTILIZATION;
          this.xmPeakIn = res291.data.data[0].IN_MAX_BANDWIDTH_UTILIZATION;
          this.xmPeakOut = res291.data.data[0].OUT_MAX_BANDWIDTH_UTILIZATION;
          this.jamRate = res294.data.data[0]['LINK_CONGESTION_RATE'];
          this.lossRate = res294.data.data[0]['LINK_LOSS_RATE'];
          this.delayTime = res294.data.data[0]['LINK_DELAY'];
          this.usageRate = res294.data.data[0]['DEVICE_ADDRESS_UTILIZATION'];
        } catch (err) {
          console.log('f0291,f0294 indicator has error')
        }
      })
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.cmnet-wrap {
  width: 1850px;
  height: 850px;
  // background: url("../../../assets/img/legend/cmnetbg.png");
  position: absolute;
  top: 0px;
  left: 760px;
  .cmnet-wrap-title{
    position: absolute;
    top: 12px;
    line-height: 70px;
    width: 100%;
    height: 70px;
    font-size: 28px;
    font-family: "Microsoft YaHei";
    text-align: center;
    color: rgb(255, 255, 255);
  }
  .cmnet-city-name{
    font-size: 48px;
    color: #fff;
    font-family: "Microsoft YaHei";
    position: absolute;
    width: 100px;
    height: 68px;
    top: 375px;
    left: 870px;
  }
  .top-item {
    width: 312px;
    height: 100px;
    position: absolute;
    &.pos-left {
      top: 177px;
      left: 375px;
    }
    &.pos-center {
      top: 177px;
      left: 761px;
    }
    &.pos-right {
      top: 177px;
      left: 1149px;
    }
  }
  .top-item-text {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 45px;
    font-size: 20px;
    font-family: "Microsoft YaHei";
    color: rgb(216, 218, 219);
  }
  .top-item-content {
    width: 100%;
    height: 50px;
  }
  .item-content-left {
    height: 40px;
    position: absolute;
    top: 60px;
    right: 185px;
  }
  .item-content-right {
    height: 40px;
    position: absolute;
    top: 116px;
    left: 175px;
  }
  .bottom-item {
    width: 300px;
    height: 100px;
    position: absolute;
    &.item-1{
      top: 647px;
      left: 96px;
    }
    &.item-2{
      top: 647px;
      left: 521px;
    }
    &.item-3{
      top: 647px;
      left: 945px;
    }
    &.item-4{
      top: 647px;
      left: 1378px;
    }
  }
  .bottom-item-mum {
    // width: 120px;
    height: 50px;
    margin-left: 150px;
    &.item-1{
      margin-left: 160px;
    }
    &.item-2{
      margin-left: 160px;
    }
  }
  .bottom-item-text {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-family: "Microsoft YaHei";
    color: rgb(204, 230, 255);
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
  }
}
</style>
