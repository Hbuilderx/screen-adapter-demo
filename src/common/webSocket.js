/**
 * @Name:
 * @Description: 封装webSocket
 * @Author: zhuds
 * @CreateTime: 2022-05-31 08:55:35
 */

import config from '@/config'
let Socket = ''
let setIntervalSocketPush = null

/**
 * 建立websocket连接
 * @param {string} url ws地址
 */
export const createSocket = (url= config.socketUrl) => {
    Socket && Socket.close()
    if (!Socket) {
        console.log('建立websocket连接')
        Socket = new WebSocket(url)
        Socket.onopen = onopenWS
        Socket.onmessage = onmessageWS
        Socket.onerror = onerrorWS
        Socket.onclose = oncloseWS
    } else {
        console.log('websocket已连接')
    }
}

/**打开WS之后发送心跳 */
const onopenWS = () => {
    sendPing()
}

/**连接失败重连 */
const onerrorWS = () => {
    Socket.close()
    clearInterval(setIntervalSocketPush)
    console.log('连接失败重连中')
    if (Socket.readyState !== 3) {
        Socket = null
        createSocket()
    }
}

/**WS数据接收统一处理 */
const onmessageWS = e => {
    //自定义事件
    window.dispatchEvent(new CustomEvent('onmessageWS', {
        detail: {
            data: e.data
        }
    }))
}

/**
 * 发送数据但连接未建立时进行处理等待重发
 * @param {any} message 需要发送的数据
 */
const connecting = message => {
    setTimeout(() => {
        if (Socket.readyState === 0) {
            connecting(message)
        } else {
            Socket.send(JSON.stringify(message))
        }
    }, 1000)
}

/**
 * 发送数据
 * @param {any} message 需要发送的数据
 */
export const sendWSPush = message => {
    if (Socket !== null && Socket.readyState === 3) {
        Socket.close()
        createSocket()
    } else if (Socket.readyState === 1) {
        Socket.send(JSON.stringify(message))
    } else if (Socket.readyState === 0) {
        connecting(message)
    }
}

/**断开重连 */
const oncloseWS = () => {
    clearInterval(setIntervalSocketPush)
    console.log('websocket已断开....正在尝试重连')
    if (Socket.readyState !== 2) {
        Socket = null
        createSocket()
    }
}
/**发送心跳，避免断线
 * @param {number} time 心跳间隔毫秒 默认5000
 * @param {string} ping 心跳名称 默认字符串ping
 */
export const sendPing = (time = 15000, ping = 'ping') => {
    clearInterval(setIntervalSocketPush)
    Socket.send(ping)
    setIntervalSocketPush = setInterval(() => {
        Socket.send(ping)
    }, time)
}