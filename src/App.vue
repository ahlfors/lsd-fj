<!--主APP-->
<template>
  <!--场景切换-->
  <div id="app">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'App',
    mounted() {
      this.escEventHandler()
      this.interval()
    },
    computed: {
      /**
       * @desc 返回主页 并刷新
       */
      cmdHome: function() {
        return this.$store.state.cmd_home
      },
      /**
       * @desc 返上级回键
       * @returns {computed.cmdBack|number}
       */
      cmdBack: function() {
        return this.$store.state.cmd_back
      }
    },
    methods: {
      /**
       * @desc  esc 事件
       */
      escEventHandler() {
        // 禁用鼠标右键功能
        document.oncontextmenu = (event) => {
          event.returnValue = false;
          this.$store.commit(MutationsBridge.MOUSE_CLICK_SSA, {
            cmd: 'back'
          })
        };
        document.addEventListener('keyup', (e) => {
          if (e.keyCode === 27) {
            if (this.$store.state.handleType) {
              this.$store.commit(MutationsBridge.MOUSE_CLICK_SSA, {cmd: 'back'})
            }
          } else {
            return false
          }
        }, false);
      },
      /**
       * @desc 返回事件
       */
      cmdBackEvent() {
        let routeNames = this.$route.matched
        if (routeNames.length > 1) {
          this.$store.commit(MutationsBridge.NEW_VIEW_ID_SSA, this.$store.state.newViewId.substring(0, (routeNames.length - 1) * 2))
          this.$router.push({name: routeNames[routeNames.length - 2].name})
        } else {
          this.$store.commit(MutationsBridge.HANDLE_TYPE_SSA, 0)
        }
      },
      /**
       * @desc 全局定时器
       */
      interval() {
        this.$store.commit(MutationsBridge.INTERVAL_SSA, true)
      }
    },
    watch: {
      /**
       * @desc 监听 home 返回主页面并刷新
       */
      cmdHome: function() {
        this.$router.push({name: this.$route.matched[0].name})
        window.location.reload();
      },
      cmdBack: function(newVal, oldVal) {
        this.cmdBackEvent()
      }
    }
  }
</script>
<style>
  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter,
  .slide-fade-leave-active {
    transform: translateX(100px);
    opacity: 0;
  }
</style>
