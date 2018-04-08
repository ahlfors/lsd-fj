## 公用组件使用方式
### 目录
<!-- TOC -->

- [公用组件使用方式](#公用组件使用方式)
  - [目录](#目录)
  - [1.1. 简介](#11-简介)
  - [1.2. 组件配置项](#12-组件配置项)
    - [1.2.1. 数字滚动组件 counter](#121-数字滚动组件-counter)

<!-- /TOC -->

### 1.1. 简介
    本目录描述的是大屏3.0部分组件的使用方法说明。
  
    注：组件有默认配置,可不配置

### 1.2. 组件配置项

#### 1.2.1. 数字滚动组件 counter
  
  * 使用方式
    ```
    <counter :data="467.34" :config='config'></counter>
    ```
    
  * 配置项说明
  
    ```
    {
      justifyContent: 'center',
      prefix: { // 前缀配置项
        content: '', 
        marginRight: 8,
        textStyle: {
          color: '#FF0',
          fontSize: 25,
          fontWeight: '',
          fontFamily: ''
        }
      },
      numbers: { // 数字配置项
        textStyle: {
          color: '#FF0',
          fontSize: 25,
          fontWeight: '',
          fontFamily: ''
        },
        letterSpacing: 0, // 数字之间间距
        decimal: -1, // 数字保留位数,默认不进行格式化
        digitCount: -1 // 小数点前数字的位数,不够在前边自动补全0 默认不自动补全
        thousands: false // 是否以千分位显示 默认不以千分位显示 
      },
      suffix: { // 后缀配置项
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
    ```   