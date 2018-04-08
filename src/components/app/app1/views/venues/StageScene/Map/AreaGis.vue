<!--阶段场景GIS地图-->
<template>
  <viewTemplate class="area-gis" :interval="30" @interval="queryData">
    <div id="area-gis-main" class="area-gis-main"></div>
  </viewTemplate>
</template>
<style lang="scss" rel="stylesheet/scss">
.area-gis {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.area-gis-main {
  width: 100%;
  height: 100%;
}

.icon-div {
  width: 32px;
  height: 40px;
  display: inline-block;
  position: absolute;
  background-image: url('../../../../assets/img/venues/points/gzz.png');
  background-size: 100% 100%;
  background-position: center;
  margin-left: 0px;
  margin-top: -25px;
}

.icon-div-label {
  display: inline-block;
  position: absolute;
  right: -5px;
  top: -5px;
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

.gis-popup {
  bottom: 7px !important;
  left: -121px !important;
  width: 250px;
  // height: 60px;
  word-break: normal;
  >div:nth-of-type(1) {
    width: 100%;
    height: 100%;
    padding: 0px 8px;
    background-color: rgba(0, 0, 0, .6);
    >div {
      width: 236px !important;
      height: 100%;
      margin: 0;
      >div {
        color: #fff;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
    }
  }
  >div:nth-of-type(2) {
    width: 0px;
    height: 0px;
  }
}
</style>
<script>
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import config from '@/config';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import GPSTools from '@/lib/GPSTools';
export default {
  name: 'AreaGisMain',
  props: {
    sceneName: String,
    areaId: Number
  },
  data() {
    return {
      map: null,
      centerData: [24.4718739011, 118.1893597312],
      latLonMap: {},
      layer: [],
      hsLayer: null,
      clusterLayer: null,
      markerMap: {},
      hsLayerObj: {}, // 共址站详情图层列表
      polylineObj: {},
      cirLayerObj: {},
      cellLayerObj: {},
      cellpolylineObj: {},
      layers: null,
      url: '',
      // gisLayer: L.tileLayer('http://mt3.google.cn/vt/lyrs=y@162000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}')
      gisLayer: L.tileLayer(`http://${config.baseMapUrl}/map/tile{s}/?l=2&x={x}&y={y}&z={z}`, { subdomains: '01234' })
    }
  },
  mounted() {
    this.initMap();
    this.queryData();
  },
  created() {
    this.centerData = this.switchScene();
    switch (this.sceneName) {
      case '国际会议展览中心':
        this.url = 'site_-4898830';
        break;
      case '国际会议中心':
        this.url = 'site_-1783968023';
        break;
      case '国际会展酒店':
        this.url = 'site_-1586109174';
        break;
      case '海悦山庄酒店':
        this.url = 'site_1277408329';
        break;
      case '闽南大戏院':
        this.url = 'site_-2114994955';
        break;
      case '厦门高崎国际机场':
        this.url = 'site_-1798451159';
        break;
      case '市政府':
        this.url = 'site_464231223';
        break;
    }
  },
  methods: {
    switchScene() {
      let val = this.sceneName;
      switch (val) {
        case '国际会议展览中心':
          return [24.4695813652, 118.1878368418];
        case '国际会议中心':
          return [24.4718739011, 118.1893597312];
        case '国际会展酒店':
          return [24.4665124553, 118.1846506763];
        case '海悦山庄酒店':
          return [24.434823127570883, 118.14817428588869];
        case '闽南大戏院':
          return [24.4737969011, 118.1892847312];
        case '厦门高崎国际机场':
          return [24.536406069, 118.1371252934];
        case '市政府':
          return [24.4798314847, 118.0892308097];
      }
    },
    clearAll() {
      for (let key in this.hsLayerObj) {
        if (this.hsLayerObj[key] != null) {
          this.hsLayerObj[key].clearLayers();
          this.hsLayerObj[key] = null;
        }
      };
      for (let key in this.polylineObj) {
        if (this.polylineObj[key] != null) {
          this.polylineObj[key].clearLayers();
          this.polylineObj[key] = null;
        }
      };
      for (let key in this.cirLayerObj) {
        if (this.cirLayerObj[key] != null) {
          this.cirLayerObj[key].clearLayers();
          this.cirLayerObj[key] = null;
        }
      };
      for (let key in this.cellpolylineObj) {
        if (this.cellpolylineObj[key] != null) {
          this.cellpolylineObj[key].clearLayers();
          this.cellpolylineObj[key] = null;
        }
      };
      for (let key in this.cellLayerObj) {
        if (this.cellLayerObj[key] != null) {
          this.cellLayerObj[key].clearLayers();
          this.cellLayerObj[key] = null;
        }
      };
    },
    initMap() {
      this.map = L.map('area-gis-main', {
        center: this.centerData,
        zoom: 18,
        attributionControl: false,
        zoomControl: false,
        doubleClickZoom: false,
        layers: this.gisLayer
      });
      this.map.addEventListener('click', (obj) => {
        console.log(obj.latlng);
        console.log(JSON.stringify([obj.latlng.lat, obj.latlng.lng]) + ',');
        console.log(`{'LONGITUDE': ${obj.latlng.lng}, 'LATITUDE': ${obj.latlng.lat}}`);
        console.log(this.map.getZoom());
      });
      this.clusterLayer = L.layerGroup();
      this.clusterLayer.addTo(this.map);
    },
    moveMap() {
      this.map.setView(this.centerData)
    },
    queryData() {
      this.$http.indi.get(this.url, {}, (res) => {
        let latLngArr = [];
        res.data.data.forEach(function(item) {
          if (item.LATITUDE !== null && item.LATITUDE !== '' && item.LATITUDE !== 'null' && item.LONGITUDE !== null && item.LONGITUDE !== '' && item.LONGITUDE !== 'null') {
            latLngArr.push(item)
          }
        });
        GPSTools.gpsToGoogle(latLngArr, 'LATITUDE', 'LONGITUDE');
        if (latLngArr) {
          this.latLonMap = this.latLonGroup(latLngArr);
          // console.log(this.latLonMap)
          this.addMarkers(this.latLonMap);
        }
      })
    },
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
    /** 基站打点 */
    addMarkers(latLonMap) {
      let siteNumber = 0;
      let marker = null;
      let latLonArray = null;
      let latLonList = [];
      let markerOption;
      let Icon = null;
      let zindex = 100;
      if (this.clusterLayer) {
        this.clusterLayer.clearLayers()
      }
      for (let p in latLonMap) {
        siteNumber = latLonMap[p].length; // 基站数
        latLonArray = p.split('_');
        latLonList.push(L.latLng(latLonArray[0], latLonArray[1]));
        if (siteNumber === 1) { // 一个基站，不聚合
          zindex = 100;
          let siteInfo = latLonMap[p][0];
          if (siteInfo.SITE_CLASS === '4G') {
            zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/4G.png'),
              iconSize: [32, 40],
              iconAnchor: [28, 38]
            });
          } else {
            zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/2G.png'),
              iconSize: [42, 42],
              iconAnchor: [28, 38]
            });
          }
          markerOption = {
            'icon': Icon,
            'title': p,
            'zIndexOffset': zindex
          };
          marker = L.marker([latLonArray[0], latLonArray[1]], markerOption);
          this.markerMap[latLonMap[p][0].SITE_ID] = marker;
          // 添加小区打点
          marker.addEventListener('click', (obj) => {
            for (let key in this.cellLayerObj) {
              if (this.cellLayerObj[key] != null) {
                this.cellLayerObj[key].clearLayers();
                this.cellLayerObj[key] = null;
              }
            }
            for (let key in this.cellpolylineObj) {
              if (this.cellpolylineObj[key] != null) {
                this.cellpolylineObj[key].clearLayers();
                this.cellpolylineObj[key] = null;
              }
            }
            let key = obj.target.options.title;
            let data = this.latLonMap[key];
            this.cellDot(data, key, this.map.latLngToLayerPoint(obj.latlng).x, this.map.latLngToLayerPoint(obj.latlng).y, obj)
          });
        } else { // 共址站
          let gzzClass = 'icon-div';
          zindex = 100;
          let icon = L.divIcon({
            className: 'my-icon',
            html: "<div class='" + gzzClass + "'><label class='icon-div-label'>" + this.latLonMap[p].length + '</label></div>'
          });
          markerOption = {
            'icon': icon,
            'title': p,
            'zIndexOffset': zindex
          };
          marker = L.marker([latLonArray[0], latLonArray[1]], markerOption);
          this.markerMap[p] = marker;
          marker.addEventListener('click', (obj) => {
            this.markerClickHand(obj, marker);
          });
        }
        this.clusterLayer.addLayer(marker);
        this.pointProtection();
        this.pointEmerCar();
      }
    },
    markerClickHand(obj, marker) {
      // cellLayerObj  cellpolylineObj 小区展开图层和线的移除
      for (let key in this.cellLayerObj) {
        if (this.cellLayerObj[key] != null) {
          this.cellLayerObj[key].clearLayers();
          this.cellLayerObj[key] = null;
        }
      }
      for (let key in this.cellpolylineObj) {
        if (this.cellpolylineObj[key] != null) {
          this.cellpolylineObj[key].clearLayers();
          this.cellpolylineObj[key] = null;
        }
      }
      let key = obj.target.options.title;
      let data = this.latLonMap[key];
      this.gzzInfo(data, key, this.map.latLngToLayerPoint(obj.latlng).x, this.map.latLngToLayerPoint(obj.latlng).y, obj)
    },
    /** 展开共址站下面的基站 */
    gzzInfo(data, id, x, y, that) {
      if (!id) {
        id = that.latlng.lat + '_' + that.latlng.lng
      }
      let clickId = that.latlng.lat + '_' + that.latlng.lng;
      if (this.hsLayerObj && this.hsLayerObj[clickId]) {
        this.hsLayerObj[clickId].clearLayers();
        this.hsLayerObj[clickId] = null;
        this.polylineObj[clickId].clearLayers();
        this.polylineObj[clickId] = null;
        this.cirLayerObj[clickId].clearLayers();
        this.cirLayerObj[clickId] = null;
      } else {
        for (let key in this.hsLayerObj) {
          if (clickId !== key && this.hsLayerObj[key]) {
            this.hsLayerObj[key].clearLayers();
            this.hsLayerObj[key] = null;
          }
        }
        for (let key in this.polylineObj) {
          if (clickId !== key && this.polylineObj[key]) {
            this.polylineObj[key].clearLayers();
            this.polylineObj[key] = null;
          }
        }
        for (let key in this.cirLayerObj) {
          if (clickId !== key && this.cirLayerObj[key]) {
            this.cirLayerObj[key].clearLayers();
            this.cirLayerObj[key] = null;
          }
        }
        let /* 共址站个数 */ pointNum = data.length;
        let angleList = [];
        let r;
        let hsLayer;
        let cirLayer;
        let hspolyline;
        let layers = [];
        let polylines = [];
        let latlngs = [];
        let pointR;
        let circles = [];
        let Icon = null;
        let markerMap = {};
        // var zindex = 100;
        for (let i = 0; i < pointNum; i++) {
          angleList.push(i * (360 / pointNum));
        }
        r = (140 / 2) / (Math.sin((180 / pointNum) * (Math.PI * 2 / 360)));
        if (r < 90) {
          r = 90;
        }
        if (pointNum === 1) {
          r = 80;
        }
        angleList.forEach((e, n) => {
          let pX;
          let pY;
          // var zindex = 100;
          pX = x + r * Math.cos(e * (Math.PI * 2 / 360));
          pY = y + r * Math.sin(e * (Math.PI * 2 / 360));
          if (n === 0) {
            pointR = this.map.layerPointToLatLng(L.point(pX, pY));
          }
          let latlng = this.map.layerPointToLatLng(L.point(pX, pY));
          latlngs.push(latlng);
          if (data[n].SITE_CLASS === '4G' || data[n].SITE_CLASS === '8104') {
            // zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/4G.png'),
              iconSize: [32, 40],
              iconAnchor: [20, 40]
            });
          } else {
            // zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/2G.png'),
              iconSize: [42, 40],
              iconAnchor: [20, 40]
            });
          }
          let marker = L.marker(latlng, {
            'icon': Icon,
            'title': data[n].SITE_NAME,
            'zIndexOffset': 700,
            'attributes': {
              'site_id': data[n].SITE_ID ? data[n].SITE_ID : ''
            }
          });
          // 添加小区打点
          marker.addEventListener('click', (obj) => {
            // let areaLatLong = [];
            let data1 = [];
            if (data) {
              let cellList = [];
              data.forEach((e, n) => {
                if (e.CELL_INFOS.length > 0) {
                  for (let item = 0; item < e.CELL_INFOS.length; item++) {
                    cellList.push(e.CELL_INFOS[item]);
                  }
                }
              });
              if (!cellList || cellList.length === 0) {
                return;
              }
              data1 = cellList;
            }
            this.cellInfo(data1, this.map.latLngToLayerPoint(obj.latlng).x, this.map.latLngToLayerPoint(obj.latlng).y, obj, e, false);
            // console.log('添加小区打点')
          });
          markerMap[data[n].SITE_ID] = marker;
          // markerMouseover(marker, data[n].SITE_NAME ? data[n].SITE_NAME : data[n].USERLABEL);
          let polyline = L.polyline([that.latlng, latlng], {
            color: '#00FE24',
            weight: 2
          }).addTo(this.map);
          layers.push(marker);
          polylines.push(polyline);
        });
        let centerPoint = that.latlng;
        let circleR = centerPoint.distanceTo(pointR);
        let circle = L.circle(that.latlng, circleR, {
          color: 'rgba(255,255,255,.9)',
          fillColor: 'rgb(0,0,0)',
          fillOpacity: 0.4,
          weight: 0
        }).addTo(this.map);
        circles.push(circle);
        cirLayer = L.layerGroup(circles);
        cirLayer.addTo(this.map);
        this.cirLayerObj[id] = cirLayer;
        hsLayer = L.layerGroup(layers);
        hsLayer.addTo(this.map);
        hspolyline = L.layerGroup(polylines);
        hspolyline.addTo(this.map);
        this.hsLayerObj[id] = hsLayer;
        this.polylineObj[id] = hspolyline;
      }
    },
    /**
     *非共址站 2G、4G基站 小区打点
     * @param data
     * @param id
     * @param x
     * @param y
     * @param that
     */
    cellDot(data, id, x, y, that) {
      if (!id) {
        id = that.latlng.lat + '_' + that.latlng.lng
      }
      let clickId = that.latlng.lat + '_' + that.latlng.lng;
      if (this.hsLayerObj && this.hsLayerObj[clickId]) {
        this.hsLayerObj[clickId].clearLayers();
        this.hsLayerObj[clickId] = null;
        this.polylineObj[clickId].clearLayers();
        this.polylineObj[clickId] = null;
        this.cirLayerObj[clickId].clearLayers();
        this.cirLayerObj[clickId] = null;
      } else {
        for (let key in this.hsLayerObj) {
          if (clickId !== key && this.hsLayerObj[key]) {
            this.hsLayerObj[key].clearLayers();
            this.hsLayerObj[key] = null;
          }
        }
        for (let key in this.polylineObj) {
          if (clickId !== key && this.polylineObj[key]) {
            this.polylineObj[key].clearLayers();
            this.polylineObj[key] = null;
          }
        }
        for (let key in this.cirLayerObj) {
          if (clickId !== key && this.cirLayerObj[key]) {
            this.cirLayerObj[key].clearLayers();
            this.cirLayerObj[key] = null;
          }
        }
        let /* 共址站个数 */ pointNum = data.length;
        let angleList = [];
        let r;
        let hsLayer;
        let cirLayer;
        let hspolyline;
        let layers = [];
        let polylines = [];
        let latlngs = [];
        let pointR;
        let circles = [];
        let Icon = null;
        let markerMap = {};
        // var zindex = 100;
        for (let i = 0; i < pointNum; i++) {
          angleList.push(i * (360 / pointNum));
        }
        r = (140 / 2) / (Math.sin((180 / pointNum) * (Math.PI * 2 / 360)));
        if (r < 90) {
          r = 90;
        }
        if (pointNum === 1) {
          r = 80;
        }
        angleList.forEach((e, n) => {
          let pX;
          let pY;
          // var zindex = 100;
          pX = x + r * Math.cos(e * (Math.PI * 2 / 360));
          pY = y + r * Math.sin(e * (Math.PI * 2 / 360));
          if (n === 0) {
            pointR = this.map.layerPointToLatLng(L.point(pX, pY));
          }
          let latlng = this.map.layerPointToLatLng(L.point(pX, pY));
          latlngs.push(latlng);
          if (data[n].SITE_CLASS === '4G') {
            // zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/4Gpart.png'),
              iconSize: [32, 40],
              iconAnchor: [20, 40]
            });
          } else {
            // zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/2Gpart.png'),
              iconSize: [42, 42],
              iconAnchor: [20, 40]
            });
          }
          let marker = L.marker(latlng, {
            'icon': Icon,
            'title': data[n].SITE_NAME,
            'zIndexOffset': 700,
            'attributes': {
              'site_id': data[n].SITE_ID ? data[n].SITE_ID : ''
            }
          });
          markerMap[data[n].SITE_ID] = marker;
          // markerMouseover(marker, data[n].SITE_NAME ? data[n].SITE_NAME : data[n].USERLABEL);
          let polyline = L.polyline([that.latlng, latlng], {
            color: '#00FE24',
            weight: 2
          }).addTo(this.map);
          layers.push(marker);
          polylines.push(polyline);
        });
        let centerPoint = that.latlng;
        let circleR = centerPoint.distanceTo(pointR);
        let circle = L.circle(that.latlng, circleR, {
          color: 'rgba(255,255,255,.9)',
          fillColor: 'rgb(0,0,0)',
          fillOpacity: 0.4,
          weight: 0
        }).addTo(this.map);
        circles.push(circle);
        cirLayer = L.layerGroup(circles);
        cirLayer.addTo(this.map);
        this.cirLayerObj[id] = cirLayer;
        hsLayer = L.layerGroup(layers);
        hsLayer.addTo(this.map);
        hspolyline = L.layerGroup(polylines);
        hspolyline.addTo(this.map);
        this.hsLayerObj[id] = hsLayer;
        this.polylineObj[id] = hspolyline;
      }
    },
    /**
     * 共址站 2G、4G基站 小区打点
     * @param data
     * @param x
     * @param y
     * @param that
     * @param angleFather
     * @param flag
     */
    cellInfo(data, x, y, that, angleFather, flag) {
      let self = this;
      if (flag) {
        for (let key in this.hsLayerObj) {
          if (clickId !== key && this.hsLayerObj[key]) {
            this.hsLayerObj[key].clearLayers();
            this.hsLayerObj[key] = null;
          }
        }
        for (let key in this.polylineObj) {
          if (clickId !== key && polylineObj[key]) {
            this.polylineObj[key].clearLayers();
            this.polylineObj[key] = null;
          }
        }
        for (let key in this.cirLayerObj) {
          if (clickId !== key && this.cirLayerObj[key]) {
            this.cirLayerObj[key].clearLayers();
            this.cirLayerObj[key] = null;
          }
        }
      }
      let clickId = that.latlng.lat + '_' + that.latlng.lng;
      if (this.cellLayerObj && this.cellLayerObj[clickId]) {
        this.cellLayerObj[clickId].clearLayers();
        this.cellLayerObj[clickId] = null;
        this.cellpolylineObj[clickId].clearLayers();
        this.cellpolylineObj[clickId] = null;
      } else {
        for (let key in this.cellLayerObj) {
          if (clickId !== key && this.cellLayerObj[key]) {
            this.cellLayerObj[key].clearLayers();
            this.cellLayerObj[key] = null;
          }
        }
        for (let key in this.cellpolylineObj) {
          if (clickId !== key && this.cellpolylineObj[key]) {
            this.cellpolylineObj[key].clearLayers();
            this.cellpolylineObj[key] = null;
          }
        }
        let radian = 90;
        let startAngle;
        let /* 小区个数 */pointNum = data.CELL_INFOS ? data.CELL_INFOS.length : data.length;
        let/* 角度列表 */angleList = [];
        let /* 半径 */r;
        let layers = [];
        let cellLayer;
        let polylines = [];
        let cellpolyline;
        let Icon = null;
        let markerMap = {};
        if (pointNum > 6) {
          radian = 180;
        }
        startAngle = (angleFather - radian / 2) < 0 ? (360 - radian / 2 + angleFather) : (angleFather - radian / 2);
        for (let i = 0; i < pointNum; i++) {
          let angle = (startAngle + i * (radian / pointNum)) < 360 ? (startAngle + i * (radian / pointNum)) : (startAngle + i * (radian / pointNum) - 360);
          angleList.push(angle);
        }
        r = (80) / (Math.sin((180 / pointNum) * (Math.PI * 2 / 360)));
        if (r < 150) { // 最小半径
          r = 150;
        }
        if (pointNum === 1) {
          r = 80;
        }
        angleList.forEach(function(e, n) {
          let pX, pY;
          pX = x + r * Math.cos(e * (Math.PI * 2 / 360));
          pY = y + r * Math.sin(e * (Math.PI * 2 / 360));
          let latlng = self.map.layerPointToLatLng(L.point(pX, pY));
          if (data[n].SITE_CLASS === '4G') {
            // zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/4Gpart.png'),
              iconSize: [32, 40],
              iconAnchor: [32, 40]
            });
          } else {
            // zindex = 200;
            Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/2Gpart.png'),
              iconSize: [42, 42],
              iconAnchor: [32, 40]
            });
          }
          let marker = L.marker(latlng, {
            'icon': Icon,
            'title': data[n].CELL_NAME,
            'zIndexOffset': 700,
            'attributes': {
              'site_id': data[n].SITE_ID
            }
          });
          let tooltips = null;
          tooltips = data[n].CELL_NAME;
          let popup = L.popup({
            closeButton: false,
            className: 'gis-popup'
          }).setContent('<div>' + tooltips + '</div>')
          marker.addEventListener('mouseover', (obj) => {
            popup.setLatLng(obj.latlng);
            popup.openOn(self.map);
          });
          marker.addEventListener('mouseout', () => {
            popup._close();
          });
          markerMap[data[n].SITE_ID] = marker;
          // markerMouseover(marker, data.CELL_INFOS ? data.CELL_INFOS[n].CELL_NAME : data[n].USERLABEL);
          layers.push(marker);
          let polyline = L.polyline([that.latlng, latlng], { color: '#00FE24', weight: 2 }).addTo(self.map);
          polylines.push(polyline);
        });
        cellLayer = L.layerGroup(layers);
        cellLayer.addTo(self.map);
        this.cellLayerObj[clickId] = cellLayer;

        cellpolyline = L.layerGroup(polylines);
        cellpolyline.addTo(self.map);
        this.cellpolylineObj[clickId] = cellpolyline;
      }
    },
    /**
     * 保障人员gis打点
     */
    pointProtection() {
      // let latLngArr = [{'LAT': 24.471935607335322, 'LNG': 118.18235635757448, 'ZH_NAME': '111', 'MOBILEPHONE': '1233'},
      //   {'LAT': 24.472326206865443, 'LNG': 118.18029642105104, 'ZH_NAME': '221', 'MOBILEPHONE': '1233'}
      // ];
      this.$http.indi.get('area_' + this.areaId, {}, (res) => {
        let latLngArr = res.data.data.SECURITY_PERSONNEL_INFO;
        GPSTools.gpsToGoogle(latLngArr, 'LATITUDE', 'LONGITUDE');
        latLngArr.forEach((e, n) => {
          if (e.LATITUDE && e.LONGITUDE) {
            // console.log('LAT:' + e.LATITUDE + ',LNG:' + e.LONGITUDE);
            let Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/stagescene/ensure-person.png'),
              iconSize: [32, 40],
              iconAnchor: [32, 40]
            });
            let marker = L.marker([e.LATITUDE, e.LONGITUDE], { 'icon': Icon, 'title': e.PEOPLE_NAME, 'zIndexOffset': 300 });
            let sperInfo = '姓名：' + e.PEOPLE_NAME + '<br/>电话：' + e.TEL_PHONE;
            let popup = L.popup({
              closeButton: false,
              className: 'gis-popup'
            }).setContent('<div>' + sperInfo + '</div>')
            marker.addEventListener('mouseover', (obj) => {
              popup.setLatLng(obj.latlng);
              popup.openOn(this.map);
            });
            marker.addEventListener('mouseout', () => {
              popup._close();
            });
            this.clusterLayer.addLayer(marker);
          }
        });
      })
    },
    /**
     * 应急车辆gis打点
     */
    pointEmerCar() {
      // let latLngArr = [{ 'LAT': 24.47326364079291, 'LNG': 118.18124055862428, 'ZH_NAME': '111', 'MOBILEPHONE': '1233' },
      // { 'LAT': 24.472716805183595, 'LNG': 118.18081140518188, 'ZH_NAME': '221', 'MOBILEPHONE': '1233' }
      // ];
      this.$http.indi.get('area_' + this.areaId, {}, (res) => {
        let latLngArr = res.data.data.EMERGENCY_VEHICLE_INFO;
       // GPSTools.gpsToGoogle(latLngArr, 'LATITUDE', 'LONGITUDE');
        latLngArr.forEach((e, n) => {
          if (e.LATITUDE && e.LONGITUDE) {
            // console.log('LAT:' + e.LATITUDE + ',LNG:' + e.LONGITUDE);
            let Icon = L.icon({
              iconUrl: require('../../../../assets/img/venues/points/comvan.png'),
              iconSize: [48, 48]
            });
            let marker = L.marker([e.LATITUDE, e.LONGITUDE], { 'icon': Icon, 'title': e.CONTACT_PERSON, 'zIndexOffset': 400 });
            let sperInfo = '车牌号：' + e.RES_NAME + '<br/>姓名：' + e.CONTACT_PERSON + '<br/>电话：' + e.CONTACT_TEL;
            let popup = L.popup({
              closeButton: false,
              className: 'gis-popup'
            }).setContent('<div>' + sperInfo + '</div>')
            marker.addEventListener('mouseover', (obj) => {
              popup.setLatLng(obj.latlng);
              popup.openOn(this.map);
            });
            marker.addEventListener('mouseout', () => {
              popup._close();
            });
            this.clusterLayer.addLayer(marker);
          }
        });
      })
    }
  },
  components: {

  },
  watch: {
    sceneName(val) {
      this.clearAll();
      switch (val) {
        case '国际会议展览中心':
          this.url = 'site_-4898830';
          this.centerData = [24.4695813652, 118.1878368418];
          this.moveMap();
          break;
        case '国际会议中心':
          this.url = 'site_-1783968023';
          this.centerData = [24.4718739011, 118.1893597312];
          this.moveMap();
          break;
        case '国际会展酒店':
          this.url = 'site_-1586109174';
          this.centerData = [24.4665124553, 118.1846506763];
          this.moveMap();
          break;
        case '海悦山庄酒店':
          this.url = 'site_1277408329';
          this.centerData = [24.434823127570883, 118.14817428588869];
          this.moveMap();
          break;
        case '闽南大戏院':
          this.url = 'site_-2114994955';
          this.centerData = [24.4737969011, 118.1892847312];
          this.moveMap();
          break;
        case '厦门高崎国际机场':
          this.url = 'site_-1798451159';
          this.centerData = [24.536406069, 118.1371252934];
          this.moveMap();
          break;
        case '市政府':
          this.url = 'site_464231223';
          this.centerData = [24.4798314847, 118.0892308097];
          this.moveMap();
          break;
      }
      this.queryData();
      // this.pointProtection();
    }
  },
  beforeDestroy() {

  }
}
</script>
