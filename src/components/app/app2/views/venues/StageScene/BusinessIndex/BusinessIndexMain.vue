<template>
    <viewTemplate class="businessindex" :interval="30" @interval="loadBusiness">
        <div class="businessindex-title"></div>
        <div class="businessindex-content">
            <div class="businessindex-item">
                 <div class="businessindex-item-services">
                     <div class="item-services-text">流量</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum1" :config = "configNum3"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">EPS成功率</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum2" :config = "configNum1"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">DNS时延</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum3" :config = "configNum2"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">HTTP成功率</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum4" :config = "configNum1"></counter>
                     </div>
                 </div>
            </div>
            <!--第一个-->
            <div class="businessindex-item">
                 <div class="businessindex-item-services">
                     <div class="item-services-text">ATTACH成功率</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum5" :config = "configNum1"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">EPS时延</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum6" :config = "configNum2"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">TCP成功率</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum7" :config = "configNum1"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">HTTP首包响应时延</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum8" :config = "configNum2"></counter>
                     </div>
                 </div>
            </div>
            <!--第二个-->
            <div class="businessindex-item">
                <div class="businessindex-item-services">
                     <div class="item-services-text">ATTACH时延</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum9" :config = "configNum2"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">DNS成功率</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum10" :config = "configNum1"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">TCP时延</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum11" :config = "configNum2"></counter>
                     </div>
                 </div>
                 <div class="businessindex-item-services">
                     <div class="item-services-text">HTTP下载速率</div>
                     <div class="item-services-value">
                         <counter :data = "dataNum12" :config = "configNum4"></counter>
                     </div>
                 </div>
            </div>
            <!--第三个-->
        </div>
    </viewTemplate>
</template>
<script>
    // import BusinessIndexData from './BusinessIndex.js'
    export default{
      props: {
        areaId: Number,
        sceneName: {
          type: String,
          default: '国际会议展览中心'
        }
      },
      data() {
        return {
          dataNum1: null,
          dataNum2: null,
          dataNum3: null,
          dataNum4: null,
          dataNum5: null,
          dataNum6: null,
          dataNum7: null,
          dataNum8: null,
          dataNum9: null,
          dataNum10: null,
          dataNum11: null,
          dataNum12: null,
          url: null,
          index: null,
          configNum1: {
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
          configNum2: {
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
              content: 'ms',
              textStyle: {
                color: '#fdff99',
                fontSize: 24
              }
            }
          },
          configNum3: {
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
              content: 'MB',
              textStyle: {
                color: '#fdff99',
                fontSize: 24
              }
            }
          },
          configNum4: {
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
              content: 'kbps',
              textStyle: {
                color: '#fdff99',
                fontSize: 24
              }
            }
          }
        }
      },
      methods: {
        loadBusiness() {
          this.$http.indi.get(this.url, {}, (res) => {
            this.dataNum1 = res.data.data.TOTAL_DATA_FLOW;
            this.dataNum2 = res.data.data.EPS_SUC_RATE;
            this.dataNum3 = res.data.data.DNS_TIME_DELAY;
            this.dataNum4 = res.data.data.TCP_SUC_RATE;
            this.dataNum5 = res.data.data.ATTACH_SUC_RATE;
            this.dataNum6 = res.data.data.EPS_TIME_DELAY;
            this.dataNum7 = res.data.data.TCP_SUC_RATE;
            this.dataNum8 = res.data.data.HTTP_RESPONSE_TIME_DELAY;
            this.dataNum9 = res.data.data.ATTACH_TIME_DELAY;
            this.dataNum10 = res.data.data.DNS_SUC_RATE;
            this.dataNum11 = res.data.data.TCP_TIME_DELAY;
            this.dataNum12 = res.data.data.HTTP_DOWNLOAD_SPEED_TIME;
          });
        }
      },
      watch: {
        sceneName(val) {
          this.url = 'area_' + this.areaId;
          this.loadBusiness();
        }
      }
    }
</script>
<style rel = "stylesheet/scss" lang="scss">
    .businessindex{
        width: 695px;
        height: 405px;
        position: absolute;
        top: 582px;
        left: 3107px;
        .businessindex-title{
            height: 44px;
            width: 230px;
            margin-bottom:20px;
            color: #fff;
             background-image: url(../../../../assets/img/venues/stagescene/icon2.png);
             background-repeat: no-repeat;
        }
        .businessindex-content{
            height: 320px;
            width: 100%;
            .businessindex-item{
                height:324px;
                width:220px;
                float: left;
                margin-right: 10px;
                .businessindex-item-title{
                    height: 46px;
                    width: 100%;
                    font-size: 24px;
                    color: #b1d7fb;
                    box-sizing: border-box;
                }
                .businessindex-item-services{
                        height: 60px;
                        width: 100%;
                        margin-top: 30px;
                        .item-services-text{
                           color: #b1d7fb;
                           font-size: 24px;
                           height: 31px;
                        }
                        .item-services-value{
                           height: 31px;
                        }
                    }
            }
        }
    }
</style>
