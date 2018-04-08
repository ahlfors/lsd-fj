<!--互联网业务-->
<template>
  <viewTemplate class="a2-internet">
    <homeBroadbrand></homeBroadbrand>
    <internetTV></internetTV>
    <wlan></wlan>
  </viewTemplate>
</template>
<script>
  import homeBroadbrand from './HomeBroadbrand.vue'
  import internetTV from './InternetTV.vue'
  import wlan from './WLAN.vue'
  export default {
    methods: {
    },
    components: {
      homeBroadbrand,
      internetTV,
      wlan
    }
  }
</script>
<style>
  .a2-internet{
    position: absolute;
    width: 763px;
    height: 527px;
    top: 542px;
    left: 10px;
  }
</style>
