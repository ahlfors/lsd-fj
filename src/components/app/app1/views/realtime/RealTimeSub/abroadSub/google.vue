<template>
  <viewTemplate class="a1-mobile-google" :interval="30" @interval="loadData">
      <div>
        <div class="message-row1">
          <span>总访问次数:</span>
          <span><counter :data="activeUserNum" :config="indexNumConfig"></counter></span>
        </div>
      </div>

      <div>
        <div class="message-row1">
          <span>下行流量:</span>
          <span><counter :data="downFlow" :config="indexNumConfig4"></counter></span>
        </div>
      </div>

      <div>
        <div class="message-row1">
          <span>上行流量:</span>
          <span><counter :data="upFlow" :config="indexNumConfig4"></counter></span>
        </div>
      </div>

      <div>
        <div class="message-row1">
          <span>http平均下载速率:</span>
          <span><counter :data="httpAvgDown" :config="indexNumConfig5"></counter></span>
        </div>
      </div>

      <div>
        <div class="message-row1">
          <span>http成功率:</span>
          <span><counter :data="httpSuc" :config="indexNumConfig2"></counter></span>
        </div>
      </div>

      <div>
        <div class="message-row1">
          <span>http首包响应时延:</span>
          <span><counter :data="headDelay" :config="indexNumConfig3"></counter></span>
        </div>
      </div>
  </viewTemplate>
</template>

<script>
  export default {
    data() {
      return {
        activeUserNum: 321.42,
        downFlow: 70.32,
        upFlow: 70.32,
        httpAvgDown: 70.32,
        httpSuc: 70.32,
        headDelay: 70.32,
        indexNumConfig: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#00FFDE',
              fontSize: 22
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '次',
            textStyle: {
              color: '#00FFDE',
              fontSize: 20
            }
          }
        },
        indexNumConfig2: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#00FFDE',
              fontSize: 22
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '%',
            textStyle: {
              color: '#00FFDE',
              fontSize: 20
            }
          }
        },
        indexNumConfig3: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#00FFDE',
              fontSize: 22
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: 'ms',
            textStyle: {
              color: '#00FFDE',
              fontSize: 20
            }
          }
        },
        indexNumConfig4: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#00FFDE',
              fontSize: 22
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: 'Kb',
            textStyle: {
              color: '#00FFDE',
              fontSize: 20
            }
          }
        },
        indexNumConfig5: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#00FFDE',
              fontSize: 22
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: 'kbps',
            textStyle: {
              color: '#00FFDE',
              fontSize: 20
            }
          }
        },
        indexNumConfig6: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#00FFDE',
              fontSize: 22
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: 'TB',
            textStyle: {
              color: '#00FFDE',
              fontSize: 20
            }
          }
        }
      }
    },
    methods: {
      loadData() {
        this.activeUserNum = 0;
        this.downFlow = 0;
        this.upFlow = 0;
        this.httpAvgDown = 0;
        this.httpSuc = 0;
        this.headDelay = 0;
        this.$http.indi.get('f0284', {}, (res284) => {
          this.activeUserNum = res284.data.data[0].HTTP_ACCESS_TIMES;
          this.downFlow = res284.data.data[0].DOWNSTREAM_TRAFFIC;
          this.upFlow = res284.data.data[0].UPSTREAM_TRAFFIC;
          this.httpAvgDown = res284.data.data[0].HTTP_AVERAGE_DOWNLOAD_RATE;
          this.httpSuc = res284.data.data[0].HTTP_SUCCESS_RATE;
          this.headDelay = res284.data.data[0].HTTP_FIRST_PACKET_RESPONSE_DELAY;
        })
        // window.setTimeout(() => {
          // this.activeUserNum = 70.32;
          // this.activeUserPeek = 300.32;
          // this.downFlow = 60.17;
          // this.downFlowPeek = 38.43;
          // this.upFlow = 37.01;
          // this.upFlowPeek = 4.22;
          // this.httpAvgDown = 1058.59;
          // this.httpDownPeek = 4359.97;
          // this.httpSuc = 94.78;
          // this.httpSucPeek = 97.82;
          // this.headDelay = 85.84;
          // this.headDelayMin = 62.41;
        // }, 1000)
      }
    },
    mounted() {
      this.loadData();
    },
    beforeDestroy() {
    }
  }
</script>
