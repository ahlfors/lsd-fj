<template>
  <popupTemplate>
    <div class="a1-venue-stagescene" @click.stop.self="goOne" >
      <!--<MeetingCenter></MeetingCenter>-->
      <div is="MeetingCenter"
           @changeState="changeState"></div>
      <!--<Map></Map>-->
      <div is="MapState"
            :sceneName="sceneName" :areaId="areaId" :activeIndex="activeIndex"></div>
      <!--<PerformanceIndex></PerformanceIndex>-->
      <div is="PerformanceIndex"
            :sceneName="sceneName" :areaId="areaId" @changeSwiperSlide="changeSwiperSlide"></div>
      <!--<BusinessIndex></BusinessIndex>-->
      <div is="BusinessIndex"
            :sceneName="sceneName" :areaId="areaId"></div>
    </div>
  </popupTemplate>
</template>
<script>
import './StageSceneMain.scss'
import MeetingCenter from './MeetingCenter/MeetingCenterMain.vue'
import MapState from './Map/MapMain.vue'
import PerformanceIndex from './PerformanceIndex/PerformanceIndexMain.vue'
import BusinessIndex from './BusinessIndex/BusinessIndexMain.vue'
export default {
  data() {
    return {
      sceneName: '国际会议展览中心',
      areaId: 0,
      activeIndex: 0
    }
  },
  methods: {
    changeState(param) {
      this.sceneName = param.title;
      this.areaId = param.areaId;
    },
    changeSwiperSlide(index) {
      this.activeIndex = index;
    },
    goOne() {
      this.$router.back();
    }
  },
  components: {
    MeetingCenter,
    MapState,
    PerformanceIndex,
    BusinessIndex
  }
}
</script>