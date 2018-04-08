<!--家庭宽带 -->
<template>
  <viewTemplate class="a1-roam-internationalRoam" :interval="30" @interval="getData">
    <div class="internationalRoam-title">
      <span class="internationalRoam-bg"></span>
      <span>国际漫游(福建)</span>
    </div>
    <hr/>
    <div class="internationalRoam-in">
      <div>
        <span>漫入:</span>
        <div>
           <counter :data="roamInNum" :config="indexNumConfig"></counter>
        </div>
      </div>
      <div class="internationalRoam-progress" >
       <div class="progress">
         <span :style="{width:inter_in_size+'%'}" class="p2"></span>
       </div>
      </div>
    </div>
    <div class="internationalRoam-out">
      <div>
        <span>漫出:</span>
        <div>
          <counter :data="roamOutNum" :config="indexNumConfig"></counter>
        </div>
      </div>
      <div class="internationalRoam-progress2">
        <div class="progress2" >
          <span :style="{width:inter_out_size+'%'}"></span>
        </div>
      </div>
    </div>
  </viewTemplate>
</template>
<script>
  export default {
    data() {
      return {
        swiperOption: {
          autoplay: 1000 * 1000,
          setWrapperSize: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          direction: 'horizontal',
          pagination: '.swiper-home-pagination1',
          paginationClickable: true
        },
        inter_in_size: 12.4,
        inter_out_size: 100,
        roamInNum: 1.53,
        roamOutNum: 12.34,
        indexNumConfig: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#F9F671',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            decimal: 0,
            letterSpacing: 2 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '(人)',
            textStyle: {
              color: '#FFFF85',
              fontSize: 18
            }
          }
        }
      }
    },
    methods: {
      // loadData() {
      //   this.roamInNum = 0;
      //   this.roamOutNum = 0;
      //   window.setTimeout(() => {
      //     this.roamInNum = 2.78;
      //     this.roamOutNum = 1.95;
      //   }, 100)
      // },
      loadData: function(params, url, callback) {
        this.$http.indi.get(url, params, (res) => {
          callback(res.data.data)
        })
      },
      getData() {
        this.loadData(null, 'w1343', (res1) => { // 国际(福建)漫入用户总数 w1343
          this.roamInNum = +(res1[0].KPI_VALUE).toFixed(2);
          this.loadData(null, 'w1344', (res2) => { // 国际(福建)漫出用户总数 w1344
            this.roamOutNum = +(res2[0].KPI_VALUE).toFixed(2);
            this.inter_in_size = res1[0].KPI_VALUE / (res1[0].KPI_VALUE >= res2[0].KPI_VALUE ? res1[0].KPI_VALUE : res2[0].KPI_VALUE) * 100;
            this.inter_out_size = res2[0].KPI_VALUE / (res1[0].KPI_VALUE >= res2[0].KPI_VALUE ? res1[0].KPI_VALUE : res2[0].KPI_VALUE) * 100;
          });
        });
      }
    },
    mounted() {
      this.getData();
    },
    components: {}
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .a1-roam-internationalRoam {
    position: absolute;
    width: 323px;
    height: 227px;
    top: 30px;
    .internationalRoam-title {
      position: absolute;
      height: 41px;
      width: 100%;
      .internationalRoam-bg {
        width: 48px;
        height: 41px;
        display: flex;
        position: absolute;
        background-image: url("../../assets/img/legend/international-roam.png");
        background-repeat: no-repeat;
      }
      >span:nth-of-type(2) {
        position: absolute;
        left: 58px;
        font-size: 30px;
        color: #E6F2FE;
        display: flex;
        height: 41px;
      }
    }
    hr {
      position: absolute;
      top: 35px;
      width: 100%;
    }
    .internationalRoam-in {
      width: 299px;
      height: 64px;
      position: absolute;
      top: 66px;
      background-image: url("../../assets/img/legend/DiffuseInto.png");
      background-repeat: no-repeat;
      >div:nth-of-type(1) {
        width: 299px;
        height: 64px;
        position: absolute;
        >span:nth-of-type(1) {
          display: flex;
          position: absolute;
          font-size: 20px;
          color: #fefefe;
          left: 73px;
          top: 8px;
        }
        >div:nth-of-type(1) {
          position: absolute;
          height: 20px;
          left: 125px;
          top: 12px;
          width: 150px;
        }
      }
      .internationalRoam-progress {
        position: absolute;
        width: 202px;
        left: 67px;
        top: 36px;
        .progress {
          height: 16px;
          //background: #ebebeb;
          // border-left: 1px solid transparent;
          //border-right: 1px solid transparent;
          border-radius: 10px;
          border: 1px solid #000;
          >span {
            position: relative;
            float: left;
            margin: -1px;
            min-width: 20px;
            height: 13px;
            line-height: 13px;
            text-align: right;
            /*        background: #cccccc;*/
            border: 1px solid;
            /*       border-color: #bfbfbf #b3b3b3 #9e9e9e;*/
            border-radius: 10px;
            /*          background-image: -webkit-linear-gradient(top, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
          background-image: -moz-linear-gradient(top, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
          background-image: -o-linear-gradient(top, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
          background-image: linear-gradient(to bottom, #f0f0f0 0%, #dbdbdb 70%, #cccccc 100%);
          -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
          box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);*/
          }
          >span:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            height: 13px;
            background: url("../../assets/img/legend/progress2.png") 0 0 repeat-x;
            border-radius: 5px;
          }
        }
      }
    }
    .internationalRoam-out {
      width: 299px;
      height: 64px;
      position: absolute;
      top: 150px;
      background-image: url("../../assets/img/legend/DiffuseOut.png");
      background-repeat: no-repeat;
      >div:nth-of-type(1) {
        width: 299px;
        height: 64px;
        position: absolute;
        >span:nth-of-type(1) {
          display: flex;
          position: absolute;
          font-size: 20px;
          color: #fefefe;
          left: 73px;
          top: 8px;
        }
        >div:nth-of-type(1) {
          position: absolute;
          height: 20px;
          left: 125px;
          top: 12px;
          width: 150px;
        }
      }
      .internationalRoam-progress2 {
        position: absolute;
        width: 200px;
        left: 67px;
        top: 36px;
        .progress2 {
          height: 16px;
          //background: #ebebeb;
          // border-left: 1px solid transparent;
          //border-right: 1px solid transparent;
          border-radius: 10px;
          border: 1px solid #000;
          >span {
            position: relative;
            float: left;
            margin: -1px;
            min-width: 20px;
            height: 13px;
            line-height: 13px;
            text-align: right;
            border: 1px solid;
            border-radius: 10px;
          }
          >span:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1;
            height: 13px;
            background: url("../../assets/img/legend/progress.jpg") 0 0 repeat-x;
            border-radius: 10px;
          }
        }
      }
    }
  }
</style>
