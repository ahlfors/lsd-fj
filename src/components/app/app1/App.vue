<!--福建重大活动保障 APP1-->
<template>
  <appTemplate class="a1" appName="matrix">
    <header class="a1-header"></header>
    <traditional-main></traditional-main>
    <internet-main></internet-main>
    <roam-main></roam-main>
    <real-time-main></real-time-main>
    <gis></gis>
    <venues></venues>
    <others></others>
    <net-work></net-work>
  </appTemplate>
</template>
<script>
  import './assets/scss/app.scss'
  import gis from './views/gis/GisMain.vue'
  import traditionalMain from './views/traditional/TraditionalMain.vue'
  import internetMain from './views/internet/InternetMain.vue'
  import netWork from './views/network/Network.vue'
  import venues from './views/venues/VenuesMain.vue'
  import others from './views/other/OtherMain'
  import roamMain from './views/roam/RoamMain.vue'
  import realTimeMain from './views/realtime/RealtimeMain.vue'
  export default {
    mounted() {
      document.title = '福建大屏';
    },
    components: {
      gis,
      traditionalMain,
      internetMain,
      venues,
      roamMain,
      realTimeMain,
      others,
      netWork
    }
  }
</script>

