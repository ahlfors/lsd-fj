/**
 * 消息管理
 */
import '../../../lib/sockjs-1.0.3.min.js'
import '../../../lib/stomp.min.js'
import config from '../../../config'

let msgManager = {
  stompClient: null,
  msgListenerMap: {},
  reconnectTimeId: 0,
  connect(userId) {
    let self = this
    let socket = new SockJS(config.socketUrl)
    this.stompClient = Stomp.over(socket)
    this.stompClient.connect('guest', 'guest', () => {
      self.connectCallback(userId)
    }, (err) => {
      self.errorCallback(err)
    })
  },
  connectCallback(userId) {
    let self = this
    this.stompClient.subscribe('/topic/oper/' + userId, (msg) => {
      console.log(JSON.stringify(msg))
      let oper = JSON.parse(msg.body)
      let hadleFuns = self.msgListenerMap[oper.eventType] || []
      hadleFuns.forEach(fun => {
        fun(oper)
      })
    })
  },
  errorCallback() {
    if (this.reconnectTimeId > 0) {
      clearTimeout(this.reconnectTimeId)
      this.reconnectTimeId = 0
    }
    var self = this
    this.reconnectTimeId = setTimeout(() => {
      console.debug('[socket] reconnecting...')
      self.connect()
    }, 10000)
  },
  registerMsgHandler(msgType, handlerFunction) {
    let handlerArr = this.msgListenerMap[msgType]
    if (!handlerArr) {
      handlerArr = []
      this.msgListenerMap[msgType] = handlerArr
    }
    handlerArr.push(handlerFunction)
  }
}

export default msgManager