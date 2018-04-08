<!--阶段场景GIS地图-->
<template>
  <viewTemplate class="fake-gis" :interval = "30" @interval = "loadData">
    <div :class="'fake-gis-main-'+ currentMapIndex" >
      <div id='baseBox'>

      </div>
      <div id='villageBox'>

      </div>
      <div id="img-gis" style="position: absolute;width: 100%;height:100%;">

      </div>
      <div id="tooltip" style='position:absolute;width:200px;height:auto;display:flex;background:rgba(0,0,0,0.5);border-radius:6px;color:#fff;z-index:201;display:none'></div>
<!--      <img :style="currentPoint.site1" src='../../../../assets/img/venues/points/2G.png'  @click.stop='showAreaBase' data-flag='0'/>
      &lt;!&ndash;   <div class="area_tig" style="position:absolute;left:671px;top:205px; z-index:100;">4</div>&ndash;&gt;
      <img :style="currentPoint.site2" src='../../../../assets/img/venues/points/4G.png'  @click.stop='showAreaBase' data-flag='0'/>
      &lt;!&ndash;  <div class="area_tig" style="position:absolute;left:771px;top:705px; z-index:100;">4</div>&ndash;&gt;
      <img :style="currentPoint.site3" src='../../../../assets/img/venues/points/4G.png'  @click.stop='showAreaBase' data-flag='0'/>
      &lt;!&ndash;<div class="area_tig" style="position:absolute;left:571px;top:405px; z-index:100;">4</div>&ndash;&gt;
      <div class='gzzIcon' @click.stop='showBase' :style="currentPoint.site4" data-flag='0'>
        <img class='gzzImg' src='../../../../assets/img/venues/points/gzz.png' /><span class='icon-div-label'>3</span>
      </div>
      <div class='gzzIcon' @click.stop='showBase' :style="currentPoint.site5" data-flag='0'>
        <img class='gzzImg ' src='../../../../assets/img/venues/points/gzz.png' /><span class='icon-div-label '>3</span>
      </div>-->
    </div>
  </viewTemplate>
</template>
<style>
  .fake-gis {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .fake-gis-main-0 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/map-bg-0.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .fake-gis-main-1 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/map-bg-1.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .fake-gis-main-2 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/map-bg-2.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .fake-gis-main-3 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/map-bg-3.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .fake-gis-main-4 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/map-bg-4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .fake-gis-main-5 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/map-bg-5.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .fake-gis-main-6 {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/map-bg-6.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  #baseBox {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .base_2g {
    width: 42px;
    height: 42px;
    position:absolute;
    z-index:7;
    border:none;
    background-image: url("../../../../assets/img/venues/points/2G.png");
  }
  .protectionIcon{
    width: 32px;
    height: 42px;
    position: absolute;
    z-index: 4;
    background-image: url("../../../../assets/img/venues/stagescene/ensure-person.png");
  }
  .emerCarIcon {
    width: 48px;
    height: 48px;
    position: absolute;
    z-index: 4;
    background-image: url("../../../../assets/img/venues/points/comvan.png");
  }
  .base_4g {
    width: 32px;
    height: 40px;
    position:absolute;
    z-index:7;
    background-image: url("../../../../assets/img/venues/points/4G.png");
  }
  #villageBox {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .gzzIcon {
    position: absolute;
    width: 40px;
    height: 50px;
    z-index:7;
  }

  .gzzImg {
    width: 32px;
    height: 42px;
    background-image: url("../../../../assets/img/venues/stagescene/gzz_sml.png");
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

  .baseSite {
    position: absolute;
  }
  .base-bg{
    background-color: #000;
  }
  .areaSite {
    position: absolute;
  }
  .area_tig {
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
</style>
<script>
  export default {
    name: 'FakeGis',
    props: {
      sceneName: {
        type: String
      },
      areaId: Number
    },
    data() {
      return {
        markerMap: {}, // 存放每个基站下所有小区信息
        currentMapIndex: 1,
        url: null,
        url2: null
      }
    },
    watch: {
      sceneName(val) {
        document.getElementById('baseBox').innerHTML = '';
        document.getElementById('villageBox').innerHTML = '';
        switch (val) {
          case '国际会议展览中心':
            this.currentMapIndex = 0;
            break;
          case '国际会议中心':
            this.currentMapIndex = 1;
            break;
          case '国际会展酒店':
            this.currentMapIndex = 2;
            break;
          case '海悦山庄酒店':
            this.currentMapIndex = 3;
            break;
          case '闽南大戏院':
            this.currentMapIndex = 4;
            break;
          case '厦门高崎国际机场':
            this.currentMapIndex = 5;
            break;
          case '市政府':
            this.currentMapIndex = 6;
            break;
        }
        this.url = 'area_' + this.areaId;
        this.url2 = 'site_' + this.areaId;
        this.loadData();
      }
    },
    mounted() {
      let self = this;
      // 小区打点
      window.areaDot = function(e, angleFather, x, y, siteId) {
        let data = self.markerMap[siteId]['cellInfo']; //  获取每个基站下的所有小区
        let cellClass = self.markerMap[siteId]['cellClass'];
        if (e.getAttribute('village_flag') === '0') {
          e.setAttribute('village_flag', '1');
          // let x = e.offsetLeft;
          // let y = e.offsetTop;
          let /* 共址站个数 */ pointNum = data.length;
          /* 角度列表 */
          let angleList = [];
          /* 半径 */
          let r;
          // var Icon = '';
          let str = '';
          let radian = 160;
          let flag = false;
          r = (50) / (Math.sin((180 / pointNum) * (Math.PI * 2 / 360)));
          if (pointNum === 1) {
            r = 70;
          }
          if (r < 150) {
            r = 70;
          }
          if (flag) {
            let divWidth = document.getElementById('villageBox').offsetWidth;
            let divHeigh = document.getElementById('villageBox').offsetHeight;
            // 计算开始角度，使打点朝着面积最大的一个方向
            let minX = x < (divWidth - x) ? x : (divWidth - x);
            let minY = y < (divHeigh - y) ? y : (divHeigh - y);
            let minR = minX < minY ? minX : minY;
            switch (minR) {
              case x:
                angleFather = 0;
                break;
              case (divWidth - x):
                angleFather = 180;
                break;
              case y:
                angleFather = 90;
                break;
              case (divHeigh - y):
                angleFather = 270;
                break;
              default:
                break;
            }
            // 计算最大半径
            let maxR;
            switch (angleFather) {
              case 0:
                maxR = (divWidth - x) < (y < (divHeigh - y) ? y : (divHeigh - y)) ? (divWidth - x) : (y < (divHeigh - y) ? y : (divHeigh - y));
                break;
              case 90:
                maxR = ((divHeigh - y) < (x < (divWidth - x) ? x : (divWidth - x)) ? (divHeigh - y) : (x < (divWidth - x) ? x : (divWidth - x))) - 64;
                break;
              case 180:
                maxR = x < (y < (divHeigh - y) ? y : (divHeigh - y)) ? x : (y < (divHeigh - y) ? y : (divHeigh - y));
                break;
              case 270:
                maxR = y < (x < (divWidth - x) ? x : (divWidth - x)) ? y : (x < (divWidth - x) ? x : (divWidth - x));
                break;
              default:
                break;
            }
            if (r > maxR) {
              r = maxR;
            }
          }

          if (pointNum > 6) {
            radian = 180;
          }
          let startAngle = (angleFather - radian / 2) < 0 ? (360 - radian / 2 + angleFather) : (angleFather - radian / 2);
          for (let i = 0; i < pointNum; i++) {
            // angleList.push(i * (180 / pointNum));
            let angle = (startAngle + i * (radian / pointNum)) < 360 ? (startAngle + i * (radian / pointNum)) : (startAngle + i * (radian / pointNum) - 360);
            angleList.push(angle);
          }
          angleList.forEach(function(e, n) {
            let pX;
            let pY;
            pX = x + r * Math.cos(e * (Math.PI * 2 / 360));
            pY = y + r * Math.sin(e * (Math.PI * 2 / 360));
            let rangeAngle = e + 180;
            str += '<div class="areaSite map-area-site" style="position: absolute;width:' + r + 'px;height:' + r + 'px;left:' + (x - r + 20) + 'px;top:' + (y - r + 30) +
              'px;border-bottom:2px solid #02f924;transform-origin: right bottom;transform: rotate(' + rangeAngle + 'deg);z-index: 6;"></div>';
            str += '<div class="areaSite" style="width:' + 2 * r + 'px;height:' + 2 * r + 'px;left:' + (x - r + 20) + 'px;top:' + (y - r + 30) + 'px;border-radius: 100%;z-index: 6;"></div>';
            str += '<img onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)" partName ="' + data[n].CELL_NAME + '" id="areaSite_id_' + data[n].SITE_ID + '" class="areaSite  marker-2-5" src=' + require('../../../../assets/img/venues/stagescene/' + cellClass + 'part.png') + ' style="left:' + pX + 'px;top:' + pY + 'px;z-index: 9;">';
            document.getElementById('villageBox').innerHTML = str;
          });
          // document.getElementById('villageBox').innerHTML += '<div class="area_tig" style="position: absolute;left:' + (x + 21) + 'px; top:' + (y - 5) + 'px;z-index: 7;">' + pointNum + '</div>';
        } else {
          e.setAttribute('village_flag', '0');
          document.getElementById('villageBox').innerHTML = '';
        }
      }
      window.showToolTip = function(e) {
        let tooltip = document.getElementById('tooltip');
        let x = e.getAttribute('style').split(';')[0].split(':')[1].replace('px', '');
        tooltip.style.left = (parseInt(x) + 40) + 'px';
        tooltip.style.top = e.getAttribute('style').split(';')[1].split(':')[1];
        tooltip.style.textAlign = 'center';
        tooltip.innerHTML = e.getAttribute('partName');
        tooltip.style.display = 'block';
      }
      window.hideToolTip = function(e) {
        let tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
      }
    },
    methods: {
      gzzInfo(data, x, y, that) {
        let self = this;
        let /* 共址站个数 */ pointNum = data.length;
        /* 角度列表 */
        let angleList = [];
        /* 半径 */
        let r;
        for (let i = 0; i < pointNum; i++) {
          angleList.push(i * (360 / pointNum));
        }
        r = (78 / 2) / (Math.sin((180 / pointNum) * (Math.PI * 2 / 360)));
        if (pointNum === 1) {
          r = 120;
        }
        if (r < 120) {
          r = 120;
        }
        angleList.forEach(function(e, n) {
          let pX;
          let pY;
          let str = '';
          pX = x + r * Math.cos(e * (Math.PI * 2 / 360));
          pY = y + r * Math.sin(e * (Math.PI * 2 / 360));
          let rangeAngle = e;
          if (pointNum % 2 !== 0) {
            rangeAngle = e + (180 / pointNum);
          }
          str += '<div  class="baseSite map-gzz-site" style="position: absolute;width:' + r + 'px;height:' + r + 'px;left:' + (x - r + 20) + 'px;top:' + (y - r + 30) +
            'px;border-bottom:2px solid #02f924;transform-origin: right bottom;transform: rotate(' + rangeAngle + 'deg);z-index: 5;"></div>';
          str += '<div id="baseSite" class="baseSite map-gzz-site base-bg" style="width:' + 2 * r + 'px;height:' + 2 * r + 'px;left:' + (x - r + 20) + 'px;top:' + (y - r + 30) + 'px;opacity: 0.2;border-radius: 100%;z-index: 5;"></div>';
          str += '<img onclick="areaDot(this, ' + e + ',' + pX + ',' + pY + ',' + data[n].SITE_ID + ')" village_flag="0"   id="site_id_' + data[n].SITE_ID + '" class="baseSite map-gzz-site marker-2-5" src=' + require('../../../../assets/img/venues/points/' + data[n].SITE_CLASS + '.png') + ' style="left:' + pX + 'px;top:' + pY + 'px;z-index: 7;">';
          document.getElementById('baseBox').innerHTML += str;
        });
        data.forEach((item) => {
          self.markerMap[item.SITE_ID] = {
            'cellInfo': item.CELL_INFOS,
            'cellClass': item.SITE_CLASS
          };
        });
      },
      showBase(e, siteInfo) {
        document.getElementById('baseBox').innerHTML = '';
        document.getElementById('villageBox').innerHTML = '';
        if (e.currentTarget.getAttribute('data-flag') === '0') {
          e.currentTarget.setAttribute('data-flag', '1');
          let data1 = siteInfo;
          let x = Number((e.currentTarget.style.left).split('p')[0]);
          let y = Number((e.currentTarget.style.top).split('p')[0]);
          this.gzzInfo(data1, x, y, e)
        } else {
          e.currentTarget.setAttribute('data-flag', '0');
          document.getElementById('baseBox').innerHTML = '';
          document.getElementById('villageBox').innerHTML = '';
          this.markerMap = {};
        }
      },
      areaInfo(data, x, y, that, siteClass) {
        let /* 共址站个数 */ pointNum = data.length;
        /* 角度列表 */
        let angleList = [];
        /* 半径 */
        let r;
        let str = '';
        let angleFather = 30;
        let radian = 180;
        let startAngle = (angleFather - radian / 2) < 0 ? (360 - radian / 2 + angleFather) : (angleFather - radian / 2);
        for (let i = 0; i < pointNum; i++) {
          // angleList.push(i * (180 / pointNum));
          let angle = (startAngle + i * (radian / pointNum)) < 360 ? (startAngle + i * (radian / pointNum)) : (startAngle + i * (radian / pointNum) - 360);
          angleList.push(angle);
        }
        r = (50) / (Math.sin((180 / pointNum) * (Math.PI * 2 / 360)));
        if (pointNum === 1) {
          r = 70;
        }
        if (r < 120) {
          r = 70;
        }
        angleList.forEach(function(e, n) {
          let pX;
          let pY;
          pX = x + r * Math.cos(e * (Math.PI * 2 / 360));
          pY = y + r * Math.sin(e * (Math.PI * 2 / 360));
          let rangeAngle = e + 180;
          str += '<div  class="baseSite map-gzz-site" style="position: absolute;width:' + r + 'px;height:' + r + 'px;left:' + (x - r + 20) + 'px;top:' + (y - r + 30) +
            'px;border-bottom:2px solid #02f924;transform-origin: right bottom;transform: rotate(' + rangeAngle + 'deg);z-index: 5;"></div>';
          str += '<div id="baseSite" class="baseSite map-gzz-site base-bg" style="width:' + 2 * r + 'px;height:' + 2 * r + 'px;left:' + (x - r + 20) + 'px;top:' + (y - r + 30) + 'px;opacity: 0.2;border-radius: 100%;z-index: 5;"></div>';
          str += '<img onmouseover="showToolTip(this)" onmouseout="hideToolTip(this)" partName ="' + data[n].CELL_NAME + '" id="site_id_' + data[n].CELL_ID + '" class="baseSite map-gzz-site marker-2-5" src=' + require('../../../../assets/img/venues/stagescene/' + siteClass + 'part.png') + ' style="left:' + pX + 'px;top:' + pY + 'px;z-index: 7;">';
          document.getElementById('baseBox').innerHTML = str;
        });
      },
      loadData() {
        document.getElementById('img-gis').innerHTML = '';
        document.getElementById('baseBox').innerHTML = '';
        document.getElementById('villageBox').innerHTML = '';
        // 加载应急车和保障人员
        this.showPeopleCar();
        // 加载2G 4G 共址站 打点
        this.$http.indi.get(this.url2, {}, (res) => {
          let self = this;
          let newData = self.filterData(res.data.data);
          for (let key in newData) {
            let /* 基站list */ siteList = newData[key];
            if (siteList.length === 1 && siteList[0].SITE_CLASS && siteList[0].SITE_CLASS !== 'null') {
              let /* 基站信息 */ siteInfo = siteList[0];
              let x = siteList[0].POINT_X * (1952 / 2440);
              let y = siteList[0].POINT_Y * (885 / 1120);
              let icon = 'base_2g';
              if (siteInfo.SITE_CLASS === '4G') {
                icon = 'base_4g';
              }
              // let str = '<img onclick="showAreaBase(this)" data-flag="0"  src=' + require('../../../../assets/img/venues/points/' + siteInfo.SITE_CLASS + '.png') + ' style="width: 32px; height: 40px;position:absolute;left:' + x + 'px;top:' + y + 'px; z-index:100;"/>';
              // 添加 img
              let img = document.createElement('div');
              img.style = 'left:' + x + 'px;top:' + y + 'px;';
              img.setAttribute('class', icon);
              img.setAttribute('data-flag', '0');
              // document.getElementById('img-gis').innerHTML += str;
              document.getElementById('img-gis').appendChild(img);
              img.onclick = function( e = img, info = siteInfo.CELL_INFOS, siteClass = siteInfo.SITE_CLASS) {
                self.showAreaBase(e, info, siteClass);
              }
            } else if (siteList.length > 1) {
              let x = siteList[0].POINT_X * (1952 / 2440);
              let y = siteList[0].POINT_Y * (885 / 1120);
              let gzzDiv = document.createElement('div');
              gzzDiv.setAttribute('class', 'gzzIcon');
              gzzDiv.setAttribute('data-flag', '0');
              gzzDiv.style = 'left:' + x + 'px;top:' + y + 'px;';
              let gzzImg = document.createElement('div');
              gzzImg.setAttribute('class', 'gzzImg');
              let gzzSpan = document.createElement('span');
              gzzSpan.setAttribute('class', 'icon-div-label');
              gzzSpan.innerText = siteList.length;
              gzzDiv.appendChild(gzzImg);
              gzzDiv.appendChild(gzzSpan);
              document.getElementById('img-gis').appendChild(gzzDiv);
              gzzDiv.onclick = function(e = gzzDiv, siteInfo = siteList) {
                self.showBase(e, siteInfo);
              }
            }
          }
        })
      },
      filterData(data) {
        let map = {};
        let tempArr = null;
        data.forEach((item) => {
          if (item.POINT_X !== 'null' && item.POINT_X !== null && item.POINT_Y !== 'null' && item.POINT_Y !== null) {
            let key = 'basePoint' + item.POINT_X + '_' + item.POINT_Y;
            tempArr = map[key];
            if (!tempArr) {
              tempArr = [];
              map[key] = tempArr;
            }
            tempArr.push(item)
          }
        });
        return map;
      },
      showAreaBase(e, info, siteClass) {
        document.getElementById('baseBox').innerHTML = '';
        if (e.currentTarget.getAttribute('data-flag') === '0') {
          e.currentTarget.setAttribute('data-flag', '1');
          let data1 = info;
          let x = Number((e.currentTarget.style.left).split('p')[0]);
          let y = Number((e.currentTarget.style.top).split('p')[0]);
          this.areaInfo(data1, x, y, e, siteClass)
        } else {
          e.currentTarget.setAttribute('data-flag', '0');
          document.getElementById('baseBox').innerHTML = '';
          document.getElementById('villageBox').innerHTML = '';
        }
      },
      showPeopleCar() {
        // 保障人员
        this.$http.indi.get(this.url, {}, (res) => {
          let self = this;
          let protection = res.data.data.SECURITY_PERSONNEL_INFO;
          // 应急车
          let EmerCar = res.data.data.EMERGENCY_VEHICLE_INFO;
          protection.forEach((item) => {
            let x = item.POINT_X * (1952 / 2440);
            let y = item.POINT_Y * (885 / 1120);
            let protectionDiv = document.createElement('div');
            protectionDiv.style = 'left:' + x + 'px;top:' + y + 'px;';
            protectionDiv.setAttribute('class', 'protectionIcon');
            document.getElementById('img-gis').appendChild(protectionDiv);
            protectionDiv.onmouseover = function() {
              document.getElementById('baseBox').innerHTML = '';
              document.getElementById('villageBox').innerHTML = '';
              self.showProtection(item);
            }
            protectionDiv.onmouseout = function() {
              self.hideMessage();
            }
          });
          EmerCar.forEach((item) => {
            let x = item.POINT_X * (1952 / 2440);
            let y = item.POINT_Y * (885 / 1120);
            let carDiv = document.createElement('div');
            carDiv.style = 'left:' + x + 'px;top:' + y + 'px;';
            carDiv.setAttribute('class', 'emerCarIcon');
            document.getElementById('img-gis').appendChild(carDiv);
            carDiv.onmouseover = function() {
              document.getElementById('baseBox').innerHTML = '';
              document.getElementById('villageBox').innerHTML = '';
              self.showEmerCarDiv(item);
            }
            carDiv.onmouseout = function() {
              self.hideMessage();
            }
          });
        });
      },
      showProtection(info) {
        let str = '<div style="margin-left:10px;">姓名：' + info.PEOPLE_NAME + '</div><div style="margin-left:10px;">电话：' + info.TEL_PHONE + '</div>';
        let tooltip = document.getElementById('tooltip');
        tooltip.style.left = info.POINT_X * (1952 / 2440) + 40 + 'px';
        tooltip.style.top = info.POINT_Y * (885 / 1120) + 'px';
        tooltip.style.textAlign = 'left';
        tooltip.innerHTML = str;
        tooltip.style.display = 'block';
      },
      showEmerCarDiv(info) {
        let str = '<div style="margin-left:10px;">车牌号：' + info.RES_NAME + '</div><div style="margin-left:10px;">姓名：' + info.CONTACT_PERSON + '</div><div style="margin-left:10px;">电话：' + info.CONTACT_TEL + '</div>';
        let tooltip = document.getElementById('tooltip');
        tooltip.style.left = info.POINT_X * (1952 / 2440) + 50 + 'px';
        tooltip.style.top = info.POINT_Y * (885 / 1120) + 'px';
        tooltip.style.textAlign = 'left';
        tooltip.innerHTML = str;
        tooltip.style.display = 'block';
      },
      hideMessage() {
        let tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
      }
    },
    components: {

    },
    beforeDestroy() {

    }
  }
</script>
