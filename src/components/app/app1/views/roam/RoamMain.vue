<!--实时性能-->
<template>
  <div viewId="02" class="a1-roam" @ok = "toTools()">
    <swiper :options="swiperOption" class="swiper">
      <swiper-slide>
        <internationalRoam></internationalRoam>
      </swiper-slide>
      <swiper-slide>
        <provinceRoam></provinceRoam>
      </swiper-slide>
      <swiper-slide>
        <provinceInRoam></provinceInRoam>
      </swiper-slide>
    </swiper>
    <span class="swiper-roam-pagination1"></span>
    <viewTemplate viewId="02"  @ok = "toTools()" @click="toTools" class="a1-roam-tools"></viewTemplate>
  </div>
</template>
<script>
  import internationalRoam from './InternationalRoam.vue'
  import provinceRoam from './ProvinceRoam.vue'
  import provinceInRoam from './ProvinceInRoam.vue'
  export default {
    data() {
      return {
        swiperOption: {
          autoplay: 1000 * 10,
          setWrapperSize: true,
          autoplayDisableOnInteraction: false,
          observeParents: true,
          direction: 'horizontal',
          pagination: '.swiper-roam-pagination1',
          paginationClickable: true
        }
      }
    },
    mounted: function() {

    },
    methods: {
      toTools(viewId) {
        if (viewId) this.$store.commit(MutationsBridge.CLICK_VIEW_ID_SSA, viewId);
        this.$router.push({
          name: 'roam/roamIn'
        });
      }
    },
    components: {
      internationalRoam,
      provinceRoam,
      provinceInRoam
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .a1-roam {
    position: absolute;
    width: 340px;
    height: 261px;
    left: 835px;
    top: 10px;
    .swiper {
      position: absolute;
      width: 340px;
      height: 261px;
    }
    .swiper-pagination-bullets {
      position: absolute;
      z-index: 1;
      display: inline-block;
      width: 135px;
      height: 37px;
      left: 290px;
      top: 34px;
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
    .a1-roam-tools {
      position: absolute;
      width: 280px;
      height: 50px;
      left: 0px;
      top: 24px;
      z-index: 2;
      cursor: pointer;
    }
  }
</style>
