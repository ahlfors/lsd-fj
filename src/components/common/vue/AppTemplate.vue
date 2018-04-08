<!--APP 模板-->
<template>
  <div class="app">
    <!--APP-->
    <slot></slot>
    <!--Win 使用弹窗时要y继承popupTemplate.vue-->
    <router-view></router-view>
  </div>
</template>
<script>
  import '@/assets/scss/app.scss'
  import '@/assets/scss/mixin.scss'
  export default {
    methods: {
      /**
       * 标记当前用户
       * */
      userIdState() {
        let userIdRoute = this.$route.params.userId
        let userIdState = this.$store.state.userId
        if (this.appName) {
          this.$http.get(`user/apps/${userIdRoute}/${this.appName}`).then((res) => {
            console.log(`当前场景--${this.appName}`)
          })
        } else {
          console.error('请在APP.vue中设置appName')
        }
        if (userIdRoute && userIdRoute !== userIdState) {
          this.$store.commit(MutationsBridge.USER_ID_SSA, userIdRoute)
        }
      },
      /**
       * @desc 记录用户信息
       */
      setUserInfo: {}
    },
    props: {
      appName: ''
    },
    created() {
      let dataType = this.$route.params.dataType || 'real'
      this.$http.indi.setApiUrl(`api/${dataType}/`)
    },
    mounted() {
      this.userIdState()
    }
  }
</script>
