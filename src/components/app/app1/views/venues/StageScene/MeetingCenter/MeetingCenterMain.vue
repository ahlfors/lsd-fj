<template>
  <div class="meetingcenter">
    <div class="mc-left">
      <viewTemplate class="mc-left1"
                    :class="{'mc-left-active':currentMommet==1,'view-active':currentMommet==1}"
                    viewId='100301'
                    @ok="chooseMommet(1)">
        接机
      </viewTemplate>
      <viewTemplate class="mc-left2"
                    :class="{'mc-left-active':currentMommet==2,'view-active':currentMommet==2}"
                    viewId='100302'
                    @ok="chooseMommet(2)">
        <span>文艺</span>
        <span>汇演</span>
      </viewTemplate>
      <viewTemplate class="mc-left3"
                    :class="{'mc-left-active':currentMommet==3,'view-active':currentMommet==3}"
                    viewId='100303'
                    @ok="chooseMommet(3)">
        会议
      </viewTemplate>
      <viewTemplate class="mc-left4"
                    :class="{'mc-left-active':currentMommet==4,'view-active':currentMommet==4}"
                    viewId='100304'
                    @ok="chooseMommet(4)">
        <span>夫人</span>
        <span>活动</span>
      </viewTemplate>
      <viewTemplate class="mc-left5"
                    :class="{active:currentMommet==5,'view-active':currentMommet==5}"
                    viewId='100305'
                    @ok="chooseMommet(5)">
        送机
      </viewTemplate>
    </div>
    <mc-data :currentMommet="currentMommet" @changeState="changeState"></mc-data>
  </div>
</template>

<script>
import './MeetingCenter.scss';
import MeetingCenterData from './MettingCenterData.vue'
export default {
  data() {
    return {
      currentMommet: 3
    }
  },
  methods: {
    chooseMommet(val) {
      this.currentMommet = val;
    },
    changeState(val) {
      this.$emit('changeState', val)
    }
  },
  components: {
    'mc-data': MeetingCenterData
  }
}
</script>
