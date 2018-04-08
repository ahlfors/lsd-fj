<template>
  <div class="ToolTip">
    <swiper :options="swiperOption"
            class="swiper" ref="mySwiper">
      <swiper-slide>
        <div is="topWireless"
             :sceneName='sceneName' :areaId ='areaId'></div>
        <div is="topSuccess"
             :sceneName='sceneName'  :areaId ='areaId'></div>
      </swiper-slide>
      <swiper-slide>
        <div is="topWireless2G"
             :sceneName='sceneName'  :areaId ='areaId'></div>
        <div is="topSuccess2G"
             :sceneName='sceneName'  :areaId ='areaId'></div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import topWireless from './topWireless.vue';
import topSuccess from './topSuccess.vue';
import topWireless2G from './topWireless2G.vue';
import topSuccess2G from './topSuccess2G.vue';
export default {
  props: {
    sceneName: String,
    activeIndex: Number,
    areaId: Number
  },
  data() {
    return {
      swiperOption: {
        autoplay: false,
        setWrapperSize: true,
        autoplayDisableOnInteraction: false,
        observeParents: true,
        direction: 'horizontal',
        pagination: '.swiper-roam-pagination1',
        paginationClickable: true
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  watch: {
    activeIndex(val) {  // 监听网络质量轮播图变化
      this.swiper.slideTo(val, 1000, false);
    }
  },
  components: {
    topWireless,
    topSuccess,
    topWireless2G,
    topSuccess2G
  }
}
</script>
<style rel = "stylesheet/scss" lang="scss">
.ToolTip {
  z-index: 9999;
  position: absolute;
  width: 384px;
  height: 580px;
  top: 28px;
  right: 28px;
  background-image: url("../../../../assets/img/venues/stagescene/legend.png");
  box-sizing: border-box;
  padding-top: 15px;
  .top-wireless {
    width: 100%;
    height: 264px;
  }
  .top-success {
    width: 100%;
    height: 264px;
  }
  .top-title {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
  }
  .top-content {
    height: 211px;
    width: 100%;
    background-image: url("../../../../assets/img/venues/stagescene/top5.png");
    background-repeat: no-repeat;
    background-position: 16px 0;
    padding-top: 4px;
    .list-item {
      height: 41px;
      width: 100%;
      box-sizing: border-box;
      padding-left: 45px;
      .item-text {
        width: 200px;
        height: 100%;
        font-size: 24px;
        color: #fff;
        float: left; // display: flex;
        // align-items: center;
        // justify-content: flex-start;
        line-height: 48px;
        word-break: keep-all;
        /* 不换行 */
        white-space: nowrap;
        /* 不换行 */
        overflow: hidden;
        /* 内容超出宽度时隐藏超出部分的内容 */
        text-overflow: ellipsis;
      }
      .item-value {
        width: 135px;
        height: 100%;
        float: left;
        box-sizing: border-box;
        padding-top: 5px;
      }
    }
  }
}
</style>