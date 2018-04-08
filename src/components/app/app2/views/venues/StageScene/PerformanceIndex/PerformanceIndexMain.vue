<template>
    <div class="performanceindex" :interval ="30" @interval = "loadPerformance">
         <div class="performance-title"></div>
         <div class="performance-content">
             <swiper :options="swiperOption" class="swiper">
            <swiper-slide>
                    <div class="performance-content-list">
                            <div>
                                <div class="list-title">LTE无线接通率</div>
                                <div class="list-num">
                                    <counter :data ="dataNum1" :config = "configNum1"></counter>
                                </div>
                            </div>
                            <div>
                                <div class="list-title">LTE无线掉线率</div>
                                <div class="list-num">
                                    <counter :data ="dataNum2" :config = "configNum1"></counter>
                                </div>
                            </div>
                    </div>
              <!--第一个-->
              <div class="performance-content-list">
                    <div>
                        <div class="list-title">LTE切换成功率</div>
                        <div class="list-num">
                            <counter :data ="dataNum3" :config = "configNum1"></counter>
                        </div>
                    </div>
                    <div>
                        <div class="list-title">VoLTE无线接通率(语音)</div>
                        <div class="list-num">
                            <counter :data ="dataNum4" :config = "configNum1"></counter>
                        </div>
                    </div>
              </div>
              <!--第二个-->
              <div class="performance-content-list">
                    <div>
                        <div class="list-title">VoLTE eSRVCC切换成功率</div>
                        <div class="list-num">
                            <counter :data ="dataNum5" :config = "configNum1"></counter>
                        </div>
                    </div>
                    <div>
                        <div class="list-title">VoLTE用户切换成功率</div>
                        <div class="list-num">
                            <counter :data ="dataNum6" :config = "configNum1"></counter>
                        </div>
                    </div>
              </div>
              </swiper-slide>
               <swiper-slide>
                <div class="performance-content-list">
                    <div>
                        <div class="list-title">GSM无线接通率</div>
                        <div class="list-num">
                            <counter :data ="dataNum7" :config = "configNum1"></counter>
                        </div>
                    </div>
                    <div>
                        <div class="list-title">GSM无线掉话率</div>
                        <div class="list-num">
                            <counter :data ="dataNum8" :config = "configNum1"></counter>
                        </div>
                    </div>
              </div>
              <div class="performance-content-list">
                    <div>
                        <div class="list-title">GSM切换成功率</div>
                        <div class="list-num">
                            <counter :data ="dataNum9" :config = "configNum1"></counter>
                        </div>
                    </div>
                    <div>
                        <div class="list-title">TCH拥塞率(不含切换)</div>
                        <div class="list-num">
                            <counter :data ="dataNum10" :config = "configNum1"></counter>
                        </div>
                    </div>
              </div>
              <div class="performance-content-list">
                    <div>
                        <div class="list-title">GSM无线利用率</div>
                        <div class="list-num">
                            <counter :data ="dataNum11" :config = "configNum1"></counter>
                        </div>
                    </div>
                    <div>
                        <div class="list-title">SDCCH拥塞率</div>
                        <div class="list-num">
                            <counter :data ="dataNum12" :config = "configNum1"></counter>
                        </div>
                    </div>
              </div>
               </swiper-slide>
            </swiper>
         </div>
         <span class="swiper-roam-pagination1"></span>
    </div>
</template>
<script>
    // import performanceIndexData from './performanceIndex.js'
    export default{
      props: {
        sceneName: String,
        areaId: Number
      },
      data() {
        let self = this;
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
          swiperOption: {
            autoplay: 5000,
            setWrapperSize: true,
            autoplayDisableOnInteraction: false,
            observeParents: true,
            direction: 'horizontal',
            pagination: '.swiper-roam-pagination1',
            paginationClickable: true,
            onSlideChangeEnd(swiper) {
              self.$emit('changeSwiperSlide', swiper.activeIndex);
            }
          },
          configNum1: {
            justifyContent: 'center',
            numbers: { // 数字配置项
              textStyle: {
                color: '#65fefc',
                fontSize: 24,
                fontFamily: 'PixelLCD-7'
              },
              letterSpacing: 0 // 数字之间间距
            },
            suffix: { // 后缀配置项
              content: '%',
              textStyle: {
                color: '#65fefc',
                fontSize: 24
              }
            }
          }
        }
      },
      methods: {
        loadPerformance() {
          this.$http.indi.get(this.url, {}, (res) => {
            this.dataNum1 = res.data.data.LTE_WIRELESS_CON_RATE;
            this.dataNum2 = res.data.data.LTE_WIRELESS_DROPING_RATE;
            this.dataNum3 = res.data.data.LTE_SWITCH_SUC_RATE;
            this.dataNum4 = res.data.data.VOLTE_WIRELESS_CON_RATE;
            this.dataNum5 = res.data.data.VOLTE_USER_SWITCH_SUC_RATE;
            this.dataNum6 = res.data.data.ESRVCC_SWITCH_SUC_RATE;
            this.dataNum7 = res.data.data.GSM_WIRELESS_CON_RATE
            this.dataNum8 = res.data.data.GSM_WIRELESS_DROP_RATE;
            this.dataNum9 = res.data.data.GSM_SWITCH_SUC_RATE;
            this.dataNum10 = res.data.data.TCH_CONGESTION_RATE;
            this.dataNum11 = res.data.data.GSM_WIRELESS_RATE;
            this.dataNum12 = res.data.data.SDCCH_CONGESTION_RATE;
          });
        }
      },
      watch: {
        sceneName(val) {
          this.url = 'area_' + this.areaId;
          this.loadPerformance();
        }
      }
    }
</script>
<style rel = "stylesheet/scss" lang="scss">
    .performanceindex{
        width: 695px;
        height: 480px;
        position: absolute;
        top: 70px;
        left: 3107px;
    .swiper-pagination-bullets {
      position: absolute;
      z-index: 1;
      display: inline-block;
      width: 135px;
      height: 37px;
      right: 50px;
      top: 0px;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      width: 20px;
      height: 20px;
      opacity: 1;
      border-radius: 5px;
      margin: 13px 3px;
      margin-right: 10px;
      background: #3FA7C0;
    }
    .swiper-pagination-bullet-active {
      background: #65FDFF;
      opacity: 1;
    }
        .performance-title{
            height: 44px;
            width: 280px;
            margin-bottom:40px;
            color: #fff;
             background-image: url(../../../../assets/img/venues/stagescene/icon1.png);
             background-repeat: no-repeat;
        }
        .performance-content{
            width: 100%;
            height: 400px;

            .performance-content-list{
                height: 120px;
                width: 100%;
                margin-bottom: 20px;
                >div{
                    box-sizing: border-box;
                    padding: 12px;
                    background-image: url(../../../../assets/img/venues/stagescene/performanceindex.png);
                    background-size: 100%;
                    >div{
                        height: 56px;
                        text-align: center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: #fff;
                        font-size: 24px;
                        letter-spacing: 4px;
                        &.list-num{
                        width: 100%;
                        >div:nth-of-type(1){
                            margin: 0 auto;
                             width: 200px;
                        }
                      }
                    }
                }
                >div:nth-of-type(1){
                    float: left;
                    width: 335px;
                    height: 100%;
                }
                >div:nth-of-type(2){
                    float: right;
                    width: 335px;
                    height: 100%;
                }
            }

        }
    }
</style>
