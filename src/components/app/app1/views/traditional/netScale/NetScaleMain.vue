<!--移动二级页面 - 网络规模-->
<template>
  <popupTemplate>
    <viewTemplate class="a1-traditional-net-scale">
      <div class="a1-traditional-net-scale-div">
        <div class="left-client-wrap" @click.stop.self="goOne">
          <div v-for="(item,index) in errNumArr" :class = "[clickboolArr[index]? 'active-logo': '', 'client-logo client-logo'+Number(index+1)]" @click = "chooseLogo(index)">
            <div class="logoNum" v-show="item && item!=null">{{item}}</div>
          </div>
          <!--总客户数-->
          <div class="users-logo user-count">
            <counter :data="userCounts" :config="logoConfig"></counter>
          </div>
          <!--故障客户数-->
          <div class="users-logo user-error">
            <counter :data="errorCounts" :config="logoConfig"></counter>
          </div>
          <!--总专线数-->
          <div class="users-logo lines-count">
            <counter :data="linesCounts" :config="logoConfig"></counter>
          </div>
          <!--故障专线数-->
          <div class="users-logo lines-error">
            <counter :data="linesError" :config="logoConfig"></counter>
          </div>
        </div>
        <div class="right-list-wrap">
           <div is = "TableList" :activeNum ="activeNum"></div>
        </div>
      </div>
      <viewTemplate is="TraditionalTopTwoOne" viewId="x0101"></viewTemplate>
    </viewTemplate>
  </popupTemplate>
</template>
<script>
import './netScaleMain.scss';
import TraditionalTopTwoOne from '../TraditionalTopTwoOne.vue'
import TableList from './TableList.vue'
export default {
  data() {
    return {
      activeNum: -1,
      userCounts: 0,
      errorCounts: 0,
      linesCounts: 0,
      linesError: 0,
      //  客户图标故障数
      errNumArr: [0, 1, 0],
      // 图标是否点击
      clickboolArr: [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      logoConfig: {
        justifyContent: 'center',
        numbers: { // 数字配置项
          textStyle: {
            color: '#fff',
            fontSize: 20,
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
    goOne() {
      this.$router.back();
    },
    chooseLogo(val) {
      let tempArr = [false, false, false, false, false, false, false, false, false, false, false, false, false, false];
      tempArr[val] = true;
      this.clickboolArr = tempArr;
      this.activeNum = val;
    },
    loadData() {
      this.userCounts = 0;
      this.errorCounts = 0;
      this.linesCounts = 0;
      this.linesError = 0;
      this.errNumArr = [];
      this.$http.indi.get(['f0299', 'f0300', 'f0295', 'f0296', 'f0320'], {}, (res299, res300, res295, res296, res320) => {
        this.userCounts = res299.data.data[0].KPI_VALUE;
        this.errorCounts = res300.data.data[0].KPI_VALUE;
        this.linesCounts = res296.data.data[0].KPI_VALUE;
        this.linesError = res295.data.data[0].KPI_VALUE;
        let errorObj = res320.data.data[0];
        let errorArr = [];
        for (var key in errorObj) {
          if (key === 'START_TIME') {
            continue;
          } else {
            errorArr.push(errorObj[key]);
          }
        }
        this.errNumArr = errorArr;
      })
    }
  },
  components: {
    TraditionalTopTwoOne,
    TableList
  }
}
</script>

