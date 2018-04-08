<template>
  <div class="scene-point-list" :interval = "30" @interval ="loadData">
    <div class="scene-point-title">
      <viewTemplate :viewId='viewId' @ok="changeTitle">
        <span class="scene-point-title-text">
                    {{data.AREA_NAME}}
                  </span>
      </viewTemplate>
      <div class="scene-point-title-num">
        <div>用户数</div>
        <counter :data="USER_NUMBER" :config="configNum1"></counter>
      </div>
    </div>
    <div class="scene-point-content">
      <div>
        <div class="state-icon">基站</div>
        <div class="scene-point-num">
          <counter :data="SITE_NUMBER" :config="configNum2"></counter>
        </div>
      </div>
      <div>
        <div class="tf-icon">退服小区</div>
        <div class="scene-point-num">
          <counter :data="RETIREMENT_CELL" :config="configNum3"></counter>
        </div>
      </div>
      <div>
        <div class="ensure-icon">保障人员</div>
        <div class="scene-point-num">
          <counter :data="SECURITY_PERSONNEL " :config="configNum2"></counter>
        </div>
      </div>
      <div>
        <div class="aidcar-icon">应急车辆</div>
        <div class="scene-point-num">
          <counter :data="EMERGENCY_VEHICLE" :config="configNum2"></counter>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    eventIndex: String,
    index: Number,
    viewId: String,
    data: {
      type: Object,
      default() {
        return {
          index: 0,
          stateTitle: '',
          stateUser: 2538,
          stateNum1: null,
          stateNum2: null,
          stateNum3: null,
          stateNum4: null
        }
      }
    }
  },
  data() {
    return {
      url: '',
      USER_NUMBER: 0,
      SITE_NUMBER: 0,
      RETIREMENT_CELL: 0,
      SECURITY_PERSONNEL: 0,
      EMERGENCY_VEHICLE: 0,
      configNum1: {
        justifyContent: 'flex-start',
        numbers: { // 数字配置项
          textStyle: {
            color: '#99ff99',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '个',
          textStyle: {
            color: '#65fefc',
            fontSize: 24
          }
        }
      },
      configNum2: {
        justifyContent: 'center',
        numbers: { // 数字配置项
          textStyle: {
            color: '#02ffff',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '',
          textStyle: {
            color: '#65fefc',
            fontSize: 24
          }
        }
      },
      configNum3: {
        justifyContent: 'center',
        numbers: { // 数字配置项
          textStyle: {
            color: '#ff3336',
            fontSize: 24,
            fontFamily: 'PixelLCD-7'
          },
          letterSpacing: 0 // 数字之间间距
        },
        suffix: { // 后缀配置项
          content: '',
          textStyle: {
            color: '#65fefc',
            fontSize: 24
          }
        }
      }
    }
  },
  computed: {
    stateTitle() {
      return this.data.AREA_NAME
    }
  },
  created() {
    switch (this.data.AREA_NAME) {
      case '国际会议展览中心':
        this.url = 'area_-4898830';
        break;
      case '国际会议中心':
        this.url = 'area_-1783968023';
        break;
      case '国际会展酒店':
        this.url = 'area_-1586109174';
        break;
      case '海悦山庄酒店':
        this.url = 'area_1277408329';
        break;
      case '闽南大戏院':
        this.url = 'area_-2114994955';
        break;
      case '厦门高崎国际机场':
        this.url = 'area_-1798451159';
        break;
      case '市政府':
        this.url = 'area_464231223';
        break;
    }
    this.loadData();
  },
  methods: {
    loadData() {
      this.$http.indi.get(this.url, {}, (res) => {
        // console.log(res.data.data);
        this.USER_NUMBER = res.data.data.USER_NUMBER;
        this.SITE_NUMBER = res.data.data.SITE_NUMBER;
        this.RETIREMENT_CELL = res.data.data.RETIREMENT_CELL;
        this.SECURITY_PERSONNEL = res.data.data.SECURITY_PERSONNEL;
        this.EMERGENCY_VEHICLE = res.data.data.EMERGENCY_VEHICLE;
      })
    },
    changeTitle() {
      this.$emit('titleChange' + this.eventIndex, this.index)
    }
  },
  watch: {
    stateTitle(val) {
      switch (val) {
        case '国际会议展览中心':
          this.url = 'area_-4898830';
          break;
        case '国际会议中心':
          this.url = 'area_-1783968023';
          break;
        case '国际会展酒店':
          this.url = 'area_-1586109174';
          break;
        case '海悦山庄酒店':
          this.url = 'area_1277408329';
          break;
        case '闽南大戏院':
          this.url = 'area_-2114994955';
          break;
        case '厦门高崎国际机场':
          this.url = 'area_-1798451159';
          break;
        case '市政府':
          this.url = 'area_464231223';
          break;
      }
      this.loadData();
    }
  }
}
</script>