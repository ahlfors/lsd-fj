<!--传统业务-->
<template>
  <viewTemplate class="a2-traditional">
    <traditionalTop></traditionalTop>
    <traditional-top-two></traditional-top-two>
    <div is="businessQuality" :activeIndex="activeIndex"></div>
    <div is="businessScale" @bQChangeIndex="bQChangeIndex" idFlag="one"></div>
  </viewTemplate>
</template>
<script>
  import traditionalTop from './TraditionalTop.vue'
  import TraditionalTopTwo from './TraditionalTopTwo.vue'
  import businessQuality from './BusinessQuality.vue'
  import businessScale from './BusinessScale.vue'
  export default {
    data() {
      return {
        activeIndex: 0
      };
    },
    methods: {
      bQChangeIndex(index) {
        this.activeIndex = index;
      }
    },
    components: {
      traditionalTop,
      businessQuality,
      businessScale,
      TraditionalTopTwo
    }
  }
</script>
<style>
  .a2-traditional {
    left: 10px;
    width: 761px;
    height: 525px;
    top: 10px;
  }
</style>
