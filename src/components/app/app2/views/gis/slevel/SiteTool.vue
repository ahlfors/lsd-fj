<!--基站二级-->
<template>
  <div class="gis-tools-div-site">
    <div class="tools-site-title">{{sLevelData.ZH_LABEL}}</div>
    <div class="tools-site-body">
      <div class="site-body-one">
        <div class="one-header">基础信息</div>
        <div class="one-content">
          <div v-for="(val, key) in baseInfo">
            <span>{{key}}</span>
            <span>{{val}}</span>
          </div>
        </div>
      </div>
      <div class="site-body-two">
        <div class="two-header">维护信息</div>
        <div class="two-content">
          <div v-for="(val, key) in maintainInfo">
            <span>{{key}}</span>
            <span>{{val}}</span>
          </div>
        </div>
      </div>
      <div class="site-body-three">
        <div class="three-header">指标情况</div>
        <div class="three-content">
          <div>
            <span>无线接通率</span>
            <div id="jtSussRate" class="jtSussRate"></div>
            <span style="color: #FFFC3C;">{{indexInfo.jtSussRate}}<span v-show="indexInfo.jtSussRate !== '-'">%</span></span>
          </div>
          <div>
            <span>无线掉话率</span>
            <div id="breakRate" class="breakRate"></div>
            <span style="color: #F58730;">{{indexInfo.breakRate}}<span v-show="indexInfo.breakRate !== '-'">%</span></span>
          </div>
        </div>
      </div>
      <div class="site-body-four">
        <div class="four-header">供电保障能力</div>
        <div class="four-content">
          <span>蓄电池<br>可供电时长</span>
          <span>{{supplyPower}}<span v-show="supplyPower !== '-'">H</span></span>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SiteTool',
    data() {
      return {
        baseInfo: {
          'SITE_ID': '',
          '区县': '',
          '类型': '',
          '所属机房': '',
          '基站状态': ''
        },
        maintainInfo: {
          '维护单位': '',
          '维护班组': '',
          '接口人': '',
          '联系方式': ''
        },
        indexInfo: {
          jtSussRate: '-',
          breakRate: '-'
        },
        supplyPower: '-'
      }
    },
    props: {
      sLevelData: Object
    },
    mounted() {
      this.setData();
    },
    methods: {
      getIceData(iceId, intId, callBack) {
        this.$http.get(`http://10.209.1.7:8082/ips-ice/indicator/${iceId}/${intId}`)
          .then((res) => {
            if (!res || !res.data || res.data.length === 0) {
              return;
            }
            callBack(res.data);
          }).catch((err) => {
            console.error(err);
          });
      },
      setData() {
        this.baseInfo = {
          'SITE_ID': this.sLevelData['SITE_ID'],
          '区县': this.sLevelData['REGION_NAME'],
          '类型': this.sLevelData['SITE_TYPE'],
          '所属机房': this.sLevelData['SSJF'],
          '基站状态': this.sLevelData['SITE_STATE']
        };
        this.maintainInfo = {
          '维护单位': this.sLevelData['WHDW'],
          '维护班组': this.sLevelData['WHBZ'],
          '接口人': this.sLevelData['JKR'],
          '联系方式': this.sLevelData['LXFS']
        };
        if (this.sLevelData['INT_ID']) {
          if (this.sLevelData['SITE_TYPE'] === '2G') {
            // 2G基站-GSM无线接通率
            this.getIceData('10083', this.sLevelData['INT_ID'], (res) => {
              this.indexInfo['jtSussRate'] = res[0]['KPI_VALUE'];
              document.getElementById('jtSussRate').style.width = `${327 * this.indexInfo['jtSussRate'] / 100}px`;
            });
            // 2G基站-GSM无线掉话率
            this.getIceData('10084', this.sLevelData['INT_ID'], (res) => {
              this.indexInfo['breakRate'] = res[0]['KPI_VALUE'];
              document.getElementById('breakRate').style.width = `${327 * this.indexInfo['breakRate'] / 100}px`;
            });
          } else if (this.sLevelData['SITE_TYPE'] === '4G') {
            // 4G基站-LTE无线接通率
            this.getIceData('10085', this.sLevelData['INT_ID'], (res) => {
              this.indexInfo['jtSussRate'] = res[0]['KPI_VALUE'];
              document.getElementById('jtSussRate').style.width = `${327 * this.indexInfo['jtSussRate'] / 100}px`;
            });
            // 4G基站-LTE无线掉话率
            this.getIceData('10086', this.sLevelData['INT_ID'], (res) => {
              this.indexInfo['breakRate'] = res[0]['KPI_VALUE'];
              document.getElementById('breakRate').style.width = `${327 * this.indexInfo['breakRate'] / 100}px`;
            });
          }
        }
        if (this.sLevelData['BUILDING_ID']) {
          // 蓄电池可供电时长
          this.getIceData('10087', this.sLevelData['BUILDING_ID'], (res) => {
            this.supplyPower = res[0]['KPI_VALUE'];
          });
        }
      }
    }
  }
</script>
