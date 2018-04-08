<template>
  <div>
    <div class="meetingcenter-title"
         :class="'state-bg-'+ stateData0.AREA_ID">
      <img style="position: absolute;right: 130px;"
           src="../../../../assets/img/venues/stagescene/arrow.png">
      <div style="position:absolute">{{stateData0.AREA_NAME}}</div>
    </div>
    <mc-data-item :data="stateData1"
                  :eventIndex="'A'"
                  :index="1"
                  :viewId="'100306'"
                  @titleChangeA="chooseState"></mc-data-item>
    <mc-data-item :data="stateData2"
                  :eventIndex="'B'"
                  :index="2"
                  :viewId="'100307'"
                  @titleChangeB="chooseState"></mc-data-item>
    <mc-data-item :data="stateData3"
                  :eventIndex="'C'"
                  :index="3"
                  :viewId="'100308'"
                  @titleChangeC="chooseState"></mc-data-item>
  </div>
</template>
<script>
import MettingDataItem from './MettingDataItem'
import tempData from './tempData.js'
export default {
  props: {
    currentMommet: Number
  },
  data() {
    return {
      stateData0: {
      },
      stateData1: {
      },
      stateData2: {
      },
      stateData3: {
      }
    }
  },
  watch: {
    currentMommet() {
      this.setTempData()
    }
  },
  created() {
    this.loadData();
    this.setTempData();
  },
  methods: {
    loadData() {
      this.$http.indi.get('f0073', {}, (res) => {
        tempData.data1.stateData0 = res.data.data[0].areas[0];
        tempData.data1.stateData1 = res.data.data[0].areas[1];
        tempData.data1.stateData2 = res.data.data[0].areas[2];
        tempData.data1.stateData3 = res.data.data[0].areas[3];

        tempData.data2.stateData0 = res.data.data[1].areas[0];
        tempData.data2.stateData1 = res.data.data[1].areas[1];
        tempData.data2.stateData2 = res.data.data[1].areas[2];
        tempData.data2.stateData3 = res.data.data[1].areas[3];

        tempData.data3.stateData0 = res.data.data[2].areas[0];
        tempData.data3.stateData1 = res.data.data[2].areas[1];
        tempData.data3.stateData2 = res.data.data[2].areas[2];
        tempData.data3.stateData3 = res.data.data[2].areas[3];

        tempData.data4.stateData0 = res.data.data[3].areas[0];
        tempData.data4.stateData1 = res.data.data[3].areas[1];
        tempData.data4.stateData2 = res.data.data[3].areas[2];
        tempData.data4.stateData3 = res.data.data[3].areas[3];

        tempData.data5.stateData0 = res.data.data[4].areas[0];
        tempData.data5.stateData1 = res.data.data[4].areas[1];
        tempData.data5.stateData2 = res.data.data[4].areas[2];
        tempData.data5.stateData3 = res.data.data[4].areas[3];
      })
    },
    chooseState(val) {
      let tempData = Object.assign({}, this.stateData0)
      this.stateData0 = Object.assign({}, this['stateData' + val])
      this['stateData' + val] = tempData
      this.$emit('changeState', {state: this.stateData0.index, title: this.stateData0.AREA_NAME, areaId: this.stateData0.AREA_ID});
    },
    setTempData() {
      let data
      if (this.currentMommet === 1) {
        data = tempData.data1
      } else if (this.currentMommet === 2) {
        data = tempData.data2
      } else if (this.currentMommet === 3) {
        data = tempData.data3
      } else if (this.currentMommet === 4) {
        data = tempData.data4
      } else if (this.currentMommet === 5) {
        data = tempData.data5
      } else {
        data = tempData.data3
      }
      this.stateData0 = data.stateData0
      this.stateData1 = data.stateData1
      this.stateData2 = data.stateData2
      this.stateData3 = data.stateData3
      this.$emit('changeState', {state: 0, title: this.stateData0.AREA_NAME, areaId: this.stateData0.AREA_ID});
    }
  },
  components: {
    'mc-data-item': MettingDataItem
  }
}
</script>
