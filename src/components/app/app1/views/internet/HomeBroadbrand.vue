<template>
  <viewTemplate class="a1-internet-homeBroadbrand" :interval="30" @interval="loadData">
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide>
        <div class="homeBroadbrand-part1">
          <div class="homeBroadbrand-userNum">
            <div><counter :data="userNum" :config="indexNumConfig"></counter></div>
            <div>用户数(万)</div>
          </div>
          <div class="homeBroadbrand-flow">
            <div><counter :data="activeUserNum" :config="indexNumConfig"></counter></div>
            <div>活跃用户数(万)</div>
          </div>
          <div class="homeBroadbrand-downRate">
            <div><counter :data="onlineRate" :config="indexNumConfig"></counter></div>
            <div>在线率(%)</div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
      <div class="homeBroadbrand-part2">
        <div class="homeBroadbrand-downRate3">
          <div><counter :data="t_flow" :config="indexNumConfig"></counter></div>
          <div>流量(TB)</div>
        </div>
        <span class="downRate3-source">
            <span></span>
            <span>总部出口</span>
        </span>
        <div class="homeBroadbrand-HeadDelayed">
          <div><counter :data="t_downRate" :config="indexNumConfig"></counter></div>
          <div>下载速率(kbps)</div>
        </div>
        <span class="HeadDelayed-source">
             <span></span>
            <span>总部出口</span>
          </span>
        <div class="homeBroadbrand-delayed3">
          <div><counter :data="t_HeadDelayed" :config="indexNumConfig"></counter></div>
          <div>首包时延(ms)</div>
        </div>
        <span class="delayed3-source">
             <span></span>
            <span>总部出口</span>
          </span>
        <div class="homeBroadbrand-httpSucRate">
          <div><counter :data="t_httpSucRate" :config="indexNumConfig"></counter></div>
          <div>http成功率(%)</div>
        </div>
        <span class="httpSucRate-source">
            <span></span>
            <span>总部出口</span>
          </span>
      </div>
      </swiper-slide>
      <swiper-slide>
        <div class="homeBroadbrand-part3">
          <div class="homeBroadbrand-downRate4">
            <div><counter :data="t_flow2" :config="indexNumConfig"></counter></div>
            <div>流量(TB)</div>
          </div>
          <span class="downRate3-source4">
            <span></span>
            <span>三方出口</span>
        </span>
          <div class="homeBroadbrand-HeadDelayed4">
            <div><counter :data="t_downRate2" :config="indexNumConfig"></counter></div>
            <div>下载速率(kbps)</div>
          </div>
          <span class="HeadDelayed-source4">
             <span></span>
            <span>三方出口</span>
          </span>
          <div class="homeBroadbrand-delayed4">
            <div><counter :data="t_HeadDelayed2" :config="indexNumConfig"></counter></div>
            <div>首包时延(ms)</div>
          </div>
          <span class="delayed3-source4">
             <span></span>
            <span>三方出口</span>
          </span>
          <div class="homeBroadbrand-httpSucRate4">
            <div><counter :data="t_httpSucRate2" :config="indexNumConfig"></counter></div>
            <div>http成功率(%)</div>
          </div>
          <span class="httpSucRate-source4">
            <span></span>
            <span>三方出口</span>
          </span>
        </div>
      </swiper-slide>
    </swiper>
    <span class="swiper-home-pagination1"></span>
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
          pagination: '.swiper-home-pagination1',
          paginationClickable: true
        },
        userNum: 273.83,
        activeUserNum: 189.34,
        onlineRate: 99.7,
        t_flow: 213.43,
        t_downRate: 18558.66,
        t_HeadDelayed: 42.2,
        t_httpSucRate: 96.75,
        t_flow2: 180.43,
        t_downRate2: 400.16,
        t_HeadDelayed2: 450.32,
        t_httpSucRate2: 95.61,
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
        this.userNum = 0;
        this.activeUserNum = 0;
        this.onlineRate = 0;
        this.t_HeadDelayed = 0;
        this.t_flow = 0;
        this.t_downRate = 0;
        this.t_httpSucRate = 0;
        this.t_HeadDelayed2 = 0;
        this.t_flow2 = 0;
        this.t_downRate2 = 0;
        this.t_httpSucRate2 = 0;
        this.$http.indi.get(['f0024', 'f0025', 'f0026', 'f0027', 'f0028', 'f0029', 'f0030', 'f0031', 'f0032', 'f0033', 'f0034'], {}, (res24, res25, res26, res27, res28, res29, res30, res31, res32, res33, res34) => {
          this.userNum = res24.data.data[0].KPI_VALUE;
          this.activeUserNum = res25.data.data[0].KPI_VALUE;
          this.onlineRate = res26.data.data[0].KPI_VALUE;
          this.t_flow = res27.data.data[0].KPI_VALUE;
          this.t_downRate = res28.data.data[0].KPI_VALUE;
          this.t_HeadDelayed = res29.data.data[0].KPI_VALUE;
          this.t_httpSucRate = res30.data.data[0].KPI_VALUE;
          this.t_flow2 = res31.data.data[0].KPI_VALUE;
          this.t_downRate2 = res32.data.data[0].KPI_VALUE;
          this.t_HeadDelayed2 = res33.data.data[0].KPI_VALUE;
          this.t_httpSucRate2 = res34.data.data[0].KPI_VALUE;
        })
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
  .a1-internet-homeBroadbrand{
    height: 148px;
    width: 709px;
    top: 22px;
    left: 53px;
    .swiper{
      height: 148px;
      width: 709px;
      .homeBroadbrand-part1{
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
        .homeBroadbrand-userNum{
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
        .homeBroadbrand-activeUserNum{
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
        .homeBroadbrand-flow{
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
        .homeBroadbrand-downRate{
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
      }
      .homeBroadbrand-part2{
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
        .homeBroadbrand-downRate3{
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
        .downRate3-source{
          position: absolute;
          width: 154px;
          left: 24px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
          }
        }
        .homeBroadbrand-HeadDelayed{
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
        .HeadDelayed-source{
          position: absolute;
          width: 154px;
          left: 202px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
          }
        }
        .homeBroadbrand-delayed3{
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
        .delayed3-source{
          position: absolute;
          width: 154px;
          left: 373px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
          }
        }
        .homeBroadbrand-httpSucRate{
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
        .httpSucRate-source{
          position: absolute;
          width: 154px;
          left: 548px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
          }
        }
      }
      .homeBroadbrand-part3 {
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
        .homeBroadbrand-downRate4{
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
        .downRate3-source4{
          position: absolute;
          width: 154px;
          left: 24px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
          }
        }
        .homeBroadbrand-HeadDelayed4{
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
        .HeadDelayed-source4{
          position: absolute;
          width: 154px;
          left: 202px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
          }
        }
        .homeBroadbrand-delayed4{
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
        .delayed3-source4{
          position: absolute;
          width: 154px;
          left: 373px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
          }
        }
        .homeBroadbrand-httpSucRate4{
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
        .httpSucRate-source4{
          position: absolute;
          width: 154px;
          left: 548px;
          font-size: 18px;
          top: 126px;
          color: #99EFFF;
          > span:nth-of-type(1){
            display: flex;
            width: 140px;
            height: 10px;
            position: absolute;
            background-image: url("../../assets/img/legend/internetShape.png");
            background-repeat: no-repeat;
            top: 7px;
          }
          > span:nth-of-type(2){
            position: absolute;
            left: 35px;
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
