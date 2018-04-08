<template>
    <viewTemplate class="legend" :interval ="30" @interval ="loadData">
      <div class="legend-list">
        <div class="state-2g">2G基站</div>
        <div class="legend-list-num">
          <counter :config="legendConfig" :data="GSM_SITE_NUMBER"></counter>
        </div>
      </div>
      <div class="legend-list">
        <div class="state-4g">4G基站</div>
        <div class="legend-list-num">
          <counter :config="legendConfig" :data="LTE_SITE_NUMBER"></counter>
        </div>
      </div>
      <div class="legend-list">
        <div class="ensure-person">保障人员</div>
        <div class="legend-list-num">
          <counter :config="legendConfig" :data="SECURITY_PERSONNEL"></counter>
        </div>
      </div>
      <div class="legend-list">
        <div class="aid-car">应急通信车</div>
        <div class="legend-list-num">
          <counter :config="legendConfig" :data="EMERGENCY_VEHICLE"></counter>
        </div>
      </div>
      <div class="legend-list">
        <div class="part-2g">2G小区</div>
        <div class="legend-list-num">
          <counter :config="legendConfig" :data="part2G"></counter>
        </div>
      </div>
      <div class="legend-list">
        <div class="part-4g">4G小区</div>
        <div class="legend-list-num">
          <counter :config="legendConfig" :data="part4G"></counter>
        </div>
      </div>
      <div class="legend-list">
        <div class="part-5g">共址站</div>
        <div class="legend-list-num">
          <counter :config="legendConfig" :data="part5G"></counter>
        </div>
      </div>
    </viewTemplate>
</template>
<script>
// import LengendData from './Lengend.js'
export default {
  props: {
    sceneName: String,
    areaId: Number
  },
  data() {
    return {
      url1: '',
      url2: '',
      GSM_SITE_NUMBER: 0,
      LTE_SITE_NUMBER: 0,
      SECURITY_PERSONNEL: 0,
      EMERGENCY_VEHICLE: 0,
      part4G: 0,
      part5G: 0,
      part2G: 0,
      legendConfig: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#64fcfd',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '',
          textStyle: {
            color: '#fdff99',
            fontSize: 24
          }
        }
      }
    }
  },
  mounted() {
    // this.loadData();
  },
  methods: {
    countNum(data) {
      var siteNum4G = 0;
      var siteNum2G = 0;
      data.forEach(function(item, index) {
        if (item.SITE_CLASS === '4G') {
          siteNum4G += Number(item.CELL_INFOS.length);
        }
        if (item.SITE_CLASS === '2G') {
          siteNum2G += Number(item.CELL_INFOS.length);
        }
      })
      return [siteNum4G, siteNum2G];
    },
    loadData() {
      this.$http.indi.get([this.url1, this.url2], {}, (res1, res2) => {
        this.GSM_SITE_NUMBER = res1.data.data.GSM_SITE_NUMBER;
        this.LTE_SITE_NUMBER = res1.data.data.LTE_SITE_NUMBER;
        this.SECURITY_PERSONNEL = res1.data.data.SECURITY_PERSONNEL;
        this.EMERGENCY_VEHICLE = res1.data.data.EMERGENCY_VEHICLE;
        this.part4G = this.countNum(res2.data.data)[0];
        this.part2G = this.countNum(res2.data.data)[1];
        this.queryData();
      })
    },
    queryData() {
      this.part5G = 0;
      this.$http.indi.get(this.url2, {}, (res) => {
        let latLngArr = [];
        res.data.data.forEach(function(item) {
          if (item.LATITUDE !== null && item.LATITUDE !== '' && item.LATITUDE !== 'null' && item.LONGITUDE !== null && item.LONGITUDE !== '' && item.LONGITUDE !== 'null' ) {
            latLngArr.push(item)
          }
        });
        if (latLngArr) {
          let latLonMap = this.latLonGroup(latLngArr);
          for (let key in latLonMap) {
            if (latLonMap[key].length > 1) {
              this.part5G += 1;
            }
          }
        }
      })
    },
    latLonGroup(latLonArray) {
      //  返回共址站集合
      let latLonMap = {};
      let latLonKey = '';
      let tempLatLonArr = null;
      let latLonItem;
      for (var index = 0; index < latLonArray.length; index++) {
        latLonItem = latLonArray[index];
        if (latLonItem.SITE_CLASS && latLonItem.SITE_CLASS !== 'null') {
          latLonKey = latLonItem.LATITUDE + '_' + latLonItem.LONGITUDE;
          tempLatLonArr = latLonMap[latLonKey];
          if (!tempLatLonArr) {
            tempLatLonArr = [];
            latLonMap[latLonKey] = tempLatLonArr;
          }
          tempLatLonArr.push(latLonItem);
        }
      }
      return latLonMap;
    }
  },
  watch: {
    sceneName(val) {
      this.url1 = 'area_' + this.areaId;
      this.url2 = 'site_' + this.areaId;
      this.loadData();
    }
  }
}
</script>
<style rel = "stylesheet/scss" lang="scss">
    .legend {
            z-index: 9999;
            position: absolute;
            width: 256px;
            height: 445px;
            left: 20px;
            bottom: 80px;
            background-size: 100% 100%;
            padding-top: 20px;
            background-image: url("../../../../assets/img/venues/stagescene/tooltip.png");
            background-repeat: no-repeat;
            .legend-list {
                width: 250px;
                height: 40px;
                box-sizing: border-box;
                padding-left: 20px;
                margin-bottom: 20px;
                > div:nth-of-type(1) {
                    float: left;
                    height: 100%;
                    font-size: 24px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding-left: 50px;
                    background-repeat: no-repeat;
                    &.state-2g {
                        background-image: url("../../../../assets/img/venues/stagescene/2G.png");
                        background-position: -6px 0;
                    }
                    &.state-4g {
                        background-image: url("../../../../assets/img/venues/stagescene/4G.png");
                    }
                    &.ensure-person {
                        background-image: url("../../../../assets/img/venues/stagescene/ensure-person.png");
                    }
                    &.aid-car {
                        background-image: url("../../../../assets/img/venues/stagescene/aid-car.png");
                        background-position: -3px 0;
                    }
                    &.part-2g{
                        background-image: url("../../../../assets/img/venues/stagescene/2Gpart.png");
                        background-position: -6px 0;
                    }
                    &.part-4g{
                        background-image: url("../../../../assets/img/venues/stagescene/4Gpart.png");
                    }
                  &.part-5g{
                    background-image: url("../../../../assets/img/venues/stagescene/gzz_sml.png");
                  }
                }
                > div:nth-of-type(2) {
                    width: 56px;
                    float: left;
                    height: 100%;
                    box-sizing: border-box;
                    padding-left: 2px;
                    padding-top: 5px;
                }
            }

        }
</style>
