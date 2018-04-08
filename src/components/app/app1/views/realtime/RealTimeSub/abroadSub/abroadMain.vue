<!--移动二级页面 - 即时通信-->
<template>
    <div class="abroad-wrap" @click.self.stop = "goOne">
        <google></google>
        <youtube></youtube>
        <facebook></facebook>
        <yahoo></yahoo>
        <twitter></twitter>
        <amazon></amazon>
      </div>
</template>
<script>
  import google from './google.vue'
  import youtube from './youtube.vue'
  import facebook from './facebook.vue'
  import yahoo from './yahoo.vue'
  import twitter from './twitter.vue'
  import amazon from './amazon.vue'
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
      google,
      youtube,
      facebook,
      yahoo,
      twitter,
      amazon
    }
  }
</script>
<style lang="scss">
.abroad-wrap{
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("../../../../assets/img/legend/abroad.png");
}
</style>
