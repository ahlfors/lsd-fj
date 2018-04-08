<template>
  <viewTemplate class="a1-map-wrap" @ok="toglist" viewId='10' :interval="30" @interval="loadData">
    <div class="a1-map-content-infor">
      <div class="infor-item">
        <div>用户数:</div>
        <div>
          <counter :data="userNum" :config="configitem1"></counter>
        </div>
      </div>
      <div class="infor-item">
        <div>应急通信车:</div>
        <div>
          <counter :data="comvan" :config="configitem2"></counter>
        </div>
      </div>
      <div class="infor-item">
        <div>应急抢修车:</div>
        <div>
          <counter :data="repaircar" :config="configitem2"></counter>
        </div>
      </div>
      <div class="infor-item">
        <div>保障人员:</div>
        <div>
          <counter :data="securityperson" :config="configitem1"></counter>
        </div>
      </div>
      <div class="infor-item">
        <div>2G基站:</div>
        <div>
          <counter :data="state2G" :config="configitem1"></counter>
        </div>
      </div>
      <div class="infor-item">
        <div>4G基站:</div>
        <div>
          <counter :data="state4G" :config="configitem1"></counter>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="a1-map-lists" v-show="listshow">
        <!--<div v-for="(item,index) in lists"  :class="[index===activeIndex ? 'list-active' : '','list-normal']" @click = "chosenList(index)">
                 {{item}}
            </div>-->
        <viewTemplate :class="[0 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(0)" viewId='1001'>
          国际会议展览中心
        </viewTemplate>
        <viewTemplate :class="[1 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(1)" viewId='1002'>
          国际会议中心
        </viewTemplate>
        <viewTemplate :class="[2 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(2)" viewId='1003'>
          国际会展酒店
        </viewTemplate>
        <viewTemplate :class="[3 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(3)" viewId='1004'>
          海悦山庄酒店
        </viewTemplate>
        <viewTemplate :class="[4 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(4)" viewId='1005'>
          闽南大戏院
        </viewTemplate>
        <viewTemplate :class="[5 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(5)" viewId='1006'>
          厦门高崎国际机场
        </viewTemplate>
        <viewTemplate :class="[6 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(6)" viewId='1007'>
          市政府
        </viewTemplate>
        <viewTemplate :class="[7 ===activeIndex ? 'list-active' : '','list-normal']" @left="toglist" @ok="chosenList(7)" viewId='1008'>
          阶段场景
        </viewTemplate>
      </div>
    </transition>
    <swiper :options="swiperOption" class="swiper" ref="mySwiper">
      <!--国际会议展览中心-->
      <swiper-slide>
        <div class="a1-map">
          <div class="a1-map-title">国际会议展览中心</div>
          <div class="a1-map-content a1-map-0" @click="clickPoints" :id="'id_'+areaId[0]">
          </div>
        </div>
      </swiper-slide>
      <!--国际会议中心-->
      <swiper-slide>
        <div class="a1-map">
          <div class="a1-map-title">国际会议中心</div>
          <div class="a1-map-content a1-map-1" @click="clickPoints" :id="'id_'+areaId[1]">
          </div>
        </div>
      </swiper-slide>
      <!--国际会展酒店-->
      <swiper-slide>
        <div class="a1-map">
          <div class="a1-map-title">国际会展酒店</div>
          <div class="a1-map-content a1-map-2" @click="clickPoints" :id="'id_'+areaId[2]">
          </div>
        </div>
      </swiper-slide>
      <!--海悦山庄酒店-->
      <swiper-slide>
        <div class="a1-map">
          <div class="a1-map-title">海悦山庄酒店</div>
          <div class="a1-map-content a1-map-3" @click="clickPoints" :id="'id_'+areaId[3]">
          </div>
        </div>
      </swiper-slide>
      <!--闽南大戏院-->
      <swiper-slide>
        <div class="a1-map">
          <div class="a1-map-title">闽南大戏院</div>
          <div class="a1-map-content a1-map-4" @click="clickPoints" :id="'id_'+areaId[4]">
          </div>
        </div>
      </swiper-slide>
      <!--厦门高崎国际机场-->
      <swiper-slide>
        <div class="a1-map">
          <div class="a1-map-title">厦门高崎国际机场</div>
          <div class="a1-map-content a1-map-5" @click="clickPoints" :id="'id_'+areaId[5]">
          </div>
        </div>
      </swiper-slide>
      <!--市政府-->
      <swiper-slide>
        <div class="a1-map">
          <div class="a1-map-title">市政府</div>
          <div class="a1-map-content a1-map-6" @click="clickPoints" :id="'id_'+areaId[6]">
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </viewTemplate>
</template>
<script>
// import pointData from './33445566.json'
export default {
  data() {
    let self = this;
    return {
      listshow: false,
      lists: ['国际会展中心', '国际会议中心', '国际会展酒店', '海悦山庄酒店', '闽南大戏院', '厦门高崎国际机场', '市政府', '阶段场景'],
      // urlList1: ['f0069', 'f0070', 'f0088', 'f0089', 'f0090', 'f0091', 'f0092'],
      areaId: ['-4898830', '-1783968023', '-1586109174', '1277408329', '-2114994955', '-1798451159', '464231223'],
      activeIndex: 0,
      url1: '',
      url2: '',
      swiperOption: {
        autoplay: 10000,
        setWrapperSize: true,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        direction: 'horizontal',
        pagination: '.swiper-tv-pagination1',
        paginationClickable: true,
        onSlideChangeEnd(swiper) {
          self.activeIndex = swiper.activeIndex;
          self.$emit('changeIndex', swiper.activeIndex);
        }
      },
      // 国际会展中心
      userNum: 268,
      comvan: 1,
      repaircar: 1,
      securityperson: 2,
      state2G: 1,
      state4G: 8,
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
          content: '',
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
          content: '',
          textStyle: {
            color: '#65fefc',
            fontSize: 20
          }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    activeIndex(val) {
      this.loadData();
    }
  },
  methods: {
    latLonGroup(latLonArray) {
      //  返回共址站集合
      let latLonMap = {};
      let latLonKey = '';
      let tempLatLonArr = null;
      let latLonItem;
      for (let index = 0; index < latLonArray.length; index++) {
        latLonItem = latLonArray[index];
        if (latLonItem.SITE_CLASS && latLonItem.SITE_CLASS !== 'null') {
          latLonKey = latLonItem.LATITUDE + '_' + latLonItem.LONGITUDE;
          if (latLonItem.LATITUDE === null || latLonItem.LONGITUDE === null) {
            continue;
          }
          tempLatLonArr = latLonMap[latLonKey];
          if (!tempLatLonArr) {
            tempLatLonArr = [];
            latLonMap[latLonKey] = tempLatLonArr;
          }
          tempLatLonArr.push(latLonItem);
        }
      }
      return latLonMap;
    },
    clickPoints(e) {
      //   console.log(e.offsetX + ',' + e.offsetY)
    },
    toglist() {
      this.listshow = !this.listshow;
      if (this.listshow) {
        this.swiper.stopAutoplay();
      } else {
        this.swiper.startAutoplay();
      }
    },
    chosenList(index) {
      if (index < this.lists.length - 1) {
        this.activeIndex = index;
        this.swiper.slideTo(index, 1000, false);
        this.$emit('changeIndex', index);
      } else {
        this.$router.push({
          name: 'StageScene/StageSceneMain'
        });
        this.toglist();
      }
    },
    markSite(latonData, Mapscene) {
      for (var key in latonData) {
        var pointItem = latonData[key];
        if (pointItem.length === 1) {
          let tempdiv = document.createElement('div');
          if (pointItem[0].SITE_CLASS === '4G') {
            tempdiv.className = 'map-points a1-map-stage-4G';
          }
          if (pointItem[0].SITE_CLASS === '2G') {
            tempdiv.className = 'map-points a1-map-stage-2G';
          }
          tempdiv.style.left = pointItem[0].POINT_X / 2440 * 832 + 'px';
          tempdiv.style.top = pointItem[0].POINT_Y / 1120 * 532 + 'px';
          Mapscene.appendChild(tempdiv);
        } else if (pointItem.length > 1) {
          var tempgzdiv = document.createElement('div');
          tempgzdiv.className = 'map-points a1-map-gzz';
          var tempLabel = document.createElement('div');
          tempLabel.className = 'a1-map-gzz-label';
          tempLabel.innerHTML = pointItem.length;
          tempgzdiv.appendChild(tempLabel);
          Mapscene.appendChild(tempgzdiv);
          tempgzdiv.style.left = pointItem[0].POINT_X / 2440 * 832 + 'px';
          tempgzdiv.style.top = pointItem[0].POINT_Y / 1120 * 532 + 'px';
        }
      }
    },
    loadData() {
      // 场馆1 数据
      var tempAreaID = this.areaId[this.activeIndex];
      var Mapscene = document.getElementById('id_' + tempAreaID);
      Mapscene.innerHTML = '';
      this.url1 = 'area_' + tempAreaID;
      this.url2 = 'site_' + tempAreaID;
      this.userNum = 0;
      this.comvan = 0;
      this.repaircar = 0;
      this.securityperson = 0;
      this.state2G = 0;
      this.state4G = 0;
      this.$http.indi.get(this.url1, {}, (res) => {
        // 国际会展中心
        this.userNum = res.data.data.USER_NUMBER;
        this.comvan = res.data.data.EMERGENCY_VEHICLE;
        this.repaircar = 0;
        this.securityperson = res.data.data.SECURITY_PERSONNEL;
        this.state2G = res.data.data.GSM_SITE_NUMBER;
        this.state4G = res.data.data.LTE_SITE_NUMBER;
        let personalArr = res.data.data.SECURITY_PERSONNEL_INFO;
        let comcarArr = res.data.data.EMERGENCY_VEHICLE_INFO;
        personalArr.forEach(function(item, i) {
          let tempdiv = document.createElement('div');
          tempdiv.className = 'map-points a1-map-person';
          tempdiv.style.left = item.POINT_X / 2440 * 832 + 'px';
          tempdiv.style.top = item.POINT_Y / 1120 * 532 + 'px';
          Mapscene.appendChild(tempdiv);
        });
        comcarArr.forEach(function(item, i) {
          let tempdiv = document.createElement('div');
          tempdiv.className = 'map-points a1-map-comvan';
          tempdiv.style.left = item.POINT_X / 2440 * 832 + 'px';
          tempdiv.style.top = item.POINT_Y / 1120 * 532 + 'px';
          Mapscene.appendChild(tempdiv);
        });
      })
      this.$http.indi.get(this.url2, {}, (res) => {
        // 国际会展中心
        var latonData = this.latLonGroup(res.data.data);
        this.markSite(latonData, Mapscene);
      })
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>
<style rel = "stylesheet/scss" lang="scss">
.a1-map-wrap {
  width: 832px;
  height: 600px;
  left: 8px;
  top: 2px;
  position: absolute;
  .a1-map-content-infor {
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    position: absolute;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    .infor-item {
      float: left;
      height: 100%;
      color: #fff;
      line-height: 40px;
      padding: 0 5px;
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
  }
  .a1-map-lists {
    position: absolute;
    width: 300px;
    height: 600px;
    background: rgba(104, 143, 173, 0.8);
    box-sizing: border-box;
    padding: 10px;
    left: 840px;
    top: 2px;
    border-radius: 10px;
    z-index: 999;
    .list-normal {
      position: relative;
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      letter-spacing: 4px;
      color: #fff;
      background-image: url(../../assets/img/venues/map3D/stage-normal.png);
      background-repeat: no-repeat;
      background-size: 100%;
      margin-bottom: 5px;
      cursor: pointer;
      &.list-active {
        position: relative;
        width: 100%;
        height: 55px;
        background-image: url(../../assets/img/venues/map3D/stage-active.png);
      }
    }
  }
  .swiper {
    width: 832px;
    height: 600px;
    .a1-map {
      position: absolute;
      width: 832px;
      height: 600px;
      border-radius: 20px;
      overflow: hidden;
      .a1-map-title {
        height: 66px;
        width: 100%;
        font-size: 36px;
        font-weight: bold;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .a1-map-content {
        height: 532px;
        width: 100%;
        position: relative;
        cursor: pointer;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.a1-map-0 {
          background-image: url(../../assets/img/venues/stagescene/map-bg-0.png);
        }
        &.a1-map-1 {
          background-image: url(../../assets/img/venues/stagescene/map-bg-1.png);
        }
        &.a1-map-2 {
          background-image: url(../../assets/img/venues/stagescene/map-bg-2.png);
        }
        &.a1-map-3 {
          background-image: url(../../assets/img/venues/stagescene/map-bg-3.png);
        }
        &.a1-map-4 {
          background-image: url(../../assets/img/venues/stagescene/map-bg-4.png);
        }
        &.a1-map-5 {
          background-image: url(../../assets/img/venues/stagescene/map-bg-5.png);
        }
        &.a1-map-6 {
          background-image: url(../../assets/img/venues/stagescene/map-bg-6.png);
        }
        .map-points {
          position: absolute;
          width: 48px;
          height: 48px;
          background-size: 100%;
          &.a1-map-person {
            background-image: url(../../assets/img/venues/points/person.png)
          }
          &.a1-map-comvan {
            background-image: url(../../assets/img/venues/points/comvan.png)
          }
          &.a1-map-repaircar {
            background-image: url(../../assets/img/venues/points/repaircar.png)
          }
          &.a1-map-stage-2G {
            background-image: url(../../assets/img/venues/points/stage2G.png)
          }
          &.a1-map-stage-4G {
            background-image: url(../../assets/img/venues/points/stage4G.png)
          }
          &.a1-map-gzz {
            background-image: url(../../assets/img/venues/points/gzz2.png)
          }
          .a1-map-gzz-label {
            display: inline-block;
            position: absolute;
            right: -2px;
            top: -2px;
            background-color: #00D900;
            color: #fff;
            font-weight: bold;
            width: 20px;
            height: 20px;
            line-height: 20px;
            border-radius: 50%;
            text-align: center;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
