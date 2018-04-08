<!--基站二级-->
<template>
  <div id="room-info" class="room-info">
    <viewTemplate class="room-list" v-for="(item, index) in tLevelData"
                  :viewId="'07c08' + index"
                  :key="index"
                  :class="{'room-list-active':activeRoom === ('07c08' + index)}"
                  @ok="roomClick(item.EQUIPMENT, item.DEVICEROOM_CUID)">
      {{item.NAME}}
    </viewTemplate>
    <div class="room-menu" v-show="menuFlag">
      <viewTemplate viewId="07c0800" @ok="menuClick('SB')" :class="{'room-menu-active': menuSbFlag}">机房设备清单</viewTemplate>
      <viewTemplate viewId="07c0801" @ok="menuClick('3D')" :class="{'room-menu-active': menu3DFlag}">机房3D信息</viewTemplate>
    </div>
    <div class="room-last-3D" v-if="lastFlag && menu3DFlag">
      <div>
        <iframe width="1115" height="836" scrolling="no" frameborder="0" :src="iFrameUrl"></iframe>
      </div>
    </div>
    <div class="room-last-Sb" v-if="lastFlag && menuSbFlag">
      <div class="sb-head">
        <span>名称</span>
        <span>数量</span>
      </div>
      <div class="sb-body">
        <div v-for="(item, index) in sBList"
             v-if="index >= (8 * pageNowNum) && index < (8 * (pageNowNum + 1))">
          <span>{{item.OBJECT_CLASS_TEXT}}</span>
          <span>{{item.NUM}}</span>
        </div>
      </div>
      <div class="sb-foot" v-if="sbPageNum.length > 1">
        <div @click="pageHand('up')"></div>
        <span v-for="item in sbPageNum"
              :class="{'sb-foot-active':item === pageNowNum}"
              @click="pageNowNum = item">
          </span>
        <div @click="pageHand('down')"></div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-extend-native,camelcase */

  import hex_md5 from '@/lib/encode_MD5.js';
  export default {
    name: 'HotelThreeLevel',
    data() {
      return {
        sBList: null,
        menuFlag: false,
        menu3DFlag: false,
        menuSbFlag: false,
        lastFlag: false,
        activeRoom: null,
        pageNowNum: 0,
        roomCuId: null,
        iFrameUrl: 'http://10.209.89.204:3000/preview-webgl?userid=44&time=0&Cuid=DEVICEROOM-1895&showtype=1&token=6ff97410735027cd1b0b61002b6ffaa7'
      }
    },
    props: {
      tLevelData: Array
    },
    computed: {
      sbPageNum() {
        let list = [];
        for (let i = 0; i < Math.ceil(this.sBList.length / 8); i++) {
          list.push(i);
        }
        return list;
      },
      oldViewId: function() {
        return this.$store.state.oldViewId
      }
    },
    mounted() {
      // console.log(this.tLevelData);
    },
    methods: {
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
        let url = 'http://10.209.89.204:3000/preview-webgl';
        let userid = '44';
        let time = new Date().Format('yyyy-MM-dd hh:mm:ss');
        let Cuid = this.roomCuId;
        let showtype = '1';
        let token = hex_md5(userid + time + Cuid + showtype + 'FJXH');
        url = url + '?userid=' + userid + '&time=' + time + '&Cuid=' + Cuid + '&showtype=' + showtype + '&token=' + token;
        return url;
      },
      roomClick(id, roomCuId) {
        this.sBList = id;
        this.roomCuId = roomCuId;
        this.activeRoom = this.oldViewId;
        this.menuFlag = true;
        this.menu3DFlag = false;
        this.menuSbFlag = false;
        this.lastFlag = false;
      },
      menuClick(type) {
        if (type === '3D') {
          if (this.menu3DFlag) {
            return;
          }
          this.iFrameUrl = this.getIFrameUrl();
          console.log(this.iFrameUrl);
          this.menu3DFlag = true;
          this.menuSbFlag = false;
        } else if (type === 'SB') {
          if (this.menuSbFlag) {
            return;
          }
          this.menu3DFlag = false;
          this.menuSbFlag = true;
        }
        this.lastFlag = true;
      },
      pageHand(type) {
        if (type === 'up') {
          this.pageNowNum--;
          this.pageNowNum < 0 ? this.pageNowNum = this.sbPageNum.length - 1 : '';
        } else if (type === 'down') {
          this.pageNowNum++;
          this.pageNowNum >= this.sbPageNum.length ? this.pageNowNum = 0 : '';
        }
      }
    },
    beforeDestroy() {
    }
  }
</script>
