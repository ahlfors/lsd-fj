<template>
  <div class="map">
    <viewTemplate class="map-title" @ok= "clearMap" viewId = "100310">
      <div class="map-title-text">
        {{sceneName}}
      </div>
      <div class="clear-map" :class="{'clear-map-active':ismapClear}"></div>
    </viewTemplate>
    <div class="map-content">
      <keep-alive>
      <div class='map-container'
           :is='currentView'
           :sceneName = "sceneName" :areaId = "areaId"></div>
      </keep-alive>
      <!--<ToolTip></ToolTip>-->
      <keep-alive>
        <transition name="slide-fade-right">
      <div is="ToolTip"
            :sceneName = "sceneName" :areaId = "areaId" :activeIndex = "activeIndex" v-show="ismapClear"></div>
        </transition>
      </keep-alive>
      <!--<Lengend></Lengend>-->
      <keep-alive>
        <transition name="slide-fade-left">
      <div is="Lengend"
            :sceneName = "sceneName" :areaId = "areaId" v-show="ismapClear"></div>
        </transition>
      </keep-alive>
      <!--<BottomList></BottomList>-->
      <keep-alive>
        <transition name="slide-fade-bottom">
      <div is="BottomList"
            :sceneName = "sceneName" :areaId = "areaId" v-show="ismapClear"></div>
        </transition>
      </keep-alive>
      <viewTemplate viewId = "100309" class="map-content-icon"
           @ok='changeView'>
        <img v-if="currentView=='FakeGis'"
             src='../../../../assets/img/venues/stagescene/GIS.png' />
        <img v-if="currentView=='AreaGis'"
             src="../../../../assets/img/venues/stagescene/3D.png" />
      </viewTemplate>
    </div>
  </div>
</template>
<script>
import AreaGis from './AreaGis.vue'
import FakeGis from './FakeGis.vue'
import ToolTip from './ToolTip.vue'
import Lengend from './Lengend.vue'
import BottomList from './BottomList.vue'
export default {
  props: {
    areaId: Number,
    sceneName: String,
    activeIndex: Number
  },
  data() {
    return {
      ismapClear: true,
      currentView: 'FakeGis'
    }
  },
  methods: {
    clearMap() {
      this.ismapClear = !this.ismapClear;
    },
    changeView() {
      this.currentView = this.currentView === 'AreaGis' ? 'FakeGis' : 'AreaGis';
      this.$emit('changeState', {state: this.activeState, title: this.sceneName});
    }
  },
  watch: {
  },
  components: {
    AreaGis,
    FakeGis,
    ToolTip,
    Lengend,
    BottomList
  }
}
</script>
<style rel = "stylesheet/scss" lang="scss">
.slide-fade-left-enter-active {
  transition: all .3s linear;
}
.slide-fade-left-leave-active {
  transition: all .5s linear;
}
.slide-fade-left-enter, .slide-fade-left-leave-active {
  transform: translateX(-200px);
  opacity: 0;
}

.slide-fade-bottom-enter-active {
  transition: all .3s linear;
}
.slide-fade-bottom-leave-active {
  transition: all .5s linear;
}
.slide-fade-bottom-enter, .slide-fade-bottom-leave-active {
  transform: translateY(20px);
  opacity: 0;
}

.slide-fade-right-enter-active {
  transition: all .3s linear;
}
.slide-fade-right-leave-active {
  transition: all .5s linear;
}
.slide-fade-right-enter, .slide-fade-right-leave-active {
  transform: translateX(200px);
  opacity: 0;
}
.map {
  width: 1960px;
  height: 962px;
  position: absolute;
  top: 30px;
  left: 1124px;
  background-image: url("../../../../assets/img/venues/stagescene/mapbg.png");
  .map-title {
    width: 100%;
    height: 70px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    position: relative;
    .map-title-text {
      font-size: 48px;
      width: 500px;
      height: 100%;
      font-weight: bold;
      background-image: -webkit-radial-gradient( #6fddf8, #cdf2fb, #25cef5);
      text-align: center;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .map-content {
    height: 893px;
    width: 100%;
    border: 4px solid transparent;
    box-sizing: border-box;
    position: relative;
    .map-content-icon {
      position: absolute;
      width: 114px;
      height: 114px;
      right: 28px;
      bottom: 86px; // border: 1px solid gray;
      z-index: 9999;
      cursor: pointer;
    }
  }
  .clear-map{
    position: absolute;
    top: 1px;
    right: 150px;
    width: 150px;
    height: 68px;
    z-index: 1001;
    cursor: pointer;
    transition: all 0.5s linear;
    background-image: url("../../../../assets/img/venues/switch-legend-active.png");
  }
  .clear-map-active{
    background-image: url("../../../../assets/img/venues/switch-legend.png");
  }
}
</style>
