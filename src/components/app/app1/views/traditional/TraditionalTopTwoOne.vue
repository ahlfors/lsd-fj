<!--传统业务 网络规模-->
<template>
  <viewTemplate class="a1-traditional-traditionalTop-two-one" :interval="30" @interval="loadData">
    <div>重保集客专线<br>&nbsp;总数/故障数</div>
    <div>
      <counter :data="zbjkRate" :config="indexNumConfig1"></counter>
    </div>
    <div>
      <counter :data="zbjkgzRate" :config="indexNumConfig2"></counter>
    </div>
    <viewTemplate viewId="x01" @ok="toNetScale" class="traditionalTop-networkScale-div"></viewTemplate>
  </viewTemplate>
</template>
<script>
  export default {
    data() {
      return {
        zbjkRate: 82,
        zbjkgzRate: 4,
        indexNumConfig1: {
          justifyContent: 'flex-end',
          numbers: { // 数字配置项
            textStyle: {
              color: '#62FEFB',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 2 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '/',
            textStyle: {
              color: '#62FEFB',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            }
          }
        },
        indexNumConfig2: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#DD626D',
              fontSize: 20,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 2 // 数字之间间距
          }
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      toNetScale() {
        this.$router.push({
          name: 'traditional/netScale'
        });
      },
      loadData() {
        this.zbjkRate = 0;
        this.zbjkgzRate = 0;
        this.$http.indi.get(['f0295', 'f0296'], {}, (res8, res9) => {
          try {
            this.zbjkRate = res9.data.data[0].KPI_VALUE;
            this.zbjkgzRate = res8.data.data[0].KPI_VALUE;
          } catch (err) {
            console.log('f0295,f0296 indicator has error')
          }
        });
      }
    }
  }
</script>
<style lang="scss">
  .a1-traditional-net-scale {
    .a1-traditional-traditionalTop-two-one {
      width: 152px;
      height: 83px;
      top: 134px;
      left: 657px;
      border-radius: 4px;
      box-shadow: 0px 0px 37px #9CA3A9;
      background-image: url("../../assets/img/legend/net-scale-left.png");
      > div:nth-of-type(1) {
        color: #fefefe;
        font-size: 18px;
        line-height: 18px;
        position: absolute;
        top: 8px;
        left: 7px;
      }
      > div:nth-of-type(2) {
        height: 25px;
        position: absolute;
        right: 82px;
        top: 49px;
      }
      > div:nth-of-type(3) {
        height: 25px;
        position: absolute;
        left: 74px;
        top: 49px;
      }
    }
  }
</style>
