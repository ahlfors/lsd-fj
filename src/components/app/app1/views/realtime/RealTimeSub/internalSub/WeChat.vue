<template>
  <viewTemplate class="a1-mobile-weChat" :interval="30" @interval="loadData">
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
        activeUserNum: 38.22,
        activeUserPeek: 89.65,
        downFlow: 1347.32,
        downFlowPeek: 3487.65,
        upFlow: 3426.32,
        upFlowPeek: 4537.65,
        httpAvgDown: 1245.32,
        httpDownPeek: 4567.65,
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
        this.$http.indi.get('f0058', {}, (res58) => {
          if (res58.data.data.ACTIVE_USER_PEAK_TIME) {
            this.active_peek = (new Date(Date.parse(res58.data.data.ACTIVE_USER_PEAK_TIME))).pattern('HH时mm分');
          }
          if (res58.data.data.HTTP_AVERAGE_DOWNLOAD_RATE_PEAK_TIME) {
            this.http_avg_peek = (new Date(Date.parse(res58.data.data.HTTP_AVERAGE_DOWNLOAD_RATE_PEAK_TIME))).pattern('HH时mm分');
          }
          if (res58.data.data.HTTP_SUCCESS_RATE_PEAK_TIME) {
            this.http_succ_peek = (new Date(Date.parse(res58.data.data.HTTP_SUCCESS_RATE_PEAK_TIME))).pattern('HH时mm分');
          }
          if (res58.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY_PEAK_TIME) {
            this.http_delay_peek = (new Date(Date.parse(res58.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY_PEAK_TIME))).pattern('HH时mm分');
          }
          this.activeUserNum = res58.data.data.NUMBER_OF_ACTIVE_USER;
          this.activeUserPeek = res58.data.data.ACTIVE_USER_PEAK;
          this.downFlow = res58.data.data.DOWNSTREAM_TRAFFIC;
          this.downFlowPeek = res58.data.data.CUMULATIVE_DOWNSTREAM_TRAFFIC;
          this.upFlow = res58.data.data.UPSTREAM_TRAFFIC;
          this.upFlowPeek = res58.data.data.CUMULATIVE_UPSTREAM_TRAFFIC;
          this.httpAvgDown = res58.data.data.HTTP_AVERAGE_DOWNLOAD_RATE;
          this.httpDownPeek = res58.data.data.HTTP_AVERAGE_DOWNLOAD_RATE_PEAK;
          this.httpSuc = res58.data.data.HTTP_SUCCESS_RATE;
          this.httpSucPeek = res58.data.data.HTTP_SUCCESS_RATE_PEAK;
          this.headDelay = res58.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY;
          this.headDelayMin = res58.data.data.HTTP_FIRST_PACKET_RESPONSE_DELAY_MINIMUM;
        })
        // window.setTimeout(() => {
        //   this.activeUserNum = 38.22;
        //   this.activeUserPeek = 89.65;
        //   this.downFlow = 52.12;
        //   this.downFlowPeek = 32.11;
        //   this.upFlow = 6.11;
        //   this.upFlowPeek = 3.54;
        //   this.httpAvgDown = 2727.57;
        //   this.httpDownPeek = 3269.35;
        //   this.httpSuc = 95.58;
        //   this.httpSucPeek = 97.69;
        //   this.headDelay = 65.88;
        //   this.headDelayMin = 60.54;
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
