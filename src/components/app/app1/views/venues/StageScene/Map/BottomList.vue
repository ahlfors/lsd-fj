<template>
  <viewTemplate class="a1-map-content-infor" :interval ="30" @interval ="loadData">
    <div class="infor-item">
      <div>用户数:</div>
      <div>
        <counter :data="USER_NUMBER"
                 :config="configitem1"></counter>
      </div>
    </div>
    <div class="infor-item">
      <div>2G话务量:</div>
      <div>
        <counter :data="GSM_TRAFFIC"
                 :config="configitem2"></counter>
      </div>
    </div>
    <div class="infor-item">
      <div>4G流量:</div>
      <div>
        <counter :data="LTE_FLOW"
                 :config="configitem3"></counter>
      </div>
    </div>
    <div class="infor-item">
      <div>保障人员:</div>
      <div>
        <counter :data="SECURITY_PERSONNEL"
                 :config="configitem4"></counter>
      </div>
    </div>
    <div class="infor-item">
      <div>应急通信车:</div>
      <div>
        <counter :data="EMERGENCY_VEHICLE"
                 :config="configitem1"></counter>
      </div>
    </div>
    <div class="infor-item">
      <div>2G基站:</div>
      <div>
        <counter :data="GSM_SITE_NUMBER"
                 :config="configitem1"></counter>
      </div>
    </div>
    <div class="infor-item">
      <div>4G基站:</div>
      <div>
        <counter :data="LTE_SITE_NUMBER"
                 :config="configitem1"></counter>
      </div>
    </div>
    <div class="tooltip-ltop">
      <div>
        <div>用户数</div>
        <div>
          <counter :data="USER_NUMBER"
                   :config="configitem1"></counter>
        </div>
      </div>
      <div>
        <div>2G话务量</div>
        <div>
          <counter :data="GSM_TRAFFIC"
                   :config="configitem2"></counter>
        </div>
      </div>
      <div>
        <div>4G流量</div>
        <div>
          <counter :data="LTE_FLOW"
                   :config="configitem3"></counter>
        </div>
      </div>
      <div>
      <div>国际漫游用户数</div>
      <div>
          <counter :data="INTERNATIONAL_ROAMING_USERS"
                   :config="configitem1"></counter>
      </div>
      </div>
      <div>
      <div>FDD用户数</div>
      <div>
        <counter :data="FDD_USERS"
                   :config="configitem1"></counter>
      </div>
      </div>
    </div>
  </viewTemplate>
</template>
<script>
// import BottomListData from './BottomList.js'
export default {
  props: {
    sceneName: String,
    areaId: Number
  },
  data() {
    return {
      // nowData: BottomListData.data1,
      FDD_USERS: 0,
      INTERNATIONAL_ROAMING_USERS: 0,
      USER_NUMBER: 0,
      GSM_TRAFFIC: 0,
      LTE_FLOW: 0,
      SECURITY_PERSONNEL: 0,
      EMERGENCY_VEHICLE: 0,
      GSM_SITE_NUMBER: 0,
      LTE_SITE_NUMBER: 0,
      nowData: null,
      url: '',
      configitem1: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#65fefc',
            fontSize: 20,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '个',
          textStyle: {
            color: '#65fefc',
            fontSize: 20
          }
        }
      },
      configitem2: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#65fefc',
            fontSize: 20,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: 'ERL',
          textStyle: {
            color: '#65fefc',
            fontSize: 20
          }
        }
      },
      configitem3: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#65fefc',
            fontSize: 20,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: 'MB',
          textStyle: {
            color: '#65fefc',
            fontSize: 20
          }
        }
      },
      configitem4: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#65fefc',
            fontSize: 20,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '人',
          textStyle: {
            color: '#65fefc',
            fontSize: 20
          }
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    loadData() {
      this.$http.indi.get(this.url, {}, (res) => {
        this.INTERNATIONAL_ROAMING_USERS = res.data.data.INTERNATIONAL_ROAMING_USERS;
        this.FDD_USERS = res.data.data.FDD_USERS;
        this.USER_NUMBER = res.data.data.USER_NUMBER;
        this.GSM_TRAFFIC = res.data.data.GSM_TRAFFIC;
        this.LTE_FLOW = res.data.data.LTE_FLOW;
        this.SECURITY_PERSONNEL = res.data.data.SECURITY_PERSONNEL;
        this.EMERGENCY_VEHICLE = res.data.data.EMERGENCY_VEHICLE;
        this.GSM_SITE_NUMBER = res.data.data.GSM_SITE_NUMBER;
        this.LTE_SITE_NUMBER = res.data.data.LTE_SITE_NUMBER;
      })
    }
  },
  watch: {
    sceneName(val) {
      this.url = 'area_' + this.areaId;
      this.loadData();
    }
  }
}
</script>
<style rel = "stylesheet/scss" lang="scss">
.a1-map-content-infor {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 999;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  .infor-item {
    float: left;
    height: 100%;
    color: #fff;
    line-height: 40px;
    padding: 0 40px;
    div {
      float: left;
      height: 100%;
    }
    div:nth-of-type(1) {
      font-size: 20px;
      margin-right: 2px;
    }
    div:nth-of-type(2) {
      padding-top: 2px;
      align-items: center;
      justify-content: center;
      span {
        margin-top: -2px;
      }
    }
  }
  .tooltip-ltop{
    position: absolute;
    z-index: 999;
    width: 250px;
    height: 200px;
    background-image: url("../../../../assets/img/venues/stagescene/legend.png");
    background-size: 100% 100%;
    top: -752px;
    left: 25px;
    &>div:nth-of-type(1){
      display:inline-flex;
      position: absolute;
      top: 5px;
      left: 27px;
      >div:nth-of-type(1){
        display: flex;
        font-size: 20px;
        color: #fff;
        height:40px;
        align-items: center;
        justify-content: center;
      }
      >div:nth-of-type(2){
        height:40px;
      }
    }
    &>div:nth-of-type(2){
      display:inline-flex;
      position: absolute;
      top: 44px;
      left: 27px;
      >div:nth-of-type(1){
        display: flex;
        font-size: 20px;
        color: #fff;
        height:40px;
        align-items: center;
        justify-content: center;
      }
      >div:nth-of-type(2){
        height:40px;
      }
    }
    &>div:nth-of-type(3){
      display:inline-flex;
      position: absolute;
      top: 81px;
      left: 27px;
      >div:nth-of-type(1){
        display: flex;
        font-size: 20px;
        color: #fff;
        height:40px;
        align-items: center;
        justify-content: center;
      }
      >div:nth-of-type(2){
        height:40px;
      }
    }
    &>div:nth-of-type(4){
      display:inline-flex;
      position: absolute;
      top: 118px;
      left: 27px;
      >div:nth-of-type(1){
        display: flex;
        font-size: 20px;
        color: #fff;
        height:40px;
        align-items: center;
        justify-content: center;
      }
      >div:nth-of-type(2){
        height:40px;
      }
    }
    &>div:nth-of-type(5){
      display:inline-flex;
      position: absolute;
      top: 152px;
      left: 27px;
      >div:nth-of-type(1){
        display: flex;
        font-size: 20px;
        color: #fff;
        height:40px;
        align-items: center;
        justify-content: center;
      }
      >div:nth-of-type(2){
        height:40px;
      }
    }
  }
}
</style>
