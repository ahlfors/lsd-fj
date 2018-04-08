<!--基站二级-->
<template>
  <div class="gis-tools-div-hotel">
    <div class="tools-hotel-title">{{sLevelData.ZH_LABEL}}</div>
    <div class="tools-hotel-explain">{{explain}}</div>
    <div class="tools-hotel-cfg">
      <div v-for="(val, key) in cfgInfo">
        <span>{{key}}</span>
        <span>{{val}}</span>
      </div>
    </div>
    <div class="tools-hotel-info">
      <viewTemplate viewId="07c08" @ok="threeLevel" class="hotel-info-header" :class="{'hotel-info-header-active':tLevelFlag}">机房信息</viewTemplate>
      <div class="hotel-info-title1">局楼外部照片</div>
      <div class="hotel-info-title2">周边保障力量</div>
      <div class="hotel-info-img" :class="hotelInfoImg"></div>
      <div id="hotel-map" class="hotel-info-map"></div>
    </div>
    <div @click.stop.self="unThreeLevel" class="hotel-three-level" v-if="tLevelFlag">
      <div is="hotelThreeLevel" :tLevelData="tLevelData"></div>
    </div>
  </div>
</template>

<script>
  import views from '../../../handleCmd';
  import config from '@/config';
  import L from 'leaflet';
  import hotelThreeLevel from './HotelThreeLevel.vue';
  let hotel = require('../../../assets/img/gis/marker_hotel.png');
  let man = require('../../../assets/img/gis/marker_man.png');
  let call = require('../../../assets/img/gis/marker_car_call.png');
  let oil = require('../../../assets/img/gis/marker_car_oil.png');
  let repair = require('../../../assets/img/gis/marker_car_repair.png');
  export default {
    name: 'HotelTool',
    data() {
      return {
        explain: '',
        cfgInfo: {
          '油机车配置': '',
          '油机车功率': '',
          '固定油机配置': '',
          '固定油机功率': '',
          '维护单位': '',
          '接口人': '',
          '联系方式': ''
        },
        // mapLayer: L.tileLayer('http://mt3.google.cn/vt/lyrs=m@162000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'),
        mapLayer: L.tileLayer(`http://${config.baseMapUrl}/map/tile{s}/?l=1&x={x}&y={y}&z={z}`, { subdomains: '01234' }),
        map: null,
        tLevelFlag: false,
        tLevelData: null,
        lineLayer: null,
        hotelInfoImg: 'hotel-info-img-01'
      }
    },
    props: {
      sLevelData: Object
    },
    mounted() {
      this.setData();
      this.initMap([this.sLevelData['LATITUDE'], this.sLevelData['LONGITUDE']]);
      this.$store.state.newViewId = '07c08';
    },
    methods: {
      setData() {
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市海沧区海沧局楼' ? this.hotelInfoImg = 'hotel-info-img-01' : '';
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市湖里区金山局楼' ? this.hotelInfoImg = 'hotel-info-img-02' : '';
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市湖里区松柏局站' ? this.hotelInfoImg = 'hotel-info-img-03' : '';
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市集美区新杏西局楼' ? this.hotelInfoImg = 'hotel-info-img-04' : '';
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市思明区美仁宫局站' ? this.hotelInfoImg = 'hotel-info-img-05' : '';
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市思明区厦门软件园' ? this.hotelInfoImg = 'hotel-info-img-06' : '';
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市同安区同安局楼' ? this.hotelInfoImg = 'hotel-info-img-07' : '';
        this.sLevelData['ZH_LABEL'] === '中国福建省厦门市翔安区马巷局楼' ? this.hotelInfoImg = 'hotel-info-img-08' : '';
        this.explain = this.sLevelData['HOTEL_RECOMMEND'];
        this.cfgInfo = {
          '油机车配置': this.sLevelData['HOTEL_OIL'],
          '油机车功率': this.sLevelData['HOTEL_OIL_POWER'],
          '固定油机配置': this.sLevelData['HOTEL_GD_OIL'],
          '固定油机功率': this.sLevelData['HOTEL_GD_OIL_POWER'],
          '维护单位': this.sLevelData['HOTEL_MAINTAIN'],
          '接口人': this.sLevelData['HOTEL_MAN'],
          '联系方式': this.sLevelData['HOTEL_MOBILE']
        };
        this.tLevelData = this.sLevelData['MACHINE_ROOM'];
        for (let key in views) {
          if (key !== '07c08' && key !== '07c0800' && key !== '07c0801' && key.indexOf('07c08') !== -1) {
            delete views[key];
          }
        }
        for (let i = 0; i < this.tLevelData.length; i++) {
          let key = '07c08' + i;
          let downKey = '07c08' + (i + 1);
          let upKey = '07c08' + (i - 1);
          if (i === 0) {
            views[key] = {
              opts: {
                down: downKey,
                right: '07c0800',
                ok: '07c0800'
              }
            }
          } else if (i === this.tLevelData.length - 1) {
            views[key] = {
              opts: {
                up: upKey,
                right: '07c0800',
                ok: '07c0800'
              }
            }
          } else {
            views[key] = {
              opts: {
                down: downKey,
                up: upKey,
                right: '07c0800',
                ok: '07c0800'
              }
            }
          }
        }
      },
      initMap(center) {
        let latLonList = [];
        latLonList.push(center);
        this.map = L.map('hotel-map', {
          center: center,
          zoom: 16,
          attributionControl: false,
          zoomControl: false,
          doubleClickZoom: false,
          layers: this.mapLayer
        });
        this.map.addEventListener('click', (obj) => {
          console.log(obj.latlng);
          console.log(JSON.stringify([obj.latlng.lat, obj.latlng.lng]) + ',');
          console.log(`{'LONGITUDE': ${obj.latlng.lng}, 'LATITUDE': ${obj.latlng.lat}}`);
          console.log(this.map.getZoom());
        });
        L.marker(center, { icon: L.icon({ iconUrl: hotel, iconSize: [48, 48] }) }).addTo(this.map);
        if (this.sLevelData['ZBZY'] && this.sLevelData['ZBZY'].length !== 0) {
          for (let key in this.sLevelData['ZBZY'][0]) {
            let icon = null;
            key === 'BZRY' ? icon = man : '';
            key === 'YJTXC' ? icon = call : '';
            key === 'YJYJC' ? icon = oil : '';
            key === 'YJQXC' ? icon = repair : '';
            for (let item of this.sLevelData['ZBZY'][0][key]) {
              let manPoint = [item['LATITUDE'], item['LONGITUDE']];
              latLonList.push(manPoint);
              L.marker(manPoint, { icon: L.icon({ iconUrl: icon, iconSize: [48, 48] }) }).addTo(this.map);
              this.createLine([center, manPoint]);
            }
          }
        }
        let bounds = new L.LatLngBounds(latLonList);
        this.map.fitBounds(bounds);
      },
      createLine(lonLatArray) {
        !this.lineLayer ? this.lineLayer = L.layerGroup().addTo(this.map) : ''; // 初始化图层
        L.polyline(lonLatArray, {color: '#33FF77', weight: 5, dashArray: [5, 8]}).addTo(this.lineLayer);
        let point1 = L.latLng(lonLatArray[0]);
        let point2 = L.latLng(lonLatArray[1]);
        let distance = Math.ceil(point1.distanceTo(point2));
        let newPoint = [(Number(lonLatArray[0][0]) + Number(lonLatArray[1][0])) / 2, (Number(lonLatArray[0][1]) + Number(lonLatArray[1][1])) / 2];
        let myIcon = L.divIcon({
          className: 'my-div-icon',
          html: `<span>${distance}米 </span>`
        });
        L.marker(newPoint, { icon: myIcon, zIndexOffset: 800 }).addTo(this.map);
      },
      threeLevel() {
        this.tLevelFlag = !this.tLevelFlag;
      },
      unThreeLevel() {
        this.tLevelFlag = false;
      }
    },
    components: {
      hotelThreeLevel
    },
    beforeDestroy() {
      this.map.remove();
      this.map = null;
    }
  }
</script>
