<!--移动二级页面 - 即时通信-->
<template>
  <popupTemplate>
    <viewTemplate viewId="xxx"class="a1-traditional-realTimeSub" :interval="30" @interval="loadDate">
      <div class="a1-traditional-realTimeSub-div">
        <div is = "internalSub" v-show="inFlag"></div>
        <div is = "abroadSub" v-show="!inFlag"></div>
        <div class="realTimeSub-title">
          <span>{{myTime}}</span>
          <span>实时性能监控</span>
         </div>
        <viewTemplate  viewId="0301" class="btn-internal" @ok="chooseInternal"></viewTemplate>
        <viewTemplate  viewId="0302" class="btn-abroad" @ok="chooseAbroad"></viewTemplate>
      </div>
    </viewTemplate>
  </popupTemplate>
</template>
<script>
  import './RealTimeSubMain.scss';
  import internalSub from './internalSub/internalMain.vue'
  import abroadSub from './abroadSub/abroadMain.vue'
  export default {
    data() {
      return {
        myTime: null,
        inFlag: true
      }
    },
    mounted() {
      this.loadDate()
    },
    methods: {
      chooseInternal() {
        this.inFlag = true;
      },
      chooseAbroad() {
        this.inFlag = false;
      },
      loadDate() {
        this.$http.indi.get('f0059', {}, (res) => {
          let time = res.data.data.START_TIME;
          let date = new Date(time);
          let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
          let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
          this.myTime = hour + '时' + minutes + '分';
        });
      }
    },
    components: {
      internalSub,
      abroadSub
    }
  }
</script>
