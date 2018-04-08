<!--移动二级页面 - 规模-->
<template>
  <popupTemplate>
    <viewTemplate viewId="0601" class="a2-traditional-networkSub" @click.stop="goOne" @keyup.esc="goOne">
       <iframe src="http://10.209.16.23:8020/FjSafety/safe1.html" frameborder="0" width="3840" height="1080"></iframe>
    </viewTemplate>
    <div @click="goOne" class="popup-close">X</div>
  </popupTemplate>
</template>
<script>
  import './NetworkIds.scss';
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      goOne() {
        this.$router.back();
      }
    },
    components: {
    }
  }
</script>
