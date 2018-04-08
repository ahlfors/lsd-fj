<!--实时性能-->
<template>
  <viewTemplate  class="a2-real-time">
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide>
        <communication></communication>
      </swiper-slide>
      <swiper-slide>
        <vedio></vedio>
      </swiper-slide>
      <swiper-slide>
        <brower></brower>
      </swiper-slide>
    </swiper>
    <span class="swiper-realTime-pagination1"></span>
    <viewTemplate viewId="03" @ok="toTools" @click="toTools" class="a2-realTime-tools"></viewTemplate>
  </viewTemplate>
</template>
<script>
  import communication from './Communication.vue'
  import vedio from './Vedio.vue'
  import brower from './Brower.vue'
  export default {
    data() {
      return {
        swiperOption: {
          autoplay: 1000 * 10,
          setWrapperSize: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          direction: 'horizontal',
          pagination: '.swiper-realTime-pagination1',
          paginationClickable: true
        }
      }
    },
    methods: {
      toTools() {
        this.$router.push({
          name: 'RealTimeSub/RealTimeSubMain/xm'
        });
      }
    },
    components: {
      communication,
      vedio,
      brower
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .a2-real-time{
    position: absolute;
    width: 440px;
    height: 244px;
    left: 787px;
    top: 269px;
    .swiper{
      position: absolute;
      width: 100%;
      height: 244px;
    }
    .swiper-pagination-bullets {
      position: absolute;
      z-index: 1;
      display: inline-block;
      width: 135px;
      height: 37px;
      left: 310px;
      top: 15px;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      width: 10px;
      height: 10px;
      opacity: 1;
      border-radius: 5px;
      margin: 13px 3px;
      background: #3FA7C0;
    }
    .swiper-pagination-bullet-active {
      background: #65FDFF;
      opacity: 1;
    }
    .a2-realTime-tools{
      position: absolute;
      width: 272px;
      height: 50px;
      left: 38px;
      top: 5px;
      z-index: 2;
      cursor: pointer;
    }
  }
</style>
