<template>
  <div class="scale-measure-cmnet">
    <embed src="static/swf/cmnet@fj.swf" width="1850" height="850" wmode="transparent" quality="high"
           pluginspage="http://www.macromedia.com/Go/getflashplayer"
           type="application/x-shockwave-flash">
    </embed>
    <div class="cmnet-title-name"><span style="color: rgb(255, 240, 0);">{{startTime}}</span>CMNET质量监控 - - 福建</div>
    <div class="cmnet-zbck-name">
      <div>CMNET流量(TB)</div>
      <div>平均宽带利用率(%)</div>
      <div>峰值宽带利用率(%)</div>
    </div>
    <div class="cmnet-sfck-name">
      <div>CMNET流量(TB)</div>
      <div>平均宽带利用率(%)</div>
      <div>峰值宽带利用率(%)</div>
    </div>
    <div class="cmnet-cywck-name">城域网出口 <span>CMNET流量(TB)</span></div>
    <div class="cmnet-one cmnet-one-left">
      <div class="flow-one">
        <counter :data="zbFlowOne" :config="numConfig1"></counter>
      </div>
      <div class="flow-two">
        <counter :data="zbFlowTwo" :config="numConfig1"></counter>
      </div>
      <div class="avg-one">
        <counter :data="zbAvgOne" :config="numConfig2"></counter>
      </div>
      <div class="avg-two">
        <counter :data="zbAvgTwo" :config="numConfig2"></counter>
      </div>
      <div class="peak-one">
        <counter :data="zbPeakOne" :config="numConfig2"></counter>
      </div>
      <div class="peak-two">
        <counter :data="zbPeakTwo" :config="numConfig2"></counter>
      </div>
    </div>
    <div class="cmnet-one cmnet-one-right">
      <div class="flow-one">
        <counter :data="sfFlowOne" :config="numConfig1"></counter>
      </div>
      <div class="flow-two">
        <counter :data="sfFlowTwo" :config="numConfig1"></counter>
      </div>
      <div class="avg-one">
        <counter :data="sfAvgOne" :config="numConfig2"></counter>
      </div>
      <div class="avg-two">
        <counter :data="sfAvgTwo" :config="numConfig2"></counter>
      </div>
      <div class="peak-one">
        <counter :data="sfPeakOne" :config="numConfig2"></counter>
      </div>
      <div class="peak-two">
        <counter :data="sfPeakTwo" :config="numConfig2"></counter>
      </div>
    </div>
    <div class="cmnet-two-up">
      <div>
        <counter :data="fzOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="xmOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="ndOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="ptOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="qzOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="zzOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="lyOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="smOne" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="npOne" :config="numConfig3"></counter>
      </div>
    </div>
    <div class="cmnet-two-down">
      <div>
        <counter :data="fzTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="xmTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="ndTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="ptTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="qzTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="zzTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="lyTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="smTwo" :config="numConfig3"></counter>
      </div>
      <div>
        <counter :data="npTwo" :config="numConfig3"></counter>
      </div>
    </div>
    <div class="cmnet-region-dev">
      <viewTemplate viewId="X010401" @ok="regionClick('福州')" :class="{'active-region': activeId === 'X010401'}"></viewTemplate>
      <viewTemplate viewId="X010402" @ok="regionClick('厦门')" :class="{'active-region': activeId === 'X010402'}"></viewTemplate>
      <viewTemplate viewId="X010403" @ok="regionClick('宁德')" :class="{'active-region': activeId === 'X010403'}"></viewTemplate>
      <viewTemplate viewId="X010404" @ok="regionClick('莆田')" :class="{'active-region': activeId === 'X010404'}"></viewTemplate>
      <viewTemplate viewId="X010405" @ok="regionClick('泉州')" :class="{'active-region': activeId === 'X010405'}"></viewTemplate>
      <viewTemplate viewId="X010406" @ok="regionClick('漳州')" :class="{'active-region': activeId === 'X010406'}"></viewTemplate>
      <viewTemplate viewId="X010407" @ok="regionClick('龙岩')" :class="{'active-region': activeId === 'X010407'}"></viewTemplate>
      <viewTemplate viewId="X010408" @ok="regionClick('三明')" :class="{'active-region': activeId === 'X010408'}"></viewTemplate>
      <viewTemplate viewId="X010409" @ok="regionClick('南平')" :class="{'active-region': activeId === 'X010409'}"></viewTemplate>
    </div>
    <div is="cmnetRegion" v-if="regionFlag" :regionName="activeRegion"></div>
  </div>
</template>
<script>
  import cmnetRegion from './CmnetRegion.vue';
  export default {
    data() {
      return {
        startTime: '',
        regionFlag: false,
        activeRegion: null,
        activeId: null,
        zbFlowOne: 126.5,
        zbFlowTwo: 128.5,
        zbAvgOne: 54.3,
        zbAvgTwo: 52.3,
        zbPeakOne: 87.3,
        zbPeakTwo: 79.3,
        sfFlowOne: 126.5,
        sfFlowTwo: 128.5,
        sfAvgOne: 54.3,
        sfAvgTwo: 52.3,
        sfPeakOne: 87.3,
        sfPeakTwo: 79.3,
        fzOne: 28.5,
        fzTwo: 57.8,
        xmOne: 28.5,
        xmTwo: 57.8,
        ndOne: 28.5,
        ndTwo: 57.8,
        ptOne: 28.5,
        ptTwo: 57.8,
        qzOne: 28.5,
        qzTwo: 57.8,
        zzOne: 28.5,
        zzTwo: 57.8,
        lyOne: 28.5,
        lyTwo: 57.8,
        smOne: 28.5,
        smTwo: 57.8,
        npOne: 28.5,
        npTwo: 57.8,
        numConfig1: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: 'rgb(103, 253, 255)',
              fontSize: 28,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 0 // 数字之间间距
          }
        },
        numConfig3: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: 'rgb(103, 253, 255)',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 0 // 数字之间间距
          }
        },
        numConfig2: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: 'rgb(103, 253, 255)',
              fontSize: 28,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '%',
            textStyle: {
              color: 'rgb(103, 253, 255)',
              fontSize: 22,
              fontFamily: 'PixelLCD-7'
            }
          }
        }
      }
    },
    computed: {
      newViewId: function() {
        return this.$store.state.newViewId
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.zbFlowOne = 0;
        this.zbFlowTwo = 0;
        this.zbAvgOne = 0;
        this.zbAvgTwo = 0;
        this.zbPeakOne = 0;
        this.zbPeakTwo = 0;
        this.sfFlowOne = 0;
        this.sfFlowTwo = 0;
        this.sfAvgOne = 0;
        this.sfAvgTwo = 0;
        this.sfPeakOne = 0;
        this.sfPeakTwo = 0;
        this.fzOne = 0;
        this.fzTwo = 0;
        this.xmOne = 0;
        this.xmTwo = 0;
        this.ndOne = 0;
        this.ndTwo = 0;
        this.ptOne = 0;
        this.ptTwo = 0;
        this.qzOne = 0;
        this.qzTwo = 0;
        this.zzOne = 0;
        this.zzTwo = 0;
        this.lyOne = 0;
        this.lyTwo = 0;
        this.smOne = 0;
        this.smTwo = 0;
        this.npOne = 0;
        this.npTwo = 0;
        this.$http.indi.get(['f0289', 'f0290', 'f0292', 'f0293'], {}, (res289, res290, res292, res293) => {
          var tempTime = (new Date(Date.parse(res292.data.data[0].START_TIME))).pattern('HH');
          this.startTime = Number(tempTime) + '时~' + (Number(tempTime) + 1) + '时';
          this.zbFlowOne = res289.data.data[0].CMNET_INFLOW;
          this.zbFlowTwo = res289.data.data[0].CMNET_OUTFLOW;
          this.zbAvgOne = res289.data.data[0].IN_AVG_BANDWIDTH_UTILIZATION;
          this.zbAvgTwo = res289.data.data[0].OUT_AVG_BANDWIDTH_UTILIZATION;
          this.zbPeakOne = res289.data.data[0].IN_MAX_BANDWIDTH_UTILIZATION;
          this.zbPeakTwo = res289.data.data[0].OUT_MAX_BANDWIDTH_UTILIZATION;
          this.sfFlowOne = res290.data.data[0].CMNET_INFLOW;
          this.sfFlowTwo = res290.data.data[0].CMNET_OUTFLOW;
          this.sfAvgOne = res290.data.data[0].IN_AVG_BANDWIDTH_UTILIZATION;
          this.sfAvgTwo = res290.data.data[0].OUT_AVG_BANDWIDTH_UTILIZATION;
          this.sfPeakOne = res290.data.data[0].IN_MAX_BANDWIDTH_UTILIZATION;
          this.sfPeakTwo = res290.data.data[0].OUT_MAX_BANDWIDTH_UTILIZATION;
          this.fzOne = res292.data.data[6].KPI_VALUE;
          this.fzTwo = res293.data.data[6].KPI_VALUE;
          this.xmOne = res292.data.data[3].KPI_VALUE;
          this.xmTwo = res293.data.data[3].KPI_VALUE;
          this.ndOne = res292.data.data[1].KPI_VALUE;
          this.ndTwo = res293.data.data[1].KPI_VALUE;
          this.ptOne = res292.data.data[8].KPI_VALUE;
          this.ptTwo = res293.data.data[8].KPI_VALUE;
          this.qzOne = res292.data.data[4].KPI_VALUE;
          this.qzTwo = res293.data.data[4].KPI_VALUE;
          this.zzOne = res292.data.data[5].KPI_VALUE;
          this.zzTwo = res293.data.data[5].KPI_VALUE;
          this.lyOne = res292.data.data[7].KPI_VALUE;
          this.lyTwo = res293.data.data[7].KPI_VALUE;
          this.smOne = res292.data.data[0].KPI_VALUE;
          this.smTwo = res293.data.data[0].KPI_VALUE;
          this.npOne = res292.data.data[2].KPI_VALUE;
          this.npTwo = res293.data.data[2].KPI_VALUE;
        })
      },
      regionClick(regionName) {
        if (this.newViewId === this.activeId) {
          this.regionFlag = false;
          this.activeRegion = null;
          this.activeId = null;
        } else {
          this.regionFlag = true;
          this.activeRegion = regionName;
          this.activeId = this.newViewId;
        }
      }
    },
    components: {
      cmnetRegion
    }
  }
</script>
