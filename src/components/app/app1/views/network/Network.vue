<!--网络安全-->
<template>
  <viewTemplate  class="_a1-network" :interval="30" @interval="loadData">
    <div class="network-body">
      <div class="stiff-wood-creep">
        <div class="wood-part1">
          <div>
            <span></span>
            <span>僵木蠕</span>
          </div>
          <div>
            <counter :data="creepNum" :config="numCfg1"></counter>
          </div>
        </div>
        <div class="wood-part2">
          <div>
            <span></span>
            <span>IDS告警数</span>
          </div>
          <div>高</div>
          <div><counter :data="idsH" :config="numCfg2"></counter></div>
          <div>中</div>
          <div><counter :data="idsM" :config="numCfg2"></counter></div>
          <div>低</div>
          <div><counter :data="idsL" :config="numCfg2"></counter></div>
        </div>
      </div>
      <div class="ddos">
        <div class="ddos-part1">
          <div>
            <span></span>
            <span>DDOS</span>
          </div>
          <div>攻击事件数</div>
          <div><counter :data="ddosNum" :config="numCfg1"></counter></div>
        </div>
        <div class="ddos-part2">
          <div>
            <span></span>
            <span>DNS</span>
          </div>
          <div>DNS解析成功率</div>
          <div><counter :data="dnsSucc" :config="numCfg4"></counter></div>
          <div>DNS解析量</div>
          <div><counter :data="dnsMeasure" :config="numCfg3"></counter></div>
        </div>
      </div>
    </div>
    <viewTemplate  viewId="04" @ok="toTools" class="a1-network-tools">
      <div class="all_pro">(全省)</div>
    </viewTemplate>
  </viewTemplate>
</template>
<script>
  import './network.scss'
  export default {
    data() {
      return {
        dnsSucc: 97.98,
        dnsMeasure: 14.43,
        ddosNum: 13,
        creepNum: 1,
        idsH: 1,
        idsM: 15,
        idsL: 0,
        numCfg1: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#FFFF85',
              fontSize: 25,
              fontFamily: 'DigifaceWide'
            },
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '个',
            marginLeft: 0,
            textStyle: {
              color: '#FFFF85',
              fontSize: 20
            }
          }
        },
        numCfg2: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#FFFF85',
              fontSize: 25,
              fontFamily: 'DigifaceWide'
            },
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '次',
            marginLeft: 0,
            textStyle: {
              color: '#FFFF85',
              fontSize: 20
            }
          }
        },
        numCfg3: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#FFFF85',
              fontSize: 25,
              fontFamily: 'DigifaceWide'
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '亿次',
            marginLeft: 0,
            textStyle: {
              color: '#FFFF85',
              fontSize: 20
            }
          }
        },
        numCfg4: {
          justifyContent: 'flex-start',
          numbers: { // 数字配置项
            textStyle: {
              color: '#FFFF85',
              fontSize: 25,
              fontFamily: 'DigifaceWide'
            },
            decimal: 2,
            letterSpacing: 0 // 数字之间间距
          },
          suffix: { // 后缀配置项
            content: '%',
            marginLeft: 0,
            textStyle: {
              color: '#FFFF85',
              fontSize: 20
            }
          }
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.dnsSucc = 0;
        this.dnsMeasure = 0;
        this.ddosNum = 0;
        this.idsH = 0;
        this.creepNum = 0;
        this.idsM = 0;
        this.idsL = 1;
        this.$http.indi.get(['f0062', 'f0063', 'f0064', 'f0065', 'f0066', 'f0067', 'f0068'], {}, (res62, res63, res64, res65, res66, res67, res68) => {
          this.creepNum = res62.data.data[0].KPI_VALUE;
          this.ddosNum = res63.data.data[0].KPI_VALUE;
          this.idsH = res64.data.data[0].KPI_VALUE;
          this.idsM = res65.data.data[0].KPI_VALUE;
          this.idsL = res66.data.data[0].KPI_VALUE;
          this.dnsSucc = res67.data.data[0].KPI_VALUE;
          this.dnsMeasure = res68.data.data[0].KPI_VALUE;
        })
        // window.setTimeout(() => {
        //   this.dnsSucc = 97.98;
        //   this.dnsMeasure = 14.43;
        //   this.ddosNum = 13;
        //   this.idsH = 1;
        //   this.creepNum = 1;
        //   this.idsM = 15;
        //   this.idsL = 0;
        // }, 500);
      },
      toTools() {
        this.$router.push({
          name: 'network/networkSub'
        });
      },
      toTools1() {
        this.$router.push({
          name: 'network/networkIds'
        });
      },
      toTools2() {
        this.$router.push({
          name: 'network/networkDdos'
        });
      }
    },
    components: {
    }
  }
</script>
