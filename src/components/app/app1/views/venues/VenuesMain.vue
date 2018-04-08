<!--3D场馆地图-->
<template>
  <viewTemplate class="a1-venues">
    <div is="map3d"
         @changeIndex="changeIndex"></div>
    <div is="servicemonitoring"
         :activeIndex="activeIndex"></div>
  </viewTemplate>
</template>
<script>
import './venues.scss';
import map3d from './Map.vue';
import servicemonitoring from './ServiceMonitoring.vue';
// import rightvideo from './RightVideo.vue';
export default {
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    changeIndex(index) {
      this.activeIndex = index;
    }
  },
  components: {
    map3d,
    servicemonitoring
  }
}
</script>
