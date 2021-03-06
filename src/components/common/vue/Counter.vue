<template>
  <div class="counter-con"
       :style="{justifyContent:option.justifyContent}">
    <span v-if="option.prefix.content !== ''"
          class="counter-prefix counter-fix"
          :style="{marginRight:option.prefix.marginRight + 'px',
                color:pStyle.color,fontSize:pStyle.fontSize+ 'px',fontWeight:pStyle.fontWeight,fontFamily:pStyle.fontFamily}">
              {{option.prefix.content}}
            </span>
    <div class="counter-num-con"
         :style="{color:nStyle.color,fontSize:nStyle.fontSize + 'px',fontWeight:nStyle.fontWeight,fontFamily:nStyle.fontFamily}">
      <template v-for="item in numbers">
        <counter-item v-if="item !== '.' && item !== ',' && item !== '-'"
                      class="counter-item"
                      :effectFlag="effectFlag"
                      :digit="Number(item)"
                      :style="{marginRight:option.numbers.letterSpacing + 'px'}"></counter-item>
        <ul v-if="item === '.' || item === ',' || item === '-'"
            class="counter-item">
          <li>{{item}}</li>
        </ul>
      </template>
    </div>
    <span v-if="option.suffix.content !== ''"
          class="counter-suffix counter-fix"
          :style="{marginLeft:option.suffix.marginleft + 'px',
                color:sStyle.color,fontSize:sStyle.fontSize+ 'px',fontWeight:sStyle.fontWeight,fontFamily:sStyle.fontFamily}">
               {{option.suffix.content}}
            </span>
  </div>
</template>

<script>
import counterItem from './CounterItem.vue'
import defaultsDeep from 'lodash.defaultsDeep'

export default {
  props: {
    config: Object,
    data: {
      type: Number,
      default: 0
    }
  },
  watch: {
    config(val) {
      this.mergeoption()
      this.setNumber(this.data)
    },
    data(val) {
      this.setNumber(val)
    }
  },
  data() {
    return {
      effectFlag: false,
      numbers: [],
      pStyle: {},
      nStyle: {},
      sStyle: {},
      option: {
        justifyContent: '',
        prefix: {
          content: '',
          marginRight: 8,
          textStyle: {
            color: '#FF0',
            fontSize: 25,
            fontWeight: '',
            fontFamily: ''
          }
        },
        numbers: {
          textStyle: {
            color: '#FF0',
            fontSize: 25,
            fontWeight: '',
            fontFamily: ''
          },
          letterSpacing: 0,
          decimal: -1,
          digitCount: -1, // 小数点前位数，默认不自动不全
          thousands: false
        },
        suffix: {
          content: '',
          marginLeft: 8,
          textStyle: {
            color: '#FF0',
            fontSize: 25,
            fontWeight: '',
            fontFamily: ''
          }
        }
      }
    }
  },
  mounted() {
    this.mergeoption()
    this.setNumber(this.data)
  },
  methods: {
    mergeoption() {
      this.option = defaultsDeep(this.config || {}, this.option)
      this.pStyle = this.option.prefix.textStyle
      this.nStyle = this.option.numbers.textStyle
      this.sStyle = this.option.suffix.textStyle
    },
    updateLayout() {
      this.mergeoption()
      this.setNumber(this.data)
    },
    setNumber(num) {
      this.effectFlag = !num

      if (typeof num === 'number' && !isNaN(num)) {
        let decimal = this.option.numbers.decimal
        if (decimal > -1) {
          num = parseFloat(num).toFixed(decimal)
        }
        let digitCount = this.option.numbers.digitCount
        if (digitCount > -1) {
          let count = num.toFixed(0).toString().length
          if (count < digitCount) {
            num = Array(digitCount - count + 1).join(0) + num.toString()
          }
        }
        if (this.option.numbers.thousands) {
          let re = /(\d{1,3})(?=(\d{3})+(?:\.))/g
          num = num.replace(re, '$1,')
        }
        this.numbers = num.toString().split('')
      }
    }
  },
  components: {
    'counter-item': counterItem
  }
}

</script>

<style lang="scss">
.counter-con {
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: flex-start;
  white-space: nowrap;
  overflow: hidden;
}

.counter-fix {
  display: flex;
  align-items: center;
  margin: 0;
}

.counter-num-con {
  height: 100%;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}

.counter-item {
  list-style: none;
  margin: 0;
  padding: 0;
}

.counter-item li {
  height: 100%;
  display: flex;
  align-items: center;
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
