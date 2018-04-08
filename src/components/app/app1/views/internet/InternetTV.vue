<!--互联网电视 -->
<template>
  <viewTemplate class="a1-internet-internetTV" :interval="30" @interval="loadData">
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide>
        <div class="internetTV-part1">
          <div class="internetTV-userNum">
            <div><counter :data="tv_userNum" :config="indexNumConfig"></counter></div>
            <div>用户数(万)</div>
          </div>
          <div class="internetTV-averageWatch">
            <div><counter :data="tv_activeUserNume" :config="indexNumConfig"></counter></div>
            <div>活跃用户数(万)</div>
          </div>
          <div class="internetTV-downRate">
            <div><counter :data="tv_onlineRate" :config="indexNumConfig"></counter></div>
            <div>在线率(%)</div>
          </div>
          <div class="internetTV-cationNum">
            <div><counter :data="tv_averageWatch" :config="indexNumConfig"></counter></div>
            <div>观看时长(小时)</div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="internetTV-part2">
          <div class="internetTV-tcp1">
            <div><counter :data="tv_downRate" :config="indexNumConfig"></counter></div>
            <div>下载速率(kbps)</div>
          </div>
          <div class="internetTV-tcp2">
            <div><counter :data="tv_cationNum" :config="indexNumConfig"></counter></div>
            <div>卡顿次数(次/小时)</div>
          </div>
          <div class="internetTV-tcp3">
            <div><counter :data="tv_catonTimeNum" :config="indexNumConfig"></counter></div>
            <div>卡顿时长(s/小时)</div>
        </div>
          <div class="internetTV-activeUserNume">
            <div><counter :data="tv_tcp1" :config="indexNumConfig"></counter></div>
            <div>TCP成功率(%)</div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <span class="swiper-tv-pagination2"></span>
  </viewTemplate>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        swiperOption: {
          autoplay: 1000 * 10,
          setWrapperSize: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          direction: 'horizontal',
          pagination: '.swiper-tv-pagination2',
          paginationClickable: true
        },
        tv_userNum: 132.70,
        tv_averageWatch: 3320.00,
        tv_downRate: 1426.09,
        tv_cationNum: 0.39,
        tv_tcp1: 100,
        tv_onlineRate: 18,
        tv_activeUserNume: 3.19,
        tv_catonTimeNum: 10.14,
        indexNumConfig: {
          justifyContent: 'center',
          numbers: { // 数字配置项
            textStyle: {
              color: '#FCFF99',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            decimal: 2,
            letterSpacing: 2 // 数字之间间距
          }
        }
      }
    },
    methods: {
      loadData() {
        this.tv_userNum = 0;
        this.tv_averageWatch = 0;
        this.tv_downRate = 0;
        this.tv_cationNum = 0;
        this.tv_tcp1 = 0;
        this.tv_onlineRate = 0;
        this.tv_activeUserNume = 0;
        this.tv_catonTimeNum = 0;
        this.$http.indi.get(['f0035', 'f0036', 'f0037', 'f0038', 'f0039', 'f0040', 'f0041', 'f0042'], {}, (res35, res36, res37, res38, res39, res40, res41, res42) => {
          this.tv_userNum = res35.data.data[0].KPI_VALUE;
          this.tv_activeUserNume = res36.data.data[0].KPI_VALUE;
          this.tv_onlineRate = res37.data.data[0].KPI_VALUE;
          this.tv_averageWatch = res38.data.data[0].KPI_VALUE;
          this.tv_downRate = res39.data.data[0].KPI_VALUE;
          this.tv_cationNum = res40.data.data[0].KPI_VALUE;
          this.tv_catonTimeNum = res41.data.data[0].KPI_VALUE;
          this.tv_tcp1 = res42.data.data[0].KPI_VALUE;
        })
        // window.setTimeout(() => {
        //   this.tv_userNum = 132;
        //   this.tv_averageWatch = 3320.00;
        //   this.tv_downRate = 1426;
        //   this.tv_cationNum = 0.6;
        //   this.tv_tcp1 = 100;
        //   this.tv_onlineRate = 18;
        //   this.tv_activeUserNume = 23.5;
        //   this.tv_catonTimeNum = 10.14;
        // }, 100)
      }
    },
    mounted() {
      this.loadData();
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .a1-internet-internetTV{
    height: 148px;
    width: 709px;
    top: 170px;
    left: 53px;
  .swiper{
    height: 148px;
    width: 709px;
  .internetTV-part1{
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
  .internetTV-userNum{
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
  .internetTV-averageWatch{
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
  .internetTV-downRate{
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
  .internetTV-cationNum{
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
  .internetTV-part2 {
    position: absolute;
    height: 100%;
    width: 100%;
    > div {
      position: absolute;
      width: 154px;
      height: 91px;
      background-image: url("../../assets/img/legend/internet.png");
      background-repeat: no-repeat;
      top: 45px;
    }
    .internetTV-tcp1 {
      left: 17px;
      & > div:nth-of-type(1) {
        position: absolute;
        width: 100%;
        height: 38px;
        top: 6px;
      }
      & > div:nth-of-type(2) {
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
    .internetTV-tcp2{
      left: 180px;
      width: 182px;
      & > div:nth-of-type(1){
        position: absolute;
        width: 86%;
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
        left: -10px;
      }
    }
    .internetTV-tcp3{
      left: 365px;
      width: 182px;
      & > div:nth-of-type(1){
        position: absolute;
        width: 86%;
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
        left: -10px;
      }
    }
    .internetTV-activeUserNume{
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
    .internetTV-part3 {
      position: absolute;
      height: 100%;
      width: 100%;
      > div {
        position: absolute;
        width: 154px;
        height: 91px;
        background-image: url("../../assets/img/legend/internet.png");
        background-repeat: no-repeat;
        top: 45px;
      }
      .internetTV-catonTime {
        left: 17px;
        & > div:nth-of-type(1) {
          position: absolute;
          width: 100%;
          height: 38px;
          top: 6px;
        }
        & > div:nth-of-type(2) {
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
  }
    .swiper-pagination-bullets {
      position: absolute;
      z-index: 1;
      display: inline-block;
      width: 135px;
      height: 37px;
      left: 204px;
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
