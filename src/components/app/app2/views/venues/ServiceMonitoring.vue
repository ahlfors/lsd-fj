<template>
  <viewTemplate class="services-monitoring" :interval="30" @interval="loadData">
    <div class="list-teletraffic">
      <div class="title">
        <span>2G总话务量</span>
        <div>
          <counter :config="config2g"
                   :data="num2g"></counter>
        </div>
      </div>
      <div class="list-content">
        <div v-for="item in items1"
             class="list-item">
          <div class="item-text">
            <marquee behavior="alternate"
                     width="100%"
                     direction="right"
                     scrollamount="2">
              <span style="display:inline-block;width:430px;padding:0 15px">{{item.REGION_NAME}}</span>
            </marquee>
          </div>
          <div class="item-value">
            <counter :data="item.KPI_VALUE"
                     :config="configlist"></counter>
          </div>
        </div>
      </div>
    </div>
    <div class="list-flow">
      <div class="title">
        <span>4G总流量</span>
        <counter :config="config4g"
                 :data="num4g"></counter>
      </div>
      <div class="list-content">
        <div v-for="item in items2"
             class="list-item">
          <div class="item-text">
            <marquee behavior="alternate"
                     width="100%"
                     direction="right"
                     scrollamount="2">
              <span style="display:inline-block;width:430px;padding:0 15px">{{item.REGION_NAME}}</span>
            </marquee>
          </div>
          <div class="item-value">
            <counter :data="item.KPI_VALUE"
                     :config="configlist"></counter>
          </div>
        </div>
      </div>
    </div>
  </viewTemplate>
</template>
<script>

export default {
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      items1: [
        { text: '厦门思明会展三期NG1-2', value: 10.65 },
        { text: '厦门思明会展三期NG1-8', value: 8.07 },
        { text: '厦门思明会展三期NG1-9', value: 7.96 },
        { text: '厦门思明会展四期室内NG1-8', value: 6.28 },
        { text: '厦门思明会展三期NG1-3', value: 4.11 }],
      items2: [
        { text: '厦门思明厦门会展中心6室内NLX1-40', value: 281.21 },
        { text: '厦门思明会展三期2室内NLX1-57', value: 251.06 },
        { text: '厦门思明厦门会展中心4室内NLX1-57', value: 185.17 },
        { text: '厦门思明会展四期室内NLX1-169', value: 180.96 },
        { text: '厦门思明厦门会展中心3室内NLX1-59', value: 179.80 }],
      num2g: 0,
      num4g: 0,
      // 国际会展中心
      data1: null,
      // 国际会议中心
      data2: null,
      // 国际会展酒店
      data3: null,
      // 海悦山庄酒店
      data4: null,
      // 闽南大戏院
      data5: null,
      // 厦门高崎国际机场
      data6: null,
      // 市政府
      data7: null,
      url: null,
      config2g: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#65fefc',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: 'Erl',
          textStyle: {
            color: '#65fefc',
            fontSize: 24
          }
        }
      },
      config4g: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#65fefc',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: 'MB',
          textStyle: {
            color: '#65fefc',
            fontSize: 24
          }
        }
      },
      configlist: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#e7eb94',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '',
          textStyle: {
            color: '#65fefc',
            fontSize: 24
          }
        }
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      switch (this.activeIndex) {
        case 0:
          this.url = 'f0069';
          break;
        case 1:
          this.url = 'f0070';
          break;
        case 2:
          this.url = 'f0092';
          break;
        case 3:
          this.url = 'f0088';
          break;
        case 4:
          this.url = 'f0091';
          break;
        case 5:
          this.url = 'f0090';
          break;
        case 6:
          this.url = 'f0089';
          break;
      }
      this.$http.indi.get(this.url, {}, (res) => {
        this.num2g = 0;
        this.num4g = 0;
        this.items1 = null;
        this.items2 = null;
        this.num2g = res.data.data.GSM_TRAFFIC;
        this.num4g = res.data.data.LTE_FLOW;
        this.items1 = res.data.data.GSM_TRAFFIC_TOP5;
        this.items2 = res.data.data.LTE_FLOW_TOP5;
      })
    }
  },
  watch: {
    activeIndex(val) {
      this.loadData();
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.services-monitoring {
  width: 846px;
  height: 325px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  .list-teletraffic {
    width: 404px;
    height: 100%;
    position: absolute;
    left: 5px;
  }
  .list-flow {
    width: 404px;
    height: 100%;
    position: absolute;
    right: 5px;
  }
  >div {
    .title {
      height: 56px;
      width: 100%;
      >span:nth-of-type(1) {
        width: 232px;
        height: 100%;
        float: left;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding-left: 35px;
        font-size: 24px;
        color: #fff;
        font-weight: bold;
      }
      >div {
        width: 170px;
        height: 100%;
        float: left;
      }
    }
    .list-content {
      height: 264px;
      width: 100%;
      box-sizing: border-box;
      padding: 12px 25px 16px;
      padding-right: 0px;
      .list-item {
        height: 50px;
        width: 100%;
        .item-text {
          width: 250px;
          height: 100%;
          font-size: 24px;
          color: #fff;
          float: left; // display: flex;
          // align-items: center;
          // justify-content: flex-start;
          line-height: 48px;
          word-break: keep-all;
          /* 不换行 */
          white-space: nowrap;
          /* 不换行 */
          overflow: hidden;
          /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis;
        }
        .item-value {
          width: 120px;
          height: 100%;
          float: left;
        }
      }
    }
  }
}
</style>
