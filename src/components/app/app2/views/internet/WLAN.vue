<!--WLAN(精品高校) -->
<template>
  <viewTemplate class="a2-internet-wlan" :interval="30" @interval="loadData">
    <div class="a1-internet-wlan-title">精品WLAN(厦门华天涉外学院)</div>
    <div class="wlan-part1">
      <div class="wlan-userNum">
        <div><counter :data="wlan_userNum" :config="indexNumConfig"></counter></div>
        <div>用户数(个)</div>
      </div>
      <div class="wlan-flow">
        <div><counter :data="wlan_flow" :config="indexNumConfig"></counter></div>
        <div>流量(GB)</div>
      </div>
      <div class="wlan-downRate">
        <div><counter :data="wlan_downRate" :config="indexNumConfig"></counter></div>
        <div>下载速率(kbps)</div>
      </div>
      <div class="wlan-httpSuccRate">
        <div><counter :data="wlan_httpSuccRate" :config="indexNumConfig2"></counter></div>
        <div>HTTP成功率(%)</div>
      </div>
    </div>

          <!--          <div class="wlan-apOutServieNum">
                    <div><counter :data="waln_apOutServieNum" :config="indexNumConfig"></counter></div>
                    <div>WLAN&nbsp;AP退服数(个)</div>
                  </div>
                  <div class="wlan-apOutServiceRate">
                    <div><counter :data="wlan_OutServiceRate" :config="indexNumConfig2"></counter></div>
                    <div>WLAN&nbsp;AP退服率</div>
                  </div>-->

  </viewTemplate>
</template>
<script>
  export default {
    data() {
      return {
        wlan_userNum: 701,
        wlan_flow: 3.15,
        wlan_downRate: 11055.17,
        wlan_httpSuccRate: 97.73,
        wlan_HeadDelayed: 35.11,
        wlan_apNum: 937,
        waln_apOutServieNum: 12,
        wlan_OutServiceRate: 0.96,
        indexNumConfig: {
          justifyContent: 'center',
          numbers: { // 数字配置项
            textStyle: {
              color: '#FCFF99',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 2 // 数字之间间距
          }
        },
        indexNumConfig2: {
          justifyContent: 'center',
          numbers: { // 数字配置项
            textStyle: {
              color: '#FCFF99',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            decimal: 2,
            letterSpacing: 2 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '%',
            textStyle: {
              color: '#FFFF85',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            }
          }
        }
      }
    },
    methods: {
      loadData() {
        this.wlan_userNum = 0;
        this.wlan_flow = 0;
        this.wlan_downRate = 0;
        this.wlan_httpSuccRate = 0;
        this.$http.indi.get(['f0137', 'f0138', 'f0139', 'f0140'], {}, (res43, res44, res45, res46) => {
          this.wlan_userNum = res43.data.data[0].KPI_VALUE;
          this.wlan_flow = res44.data.data[0].KPI_VALUE;
          this.wlan_downRate = res45.data.data[0].KPI_VALUE;
          this.wlan_httpSuccRate = res46.data.data[0].KPI_VALUE;
        })
        // window.setTimeout(() => {
        //   this.wlan_userNum = 3992;
        //   this.wlan_flow = 482.29;
        //   this.wlan_downRate = 11055.17;
        //   this.wlan_httpSuccRate = 97.73;
        //   this.wlan_HeadDelayed = 35.11;
        //   this.wlan_apNum = 937;
        // }, 100)
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .a2-internet-wlan{
    height: 148px;
    width: 709px;
    top: 335px;
    left: 53px;
    .a1-internet-wlan-title {
      position: absolute;
      top: 3px;
      left: 68px;
      font-size: 24px;
      color: rgb(229, 244, 255);
      text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
    }

      .wlan-part1{
        position: absolute;
        height: 100%;
        width: 100%;
        > div{
          position: absolute;
          width: 154px;
          height: 91px;
          background-image: url("../../assets/img/legend/internet.png");
          background-repeat: no-repeat;
          top: 45px;
        }
        .wlan-userNum{
          left: 17px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 100%;
            height: 26px;
            top: 44px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
        .wlan-flow{
          left: 194px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 100%;
            height: 26px;
            top: 44px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
        .wlan-downRate{
          left: 365px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 100%;
            height: 26px;
            top: 44px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
        .wlan-httpSuccRate{
          left: 539px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 100%;
            height: 26px;
            top: 44px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
      }
      .wlan-part2{
        position: absolute;
        height: 100%;
        width: 100%;
        > div{
          position: absolute;
          width: 154px;
          height: 91px;
          background-image: url("../../assets/img/legend/internet.png");
          background-repeat: no-repeat;
          top: 45px;
        }
        .wlan-HeadDelayed{
          left: 17px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 100%;
            height: 26px;
            top: 44px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
        .wlan-apNum{
          left: 194px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 100%;
            height: 26px;
            top: 44px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
        .wlan-apOutServieNum{
          left: 365px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 180px;
            height: 26px;
            top: 44px;
            left: -12px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
        .wlan-apOutServiceRate{
          left: 539px;
          & > div:nth-of-type(1){
            position: absolute;
            width: 100%;
            height: 38px;
            top: 6px;
          }
          & > div:nth-of-type(2){
            position: absolute;
            width: 100%;
            height: 26px;
            top: 44px;
            color: #fefefe;
            display: flex;
            justify-content: center;
            font-size: 18px;
          }
        }
      }

    .swiper-pagination-bullets {
      position: absolute;
      z-index: 1;
      display: inline-block;
      width: 135px;
      height: 37px;
      left: 295px;
      top: 6px;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      width: 10px;
      height: 10px;
      opacity: 1;
      border-radius: 5px;
      margin: 0 3px;
      background: #3FA7C0;
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
      background: #65FDFF;
    }
  }
</style>

