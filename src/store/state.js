/**
 * @desc 全局状态
 */
export default {
  handleType: 0, // 0: 无操作模式; 1: 操作模式
  userId: '', // 默认当前用户
  newViewId: '01', // 默认视图ID
  oldViewId: '01', // 上一级viewId
  clickViewId: null, // 点击视图Id
  viewIdLog: [], // 操作日志
  cmd: '', // 当前指令
  cmdAction: 0, // 活动cmd
  cmd_ok: 0, // 确认命令
  cmd_left: 0, // left 命令
  cmd_Right: 0, // right 命令
  cmd_up: 0, // up 命令
  cmd_down: 0, // down 命令
  cmd_back: 0, // 返回命令
  cmd_home: 0, // 返回主页并刷新
  intervalId: null, // 定时器 id
  interval: 0, // 30秒
  nowGisId: null, // 当前操控的gisId
  cmdObj: '' // cmd obj
}
