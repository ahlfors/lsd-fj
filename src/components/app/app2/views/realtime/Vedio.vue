<!--家庭宽带 -->
<template>
  <viewTemplate class="a1-real-time-vedio" :interval="30" @interval="loadData">
    <div class="vedio-title">
      <span class="vedio-bg"></span>
      <span>视频类 (全省)</span>
    </div>
    <hr/>
    <div class="vedio-weChat-userNum">
      <span>视频类活跃用户数:</span>
      <div>
        <div v-for="item of userNumArr">
          <counter :data="item" :config="indexNumConfig"></counter>
        </div>
        <!--<counter :data="weChat_userNum" :config="indexNumConfig"></counter>-->
        <span>万</span>
      </div>
    </div>
    <div class="vedio-weChat-upFlow">
      <span>视频类上行流量:</span>
      <div>
        <div v-for="item of upFlowArr">
          <counter :data="item" :config="indexNumConfig"></counter>
        </div>
        <!--<counter :data="weChat_upFlow" :config="indexNumConfig"></counter>-->
        <span>MB</span>
      </div>
    </div>
    <div class="vedio-weChat-downFlow">
      <span>视频类下行流量:</span>
      <div>
        <div v-for="item of downFlowArr">
          <counter :data="item" :config="indexNumConfig"></counter>
        </div>
        <!--<counter :data="weChat_downFlow" :config="indexNumConfig"></counter>-->
        <span>MB</span>
      </div>
    </div>
  </viewTemplate>
</template>
<script>
  export default {
    data() {
      return {
        userNumArr: [1, 2, 1],
        upFlowArr: [1, 3, 2, 3],
        downFlowArr: [6, 3, 5, 3, 4],
        indexNumConfig: {
          justifyContent: 'center',
          numbers: { // 数字配置项
            textStyle: {
              color: '#fefefe',
              fontSize: 25,
              fontFamily: 'PixelLCD-7'
            },
            letterSpacing: 2 // 数字之间间距
          }
        }
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        this.userNumArr = [0, 0, 0];
        this.upFlowArr = [0, 0, 0, 0];
        this.downFlowArr = [0, 0, 0, 0, 0];
        this.$http.indi.get('f0060', {}, (res60) => {
          this.userNumArr = this.strToarr(res60.data.data.NUMBER_OF_ACTIVE_USER);
          this.upFlowArr = this.strToarr(res60.data.data.UPSTREAM_TRAFFIC * 1024);
          this.downFlowArr = this.strToarr(res60.data.data.DOWNSTREAM_TRAFFIC * 1024);
        })
        // window.setTimeout(() => {
        //   this.userNumArr = [1, 2, 1];
        //   this.upFlowArr = [1, 3, 2, 3];
        //   this.downFlowArr = [6, 3, 5, 3, 4];
        // }, 100)
      },
      strToarr(val) {
        let temp = parseInt(val).toString();
        let arr = temp.split('');
        return arr.map(function(ele) {
          return Number(ele);
        })
      }
    },
    components: {
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .a1-real-time-vedio{
    position: absolute;
    width: 380px;
    height: 230px;
    top: 10px;
    .vedio-title{
      position: absolute;
      height: 41px;
      width: 100%;
      left: 40px;
      .vedio-bg{
        width: 63px;
        height: 43px;
        display: flex;
        position: absolute;
        background-image: url("../../assets/img/legend/watch.png");
        background-repeat: no-repeat;
      }
      > span:nth-of-type(2){
        position: absolute;
        left: 70px;
        font-size: 30px;
        color: #E6F2FE;
        display: flex;
        height: 41px;
      }
    }
    hr{
      position: absolute;
      top: 35px;
      width: 335px;
      left: 40px;
    }
    .vedio-weChat-userNum{
      position: absolute;
      height: 45px;
      width: 100%;
      top: 75px;
      font-size: 20px;
      color: #fefefe;
      left: -10px;
      > span:nth-of-type(1){
        position: absolute;
        display: flex;
        justify-content: flex-end;
        width: 176px;
      }
      > div:nth-of-type(1){
        position: absolute;
        height: 45px;
        left: 175px;
        top: -3px;
        display: inline-flex;
        > div{
          margin-left: 5px;
          width: 30px;
          height: 38px;
          background-image: url("../../assets/img/legend/squart.png");
          background-repeat: no-repeat;
        }
        > span:nth-of-type(1){
          margin-left: 5px;
          margin-top: 8px;
        }
      }
    }
    .vedio-weChat-upFlow{
      position: absolute;
      height: 45px;
      width: 100%;
      top: 120px;
      font-size: 20px;
      color: #fefefe;
      left: -10px;
      > span:nth-of-type(1){
        position: absolute;
        display: flex;
        justify-content: flex-end;
        width: 176px;
      }
      > div:nth-of-type(1){
        position: absolute;
        height: 45px;
        left: 175px;
        top: -3px;
        display: inline-flex;
        > div{
          margin-left: 5px;
          width: 30px;
          height: 38px;
          background-image: url("../../assets/img/legend/squart.png");
          background-repeat: no-repeat;
        }
        > span:nth-of-type(1){
          margin-left: 5px;
          margin-top: 8px;
        }
      }
    }
    .vedio-weChat-downFlow{
      position: absolute;
      height: 45px;
      width: 100%;
      top: 170px;
      font-size: 20px;
      color: #fefefe;
      left: -10px;
      > span:nth-of-type(1){
        position: absolute;
        display: flex;
        justify-content: flex-end;
        width: 176px;
      }
      > div:nth-of-type(1){
        position: absolute;
        height: 45px;
        left: 175px;
        top: -3px;
        display: inline-flex;
        > div{
          margin-left: 5px;
          width: 30px;
          height: 38px;
          background-image: url("../../assets/img/legend/squart.png");
          background-repeat: no-repeat;
        }
        > span:nth-of-type(1){
          margin-left: 5px;
          margin-top: 8px;
        }
      }
    }
  }
</style>
