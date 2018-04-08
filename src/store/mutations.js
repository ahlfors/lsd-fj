/**
 * 所有方法务必是同步的
 * 异步用actions
 */
import MutationsBridge from './mutation-types'
import msgManager from '../components/common/message/message'
import views1 from '../components/app/app1/handleCmd'
import views2 from '../components/app/app2/handleCmd'
window.MutationsBridge = MutationsBridge
let appNum = window.location.hash.split('/')[3];
let views;
if (appNum === 1 || appNum === '1') {
  views = views1;
} else if (appNum === 2 || appNum === '2') {
  views = views2;
}

const mUtils = {
  /**
   * @desc 命令事件处理入口
   */
  handleEvent(state, key) {
    state.cmd = key
    /* 返回主页 */
    if (key === 'home') {
      ++state.cmd_home
    } else if (state.handleType) {
      /* 方向操作 */
      if (key === 'up' ||
        key === 'down' ||
        key === 'left' ||
        key === 'right' ||
        key === 'ok') {
        let viewId = state.oldViewId = state.newViewId
        /* 选择操作 */
        if ((views.hasOwnProperty(viewId)) &&
          views[viewId].hasOwnProperty('opts') &&
          views[viewId].opts.hasOwnProperty(key)) {
          state.newViewId = views[viewId].opts[key];
        }
        /* 操作事件 */
        ++state.cmdAction
      } else if (key === 'back') {
        /* 返回上一级操作  */
        ++state.cmd_back
      }
    } else {
      /* 开启遥控 */
      state.handleType = 1
      state.newViewId = '01'
    }
  },
  /**
   * @desc gis命令事件处理入口
   */
  handleGisEvent(state, cmd) {
    let gisId = state.nowGisId;
    state.cmdObj = cmd;
    state.cmd = cmd.key;
    state.handleType = 1;
    state.oldViewId = gisId;
    state.newViewId = gisId;
    /* 操作事件 */
    ++state.cmdAction;
  }
}
export default {
  /**
   * @desc 用户ID
   * @param {state} state
   * @param {msg} msg
   * eventType:"ipad",key:[left,right,ok...],keyType:[direction] [menu],userId:"lsz"
   */
  [MutationsBridge.USER_ID_SSA](state, msg) {
    state.userId = msg
    msgManager.connect(msg)
    /* 注册ipad事件 */
    msgManager.registerMsgHandler('ipad', (cmd) => {
      if (cmd.keyType === 'direction') {
        mUtils.handleEvent(state, cmd.key)
      } else if (cmd.keyType === 'menu') {
        state.handleType = 1
        state.newViewId = cmd.key
        mUtils.handleEvent(state, 'ok')
      } else if (cmd.keyType === 'gis') {
        mUtils.handleGisEvent(state, cmd);
      }
    })
  },
  /**
   * 响应鼠标点击事件
   * @param state
   * @param msg {cmd:[命令], viewId: [视图Id]}
   */
  [MutationsBridge.MOUSE_CLICK_SSA](state, msg) {
    if (!state.handleSwitch) state.handleSwitch = true
    if (msg.hasOwnProperty('viewId')) state.newViewId = msg.viewId;
    mUtils.handleEvent(state, msg.cmd)
  },
  /**
   * @desc 视图Id
   * @param state
   * @param msg
   */
  [MutationsBridge.NEW_VIEW_ID_SSA](state, msg) {
    state.newViewId = msg
  },
  /**
   * @desc 视图Id
   * @param state
   * @param msg
   */
  [MutationsBridge.OLD_VIEW_ID_SSA](state, msg) {
    state.oldViewId = msg
  },
  /**
   * @desc 操作状态
   * @param state
   * @param msg
   */
  [MutationsBridge.HANDLE_TYPE_SSA](state, msg) {
    state.handleType = msg
  },
  /**
   * @desc 当前点击 viewId (模拟遥控事件)
   * @param state
   * @param msg
   */
  [MutationsBridge.CLICK_VIEW_ID_SSA](state, msg) {
    state.newViewId = msg
    state.handleType = 1
    mUtils.handleEvent(state, 'ok')
  },
  /**
   * @desc 定时器
   * @param state
   * @param msg
   */
  [MutationsBridge.INTERVAL_SSA](state, msg) {
    if (msg) {
      state.intervalId = setInterval(() => {
        state.interval++
      }, 1000)
    } else {
      state.interval = 0
      clearInterval(state.intervalId)
    }
  }
}
