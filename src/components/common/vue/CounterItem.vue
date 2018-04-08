<template>
  <ul :class="classFlag" class="counter__item">
    <li v-for='num in [0,1,2,3,4,5,6,7,8,9]'>{{num}}</li>
  </ul>
</template>

<script>
  //  import Velocity from 'velocity-animate'

  export default {
    name: 'CounterItem',
    props: {
      effectFlag: Boolean,
      classFlag: {
        type: Boolean,
        default: false
      },
      digit: {
        type: Number,
        default: 0,
        required: true,
        validator(value) {
          return value >= 0 && value <= 9
        }
      }
    },
    watch: {
      digit: {
        deep: true,
        handler(value) {
          this.playEffect()
        }
      }
    },
    mounted() {
      this.playEffect()
    },
    methods: {
      playEffect() {
        let vm = this.$el
        if (this.effectFlag) {
          vm.style.transform = 'translateY(0)'
        } else {
          // let radomY = (Math.random() * 10).toFixed(0)
          let radomY = (Math.random() * 0).toFixed(0)
          setTimeout(() => {
            vm.style.transform = 'translateY(' + radomY + '00%)'
            //          Velocity(vm, {
            //            translateY: ('-' + this.digit + '00%')
            //          }, {duration: 1000})
            vm.style.animation = 'counter-slider-' + radomY + '-' + this.digit + ' 1.2s ease-in';
            vm.style.transform = 'translateY(-' + this.digit + '00%)'
          }, 200)
        }
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .counter__item {
    transition: all 1.2s ease-in;
    transform: translateY(-500%);
  }
  @for $from from 0 through 9 {
    @for $to from 0 through 9 {
      @keyframes counter-slider-#{$from}-#{$to} {
        from {
          transform: translateY(#{-$from*100 + '%'})
        }
        to {
          transform: translateY(#{-$to*100 + '%'})
        }
      }
    }
  }
</style>
