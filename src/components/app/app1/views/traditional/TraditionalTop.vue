<!--传统业务 用户数 网络规模-->
<template>
  <viewTemplate class="a1-traditional-traditionalTop" :interval="30" @interval="loadData">
    <div class="traditionalTop-userTitle">
      用户数<span class="userTitle-unit">(万)</span>
    </div>
    <div class="traditionalTop-userNum">
      <div>
        <div>2/3G用户数</div>
        <div><counter :data="gsmTDRate" :config="indexNumConfig"></counter></div>
      </div>
      <div>
        <div>MME用户数</div>
        <div><counter :data="mmeRate" :config="indexNumConfig"></counter></div>
      </div>
      <div>
        <div>VoLTE活跃用户数</div>
        <div><counter :data="volteRate" :config="indexNumConfig"></counter></div>
      </div>
      <div>
        <div>FDD用户数</div>
        <div><counter :data="fddRate" :config="indexNumConfig1"></counter></div>
      </div>
    </div>
  </viewTemplate>
</template>
<script>
  export default {
    data() {
      return {
        gsmTDRate: 1240.31,
        mmeRate: 1493.23,
        volteRate: 145.53,
        fddRate: 142.72,
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
        },
        indexNumConfig1: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#62FEFB',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 2 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '(个)',
            textStyle: {
              color: '#62FEFB',
              fontSize: 20
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
        this.gsmTDRate = 0;
        this.mmeRate = 0;
        this.volteRate = 0;
        this.pddRate = 0;
        this.$http.indi.get(['f0001', 'f0002', 'f0003', 'f0288'], {}, (res1, res2, res3, res4) => {
          try {
            this.gsmTDRate = res1.data.data[0].KPI_VALUE - res2.data.data[0].KPI_VALUE;
            this.mmeRate = res2.data.data[0].KPI_VALUE;
            this.volteRate = res3.data.data[0].KPI_VALUE;
            this.fddRate = res4.data.data[0].KPI_VALUE;
          } catch (err) {
            console.log('f0001 - f0003 indicator has error')
          }
        });
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .a1-traditional-traditionalTop {
    position: absolute;
    height: 68px;
    width: 740px;
    top: 44px;
    left: 52px;
    .traditionalTop-userTitle{
      position: absolute;
      color: #fefefe;
      font-size: 20px;
      top: 40px;
      left: 25px;
        .userTitle-unit{
          font-size: 16px;
        }
    }
    .traditionalTop-userNum{
      position: absolute;
      width: 542px;
      height: 70px;
      left: 145px;
      color: #fefefe;
      font-size: 18px;
      & > div:nth-of-type(1) {
        position: absolute;
        height: 55px;
        width: 140px;
        left: 13px;
        top: 0px;
        >div:nth-of-type(2){
          height: 25px;
        }
      }
      & > div:nth-of-type(2) {
        position: absolute;
        height: 55px;
        top: 0px;
        width: 160px;
        left: 155px;
        >div:nth-of-type(2){
          height: 25px;
        }
      }
      & > div:nth-of-type(3) {
        position: absolute;
        height: 55px;
        top: 0px;
        width: 173px;
        left: 298px;
        >div:nth-of-type(2){
          position: absolute;
          height: 25px;
          left: 20px;
        }
      }
      & > div:nth-of-type(4) {
        position: absolute;
        height: 55px;
        top: 0px;
        width: 173px;
        left: 473px;
        >div:nth-of-type(2){
          position: absolute;
          height: 25px;
        }
      }
    }
  }
</style>

