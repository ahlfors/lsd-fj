<!--家庭宽带 -->
<template>
  <viewTemplate class="a1-roam-provinceInRoam" :interval="30" @interval="getData">
    <div class="provinceInRoam-title">
      <span class="provinceInRoam-bg"></span>
      <span>省内漫游(厦门)</span>
    </div>
    <hr/>

    <div class="provinceInRoam-in">
      <div>
        <span>漫入:</span>
        <div>
          <counter :data="roamInNum" :config="indexNumConfig"></counter>
        </div>
      </div>
      <div class="provinceInRoam-progress">
        <div class="progress" >
          <span :style="{width:province_in_size+'%'}" id="p2"></span>
        </div>
      </div>
    </div>

    <div class="provinceInRoam-out">
      <div>
        <span>漫出:</span>
        <div>
          <counter :data="roamOutNum" :config="indexNumConfig"></counter>
        </div>
      </div>

      <div class="provinceInRoam-progress2">
        <div class="progress2" >
          <span :style="{width:province_out_size+'%'}" class="p2"></span>
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
        province_in_size: 100,
        province_out_size: 100,
        roamInNum: 123.11,
        roamOutNum: 4.12,
        indexNumConfig: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#F9F671',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            decimal: 2,
            letterSpacing: 2 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '(万)',
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
      //   this.roamOutNum = 0;
      //   window.setTimeout(() => {
      //     this.roamInNum = 7.78;
      //     this.roamOutNum = 5.85;
      //   }, 100)
      // },
      loadData: function(params, url, callback) {
        this.$http.indi.get(url, params, (res) => {
          callback(res.data.data)
        })
      },
      getData() {
        this.loadData(null, 'w1351', (res1) => { // 省内(厦门)漫入用户总数 w1351
          this.roamInNum = +(res1[0].KPI_VALUE / 10000).toFixed(2);
          this.loadData(null, 'w1352', (res2) => { // 省内(厦门)漫出用户总数 w1352
            this.roamOutNum = +(res2[0].KPI_VALUE / 10000).toFixed(2);
            this.province_in_size = res1[0].KPI_VALUE / (res1[0].KPI_VALUE >= res2[0].KPI_VALUE ? res1[0].KPI_VALUE : res2[0].KPI_VALUE) * 100;
            this.province_out_size = res2[0].KPI_VALUE / (res1[0].KPI_VALUE >= res2[0].KPI_VALUE ? res1[0].KPI_VALUE : res2[0].KPI_VALUE) * 100;
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
  .a1-roam-provinceInRoam {
    position: absolute;
    width: 323px;
    height: 227px;
    top: 30px;
    .provinceInRoam-title {
      position: absolute;
      height: 41px;
      width: 100%;
      .provinceInRoam-bg {
        width: 48px;
        height: 41px;
        display: flex;
        position: absolute;
        background-image: url("../../assets/img/legend/in-roam.png");
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
    .provinceInRoam-in {
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
      .provinceInRoam-progress {
        position: absolute;
        width: 200px;
        left: 67px;
        top: 36px;
        .progress {
          height: 16px;
          border-radius: 10px;
          border: 1px solid #000;
          >span {
            position: relative;
            float: left;
            margin: 0 -1px;
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
            background: url("../../assets/img/legend/progress2.png") 0 0 repeat-x;
            border-radius: 10px;
          }
        }
      }
    }
    .provinceInRoam-out {
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
          top: 10px;
        }
        >div:nth-of-type(1) {
          position: absolute;
          height: 20px;
          left: 125px;
          top: 14px;
          width: 150px;
        }
      }
      .provinceInRoam-progress2 {
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