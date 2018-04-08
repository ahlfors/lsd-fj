<!--移动二级页面 - 规模-->
<template>
<popupTemplate>
  <viewTemplate  class="a1-traditional-Roam">
    <div class="a1-traditional-roam-div" @click.stop.self="goOne">
    <!--<div class="a1-traditional-roam-div">-->

      <div class="a1-roam a1-roam-important">
        <swiper :options="swiperOption" class="swiper">
          <swiper-slide>
            <internationalRoam></internationalRoam>
          </swiper-slide>
          <swiper-slide>
            <provinceRoam></provinceRoam>
          </swiper-slide>
          <swiper-slide>
            <provinceInRoam></provinceInRoam>
          </swiper-slide>
        </swiper>
        <span class="swiper-roam-pagination1"></span>
      </div>

      <div class="middle">
        <viewTemplate viewId="0201" class="first" :class="{ active: arrayOfSelect[0] }" @ok="select(0)">国际(福建)</viewTemplate>
        <viewTemplate viewId="0202" class="second" :class="{ active: arrayOfSelect[1] }" @ok="select(1)">国际(厦门)</viewTemplate>
        <viewTemplate viewId="0203" class="third" :class="{ active: arrayOfSelect[2] }" @ok="select(2)">省际(福建)</viewTemplate>
        <viewTemplate viewId="0204" class="forth" :class="{ active: arrayOfSelect[3] }" @ok="select(3)">省际(厦门)</viewTemplate>
        <viewTemplate viewId="0205" class="fifth" :class="{ active: arrayOfSelect[4] }" @ok="select(4)">省内(厦门)</viewTemplate>
      </div>

      <div class="main" v-if="selected">
        <!--<div v-if="top10Flag" id="a1-traditional-Roam-top10">{{roamTitle}}</div>-->
        <div v-if="top10Flag" id="a1-traditional-Roam-top10">漫游TOP</div>
        <div id="a1-traditional-Roam-echarts1"></div>

        <div v-if="flagOfInOrOut" id="a1-traditional-Roam-in-total-number">
          漫入总用户数：
          <span id="roam-total-number">{{roamTotalNumber}}人</span>
          <div v-if="flagOfDivider" style="font-size: 24px;margin-left: 20px;">金砖国家漫入用户数：<span style="color: yellow;">{{jzUserNum}}人</span></div>
        </div>
        <div v-else id="a1-traditional-Roam-out-total-number">
          漫出总用户数：
          <span id="roam-total-number">{{roamTotalNumber}}人</span>
          <div v-if="flagOfDivider" style="font-size: 24px;margin-left: 20px;">金砖国家漫出用户数：<span style="color: yellow;">{{jzUserNum}}人</span></div>
          </div>
        <div id="a1-traditional-Roam-echarts2"></div>
        <div id="a1-traditional-Roam-switch">
          <viewTemplate viewId="0206" id="main-in" :class="{ active: flagOfInOrOut }" @ok="inOrOutSwitch(0)">漫入</viewTemplate>
          <viewTemplate viewId="0207" id="main-out" :class="{ active: !flagOfInOrOut }" @ok="inOrOutSwitch(1)">漫出</viewTemplate>
        </div>
      </div>

      <div class="divider" v-if="flagOfDivider"></div>

    </div>
  </viewTemplate>
</popupTemplate>
</template>
<script>
  import './RoamInMain.scss';

  import internationalRoam from '../InternationalRoam.vue'
  import provinceRoam from '../ProvinceRoam.vue'
  import provinceInRoam from '../ProvinceInRoam.vue'

  import echarts from 'echarts'
  import '../../../../../../../static/data/world.js'
  import '../../../../../../../static/data/china.js'
  import '../../../../../../../static/data/fujian.js'

  export default {
    data() {
      return {
        swiperOption: {
          // autoplay: 1000 * 60,
          autoplay: 1000 * 10,
          setWrapperSize: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          direction: 'horizontal',
          pagination: '.swiper-roam-pagination1',
          paginationClickable: true
        },

        jzUserNum: 0,  // 金砖国家漫入用户数
        leftChart: null,
        rightChart: null,

        arrayOfSelect: [false, false, false, false, false],

        roamTotalNumber: 0,

        selected: false,
        flagOfInOrOut: true,
        flagOfDivider: false,

        internationFujianInTop: [],
        internationFujianOutTop: [],
        internationXiamenInTop: [],
        internationXiamenOutTop: [],

        provinceFujianInTop: [],
        provinceFujianOutTop: [],
        provinceXiamenInTop: [],
        provinceXiamenOutTop: [],

        inProvinceXiamenInTop: [],
        inProvinceXiamenOutTop: [],

        internationFujianInTotal: 0,
        internationFujianOutTotal: 0,
        internationXiamenInTotal: 0,
        internationXiamenOutTotal: 0,

        provinceFujianInTotal: 0,
        provinceFujianOutTotal: 0,
        provinceXiamenInTotal: 0,
        provinceXiamenOutTotal: 0,

        inProvinceXiamenInTotal: 0,
        inProvinceXiamenOutTotal: 0,

        geoCoord: {
          '北京': [116.40, 39, 90],
          '天津': [117.20, 39.12],
          '河北': [114.52, 38.05],
          '山西': [112.55, 37.87],
          '内蒙古': [111.73, 40.83],
          '辽宁': [123.43, 41.80],
          '吉林': [125.32, 43.90],
          '黑龙江': [126.53, 45.80],
          '江苏': [118.78, 32.07],
          '浙江': [120.15, 30.28],
          '安徽': [117.25, 31.83],
          '福建': [119.30, 26.08],
          '山东': [116.98, 36.67],
          '河南': [113.62, 34.75],
          '湖南': [112.93, 28.23],
          '广东': [113.27, 23.13],
          '广西': [108.37, 22.82],
          '海南': [110.32, 20.03],
          '重庆': [106.55, 29.57],
          '四川': [104.07, 30.67],
          '贵州': [106.63, 26.65],
          '云南': [102.72, 25.05],
          '西藏': [91.13, 29.65],
          '陕西': [108.93, 34.27],
          '甘肃': [103.82, 36.07],
          '青海': [101.78, 36.62],
          '宁夏': [106.28, 38.47],
          '新疆': [87.62, 43.82],
          '香港': [114.08, 22.20],
          '澳门': [113.33, 22.13],
          '台北': [121.50, 25.03],
          '上海': [121.4648, 31.2891],
          '湖北': [114.31667, 30.51667],
          '江西': [116.0046, 28.6633]
        },

        geoOfFujian: {
          '福州': [119.3, 26.08],
          '厦门': [118.1, 24.46],
          '莆田': [119, 25.44],
          '龙岩': [117.01, 25.12],
          '漳州': [117.35, 24.52],
          '泉州': [118.58, 24.93],
          '宁德': [119.52, 26.65],
          '南平': [118.16, 26.65],
          '三明': [117.61, 26.23]
        },

        // nationalFlag: {
        //   // 'Argentina': true,
        //   //    'Australia': true,
        //   'Brazil': true,
        //   //  'France': true,
        //   //   'Germany': true,
        //   'India': true,
        //   //   'Indonesia': true,
        //   // 'Italy': true,
        //   //   'Japan': true,
        //   // 'Mexico': true,
        //   'Russia': true,
        //   //  'SaudiArabia': true,
        //   //   'SouthKorea': true,
        //   'South': true
        //     //   'Turkey': true,
        //     //  'UnitedKingdom': true,
        //     //  'UnitedStatesofAmerica': true
        // },

        nationalFlag: {
          'Brazil': [-47.55, -15.47, '巴西'],
          'India': [77.13, 28.37, '印度'],
          'Russia': [37.35, 55.45, '俄罗斯'],
          'South': [20.1809, -28.39, '南非']
        },

        top10Flag: true
      }
    },
    computed: {
      roamTitle() {
        if (this.arrayOfSelect[0] || this.arrayOfSelect[1]) {
          return '漫游Top10 U 金砖4国';
        } else {
          return '漫游Top10';
        }
      }
    },
    mounted() {
      this.getData();
      setInterval(() => {
        this.getData();
      }, 600000)
    },
    methods: {
      goOne() {
        this.$router.back();
      },
      loadData: function(params, url, callback) {
        this.$http.indi.get(url, params, (res) => {
          callback(res.data.data)
        })
      },
      getData() {
        this.loadData(null, 'w1333', (res) => { // 国际（福建）漫入用户数top w1333
          this.internationFujianInTop = res;
        });
        this.loadData(null, 'w1334', (res) => { // 国际（福建）漫出用户数top w1334
          this.internationFujianOutTop = res;
        });
        this.loadData(null, 'w1335', (res) => { // 国际(厦门) 漫入用户数top  w1335
          this.internationXiamenInTop = res;
        });
        this.loadData(null, 'w1336', (res) => { // 国际(厦门) 漫出用户数top  w1336
          this.internationXiamenOutTop = res;
        });

        this.loadData(null, 'w1337', (res) => { // 省际（福建）漫入用户数top w1337
          this.provinceFujianInTop = res;
        });
        this.loadData(null, 'w1338', (res) => { // 省际（福建）漫出用户数top w1338
          this.provinceFujianOutTop = res;
        });
        this.loadData(null, 'w1339', (res) => { // 省际（厦门）漫入用户数top w1339
          this.provinceXiamenInTop = res;
        });
        this.loadData(null, 'w1340', (res) => { // 省际（厦门）漫出用户数top w1340
          this.provinceXiamenOutTop = res;
        });

        this.loadData(null, 'w1341', (res) => { // 省内（厦门）漫入用户数top w1341
          this.inProvinceXiamenInTop = res;
        });
        this.loadData(null, 'w1342', (res) => { // 省内（厦门）漫出用户数top w1342
          this.inProvinceXiamenOutTop = res;
        });

        this.loadData(null, 'w1343', (res) => { // 国际(福建)漫入用户总数 w1343
          this.internationFujianInTotal = res[0].KPI_VALUE;
        });
        this.loadData(null, 'w1344', (res) => { // 国际(福建)漫出用户总数 w1344
          this.internationFujianOutTotal = res[0].KPI_VALUE;
        });
        this.loadData(null, 'w1345', (res) => { // 国际(厦门)漫入用户总数 w1345
          this.internationXiamenInTotal = res[0].KPI_VALUE;
        });
        this.loadData(null, 'w1346', (res) => { // 国际(厦门)漫出用户总数 w1346
          this.internationXiamenOutTotal = res[0].KPI_VALUE;
        });

        this.loadData(null, 'w1347', (res) => { // 省际(福建)漫入用户总数 w1347
          this.provinceFujianInTotal = res[0].KPI_VALUE;
        });
        this.loadData(null, 'w1348', (res) => { // 省际(福建)漫出用户总数 w1348
          this.provinceFujianOutTotal = res[0].KPI_VALUE;
        });
        this.loadData(null, 'w1349', (res) => { // 省际(厦门)漫入用户总数 w1349
          this.provinceXiamenInTotal = res[0].KPI_VALUE;
        });
        this.loadData(null, 'w1350', (res) => { // 省际(厦门)漫出用户总数 w1350
          this.provinceXiamenOutTotal = res[0].KPI_VALUE;
        });

        this.loadData(null, 'w1351', (res) => { // 省内(厦门)漫入用户总数 w1351
          this.inProvinceXiamenInTotal = res[0].KPI_VALUE;
        });
        this.loadData(null, 'w1352', (res) => { // 省内(厦门)漫出用户总数 w1352
          this.inProvinceXiamenOutTotal = res[0].KPI_VALUE;
        });
      },
      switchRegionForLeftChart(region) {
        let grid;
        switch (region) {
          case 'world':
            grid = {
              top: 16,
              left: 150,
              width: '37%',
              height: '94%'
            }
            break;
          case 'china':
            grid = {
              top: 16,
              left: 110,
              width: '37%',
              height: '94%'
            }
            break;
          case 'fujian':
            grid = {
              top: 16,
              left: 150,
              width: '37%',
              height: '94%'
            }
            break;
        }
        return grid;
      },
      switchRegionForRightChart(region) {
        let geo;
        switch (region) {
          case 'world':
            geo = {
              map: 'world',
              zoom: 1.2,
              top: 100,
              left: 10,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  textStyle: {
                    color: '#02FFEB'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#166697',
                  borderColor: '#02FFEB'
                },
                emphasis: {
                  color: '#0A8FCA'
                }
              }
            }
            break;
          case 'china':
            geo = {
              map: 'china',
              zoom: 1.2,
              top: 50,
              left: 100,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#02FFEB'
                  }
                },
                emphasis: {
                  textStyle: {
                    color: '#02FFEB'
                  }
                }
              },
              // roam: true,
              itemStyle: {
                normal: {
                  color: '#166697',
                  borderColor: '#02FFEB'
                },
                emphasis: {
                  color: '#0A8FCA'
                }
              },
              regions: [{
                name: '南海诸岛',
                itemStyle: {
                  normal: {
                    opacity: 0
                  },
                  emphasis: {
                    opacity: 0
                  }
                },
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                }
              }]
            }
            break;
          case 'fujian':
            geo = {
              map: '福建',
              zoom: 0.9,
              top: 30,
              left: 220,
              label: {
                normal: {
                  show: true,
                  textStyle: {
                    color: '#02FFEB',
                    fontSize: 16
                  }
                },
                emphasis: {
                  textStyle: {
                    color: '#02FFEB'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#166697',
                  borderColor: '#02FFEB'
                },
                emphasis: {
                  color: '#0A8FCA'
                }
              }
            }
            break;
        }
        return geo;
      },
      deleteGAT(data) {
        let xg = -1;
        let tw = -1;
        let am = -1;
        let tmp = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].NE_NAME === '中国香港') {
            xg = i;
          } else if (data[i].NE_NAME === '中国台湾') {
            tw = i;
          } else if (data[i].NE_NAME === '中国澳门') {
            am = i;
          }
        }
        tmp = [xg, tw, am];
        tmp.sort((a, b) => {
          return b - a;
        })
        for (let j = 0; j < tmp.length; j++) {
          if (tmp[j] !== -1) {
            data.splice(tmp[j], 1);
          }
        }
        return data;
      },
      inOrOutSwitch(num) {
        if (num === 0) {
          this.flagOfInOrOut = true;
        } else {
          this.flagOfInOrOut = false;
        }
        this.switchData();
      },
      switchData() {
        let option1 = this.leftChart.getOption();
        let option2 = this.rightChart.getOption();
        option1.yAxis[0].data = [];
        option1.yAxis[1].data = [];
        option1.series[0].data = [];
        option1.series[1].data = [];
        option2.series[0].data = [];
        option2.series[1].data = [];
        option2.series[0].markPoint.data = [];

        let regionType;
        for (let index = 0; index < this.arrayOfSelect.length; index++) {
          if (this.arrayOfSelect[index] === true) {
            regionType = index;
          }
        }

        let currentData;
        let currentRegion;
        let currentMap;
        let mapCoord;
        switch (regionType) {
          case 0:
            if (this.flagOfInOrOut) {
              currentData = this.internationFujianInTop;
              this.roamTotalNumber = this.internationFujianInTotal;
            } else {
              currentData = this.internationFujianOutTop;
              this.roamTotalNumber = this.internationFujianOutTotal;
            }
            currentRegion = [119.28, 26.08];
            currentMap = 'world';
            break;

          case 1:
            if (this.flagOfInOrOut) {
              currentData = this.internationXiamenInTop;
              this.roamTotalNumber = this.internationXiamenInTotal;
            } else {
              currentData = this.internationXiamenOutTop;
              this.roamTotalNumber = this.internationXiamenOutTotal;
            }
            currentRegion = [118.06, 24.27];
            currentMap = 'world';
            break;

          case 2:
            if (this.flagOfInOrOut) {
              currentData = this.provinceFujianInTop;
              this.roamTotalNumber = this.provinceFujianInTotal;
            } else {
              currentData = this.provinceFujianOutTop;
              this.roamTotalNumber = this.provinceFujianOutTotal;
            }
            currentRegion = [119.28, 26.08];
            currentMap = 'china';
            mapCoord = this.geoCoord;
            break;

          case 3:
            if (this.flagOfInOrOut) {
              currentData = this.provinceXiamenInTop;
              this.roamTotalNumber = this.provinceXiamenInTotal;
            } else {
              currentData = this.provinceXiamenOutTop;
              this.roamTotalNumber = this.provinceXiamenOutTotal;
            }
            currentRegion = [118.06, 24.27];
            currentMap = 'china';
            mapCoord = this.geoCoord;
            break;

          case 4:
            if (this.flagOfInOrOut) {
              this.inProvinceXiamenInTop.sort((a, b) => {
                return b.KPI_VALUE - a.KPI_VALUE;
              })
              currentData = this.inProvinceXiamenInTop;
              this.roamTotalNumber = this.inProvinceXiamenInTotal;
            } else {
              this.inProvinceXiamenOutTop.sort((a, b) => {
                return b.KPI_VALUE - a.KPI_VALUE;
              })
              currentData = this.inProvinceXiamenOutTop;
              this.roamTotalNumber = this.inProvinceXiamenOutTotal;
            }
            currentRegion = [118.06, 24.27];
            currentMap = 'fujian';
            mapCoord = this.geoOfFujian;
            break;
        }

        // for (let i = 0; i < currentData.length; i++) {
        //   if (i < 10 && currentData[i]) {
        //     option1.yAxis[0].data.push(currentData[i].NE_NAME)
        //     option1.yAxis[1].data.push(currentData[i].NE_NAME)
        //     option1.series[0].data.push(currentData[0].KPI_VALUE)
        //     if (currentData[i].ENG_NAME === 'Brazil' ||
        //       currentData[i].ENG_NAME === 'India' ||
        //       currentData[i].ENG_NAME === 'Russia' ||
        //       currentData[i].ENG_NAME === 'South') {
        //       option1.series[1].data.push({
        //         value: currentData[i].KPI_VALUE,
        //         label: {
        //           normal: {
        //             textStyle: {
        //               color: '#00FFFD',
        //               fontSize: 30
        //             }
        //           }
        //         }
        //       })
        //     } else {
        //       option1.series[1].data.push({
        //         value: currentData[i].KPI_VALUE
        //       })
        //     }

        //     if (currentMap !== 'world') {
        //       if (!currentData[i].LON || !currentData[i].LAT) {
        //         currentData[i].LON = mapCoord[currentData[i].NE_NAME][0];
        //         currentData[i].LAT = mapCoord[currentData[i].NE_NAME][1];
        //       }
        //     }
        //     option2.series[0].data.push({
        //       name: currentData[i].NE_NAME,
        //       coords: this.flagOfInOrOut ? [
        //         [currentData[i].LON, currentData[i].LAT], currentRegion
        //       ] : [
        //         currentRegion, [currentData[i].LON, currentData[i].LAT]
        //       ],
        //       value: currentData[i].KPI_VALUE
        //     })
        //   } else if (i >= 10 && currentData[i]) {
        //     if (currentMap !== 'world') {
        //       if (!currentData[i].LON || !currentData[i].LAT) {
        //         currentData[i].LON = mapCoord[currentData[i].NE_NAME][0];
        //         currentData[i].LAT = mapCoord[currentData[i].NE_NAME][1];
        //       }
        //       arrayForScatter.push({
        //         name: currentData[i].NE_NAME,
        //         value: [currentData[i].LON, currentData[i].LAT, currentData[i].KPI_VALUE]
        //       });
        //     } else {
        //       if (this.nationalFlag[currentData[i].ENG_NAME]) {
        //         option2.series[0].data.push({
        //           name: currentData[i].NE_NAME,
        //           coords: this.flagOfInOrOut ? [
        //             [currentData[i].LON, currentData[i].LAT], currentRegion
        //           ] : [
        //             currentRegion, [currentData[i].LON, currentData[i].LAT]
        //           ],
        //           value: currentData[i].KPI_VALUE
        //         })
        //       }
        //     }
        //   }
        // }

        // if (currentMap === 'world') {
        //   for (let k in this.nationalFlag) {
        //     option2.series[0].markPoint.data.push({
        //       name: this.nationalFlag[k][2],
        //       symbol: 'image://' + require('../../../assets/img/legend/' + k + '.png'),
        //       coord: [this.nationalFlag[k][0], this.nationalFlag[k][1]]
        //     });
        //   }
        // }

        let arrayForScatter = [];

        if (currentMap === 'world') {
          this.flagOfDivider = true;
          console.log(this.flagOfDivider)
          let bricsYAxisData = [];
          let bricsSeriesData = [];
          let commonYAxisData = [];
          let commonSeriesData = [];
          this.jzUserNum = 0;
          for (let i = 0; i < currentData.length; i++) {
            if (currentData[i].ENG_NAME === 'Brazil' ||
              currentData[i].ENG_NAME === 'India' ||
              currentData[i].ENG_NAME === 'Russia' ||
              currentData[i].ENG_NAME === 'South') {
              this.jzUserNum += Number(currentData[i].KPI_VALUE); // 金砖国家漫入用户数
              bricsYAxisData.push({
                value: currentData[i].NE_NAME,
                textStyle: {
                  color: '#00FFFD'
                }
              });
              bricsSeriesData.push({
                value: currentData[i].KPI_VALUE,
                label: {
                  normal: {
                    textStyle: {
                      color: '#00FFFD',
                      fontSize: 30
                    }
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#00FFFD'
                  }
                }
              })
              option2.series[0].data.push({
                name: currentData[i].NE_NAME,
                coords: this.flagOfInOrOut ? [
                  [currentData[i].LON, currentData[i].LAT], currentRegion
                ] : [
                  currentRegion, [currentData[i].LON, currentData[i].LAT]
                ],
                value: currentData[i].KPI_VALUE
              })
            }
          }
          for (let i = 0; i < currentData.length; i++) {
            if (commonYAxisData.length <= 5) {
              if (currentData[i].ENG_NAME !== 'Brazil' &&
                currentData[i].ENG_NAME !== 'India' &&
                currentData[i].ENG_NAME !== 'Russia' &&
                currentData[i].ENG_NAME !== 'South') {
                commonYAxisData.push(currentData[i].NE_NAME);
                commonSeriesData.push({
                  value: currentData[i].KPI_VALUE
                });
                option2.series[0].data.push({
                  name: currentData[i].NE_NAME,
                  coords: this.flagOfInOrOut ? [
                    [currentData[i].LON, currentData[i].LAT], currentRegion
                  ] : [
                    currentRegion, [currentData[i].LON, currentData[i].LAT]
                  ],
                  value: currentData[i].KPI_VALUE
                })
              }
            } else {
              break;
            }
          }
          for (let i = 0; i < 10; i++) {
            option1.series[0].data.push(currentData[0].KPI_VALUE);
          }
          option1.yAxis[0].data = (commonYAxisData.reverse()).concat(bricsYAxisData.reverse());
          option1.yAxis[1].data = option1.yAxis[0].data;
          option1.series[1].data = (commonSeriesData.reverse()).concat(bricsSeriesData.reverse());

          for (let k in this.nationalFlag) {
            option2.series[0].markPoint.data.push({
              name: this.nationalFlag[k][2],
              symbol: 'image://' + require('../../../assets/img/legend/' + k + '.png'),
              coord: [this.nationalFlag[k][0], this.nationalFlag[k][1]]
            });
          }
        } else {
          this.flagOfDivider = false;
          console.log(this.flagOfDivider)
          for (let i = 0; i < currentData.length; i++) {
            if (i < 10 && currentData[i]) {
              option1.yAxis[0].data.push(currentData[i].NE_NAME)
              option1.yAxis[1].data.push(currentData[i].NE_NAME)
              option1.series[0].data.push(currentData[0].KPI_VALUE)
              option1.series[1].data.push({
                value: currentData[i].KPI_VALUE,
                tooltip: {
                  formatter: function(params) {
                    return 1;
                  }
                }
              })

              if (!currentData[i].LON || !currentData[i].LAT) {
                currentData[i].LON = mapCoord[currentData[i].NE_NAME][0];
                currentData[i].LAT = mapCoord[currentData[i].NE_NAME][1];
              }

              option2.series[0].data.push({
                name: currentData[i].NE_NAME,
                coords: this.flagOfInOrOut ? [
                  [currentData[i].LON, currentData[i].LAT], currentRegion
                ] : [
                  currentRegion, [currentData[i].LON, currentData[i].LAT]
                ],
                value: currentData[i].KPI_VALUE
              })
            } else if (i >= 10 && currentData[i]) {
              if (!currentData[i].LON || !currentData[i].LAT) {
                currentData[i].LON = mapCoord[currentData[i].NE_NAME][0];
                currentData[i].LAT = mapCoord[currentData[i].NE_NAME][1];
              }
              arrayForScatter.push({
                name: currentData[i].NE_NAME,
                value: [currentData[i].LON, currentData[i].LAT, currentData[i].KPI_VALUE]
              });
            }
          }

          option1.yAxis[0].data.reverse();
          option1.yAxis[1].data.reverse();
          option1.series[0].data.reverse();
          option1.series[1].data.reverse();

          arrayForScatter.sort(function(a, b) {
            return b.value[2] - a.value[2]
          });
          option2.series[1].data = arrayForScatter;
          option2.series[1].symbolSize = function(val) {
            return val[2] / arrayForScatter[0].value[2] * 20;
          }
        }

        let multiple = Math.pow(10, String(currentData[0].KPI_VALUE).length - 1);
        let max = Math.ceil(currentData[0].KPI_VALUE / multiple) * multiple;

        option1.xAxis[0].max = currentData[0].KPI_VALUE;
        option1.tooltip[0].formatter = function(params) {
          return currentMap === 'fujian' ? `${params[1].name}：${params[1].value}` : `${params[1].name}<br />${params[1].seriesName}：${params[1].value}`
        };
        option1.grid = this.switchRegionForLeftChart(currentMap);
        this.leftChart.clear();
        this.leftChart.setOption(option1);

        option2.geo = this.switchRegionForRightChart(currentMap);
        option2.visualMap[0].max = max;
        option2.visualMap[0].range = [0, max];
        this.rightChart.clear();
        this.rightChart.setOption(option2);
      },
      select(num) {
        this.jzUserNum = 0;  // 金砖国家漫入用户数
        this.selected = true;
        this.top10Flag = true;
        this.$nextTick(function() {
          this.initEcharts1();
          this.initEcharts2();
          this.arrayOfSelect = [false, false, false, false, false];
          this.arrayOfSelect[num] = true;
          this.top10Flag = false;
          this.switchData();
        })
      },
      initEcharts1() {
        if (this.leftChart) {
          return;
        }
        this.leftChart = echarts.init(document.getElementById('a1-traditional-Roam-echarts1'));
        let optionOfLeftChart = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            },
            formatter: function(params) {
              return `${params[1].name}<br />${params[1].seriesName}：${params[1].value}`
            },
            padding: [10, 15],
            extraCssText: 'line-height:24px'
          },
          grid: {
            top: 16,
            left: 150,
            width: '40%',
            height: '94%'
          },
          xAxis: {
            type: 'value',
            // boundaryGap: [0, 0.01],
            // max: 0,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            max: 0
          },
          yAxis: [{
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: 'white',
                fontSize: 25
              },
              margin: 16
            },
            interval: 0,
            // data: ['江西', '河北', '海南', '湖南', '湖北', '陕西', '浙江', '山西', '江苏', '安徽']
            data: []
          }, {
            type: 'category',
            // offset: -300,
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            interval: 0,
            // data: ['江西', '河北', '海南', '湖南', '湖北', '陕西', '浙江', '山西', '江苏', '安徽']
            data: []
          }],
          series: [{
            name: '漫游TOP背景',
            type: 'bar',
            // data: [9141, 9141, 9141, 9141, 9141, 9141, 9141, 9141, 9141, 9141],
            data: [],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: '#2E4F6B',
                borderWidth: 0,
                barBorderRadius: 20
              }
            },
            barWidth: 20,
            yAxisIndex: 0
          }, {
            name: '漫游TOP',
            type: 'bar',
            // data: this.fateData1,
            data: [],
            label: {
              normal: {
                show: true,
                // position: 'right',
                position: [160, -8],
                textStyle: {
                  color: '#F9F94B',
                  fontSize: 26
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#3EA4EC',
                borderWidth: 0,
                barBorderRadius: 20
              }
            },
            barWidth: 20,
            yAxisIndex: 1
          }]
        };
        this.leftChart.setOption(optionOfLeftChart);
      },
      initEcharts2() {
        if (this.rightChart) {
          return;
        }
        this.rightChart = echarts.init(document.getElementById('a1-traditional-Roam-echarts2'));
        let optionOfRightChart = {
          tooltip: {
            show: false,
            trigger: 'item'
          },
          visualMap: {
            type: 'continuous',
            min: 0,
            max: 100000,
            right: 20,
            bottom: 30,
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true,
            itemWidth: 6,
            itemHeight: 130,
            color: ['#00FFFD', '#00FF01'],
            // color: ['yellow', 'blue'],
            textStyle: {
              color: 'white',
              fontSize: 20,
              fontWeight: 'lighter',
              fontFamily: 'Microsoft Yahei'
            }
            // dimension: 2
          },
          series: [{
            type: 'lines',
            coordinateSystem: 'geo',
            // visualMap: true,
            zlevel: 400,
            effect: {
              show: true,
              period: 6,
              trailLength: 0.5,
              // color: 'rgba(255, 255, 255, 1)',
              // symbol: 'image://' + require('../../../assets/img/legend/lines-icon.png'),
              symbol: 'roundRect',
              symbolSize: 6,
              animation: false
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.4,
                curveness: 0.2,
                shadowColor: 'rgba(255, 255, 255, 0.2)',
                shadowBlur: 10
              }
            },
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 22
                },
                formatter: '{b}：{c}',
                position: 'end'
              }
            },
            markPoint: {
              symbolSize: 50,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  formatter: '{b}',
                  textStyle: {
                    fontSize: 22,
                    color: 'white'
                  },
                  position: 'right'
                }
              },
              data: []
            },
            data: []
          }, {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 0,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true,
                position: 'left',
                // formatter: '{b}',
                formatter: function(params) {
                  return `${params.name}：${params.value[2]}`;
                },
                textStyle: {
                  color: 'white',
                  fontSize: 20
                }
              }
            },
            itemStyle: {
              normal: {
                shadowColor: 'rgba(0, 0, 0, 0.7)',
                shadowBlur: 20,
                opacity: 0.8
              }
            },
            data: []
          }]
        };

        this.rightChart.setOption(optionOfRightChart);
      }
    },
    components: {
      internationalRoam,
      provinceRoam,
      provinceInRoam
    },
    beforeDestroy() {
      if (this.leftChart) {
        this.leftChart.dispose();
      }
      if (this.rightChart) {
        this.rightChart.dispose();
      }
    }
  }
</script>
