<template>
  <viewTemplate class="a1-mobile-total" :interval="30" @interval="loadData">
    <div>
      <div class="message-row1">
        <span>活跃用户数:</span>
        <span><counter :data="activeUserNum" :config="indexNumConfig"></counter></span>
      </div>
      <div class="message-row2">
        <span>峰值<span style="color: #fff000">({{active_peek}})</span>:</span>
        <span><counter :data="activeUserPeek" :config="indexNumConfig"></counter></span>
      </div>
    </div>

    <div>
      <div class="message-row1">
        <span>下行流量:</span>
        <span><counter :data="downFlow" :config="indexNumConfig4"></counter></span>
      </div>
      <div class="message-row2">
        <span>累计值:</span>
        <span><counter :data="downFlowPeek" :config="indexNumConfig6"></counter></span>
      </div>
    </div>

    <div>
      <div class="message-row1">
        <span>上行流量:</span>
        <span><counter :data="upFlow" :config="indexNumConfig4"></counter></span>
      </div>
      <div class="message-row2">
        <span>累计值:</span>
        <span><counter :data="upFlowPeek" :config="indexNumConfig6"></counter></span>
      </div>
    </div>

    <div>
      <div class="message-row1">
        <span>http平均下载速率:</span>
        <span><counter :data="httpAvgDown" :config="indexNumConfig5"></counter></span>
      </div>
      <div class="message-row2">
        <span>峰值<span style="color: #fff000">({{http_avg_peek}})</span>:</span>
        <span><counter :data="httpDownPeek" :config="indexNumConfig5"></counter></span>
      </div>
    </div>

    <div>
      <div class="message-row1">
        <span>http成功率:</span>
        <span><counter :data="httpSuc" :config="indexNumConfig2"></counter></span>
      </div>
      <div class="message-row2">
        <span>峰值<span style="color: #fff000">({{http_succ_peek}})</span>:</span>
        <span><counter :data="httpSucPeek" :config="indexNumConfig2"></counter></span>
      </div>
    </div>

    <div>
      <div class="message-row1">
        <span>http首包响应时延:</span>
        <span><counter :data="headDelay" :config="indexNumConfig3"></counter></span>
      </div>
      <div class="message-row2">
        <span>峰值<span style="color: #fff000">({{http_delay_peek}})</span>:</span>
        <span><counter :data="headDelayMin" :config="indexNumConfig3"></counter></span>
      </div>
    </div>
  </viewTemplate>
</template>

<script>
  export default {
    data() {
      return {
        active_peek: null,
        http_avg_peek: null,
        http_succ_peek: null,
        http_delay_peek: null,
        activeUserNum: 70.32,
        activeUserPeek: 89.65,
        downFlow: 70.32,
        downFlowPeek: 89.65,
        upFlow: 70.32,
        upFlowPeek: 89.65,
        httpAvgDown: 70.32,
        httpDownPeek: 89.65,
        httpSuc: 70.32,
        httpSucPeek: 89.65,
        headDelay: 70.32,
        headDelayMin: 89.65,
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
            content: '万',
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
            content: 'GB',
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
        }
      }
    },
    methods: {
      loadData() {
        this.activeUserNum = 0;
        this.activeUserPeek = 0;
        this.downFlow = 0;
        this.downFlowPeek = 0;
        this.upFlow = 0;
        this.upFlowPeek = 0;
        this.httpAvgDown = 0;
        this.httpDownPeek = 0;
        this.httpSuc = 0;
        this.httpSucPeek = 0;
        this.headDelay = 0;
        this.headDelayMin = 0;
        this.$http.indi.get('f0061', {}, (res61) => {
          if (res61.data.data.ACTIVE_USER_PEAK_TIME) {
            this.active_peek = (new Date(Date.parse(res61.data.data.ACTIVE_USER_PEAK_TIME))).pattern('HH时mm分');
          }
          if (res61.data.data.HTTP_AVERAGE_DOWNLOAD_RATE_PEAK_TIME) {
            this.http_avg_peek = (new Date(Date.parse(res61.data.data.HTTP_AVERAGE_DOWNLOAD_RATE_PEAK_TIME))).pattern('HH时mm分');
          }
          if (res61.data.data.HTTP_SUCCESS_RATE_PEAK_TIME) {
            this.http_succ_peek = (new Date(Date.parse(res61.data.data.HTTP_SUCCESS_RATE_PEAK_TIME))).pattern('HH时mm分');
          }
          if (res61.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY_PEAK_TIME) {
            this.http_delay_peek = (new Date(Date.parse(res61.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY_PEAK_TIME))).pattern('HH时mm分');
          }
          this.activeUserNum = res61.data.data.NUMBER_OF_ACTIVE_USER;
          this.activeUserPeek = res61.data.data.ACTIVE_USER_PEAK;
          this.downFlow = res61.data.data.DOWNSTREAM_TRAFFIC;
          this.downFlowPeek = res61.data.data.CUMULATIVE_DOWNSTREAM_TRAFFIC;
          this.upFlow = res61.data.data.UPSTREAM_TRAFFIC;
          this.upFlowPeek = res61.data.data.CUMULATIVE_UPSTREAM_TRAFFIC;
          this.httpAvgDown = res61.data.data.HTTP_AVERAGE_DOWNLOAD_RATE;
          this.httpDownPeek = res61.data.data.HTTP_AVERAGE_DOWNLOAD_RATE_PEAK;
          this.httpSuc = res61.data.data.HTTP_SUCCESS_RATE;
          this.httpSucPeek = res61.data.data.HTTP_SUCCESS_RATE_PEAK;
          this.headDelay = res61.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY;
          this.headDelayMin = res61.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY_MINIMUM;
        })
        // window.setTimeout(() => {
        //   this.activeUserNum = 581.38;
        //   this.activeUserPeek = 1251.92;
        //   this.downFlow = 398.54;
        //   this.downFlowPeek = 283.84;
        //   this.upFlow = 37.78;
        //   this.upFlowPeek = 25.93;
        //   this.httpAvgDown = 2782.80;
        //   this.httpDownPeek = 2958.72;
        //   this.httpSuc = 93.53;
        //   this.httpSucPeek = 95.65;
        //   this.headDelay = 123.32;
        //   this.headDelayMin = 68.85;
        // }, 100)
      }
    },
    mounted() {
      this.loadData();
    },
    beforeDestroy() {
    }
  }
</script>
