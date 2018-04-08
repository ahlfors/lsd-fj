<!--GIS/卫星地图监控-->
<template>
  <viewTemplate viewId="07" class="_a1-gis" :interval="300"
                @interval="loadGisDataInterval"
                @panto="map_panto"
                @operat="map_operat"
                @zoom="map_pinch">
    <div id="gis-main" class="gis-main"></div>
    <div class="gis-border gis-border-left"></div>
    <div class="gis-border gis-border-right"></div>
    <div class="gis-border-bottom"></div>
    <viewTemplate viewId="08" @ok="switchLayers" class="switch-layer" :class="{'gisLayer':!layersFlag,'mapLayer':layersFlag}"></viewTemplate>
    <viewTemplate viewId="09" @ok="switchLegend" class="switch-legend" :class="{'legend-active':!legendFlag}"></viewTemplate>
    <div @click="resetMapZoom" class="map-zoom" v-show="zoomFlag"></div>
    <div class="legend-div" v-show="legendFlag">
      <div>
        <viewTemplate viewId="0901" @ok="switchMarker('c01')" :class="{'cut-active':c01}"><div></div><span>2G基站</span></viewTemplate>
        <viewTemplate viewId="0902" @ok="switchMarker('c02')" :class="{'cut-active':c02}"><div></div><span>4G基站</span></viewTemplate>
        <viewTemplate viewId="0903" @ok="switchMarker('c03')" :class="{'cut-active':c03}"><div></div><span>2G退服</span></viewTemplate>
        <viewTemplate viewId="0904" @down="switchLegend" @ok="switchMarker('c04')" :class="{'cut-active':c04}"><div></div><span>4G退服</span></viewTemplate>
      </div>
      <div>
        <viewTemplate viewId="0905" @ok="switchMarker('c05')" :class="{'cut-active':c05}"><div></div><span>传输路线</span></viewTemplate>
        <viewTemplate viewId="0906" @ok="switchMarker('c06')" :class="{'cut-active':c06}"><div></div><span>传输节点</span></viewTemplate>
        <viewTemplate viewId="0907" @ok="switchMarker('c07')" :class="{'cut-active':c07}"><div></div><span>井盖</span></viewTemplate>
        <viewTemplate viewId="0908" @down="switchLegend" @ok="switchMarker('c08')" :class="{'cut-active':c08}"><div></div><span>局楼</span></viewTemplate>
      </div>
      <div>
        <viewTemplate viewId="0909" @ok="switchMarker('c09')" :class="{'cut-active':c09}"><div></div><span>保障人员</span></viewTemplate>
        <viewTemplate viewId="0910" @ok="switchMarker('c10')" :class="{'cut-active':c10}"><div></div><span>应急通信车</span></viewTemplate>
        <viewTemplate viewId="0911" @ok="switchMarker('c11')" :class="{'cut-active':c11}"><div></div><span>应急油机车</span></viewTemplate>
        <viewTemplate viewId="0912" @down="switchLegend" @ok="switchMarker('c12')" :class="{'cut-active':c12}"><div></div><span>应急抢修车</span></viewTemplate>
      </div>
      <div>
        <viewTemplate viewId="0913" @down="switchLegend" @ok="switchMarker('c13')" :class="{'cut-active':c13}"><div></div><span>光交</span></viewTemplate>
      </div>
    </div>
    <div class="hot-map-cut-div" :class="{'hot-map-cut-div-active':hotMapFlag}">
      <viewTemplate viewId="0701" @ok="switchHot('h01')" :class="{'hot-map-cut-active':h01}">人流量</viewTemplate>
      <viewTemplate viewId="0702" @ok="switchHot('h02')" :class="{'hot-map-cut-active':h02}">话务量</viewTemplate>
      <viewTemplate viewId="0703" @ok="switchHot('h03')" :class="{'hot-map-cut-active':h03}">流量</viewTemplate>
      <viewTemplate viewId="x0704" @ok="switchHot('h04')" :class="{'hot-map-cut-active':h04}">政务网流量</viewTemplate>
      <viewTemplate viewId="x0705" @ok="switchHot('h05')" :class="{'hot-map-cut-active':h05}">政务网上行流量</viewTemplate>
      <viewTemplate viewId="x0706" @ok="switchHot('h06')" :class="{'hot-map-cut-active':h06}">政务网下行流量</viewTemplate>
    </div>
    <div class="artery-div" v-show="c05"></div>
    <div :class="{'hot-map-legend': heatMapType !== 'h01', 'hot-map-legend-h01': heatMapType === 'h01'}" v-show="hotMapFlag">
      <div v-show="heatMapType !== 'h01'">
        <span>0</span>
        <span>{{Math.floor(hotLegend * 1 / 3)}}</span>
        <span>{{Math.floor(hotLegend * 2 / 3)}}</span>
        <span>{{Math.floor(hotLegend)}}({{heatMapUnit}})</span>
      </div>
    </div>
    <div  @keyup.esc="unToolsDiv" @click.stop.self="unToolsDiv" class="gis-tools-div" v-if="toolsDiv">
      <div :is="sLevel" :sLevelData="sLevelData" :mapLayer="mapLayer"></div>
    </div>
  </viewTemplate>
</template>
<script>
  import 'leaflet/dist/leaflet.css';
  import 'leaflet.markercluster/dist/MarkerCluster.css';
  import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
  import './gis.scss'
  import config from '@/config';
  import L from 'leaflet';
  import 'leaflet.markercluster/dist/leaflet.markercluster';
  import HeatMapOverlay from '@/lib/leaflet-heatmap';
  import BocoSplashes from './boco-splashes.js';
  import siteData from './siteData.js';
  import siteTool from './slevel/SiteTool.vue';
  // import OutSiteTool from './slevel/OutSiteTool.vue';
  import hotelTool from './slevel/HotelTool.vue';
  import nodeTool from './slevel/NodeTool.vue';
  // import GPSTools from '@/lib/GPSTools';

  let gsm = require('../../assets/img/gis/marker_gsm.png');
  let lte = require('../../assets/img/gis/marker_lte.png');
  let gsmOut = require('../../assets/img/gis/marker_gsm_out.png');
  let lteOut = require('../../assets/img/gis/marker_lte_out.png');
  let line = require('../../assets/img/gis/marker_line.png');
  let node = require('../../assets/img/gis/marker_node.png');
  let nodeOut = require('../../assets/img/gis/marker_node_out.png');
  let well = require('../../assets/img/gis/marker_well.png');
  let wellOut = require('../../assets/img/gis/marker_well_out.png');
  let hotel = require('../../assets/img/gis/marker_hotel.png');
  let hotelOut = require('../../assets/img/gis/marker_hotel_out.png');
  let man = require('../../assets/img/gis/marker_man.png');
  let call = require('../../assets/img/gis/marker_car_call.png');
  let oil = require('../../assets/img/gis/marker_car_oil.png');
  let repair = require('../../assets/img/gis/marker_car_repair.png');
  let cross = require('../../assets/img/gis/marker_cross.png');
  let crossOut = require('../../assets/img/gis/marker_cross_out.png');

  export default {
    name: 'GisMain',
    data() {
      return {
        map: null,
        layersFlag: true,
        legendFlag: false,
        toolsDiv: false,
        toolsType: null,
        zoomFlag: false,
        lineLayer: {
          line: null,
          artery: null
        },
        sLevelData: {},
        hcf: {
          'h01': {'flag': true, 'data': null, 'max': 0, 'dataId': 'w1013', 'valueKey': null},
          'h02': {'flag': false, 'data': null, 'max': 0, 'dataId': 'w1014', 'valueKey': null},
          'h03': {'flag': false, 'data': null, 'max': 0, 'dataId': 'w1015', 'valueKey': null},
          'h04': {'flag': false, 'data': null, 'max': 0, 'dataId': 'w1037', 'valueKey': null},
          'h05': {'flag': false, 'data': null, 'max': 0, 'dataId': 'w1038', 'valueKey': null},
          'h06': {'flag': false, 'data': null, 'max': 0, 'dataId': 'w1039', 'valueKey': null}
        },
        heatMapLayer: null,
        splashesMapLayer: null,
        heatMapUnit: '%',
        heatMapType: 'h01',
        popup: L.popup({closeButton: false, className: 'gis-popup'}).setContent('<div id="float-tips"></div>'),
        markerId: null,
        oldMarkerId: null,
        mcIndex: 0,
        lcf: {
          'c01': {'markerArr': {}, 'flag': false, 'icon': gsm, 'z_index': 600, 'layer': null, 'dataId': 'w1001', 'data': []},
          'c02': {'markerArr': {}, 'flag': false, 'icon': lte, 'z_index': 600, 'layer': null, 'dataId': 'w1002', 'data': []},
          'c03': {'markerArr': {}, 'flag': false, 'icon': gsmOut, 'z_index': 600, 'layer': null, 'dataId': 'w1003', 'data': []},
          'c04': {'markerArr': {}, 'flag': false, 'icon': lteOut, 'z_index': 600, 'layer': null, 'dataId': 'w1004', 'data': []},
          'c05': {'markerArr': {}, 'flag': false, 'icon': line, 'z_index': 600, 'layer': null, 'dataId': 'w1005', 'data': []},
          'c06': {'markerArr': {}, 'flag': false, 'icon': node, 'z_index': 600, 'layer': null, 'dataId': 'w1006', 'data': []},
          'c07': {'markerArr': {}, 'flag': false, 'icon': well, 'z_index': 600, 'layer': null, 'dataId': 'w1007', 'data': []},
          'c08': {'markerArr': {}, 'flag': false, 'icon': hotel, 'z_index': 600, 'layer': null, 'dataId': 'w1008', 'data': []},
          'c09': {'markerArr': {}, 'flag': false, 'icon': man, 'z_index': 600, 'layer': null, 'dataId': 'w1009', 'data': []},
          'c10': {'markerArr': {}, 'flag': false, 'icon': call, 'z_index': 600, 'layer': null, 'dataId': 'w1010', 'data': []},
          'c11': {'markerArr': {}, 'flag': false, 'icon': oil, 'z_index': 600, 'layer': null, 'dataId': 'w1011', 'data': []},
          'c12': {'markerArr': {}, 'flag': false, 'icon': repair, 'z_index': 600, 'layer': null, 'dataId': 'w1012', 'data': []},
          'c13': {'markerArr': {}, 'flag': false, 'icon': cross, 'z_index': 600, 'layer': null, 'dataId': 'w1016', 'data': []}
        },
        // mapLayer: L.tileLayer('http://mt3.google.cn/vt/lyrs=m@162000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'),
        mapLayer: L.tileLayer(`http://${config.baseMapUrl}/map/tile{s}/?l=1&x={x}&y={y}&z={z}`, { subdomains: '01234' }),
        // gisLayer: L.tileLayer('http://mt3.google.cn/vt/lyrs=y@162000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}')
        gisLayer: L.tileLayer(`http://${config.baseMapUrl}/map/tile{s}/?l=2&x={x}&y={y}&z={z}`, { subdomains: '01234' })
      }
    },
    computed: {
      c01() { return this.lcf['c01']['flag']; },
      c02() { return this.lcf['c02']['flag']; },
      c03() { return this.lcf['c03']['flag']; },
      c04() { return this.lcf['c04']['flag']; },
      c05() { return this.lcf['c05']['flag']; },
      c06() { return this.lcf['c06']['flag']; },
      c07() { return this.lcf['c07']['flag']; },
      c08() { return this.lcf['c08']['flag']; },
      c09() { return this.lcf['c09']['flag']; },
      c10() { return this.lcf['c10']['flag']; },
      c11() { return this.lcf['c11']['flag']; },
      c12() { return this.lcf['c12']['flag']; },
      c13() { return this.lcf['c13']['flag']; },
      h01() { return this.hcf['h01']['flag']; },
      h02() { return this.hcf['h02']['flag']; },
      h03() { return this.hcf['h03']['flag']; },
      h04() { return this.hcf['h04']['flag']; },
      h05() { return this.hcf['h05']['flag']; },
      h06() { return this.hcf['h06']['flag']; },
      hotMapFlag() { return this.hcf['h01']['flag'] || this.hcf['h02']['flag'] || this.hcf['h03']['flag'] || this.hcf['h04']['flag'] || this.hcf['h05']['flag'] || this.hcf['h06']['flag'] },
      hotLegend() {
        let val = 0;
        for (let item in this.hcf) {
          if (this.hcf[item]['flag']) {
            val = this.hcf[item]['max'];
          }
        }
        return val;
      },
      sLevel() {
        if (this.toolsType === 'c01' || this.toolsType === 'c02' || this.toolsType === 'c03' || this.toolsType === 'c04') {
          return siteTool;
        } else if (this.toolsType === 'c08') {
          return hotelTool;
        } else if (this.toolsType === 'c06') {
          return nodeTool;
        }
      },
      cmd() { return this.$store.state.cmdObj; },
      cmdBack() {
        return this.$store.state.cmd_back;
      }
    },
    watch: {
      cmdBack() {
        this.unToolsDiv();
      }
    },
    mounted() {
      this.initMap();
      this.initLine('line');
      this.createSplashes();
      this.createHotMap();
      this.loadGisData30();
      this.loadGisDataInterval();
      this.loadGisData();
    },
    methods: {
      /* 遥控器地图缩放 */
      map_pinch() {
        let level = this.cmd.zoomout;
        let center = this.cmd.centerP;
        if (this.map) {
          this.map.setView(center, level);
        }
      },
      /* 遥控器地图平移 */
      map_panto() {
        let center = this.cmd.centerP;
        if (this.map) {
          this.map.panTo(center);
        }
      },
      /* 遥控器地图点操作 */
      map_operat() {
        let type = this.cmd.type;
        let id = this.cmd.id;
        if (type === 'mapZoom') {
          this.resetMapZoom();
        } else if (type === 'hotCut') {
          this.switchHot(id);
        } else if (type === 'clearLayer') {
          let site = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'];
          for (let item of site) {
            this.clearLayer(item);
            this.lcf[item]['flag'] = false;
          }
          if (!this.hcf['h01']['flag']) {
            this.switchHot('h01');
          }
          if (!this.lineLayer['line']) {
            this.initLine('line');
          }
        } else if (type === 'layerCut') {
          this.switchMarker(id);
          this.map_marker_popup_close();
          if (this.toolsDiv && this.toolsType === id) {
            this.unToolsDiv();
          }
          if (id === 'c05' || id === 'c06') {
            if (this.toolsDiv && this.toolsType !== 'c06') {
              this.unToolsDiv();
            }
          } else {
            if (this.toolsDiv && this.toolsType === 'c06') {
              this.unToolsDiv();
            }
          }
        } else if (type === 'baseLayer') {
          this.switchLayers();
        } else if (type === 'marker') {
          let markerId = this.cmd.markerId;
          let myConfig = this.lcf[id];
          this.markerId = markerId;
          !this.oldMarkerId ? this.oldMarkerId = this.markerId : '';
          let flag = this.oldMarkerId === this.markerId;
          if (flag) {
            let markerObj = myConfig['markerArr'][markerId];
            if (this.mcIndex === 0) {
              let marker = markerObj['marker'];
              let tooltips = markerObj['tooltips'];
              this.map_marker_popup_open(marker, tooltips);
            } else if (this.mcIndex === 1) {
              this.map_marker_popup_close();
              if (id !== 'c01' && id !== 'c02' && id !== 'c06' && id !== 'c08') {
                this.mcIndex = 0;
                this.toolsDiv = false;
                return;
              }
              let int = markerObj['int'];
              this.sLevelData = myConfig['data'][int];
              if (id === 'c01' || id === 'c02' || id === 'c06' || id === 'c08') {
                this.toolsDiv = true;
                this.toolsType = id;
              }
            } else if (this.mcIndex === 2) {
              this.toolsDiv = false;
            }
            this.mcIndex++;
            this.mcIndex >= 3 ? this.mcIndex = 0 : '';
          } else {
            this.oldMarkerId = this.markerId;
            this.mcIndex = 0;
            this.toolsDiv = false;
            this.map_operat();
          }
        }
      },
      map_marker_popup_open(marker, tooltips) {
        this.popup.setLatLng(marker._latlng);
        this.popup.openOn(this.map);
        document.getElementById('float-tips').innerHTML = tooltips;
      },
      map_marker_popup_close() {
        this.popup._close();
      },
      resetMapZoom() {
        this.map.setView([24.497, 118.137], 13);
      },
      unToolsDiv() {
        this.toolsDiv = false;
        this.mcIndex = 0;
      },
      loadData(url, params, callback) {
        this.$http.indi.get(url, params, (res) => {
          if (!res.data || !res.data.data || res.data.data.length <= 0) {
            return;
          }
          callback(res.data.data);
        });
      },
      /**
       * 30秒定时查询
       */
      loadGisData30() {
        // 打点查询
        let siteList = ['c03', 'c04', 'c07', 'c09', 'c10', 'c11', 'c12'];
        siteList.forEach(site => {
          this.lcf[site]['flag'] ? this.loadSiteData(site) : '';
        });
        window.setTimeout(() => { this.loadGisData30() }, 30000);
      },
      /**
       * 定时查询
       */
      loadGisDataInterval() {
        // 热图查询
        let hotMapList = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06'];
        hotMapList.forEach(hot => {
          this.hcf[hot]['flag'] ? this.loadHeatMapData(hot) : '';
        });
      },
      /**
       * 非定时查询
       */
      loadGisData() {
        // 打点查询
        let siteList = ['c01', 'c02', 'c05', 'c06', 'c08', 'c13'];
        siteList.forEach(site => {
          this.lcf[site]['flag'] ? this.loadSiteData(site) : '';
        });
      },
      initMap() {
        this.$store.state.nowGisId = '07';
        this.map = L.map('gis-main', {
          center: [24.497, 118.137],
          zoom: 13,
          attributionControl: false,
          zoomControl: false,
          doubleClickZoom: false,
          layers: this.mapLayer
        });
        this.map.on('moveend', () => {
          if (this.map.getZoom() !== 13) {
            this.zoomFlag = true;
          } else {
            this.zoomFlag = false;
          }
        });
        this.map.addEventListener('click', (obj) => {
          // console.log(obj.latlng);
          // console.log(this.map.getCenter());
          console.log(JSON.stringify([obj.latlng.lat, obj.latlng.lng]) + ',');
          // console.log(`"LONGITUDE": "${obj.latlng.lng}",\n"LATITUDE": "${obj.latlng.lat}"`);
          console.log(this.map.getZoom());
        });
      },
      initLine(type) {
        !this.lineLayer[type] ? this.lineLayer[type] = L.layerGroup().addTo(this.map) : ''; // 初始化图层
        let dataList = siteData[type];
        let dashArray = [];
        if (type === 'line') {
          dashArray = [5, 8];
        } else if (type === 'artery') {
          dashArray = [0, 0];
        }
        for (let item of dataList) {
          L.polyline(item.data, {color: item.color, weight: 5, dashArray: dashArray}).addTo(this.lineLayer[type]);
        }
      },
      clearLine(type) {
        if (this.lineLayer[type]) {
          this.lineLayer[type].clearLayers();
          this.lineLayer[type] = null;
        }
      },
      switchLayers() {
        this.layersFlag = !this.layersFlag;
        if (this.layersFlag) {
          this.map.removeLayer(this.gisLayer);
          this.map.addLayer(this.mapLayer);
        } else {
          this.map.removeLayer(this.mapLayer);
          this.map.addLayer(this.gisLayer);
        }
      },
      switchLegend() {
        this.legendFlag = !this.legendFlag;
        /* if (this.hotMapFlag) {
         // 清除热图
         let hid = ['h01', 'h02', 'h03'];
         for (let item of hid) {
         this.hcf[item]['flag'] = false;
         }
         this.hotMapClear();
         // 恢复热图渲染时关闭的打点
         let site = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12'];
         for (let item of site) {
         this.lcf[item]['flag'] ? this.setLayerData(item) : '';
         }
         } */
      },
      switchMarker(type) {
        let self = this;
        if (self.hotMapFlag) {
          // 清除热图
          let hid = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06'];
          for (let item of hid) {
            this.hcf[item]['flag'] = false;
          }
          this.heatMapType === 'h01' ? this.splashesClear() : this.hotMapClear();
        }
        self.lcf[type]['flag'] = !self.lcf[type]['flag'];
        if (self.lcf[type]['flag']) {
          if (!self.lcf[type]['data'] || self.lcf[type]['data'].length === 0) {
            self.loadSiteData(type);
          } else {
            if (type === 'c09' || type === 'c10' || type === 'c11' || type === 'c12') {
              self.loadSiteData(type);
            } else {
              self.setLayerData(type);
            }
          }
        } else {
          self.clearLayer(type);
        }
        if (type === 'c05' || type === 'c06') {
          this.lineLayer['line'] ? this.clearLine('line') : '';
          let site = ['c01', 'c02', 'c03', 'c04', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'];
          for (let item of site) {
            self.lcf[item]['flag'] = false;
            self.clearLayer(item);
          }
          if (!self.lcf['c05']['flag'] && !self.lcf['c06']['flag']) {
            self.initLine('line');
          }
        } else {
          !this.lineLayer['line'] ? this.initLine('line') : '';
          let site = ['c05', 'c06'];
          for (let item of site) {
            self.lcf[item]['flag'] = false;
            self.clearLayer(item);
          }
        }
      },
      switchHot(type) {
        let site = ['c01', 'c02', 'c03', 'c04', 'c05', 'c06', 'c07', 'c08', 'c09', 'c10', 'c11', 'c12', 'c13'];
        if (this.hcf[type]['flag']) {
          this.hcf[type]['flag'] = false;
          type === 'h01' ? this.splashesClear() : this.hotMapClear();
          // 回复打点
          for (let item of site) {
            this.lcf[item]['flag'] ? this.setLayerData(item) : '';
          }
        } else {
          // 切换热图图例
          let hid = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06'];
          for (let item of hid) {
            this.hcf[item]['flag'] = false;
          }
          // 设置单位
          type === 'h01' ? this.heatMapUnit = '%' : '';
          type === 'h02' ? this.heatMapUnit = 'Erl' : '';
          type === 'h03' ? this.heatMapUnit = 'GB' : '';
          type === 'h04' ? this.heatMapUnit = 'GB' : '';
          type === 'h05' ? this.heatMapUnit = 'GB' : '';
          type === 'h06' ? this.heatMapUnit = 'GB' : '';

          // 清空热图并更改当前热图
          this.heatMapType === 'h01' ? this.splashesClear() : this.hotMapClear();
          type === 'h01' ? this.heatMapType = 'h01' : '';
          type === 'h02' ? this.heatMapType = 'h02' : '';
          type === 'h03' ? this.heatMapType = 'h03' : '';
          type === 'h04' ? this.heatMapType = 'h04' : '';
          type === 'h05' ? this.heatMapType = 'h05' : '';
          type === 'h06' ? this.heatMapType = 'h06' : '';
          this.hcf[type]['flag'] = true;
          // 设置热图数据
          this.setHeatMapData(type);
          // 清空打点
          for (let item of site) {
            this.clearLayer(item);
            this.lcf[item]['flag'] = false;
          }
          // 关闭图层选择
          this.legendFlag = false;
          // console.log('我渲染了一次热图！');
        }
      },
      loadHeatMapData(type) {
        this.loadData(this.hcf[type]['dataId'], null, data => {
          // console.time('本次解析数据消耗时间：');
          let maxValue = 0;
          let valueKey = '';
          let valueKey2 = '';
          if (type === 'h01') {
            let day = new Date().getDay();
            if (day === 0 || day === 6) {
              valueKey = 'weekend_ratio';
              valueKey2 = 'weekend_avg';
            } else {
              valueKey = 'weekday_ratio';
              valueKey2 = 'weekday_avg';
            }
          } else if (type === 'h02') {
            valueKey = 'KPI_VALUE';
          } else if (type === 'h03') {
            valueKey = 'KPI_VALUE';
          } else if (type === 'h04') {
            valueKey = 'KPI_VALUE';
          } else if (type === 'h05') {
            valueKey = 'KPI_VALUE';
          } else if (type === 'h06') {
            valueKey = 'KPI_VALUE';
          }
          for (let i = data.length - 1; i >= 0; i--) {
            if (!data[i]['LONGITUDE'] || isNaN(data[i]['LONGITUDE']) || !data[i]['LATITUDE'] || isNaN(data[i]['LATITUDE']) || !data[i][valueKey] || isNaN(data[i][valueKey])) {
              data.splice(i, 1);
            } else {
              if (type !== 'h01') {
                if (Number(data[i][valueKey]) > maxValue) {
                  maxValue = Number(data[i][valueKey]);
                }
              } else {
                if (!data[i]['usrnum'] || isNaN(data[i]['usrnum']) || Number(data[i]['usrnum']) < 20) {
                  data.splice(i, 1);
                } else {
                  if (Math.abs(data[i][valueKey]) < 75) {
                    data.splice(i, 1);
                  } else {
                    let item = data[i];
                    let label = `小区名称：${item['cell_name']}<br>` +
                                `时间段：${item['shour']}时${item['starttime']}分~${item['ehour']}时${item['endtime']}分<br>` +
                                `当前用户数：${item['usrnum']}人<br>` +
                                `参考用户数：${item[valueKey2]}人<br>` +
                                `增幅：${Number(item[valueKey]).toFixed(2)}%`;
                    data[i]['_value'] = Math.abs(item[valueKey]);
                    data[i]['label'] = label;
                  }
                }
              }
            }
          }
          this.hcf[type]['valueKey'] = valueKey;
          // this.hcf[type]['data'] = data;
          // GPSTools.gpsToGoogle(data, 'LATITUDE', 'LONGITUDE');
          // console.timeEnd('本次解析数据消耗时间：');
          if (type === 'h01') {
            // this.hcf[type]['max'] = 100;
            this.renderSplashes(data, type);
          } else {
            if (type === 'h02') {
              this.hcf[type]['max'] = 100;
            } else if (type === 'h03') {
              this.hcf[type]['max'] = 5;
            } else if (type === 'h04' || type === 'h05' || type === 'h06') {
              this.hcf[type]['max'] = 5;
            }
            this.renderHotMap(data, this.hcf[type]['max'], type);
          }
        });
      },
      loadSiteData(type) {
        let self = this;
        self.loadData(self.lcf[type]['dataId'], null, (data) => {
          if (type !== 'c05') {
            for (let i = data.length - 1; i >= 0; i--) {
              if (!data[i]['LONGITUDE'] || isNaN(data[i]['LONGITUDE']) || !data[i]['LATITUDE'] || isNaN(data[i]['LATITUDE'])) {
                data.splice(i, 1);
              }
            }
            // self.lcf[type]['data'] = this.removeSameLatLon(data);
            // if (type === 'c01' || type === 'c02' || type === 'c03' || type === 'c04' || type === 'c06' || type === 'c09') {
            //   GPSTools.gpsToGoogle(data, 'LATITUDE', 'LONGITUDE');
            // }
            self.lcf[type]['data'] = data;
            self.setLayerData(type);
          } else {
            !this.lineLayer['artery'] ? this.lineLayer['artery'] = L.layerGroup().addTo(this.map) : ''; // 初始化图层
            for (let i = data.length - 1; i >= 0; i--) {
              let item = data[i];
              let color = '#33FF77';
              if (item[0]['type'] === '国干光缆') {
                color = '#FF3333';
              } else if (item[0]['type'] === '省干光缆') {
                color = '#33BBFF';
              } else if (item[0]['type'] === '核心层光缆') {
                color = '#33FF77';
              }
              // GPSTools.gpsToGoogleForList(item[0].data);
              L.polyline(item[0].data, {color: color, weight: 5}).addTo(this.lineLayer['artery']);
            }
          }
        });
      },
      setHeatMapData(type) {
        this.loadHeatMapData(type);
//        if (!this.hcf[type]['data'] || this.hcf[type]['data'].length === 0) {
//          this.loadHeatMapData(type);
//        } else {
//          this.renderHotMap(this.hcf[type]['data'], this.hcf[type]['max'], type);
//        }
      },
      setLayerData(type) {
        if (type !== 'c05') {
          let self = this;
          let myConfig = self.lcf[type];
          // 初始化图层
          if (!myConfig['layer']) {
            if (type === 'c01' || type === 'c02' || type === 'c03' || type === 'c04') {
              myConfig['layer'] = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: 80,
                iconCreateFunction: (cluster) => {
                  let childCount = cluster.getChildCount();
                  let c = ' marker-cluster-';
                  let size = 40;
                  if (type === 'c01') {
                    c += 'medium';
                  } else if (type === 'c02') {
                    c += 'small';
                  } else if (type === 'c03') {
                    c += 'gsm-out';
                    size = 48;
                  } else if (type === 'c04') {
                    c += 'lte-out';
                    size = 48;
                  }
                  return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster' + c,
                    iconSize: new L.Point(size, size)
                  });
                }
              }).addTo(this.map);
            } else if (type === 'c06') {
              myConfig['layer'] = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: 80,
                iconCreateFunction: (cluster) => {
                  let childCount = cluster.getChildCount();
                  return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster-node',
                    iconSize: new L.Point(48, 48)
                  });
                }
              }).addTo(this.map);
            } else if (type === 'c07') {
              myConfig['layer'] = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: 80,
                iconCreateFunction: (cluster) => {
                  let childCount = cluster.getChildCount();
                  return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster-well',
                    iconSize: new L.Point(48, 48)
                  });
                }
              }).addTo(this.map);
            } else if (type === 'c09') {
              myConfig['layer'] = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: 80,
                iconCreateFunction: (cluster) => {
                  let childCount = cluster.getChildCount();
                  return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster-man',
                    iconSize: new L.Point(48, 48)
                  });
                }
              }).addTo(this.map);
            } else if (type === 'c13') {
              myConfig['layer'] = L.markerClusterGroup({
                showCoverageOnHover: false,
                maxClusterRadius: 80,
                iconCreateFunction: (cluster) => {
                  let childCount = cluster.getChildCount();
                  return new L.DivIcon({
                    html: '<div><span>' + childCount + '</span></div>',
                    className: 'marker-cluster-cross',
                    iconSize: new L.Point(48, 48)
                  });
                }
              }).addTo(this.map);
            } else {
              myConfig['layer'] = L.layerGroup().addTo(this.map);
            }
          }
          this._updateMarkerData(type);
        } else {
          this.initLine('artery');
        }
      },
      _updateMarkerData(type) {
        let myConfig = this.lcf[type];
        let validData = myConfig['data'];
        myConfig['layer'].clearLayers();
        let zIndex = myConfig['z_index'];
        for (let i = 0; i < validData.length; i++) {
          let iconUrl = myConfig['icon'];
          if (type === 'c06') {
            validData[i]['IS_ALARM'] ? iconUrl = nodeOut : '';
          }
          if (type === 'c07') {
            (validData[i]['STATUS'] !== '正常' && validData[i]['STATUS'] !== '在线') ? iconUrl = wellOut : '';
          }
          if (type === 'c08') {
            validData[i]['IS_ALARM'] ? iconUrl = hotelOut : '';
          }
          if (type === 'c13') {
            validData[i]['STATUS'] !== '正常' ? iconUrl = crossOut : '';
          }
          let marker = L.marker([validData[i].LATITUDE, validData[i].LONGITUDE], {
            icon: L.icon({
              iconUrl: iconUrl,
              iconSize: [48, 48]
            }),
            zIndexOffset: zIndex,
            attributes: {
              type: type
            }
          }).addTo(myConfig['layer']);
          let site = validData[i];
          let siteName = validData[i].ZH_LABEL;
          marker.addEventListener('click', obj => {
            let type = obj.target.options.attributes.type;
            if (type === 'c01' || type === 'c02' || type === 'c03' || type === 'c04' || type === 'c06' || type === 'c08') {
              this.toolsDiv = true;
              this.toolsType = type;
            }
            this.sLevelData = site;
          });
          let tooltips = null;
          if (type === 'c01' || type === 'c02' || type === 'c03' || type === 'c04') {
            tooltips = `名称：${!siteName ? '-' : siteName}<br>类型：${site['SITE_TYPE']}<br>状态：${site['SITE_STATE']}`;
          } else if (type === 'c06') {
            tooltips = `名称：${site['ZH_LABEL']}<br>类型：${site['TYPE']}<br>维护单位：${site['WHBZ']}<br>联系方式：${site['PHONE']}`;
          } else if (type === 'c07') {
            tooltips = `名称：${site['name']}<br>状态：${site['STATUS']}<br>时间：${site['START_TIME'] ? site['START_TIME'] : '-'}`;
          } else if (type === 'c08') {
            tooltips = `名称：${site['ZH_LABEL']}<br>类型：${site['HOTEL_TYPE'] ? site['HOTEL_TYPE'] : ''}<br>维护单位：${site['HOTEL_MAINTAIN']}<br>联系方式：${site['HOTEL_MOBILE']}`;
          } else if (type === 'c09') {
            tooltips = `姓名：${site['NAME']}<br>归属：${site['GUISHU']}<br>联系方式：${site['MOBILE']}`;
          } else if (type === 'c10') {
            tooltips = `车辆类型：应急通信车<br>车辆牌照：${site['PLATE']}<br>联系人：${site['NAME']}<br>联系方式：${site['MOBILE']}`;
          } else if (type === 'c11') {
            tooltips = `车辆类型：应急油机车<br>车辆牌照：${site['PLATE']}<br>联系人：${site['NAME']}<br>联系方式：${site['MOBILE']}`;
          } else if (type === 'c12') {
            tooltips = `车辆类型：应急抢修车<br>车辆牌照：${site['PLATE']}<br>联系人：${site['NAME']}<br>联系方式：${site['MOBILE']}`;
          } else if (type === 'c13') {
            tooltips = `名称：${site['NAME']}<br>时间：${site['START_TIME'] ? site['START_TIME'] : '-'}<br>状态：${site['STATUS']}`;
          }
          if (type === 'c03' || type === 'c04' || type === 'c06' || type === 'c07' || type === 'c08' || type === 'c09' || type === 'c10' || type === 'c11' || type === 'c12') {
            let intId = validData[i]['INT_ID'] ? validData[i]['INT_ID'] : '';
            let markerId = type + '_' + intId + '_' + validData[i].LATITUDE + '_' + validData[i].LONGITUDE;
            myConfig['markerArr'][markerId] = {};
            myConfig['markerArr'][markerId]['marker'] = marker;
            myConfig['markerArr'][markerId]['int'] = i;
            myConfig['markerArr'][markerId]['tooltips'] = tooltips;
          }
          marker.addEventListener('mouseover', (obj) => {
            this.popup.setLatLng(obj.latlng);
            this.popup.openOn(this.map);
            document.getElementById('float-tips').innerHTML = tooltips;
          });
          marker.addEventListener('mouseout', () => {
            this.popup._close();
            this.mcIndex = 0;
          });
        }
      },
      removeSameLatLon(latLon) {
        if (!latLon || latLon.length === 0) {
          return;
        }
        function newCroObj(obj) {
          let item = {};
          for ( let p in obj) {
            item[p] = obj[p];
          }
          return item;
        }
        let latLonArray = [];
        for (let item of latLon) {
          latLonArray.push(newCroObj(item));
        }
        let result = [latLonArray[latLonArray.length - 1]];
        let tempObj = result[result.length - 1];

        for (let i = latLonArray.length - 1; i > -1; i--) {
          let obj = latLonArray[i];
          if (tempObj.LATITUDE === obj.LATITUDE && tempObj.LONGITUDE === obj.LONGITUDE) {
            latLonArray.splice(i, 1);
          }
          if (i === 0) {
            i = latLonArray.length;
            if (i === 0) {
              break;
            }
            result.push(latLonArray[latLonArray.length - 1]);
            tempObj = result[result.length - 1];
          }
        }
        return result;
      },
      clearLayer(type) {
        if (type === 'c05') {
          this.clearLine('artery');
        } else {
          let myConfig = this.lcf[type];
          if (myConfig['layer']) {
            try {
              myConfig['layer'].clearLayers();
            } catch (e) {
              myConfig['layer'].onRemove(this.map);
              myConfig['layer'] = null;
            }
          }
          if (myConfig['markerArr']) {
            myConfig['markerArr'] = {};
          }
        }
      },
      createSplashes() {
        this.splashesMapLayer = new BocoSplashes({
          radius: 50,
          gradient: [
            { min: 75, max: 100, color: 'rgba(255,220,82,.6)' },
            { min: 100, color: 'rgba(255,51,51,.6)' }
          ],
          latField: 'LATITUDE',
          lngField: 'LONGITUDE',
          valueField: 'KPI_VALUE'
        }).addTo(this.map);
      },
      renderSplashes(data) {
        if (!data || data.length === 0) {
          return;
        }
        this.splashesMapLayer.setOption({
          radius: 0.001,
          maxRadius: 40,
          scaleRadius: true,
          radiusDiv: 0.003,
          maxDivRadius: 80,
          scaleRadiusDiv: true,
          gradient: [
            { min: 75, max: 100, color: 'rgba(255,178,102,.7)' },
            { min: 100, max: 200, color: 'rgba(255,51,51,.7)' },
            { min: 200, color: 'rgba(139,0,0,.7)' }
          ],
          latField: 'LATITUDE',
          lngField: 'LONGITUDE',
          labelField: 'label',
          valueField: '_value'
        });
        this.splashesMapLayer.setData(data);
      },
      splashesClear() {
        if (this.splashesMapLayer) {
          this.splashesMapLayer.clear();
        }
      },
      createHotMap() {
        this.heatMapLayer = new HeatMapOverlay({
          radius: 50,
          blur: 0,
          maxOpacity: 1,
          minOpacity: 0,
          gradient: {
            '0.4': 'rgb(7,254,85)',
            '0.6': 'rgb(255,211,54)',
            '0.8': 'rgb(255,157,74)',
            '1': 'rgb(255,102,104)'
          },
          latField: 'LATITUDE',
          lngField: 'LONGITUDE',
          valueField: 'KPI_VALUE'
        }).addTo(this.map);
      },
      renderHotMap(data, max, type) {
        if (!data || data.length === 0) {
          return;
        }
        if (type === 'h01') {
          // 人流量颜色配置
          this.heatMapLayer.setOption({
            radius: 40,
            blur: 0,
            maxOpacity: 0.8,
            minOpacity: 0.2,
            gradient: {
              '0': 'rgb(7,254,85)',
              '0.5': 'rgb(7,254,85)',
              '0.501': 'rgb(249,223,52)',
              '0.75': 'rgb(249,223,52)',
              '0.751': 'rgb(255,175,67)',
              '0.991': 'rgb(255,175,67)',
              '1': 'rgb(253,103,102)'
            },
            latField: 'LATITUDE',
            lngField: 'LONGITUDE',
            valueField: this.hcf[type]['valueKey']
          });
          max = 100;
        }
        if (type === 'h02' || type === 'h03' || type === 'h04' || type === 'h05' || type === 'h06') {
          // 话务量颜色配置
          this.heatMapLayer.setOption({
            radius: 30,
            blur: 1,
            maxOpacity: 0.8,
            minOpacity: 0.2,
            gradient: {
              '0': 'rgb(82,255,82)',
              '0.25': 'rgb(82,255,82)',
              '0.251': 'rgb(255,255,82)',
              '0.5': 'rgb(255,255,82)',
              '0.51': 'rgb(255,153,102)',
              '0.75': 'rgb(255,153,102)',
              '0.751': 'rgb(255,102,102)',
              '1': 'rgb(255,102,102)'
            },
            latField: 'LATITUDE',
            lngField: 'LONGITUDE',
            valueField: this.hcf[type]['valueKey']
          });
        }
        this.heatMapLayer.setData({
          data: data,
          max: max
        });
      },
      hotMapClear() {
        this.heatMapLayer.setData({
          data: [],
          max: 0
        });
      }
    },
    components: {
      siteTool,
      hotelTool,
      nodeTool
    },
    beforeDestroy() {
      this.map.remove();
      this.map = null;
    }
  }
</script>
