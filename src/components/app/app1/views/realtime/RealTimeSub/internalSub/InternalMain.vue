<!--移动二级页面 - 即时通信-->
<template>
    <div class="internal-wrap" @click.self.stop = "goOne">
        <instant-message></instant-message>
        <micro-blog></micro-blog>
        <we-chat></we-chat>
        <internet-page></internet-page>
        <internet-video></internet-video>
        <internet-total></internet-total>
      </div>
</template>
<script>
  import instantMessage from './InstantMessage.vue'
  import microBlog from './MicroBlog.vue'
  import weChat from './WeChat.vue'
  import internetPage from './InternetPage.vue'
  import internetVideo from './Video.vue'
  import internetTotal from './Total.vue'
  export default {
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      goOne() {
        this.$router.back();
      }
    },
    components: {
      instantMessage,
      microBlog,
      weChat,
      internetPage,
      internetVideo,
      internetTotal
    }
  }
</script>
<style lang="scss">
.internal-wrap{
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url("../../../../assets/img/legend/internal.png");
}
</style>
