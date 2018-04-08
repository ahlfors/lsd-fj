<template>
  <viewTemplate class="top-wireless"  :interval ="30" @interval ="loadData">
    <div class="top-title">LTE无线接通率TOP5</div>
    <div class="top-content">
      <div v-for="item in nowData" class="list-item">
        <div class="item-text">
          <marquee behavior="alternate" width="100%" direction="right" scrollamount="2">
            <span style="display:inline-block;width:430px;padding:0 15px">{{item.REGION_NAME}}</span>
          </marquee>
        </div>
        <div class="item-value">
          <counter :data="item.KPI_VALUE" :config="configlist"></counter>
        </div>
      </div>
    </div>
  </viewTemplate>
</template>
<script>
// import topWirelessData from './topWireless.js'
export default {
  props: {
    sceneName: String,
    areaId: Number
  },
  data() {
    return {
      url: 'area_-1783968023',
      configlist: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#fdff99',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '%',
          textStyle: {
            color: '#fdff99',
            fontSize: 24
          }
        }
      },
      nowData: null
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.$http.indi.get(this.url, {}, (res) => {
        this.nowData = res.data.data.LTE_WIRELESS_CON_RATE_TOP5;
      })
    }
  },
  watch: {
    sceneName(val) {
      this.url = 'area_' + this.areaId;
      this.loadData();
    }
  }
}
</script>
<style rel = "stylesheet/scss" lang="scss">
.top-wireless {
  width: 100%;
  height: 264px;
  position: relative;
}

.top-title {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #fff;
}

.top-content {
  height: 211px;
  width: 100%;
  background-image: url("../../../../assets/img/venues/stagescene/top5.png");
  background-repeat: no-repeat;
  background-position: 16px 0;
  padding-top: 4px;
  .list-item {
    height: 41px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 45px;
    .item-text {
      width: 200px;
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
      width: 135px;
      height: 100%;
      float: left;
      box-sizing: border-box;
      padding-top: 5px;
    }
  }
}
</style>
