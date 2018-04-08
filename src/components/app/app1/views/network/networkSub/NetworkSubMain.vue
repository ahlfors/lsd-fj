<!--移动二级页面 - 规模-->
<template>
  <popupTemplate>
    <viewTemplate  viewId="0401" class="a1-traditional-networkSub" @click.stop="goOne" @keyup.esc="goOne">
       <iframe src="http://10.53.169.26:18080/GetNetworkSafeInfo/" scrolling="no" frameborder="0" width="3840" height="1024"></iframe>
    </viewTemplate>
    <div @click="goOne" class="popup-close">X</div>
  </popupTemplate>
</template>
<script>
  import './NetworkSubMain.scss';
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      goOne() {
        let routeNames = this.$route.matched;
        this.$router.push({name: routeNames[0].name});
      }
    },
    components: {
    }
  }
</script>
