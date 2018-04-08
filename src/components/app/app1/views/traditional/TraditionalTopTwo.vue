<!--传统业务 网络规模-->
<template>
  <viewTemplate class="a1-traditional-traditionalTop-two" :interval="30" @interval="loadData">
    <div class="traditionalTop-networkTitle">
      网络规模<span class="networkTitle-unit">(万)</span>
    </div>
    <div class="traditionalTop-networkScale">
      <div>
        <div>2G基站</div>
        <div><counter :data="gsmRate" :config="indexNumConfig"></counter></div>
      </div>
      <div>
        <div>4G基站</div>
        <div><counter :data="letRate" :config="indexNumConfig"></counter></div>
      </div>
      <div>
        <div>OLT设备数</div>
        <div><counter :data="oltRate" :config="indexNumConfig"></counter></div>
      </div>
      <div>
        <div>FTTH-ONU</div>
        <div><counter :data="ftthRate" :config="indexNumConfig"></counter></div>
      </div>
      <div is="traditionalTopTwoOne"></div>
    </div>
  </viewTemplate>
</template>
<script>
  import traditionalTopTwoOne from './TraditionalTopTwoOne.vue'
  export default {
    data() {
      return {
        gsmRate: 4.41,
        letRate: 6.33,
        oltRate: 0.40,
        ftthRate: 244.85,
        indexNumConfig: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#62FEFB',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            decimal: 2,
            letterSpacing: 2 // 数字之间间距
          }
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.gsmRate = 0;
        this.letRate = 0;
        this.oltRate = 0;
        this.ftthRate = 0;
        this.$http.indi.get(['f0004', 'f0005', 'f0006', 'f0007'], {}, (res4, res5, res6, res7) => {
          try {
            this.gsmRate = res4.data.data[0].KPI_VALUE;
            this.letRate = res5.data.data[0].KPI_VALUE;
            this.oltRate = res6.data.data[0].KPI_VALUE;
            this.ftthRate = res7.data.data[0].KPI_VALUE;
          } catch (err) {
            console.log('f0004 - f0007 indicator has error')
          }
        });
      }
    },
    components: {
      traditionalTopTwoOne
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .a1-traditional-traditionalTop-two {
    position: absolute;
    height: 90px;
    width: 760px;
    top: 120px;
    left: 40px;
   .traditionalTop-networkTitle{
     position: absolute;
     color: #fefefe;
     font-size: 20px;
     left: 20px;
     top: 58px;
     .networkTitle-unit{
       font-size: 16px;
     }
    }
    .traditionalTop-networkScale{
      position: absolute;
      width: 542px;
      height: 70px;
      left: 155px;
      top: 22px;
      color: #fefefe;
      font-size: 18px;
      & > div:nth-of-type(1) {
        position: absolute;
        height: 55px;
        width: 120px;
        top: 0px;
        left: 13px;
        >div:nth-of-type(2){
          height: 25px;
          position: absolute;
          left: 7px;
        }
      }
      & > div:nth-of-type(2) {
        position: absolute;
        height: 55px;
        top: 0px;
        left: 111px;
        width: 100px;
        >div:nth-of-type(2){
          height: 25px;
          position: absolute;
          left: 7px;
        }
      }
      & > div:nth-of-type(3) {
        position: absolute;
        height: 55px;
        top: 0px;
        left: 211px;
        width: 120px;
        >div:nth-of-type(2){
          height: 25px;
          position: absolute;
          left: 20px;
        }
      }
      & > div:nth-of-type(4) {
        position: absolute;
        height: 55px;
        top: 0px;
        width: 120px;
        left: 334px;
        >div:nth-of-type(2){
          height: 25px;
          position: absolute;
          left: 0px;
        }
      }
      & > div:nth-of-type(5) {
        position: absolute;
        height: 67px;
        top: -9px;
        width: 120px;
        left: 459px;
        >div:nth-of-type(1){
          line-height: 18px;
        }
        >div:nth-of-type(2){
          height: 25px;
          position: absolute;
          left: -37px;
          top: 40px;
          width: 100px;
        }
        >div:nth-of-type(3){
          height: 25px;
          position: absolute;
          left: 66px;
          top: 40px;
          width: 100px;
        }
      }
    }
    .traditionalTop-networkScale-div {
      width: 152px;
      height: 83px;
      position: absolute;
      top: -9px;
      left: -8px;
      cursor: pointer;
    }
  }
</style>

