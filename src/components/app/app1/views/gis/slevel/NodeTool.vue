<!--基站二级-->
<template>
  <div class="gis-tools-div-node">
    <div class="tools-node-title">{{sLevelData.ZH_LABEL}}</div>
    <div class="tools-node-body">
      <div class="node-body-one">
          <div class="one-header">基础信息</div>
          <div class="one-content">
            <div v-for="(val, key) in baseInfo" v-if="key !== 'IS_ALARM'">
              <span>{{key}}</span>
              <span :class ="{alarmHighLight: key === '机房状态' && baseInfo['IS_ALARM'] === true}">{{val}}</span>
            </div>
          </div>
      </div>
      <div class="node-body-two">
        <div class="two-header">维护信息</div>
        <div class="two-content">
          <div v-for="(val, key) in maintainInfo">
            <span>{{key}}</span>
            <span>{{val}}</span>
          </div>
        </div>
      </div>
      <div class="node-body-three">
        <div class="three-header">供电保障能力</div>
        <div class="node-supplyPower"></div>
        <div class="node-supplyPower-title">蓄电池</div>
        <div class="three-content">
          <div v-for="(val, key) in supplyPower">
            <span>{{key}}</span>
            <span>{{val}}</span>
          </div>
        </div>
      </div>
      <div class="node-body-four">
        <div class="four-header">周边保障力量</div>
        <div class="four-content">
          <div id="node-map" style="width: 100%; height: 100%;"></div>
        </div>
      </div>
    </div>
    <div class="node-elements-list">
      <div class="elements-head">
        <span>网元名称</span>
        <span>设备型号</span>
        <span>设备类型</span>
      </div>
      <div class="elements-body">
        <viewTemplate v-for="(item, index) in elementsList"
                      @ok="elementsClick(item.NE_ID, item.DOMAIN, $event)"
                      :viewId="'07c06' + index"
                      :key="index"
                      v-if="index >= (8 * pageNowNum) && index < (8 * (pageNowNum + 1))">
          <span v-if="item.WYMC.replace(/[^\x00-\xff]/g, '**').length <= 23">{{item.WYMC}}</span>
          <span v-else><marquee behavior="alternate" width="100%" direction="right" scrollamount="1">{{item.WYMC}}</marquee></span>
          <span v-if="item.SBXH.replace(/[^\x00-\xff]/g, '**').length <= 12">{{item.SBXH}}</span>
          <span v-else><marquee behavior="alternate" width="100%" direction="right" scrollamount="1">{{item.SBXH}}</marquee></span>
          <span v-if="item.SBLX.replace(/[^\x00-\xff]/g, '**').length <= 10">{{item.SBLX}}</span>
          <span v-else><marquee behavior="alternate" width="100%" direction="right" scrollamount="1">{{item.SBLX}}</marquee></span>
        </viewTemplate>
      </div>
      <div class="elements-foot" v-if="elementsPageNum.length > 1">
        <div @click="pageHand('up')"></div>
        <span v-for="item in elementsPageNum"
              :class="{'elements-foot-active':item === pageNowNum}"
              @click="pageNowNum = item">
        </span>
        <div @click="pageHand('down')"></div>
      </div>
    </div>
    <div class="node-three-leave" v-if="elementsFlag">
      <div>
        <iframe scrolling="no" width="1200" frameborder="0" height="600" :src="iFrameUrl"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-extend-native,camelcase,no-multi-spaces */

  import views from '../../../handleCmd';
  import config from '@/config';
  import L from 'leaflet';
  import hex_md5 from '@/lib/encode_MD5.js';
  let node = require('../../../assets/img/gis/marker_node.png');
  let man = require('../../../assets/img/gis/marker_man.png');
  let call = require('../../../assets/img/gis/marker_car_call.png');
  let oil = require('../../../assets/img/gis/marker_car_oil.png');
  let repair = require('../../../assets/img/gis/marker_car_repair.png');
  export default {
    name: 'HotelTool',
    data() {
      return {
        baseInfo: {
          '传输节点名称': '厦门思明国际NLH1-13',
          '机房CUID': 'MSTP',
          '机房状态': '正常',
          'IS_ALARM': false
        },
        maintainInfo: {
          '维护单位': '特力通',
          '维护班组': '厦门思明第二主城网络特力通维护组1',
          '接口人': '张晓明',
          '联系方式': '13272886273'
        },
        supplyPower: {
          '是否配备油机': '是',
          '油机可发电时长': '1H',
          '可供电时长': '6H'
        },
        elementsList: [],
        // mapLayer: L.tileLayer('http://mt3.google.cn/vt/lyrs=m@162000000&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'),
        mapLayer: L.tileLayer(`http://${config.baseMapUrl}/map/tile{s}/?l=1&x={x}&y={y}&z={z}`, { subdomains: '01234' }),
        map: null,
        elementsFlag: false,
        elementsActiveId: null,
        doMain: null,
        pageNowNum: 0,
        iFrameUrl: 'http://10.209.0.101:8080/netgool/cwarn/dp_index.html?userid=873451&time=2017-04-01?10:27:20&ne_id=590033&domain=592&type=0&token=3c8c1dc9b592225251a0fe799d68bcf'
      }
    },
    props: {
      sLevelData: Object
    },
    computed: {
      elementsPageNum() {
        let list = [];
        for (let i = 0; i < Math.ceil(this.elementsList.length / 8); i++) {
          list.push(i);
        }
        return list;
      }
    },
    mounted() {
      console.log(this.sLevelData);
      this.initMap([this.sLevelData['LATITUDE'], this.sLevelData['LONGITUDE']]);
      this.setData();
      this.$store.state.newViewId = '07c060';
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
      initMap(center) {
        let latLonList = [];
        latLonList.push(center);
        this.map = L.map('node-map', {
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
        L.marker(center, { icon: L.icon({ iconUrl: node, iconSize: [48, 48] }) }).addTo(this.map);
        if (this.sLevelData['ZBZY'] && this.sLevelData['ZBZY'].length !== 0) {
          let zbzyObj = this.sLevelData['ZBZY'][0];
          for (let key in zbzyObj) {
            let icon = null;
            key === 'BZRY' ? icon = man : '';
            key === 'YJTXC' ? icon = call : '';
            key === 'YJYJC' ? icon = oil : '';
            key === 'YJQXC' ? icon = repair : '';
            for (let item of zbzyObj[key]) {
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
          className: 'node-div-icon',
          html: `<span>${distance}米 </span>`
        });
        L.marker(newPoint, { icon: myIcon, zIndexOffset: 800 }).addTo(this.map);
      },
      elementsClick(id, doMain, event) {
        if (id && doMain) {
          this.elementsActiveId = id;
          this.doMain = doMain;
          this.iFrameUrl = this.getIFrameUrl();
        }
        if (event) {
          let node = null;
          for (let item of event.path) {
            if (item.nodeName === 'DIV') {
              node = item;
              break;
            }
          }
          if (node.className === 'elements-active') {
            return;
          }
          let nodes = node.parentNode.childNodes;
          for (let item of nodes) {
            if (item.nodeName === 'DIV') {
              item.className = '';
            }
          }
          node.className = 'elements-active';
        }
        this.elementsFlag = true;
      },
      getIFrameUrl() {
        Date.prototype.Format = function(fmt) {
          var o = {
            'M+': this.getMonth() + 1,
            'd+': this.getDate(),
            'h+': this.getHours(),
            'm+': this.getMinutes(),
            's+': this.getSeconds(),
            'q+': Math.floor((this.getMonth() + 3) / 3),
            'S': this.getMilliseconds()
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
          for (let k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
          }
          return fmt;
        };
        let url = 'http://10.209.0.101:8080/netgool/cwarn/dp_index.html';
        let userid = '873451';
        let time = new Date().Format('yyyy-MM-dd hh:mm:ss');
        let ne_id  = this.elementsActiveId;
        let domain = this.doMain;
        let type = '0';
        let token = hex_md5(userid + time + ne_id + domain + type + 'FJXH');
        url = url + '?userid=' + userid + '&time=' + time + '&ne_id=' + ne_id + '&domain=' + domain + '&type=' + type + '&token=' + token;
        return url;
      },
      pageHand(type) {
        if (type === 'up') {
          this.pageNowNum--;
          this.pageNowNum < 0 ? this.pageNowNum = this.elementsPageNum.length - 1 : '';
        } else if (type === 'down') {
          this.pageNowNum++;
          this.pageNowNum >= this.elementsPageNum.length ? this.pageNowNum = 0 : '';
        }
      },
      setData() {
        this.baseInfo = {
          '传输节点名称': this.sLevelData['ZH_LABEL'],
          '机房CUID': this.sLevelData['RESOURCE_ID'],
          '机房状态': this.sLevelData['IS_ALARM'] ? '异常' : '正常',
          'IS_ALARM': this.sLevelData['IS_ALARM']
        };
        this.maintainInfo = {
          '维护单位': this.sLevelData['MAINTAIN_COMPANY'],
          '维护班组': this.sLevelData['WHBZ'],
          '接口人': this.sLevelData['PERSON_NAME'],
          '联系方式': this.sLevelData['PHONE']
        };
        this.supplyPower = {
          '是否配备油机': this.sLevelData['SFPBYJ'],
          '油机可发电时长': this.sLevelData['YJKFDSC'] ? this.sLevelData['YJKFDSC'] + 'H' : '-',
          '可供电时长': '-'
        };
        this.elementsList = this.sLevelData['WYXX'];
        for (let key in views) {
          if (key !== '07c06' && key.indexOf('07c06') !== -1) {
            delete views[key];
          }
        }
        for (let i = 0; i < this.elementsList.length; i++) {
          let key = '07c06' + i;
          let downKey = '07c06' + (i + 1);
          let upKey = '07c06' + (i - 1);
          if (i === 0) {
            views[key] = {
              opts: {
                down: downKey
              }
            }
          } else if (i === this.elementsList.length - 1) {
            views[key] = {
              opts: {
                up: upKey
              }
            }
          } else {
            views[key] = {
              opts: {
                down: downKey,
                up: upKey
              }
            }
          }
        }
        if (this.sLevelData['BUILDING_ID']) {
          // 蓄电池可供电时长
          this.getIceData('10087', this.sLevelData['BUILDING_ID'], (res) => {
            this.supplyPower['可供电时长'] = res[0]['KPI_VALUE'] ? res[0]['KPI_VALUE'] + 'H' : '-';
          });
        }
      }
    },
    beforeDestroy() {
      if (this.map) {
        this.map.remove();
        this.map = null;
      }
    }
  }
</script>
