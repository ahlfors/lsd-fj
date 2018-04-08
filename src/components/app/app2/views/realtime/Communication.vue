<!--家庭宽带 -->
<template>
  <viewTemplate class="a1-real-time-communication" :interval="30" @interval="loadData">
    <div class="communication-title">
      <span class="communication-bg"></span>
      <span>即时通信 (全省)</span>
    </div>
    <hr/>
    <div class="communication-weChat-userNum">
      <span>即时通讯活跃用户数:</span>
      <div>
        <div v-for="item of userNumArr">
          <counter :data="item" :config="indexNumConfig"></counter>
        </div>
        <!--<counter :data="weChat_userNum" :config="indexNumConfig"></counter>-->
        <span>万</span>
      </div>
    </div>
    <div class="communication-weChat-upFlow">
      <span>即时通讯上行流量:</span>
      <div>
        <div v-for="item of upFlowArr">
          <counter :data="item" :config="indexNumConfig"></counter>
        </div>
        <!--<counter :data="weChat_upFlow" :config="indexNumConfig"></counter>-->
        <span>MB</span>
      </div>
    </div>
    <div class="communication-weChat-downFlow">
      <span>即时通讯下行流量:</span>
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
        userNumArr: [7, 0],
        upFlowArr: [3, 1, 2, 3],
        downFlowArr: [6, 5, 2, 9],
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
        this.userNumArr = [0, 1];
        this.upFlowArr = [0, 0, 0, 0];
        this.downFlowArr = [0, 0, 0, 0];
        this.$http.indi.get('f0056', {}, (res56) => {
          this.userNumArr = this.strToarr(res56.data.data.NUMBER_OF_ACTIVE_USER);
          this.upFlowArr = this.strToarr(res56.data.data.UPSTREAM_TRAFFIC * 1024);
          this.downFlowArr = this.strToarr(res56.data.data.DOWNSTREAM_TRAFFIC * 1024);
        })
        // window.setTimeout(() => {
        //   this.userNumArr = [7, 0];
        //   this.upFlowArr = [3, 1, 2, 3];
        //   this.downFlowArr = [6, 5, 2, 9];
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
  .a1-real-time-communication{
    position: absolute;
    width: 380px;
    height: 230px;
    top: 10px;
    .communication-title{
      position: absolute;
      height: 41px;
      width: 100%;
      left: 40px;
      .communication-bg{
        width: 48px;
        height: 41px;
        display: flex;
        position: absolute;
        background-image: url("../../assets/img/legend/communication.png");
        background-repeat: no-repeat;
      }
      > span:nth-of-type(2){
        position: absolute;
        left: 58px;
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
    .communication-weChat-userNum{
      position: absolute;
      height: 45px;
      width: 100%;
      top: 75px;
      font-size: 20px;
      color: #fefefe;
      left: 10px;
      > span:nth-of-type(1){
        position: absolute;
        display: flex;
        justify-content: flex-end;
        width: 188px;
      }
      > div:nth-of-type(1){
        position: absolute;
        height: 45px;
        left: 188px;
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
    .communication-weChat-upFlow{
      position: absolute;
      height: 45px;
      width: 100%;
      top: 120px;
      font-size: 20px;
      color: #fefefe;
      left: 10px;
      > span:nth-of-type(1){
        position: absolute;
        display: flex;
        justify-content: flex-end;
        width: 188px;
      }
      > div:nth-of-type(1){
        position: absolute;
        height: 45px;
        left: 188px;
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
    .communication-weChat-downFlow{
      position: absolute;
      height: 45px;
      width: 100%;
      top: 170px;
      font-size: 20px;
      color: #fefefe;
      left: 10px;
      > span:nth-of-type(1){
        position: absolute;
        display: flex;
        justify-content: flex-end;
        width: 188px;
      }
      > div:nth-of-type(1){
        position: absolute;
        height: 45px;
        left: 188px;
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
