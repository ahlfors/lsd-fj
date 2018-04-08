<!-- component template -->
<template>
  <viewTemplate class="table-wrap">
    <div class="table-title">{{activeName}}</div>
    <div class="table-head">
      <div v-for="(item, index) in columns"  @click="sortBy(index, arrowBool, $event)">
        <div class="th-name">
          {{item}}
        </div>
        <div class="asc"></div>
      </div>
    </div>
    <div class="table-body">
      <div class="all-data" v-for="(entry, i) in filteredData" :class = "{'highLight': entry.FLAG}"
           v-if="i >= (pageMaxNum * pageNowNum) && i < (pageMaxNum * (pageNowNum + 1))">
        <div v-for="(item, index) in columnsKey">
          <div v-if="index === 0" class="warn-state" :style="{background:entry[item]===0?'#008000':'#ffa500'}"></div>
          <div v-else :title= "entry[item]">
            <!--<marquee behavior="alternate" width="100%" direction="right" scrollamount="1">-->
             {{entry[item]}}
            <!--</marquee>-->
          </div>
        </div>
      </div>
    </div>
    <div class="table-foot" v-if="pageNum.length > 1">
      <div @click="pageHand('up')"></div>
      <span v-for="item in pageNum"
            :class="{'foot-active':item === pageNowNum}"
            @click="pageNowNum = item">{{item + 1}}</span>
      <div @click="pageHand('down')"></div>
    </div>
  </viewTemplate>
</template>
<script>
export default {
  props: {
    activeNum: Number
  },
  data() {
    return {
      arrowBool: true,
      columns: ['告警状态', '电路名称', 'A端地市', '客户名称', '业务保障等级', '带宽', 'Z端地市'],
      columnsKey: ['ALARM_STATUS', 'CIRCUIT_NO', 'AREGION_NAME', 'CLIENT_NAME', 'SERVICE_LEVEL', 'BANDWIDTH', 'ZREGION_NAME'],
      pageNowNum: 0, // 当前页数
      pageMaxNum: 20, // 每页显示最多的条数
      filteredData: [],
      keyCompany: ['上海浦东发展银行股份有限公司', '中国建设银行股份有限公司', '中国平安保险股份有限公司', '厦门国际银行股份有限公司', '兴业银行股份有限公司信用卡中心', '民生银行', 'ABB(中国)有限公司', '大连万达商业地产股份有限公司', '威瑞森电信', '新加坡电信有限公司', '厦门航空有限公司', '顺丰速运有限公司', '福建省地震局', '国家烟草专卖局', '上海期货交易所', '深圳证券交易所', '交通运输部', '国家海洋局', '中华人民共和国厦门海关', '中国邮政集团公司', '中国外运股份有限公司', '福建中烟工业有限责任公司', '中国移动国际有限公司', '厦门远洋运输公司', '中铁一局集团有限公司']
    }
  },
  computed: {
    pageNum() { // 总页数
      let list = [];
      for (let i = 0; i < Math.ceil(this.filteredData.length / this.pageMaxNum); i++) {
        list.push(i);
      }
      return list;
    },
    activeName() {
      return this.keyCompany[this.activeNum];
    }
  },
  methods: {
    loadData() {
      this.$http.indi.get(['f0301'], {}, (res301) => {
        this.filteredData = res301.data.data;
        // this.resetsetHighLightFlag();
        // this.sortByKeyCompany();
      })
    },
    resetsetHighLightFlag() {
      let tempdata = this.filteredData;
      for (var item of tempdata) {
        item.FLAG = false;
      }
      this.filteredData = tempdata;
    },
    pageHand(type) {
      if (type === 'up') {
        this.pageNowNum--;
        this.pageNowNum < 0 ? this.pageNowNum = this.pageNum.length - 1 : '';
      } else if (type === 'down') {
        this.pageNowNum++;
        this.pageNowNum >= this.pageNum.length ? this.pageNowNum = 0 : '';
      }
    },
    sortBy(val, rev, e) {
      let self = this;
      if (rev) {
        e.target.parentNode.lastChild.className = 'asc';
      } else {
        e.target.parentNode.lastChild.className = 'dsc';
      }
      function sortData(attr, rev) {
        // 第二个参数没有传递 默认升序排列
        if (rev === undefined) {
          rev = 1;
        } else {
          rev = (rev) ? 1 : -1;
        }
        return function(a, b) {
          a = a[self.columnsKey[attr]];
          b = b[self.columnsKey[attr]];
          if (a < b) {
            return rev * -1;
          }
          if (a > b) {
            return rev * 1;
          }
          return 0;
        }
      }
      this.filteredData.sort(sortData(val, rev));
      this.arrowBool = !this.arrowBool;
    },
    sortByKeyCompany() {
      this.resetsetHighLightFlag();
      for (let i = 0; i < this.filteredData.length; i++) {
        if (this.filteredData[i]['COMPANY_NAME'] === this.activeName) {
          let obj = this.filteredData[i];
          obj.FLAG = true;
          this.filteredData.splice(i, 1);
          this.filteredData.unshift(obj);
        }
      }
    }
  },
  watch: {
    activeNum() {
      this.sortByKeyCompany();
    }
  },
  mounted() {
    this.loadData();
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.table-wrap {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  .table-title {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #70c8e5;
  }
  .table-head {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #006083;
    color: #fff;
      >div:nth-of-type(1){
      width: 78px;
    }
    >div:nth-of-type(2){
      width: 225px;
    }
    >div:nth-of-type(3){
      width: 100px;
    }
    >div:nth-of-type(4){
      width: 225px;
    }
    >div:nth-of-type(5){
      width: 110px;
    }
    >div:nth-of-type(6){
      width: 90px;
    }
    >div:nth-of-type(7){
      width: 90px;
    }
    >div {
      width: 110px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .th-name {
        height: 32px;
        width: auto;
        line-height: 32px;
      }
      .asc {
        width: 0px;
        height: 0px;
        margin-bottom: 2px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 10px solid #fff;
        cursor: pointer;
      }
      .dsc {
        width: 0px;
        height: 0px;
        margin-top: 2px;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid #fff;
        cursor: pointer;
      }
    }
  }
  .table-body {
    overflow: auto;
    width: 100%;
    height: 712px;
    >div:nth-child(even){
      background: #004a6f;
      border: 1px dotted #3d7692;
      &.highLight{
        box-shadow: inset 0px 0px 60px #1ade51;
        background-color: rgba(255, 44, 43, 0.1);
      }
    }
    .highLight{
      box-shadow: inset 0px 0px 60px #1ade51;
      background-color: rgba(255, 44, 43, 0.1);
    }
    .all-data {
      width: 100%;
      height: 32px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      >div:nth-of-type(1){
      width: 78px;
    }
    >div:nth-of-type(2){
      width: 225px;
    }
    >div:nth-of-type(3){
      width: 100px;
    }
    >div:nth-of-type(4){
      width: 225px;
    }
    >div:nth-of-type(5){
      width: 110px;
    }
    >div:nth-of-type(6){
      width: 90px;
    }
    >div:nth-of-type(7){
      width: 90px;
    }
      >div {
        width: 110px;
        height: 32px;
        color: #fff;
        line-height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        >.warn-state {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: green;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        >div{
          width: 100%;
          height: 100%;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: help;
        }
      }
    }
  }
  .table-foot {
    position: absolute;
    bottom: 12px;
    width: 100%;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    >div{
      position: relative;
      width: 43px;
      height: 43px;
      top: 4px;
      margin-right: 30px;
      cursor: pointer;
      background-image: url("../../../assets/img/legend/elements-foot-arrow.png");
    }
    >div:nth-of-type(2){
      margin-right: 0px;
      margin-left: 30px;
      top: 1px;
      transform: rotate(-180deg);
    }
    >span{
      width: 20px;
      height: 20px;
      border-radius: 20px;
      margin: 5px 5px 0px 5px;
      background-color: #4298D5;
      cursor: pointer;
      color: #fff;
      text-align: center;
      font-size: 12px;
      line-height: 20px;
    }
    .foot-active{
      background-color: #01D4FF;
    }
  }
}
</style>
